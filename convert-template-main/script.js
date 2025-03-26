// Substitua com sua chave de API da ExchangeRate-API
const apiKey = 'b16f689d323fad6a2528bd19';
const baseUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

// Obtendo os elementos do formulário.
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const currency = document.getElementById("currency");
const footer = document.querySelector("main footer");
const description = document.getElementById("description");
const result = document.getElementById("result");

// Manipulando o input amount para receber somente números.
amount.addEventListener("input", () => {
  const hasCharactersRegex = /\D+/g;
  amount.value = amount.value.replace(hasCharactersRegex, "");
});

// Captando o evento de submit (enviar) do formulário.
form.onsubmit = async (event) => {
  event.preventDefault();

  try {
    // Chama a função para obter as cotações atualizadas.
    const cotacoes = await getExchangeRates();

    // Realiza a conversão com base na moeda selecionada.
    switch (currency.value) {
      case "USD":
        convertCurrency(amount.value, cotacoes.USD, "US$");
        break;
      case "EUR":
        convertCurrency(amount.value, cotacoes.EUR, "€");
        break;
      case "GBP":
        convertCurrency(amount.value, cotacoes.GBP, "£");
        break;
    }
  } catch (error) {
    alert("Erro ao obter cotações. Tente novamente mais tarde.");
  }
};

// Função para obter as cotações atualizadas.
async function getExchangeRates() {
  const response = await fetch(baseUrl);
  const data = await response.json();
  
  if (data.result !== "success") {
    throw new Error("Falha ao obter dados da API.");
  }
  
  return data.conversion_rates;  // Retorna as taxas de conversão, incluindo USD, EUR e GBP.
}

// Função para converter a moeda.
function convertCurrency(amount, price, symbol) {
  try {
    // Exibindo a cotação da moeda selecionada.
    description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`;

    // Calcula o total.
    let total = amount * price;

    // Verifica se o resultado não é um número válido.
    if (isNaN(total)) {
      return alert("Por favor, digite o valor corretamente para converter.");
    }

    // Formata o valor total.
    total = formatCurrencyBRL(total).replace("R$", "");

    // Exibe o resultado total.
    result.textContent = `${total} Reais`;

    // Aplica a classe que exibe o footer para mostrar o resultado.
    footer.classList.add("show-result");
  } catch (error) {
    // Remove a classe do footer removendo ele da tela.
    footer.classList.remove("show-result");
    
    console.log(error);
    alert("Não foi possível converter. Tente novamente mais tarde.");
  }
}

// Formata a moeda em Real Brasileiro.
function formatCurrencyBRL(value) {
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
