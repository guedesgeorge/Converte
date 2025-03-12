  const USD = 4.98
  const EUR = 3.32
  const GBP = 6.08

  // Obtendo os elemntos dos formularios
  const form = document.querySelector("form")
  const amount = document.getElementById("amount")
  const currency = document.getElementById("currency")

  // Esse comando observa os eventos da intereção e manipula para receber somente numeros
  amount.addEventListener("input", () => {

    // serve para procurar texto na string 
    const hasChangedRegex = /\D+/g
    // O comando regex é para busca letras e trocar por nada 
    amount.value  = amount.value.replace(hasChangedRegex, "")
  })

  // Captando o evento de submit no formulário.
  form.onsubmit = (event) => {
    event.preventDefault()

    // esse value esta no html ele mostra as moedas e aqui vamos ver qual foi selecionada 
    switch (currency.value){
      case "USD":
        convertCurrency(amount.value, USD, "US$")
        break

      case "EUR": 
        convertCurrency(amount.value, EUR, "€")
        break

      case "GBP": 
        convertCurrency(amount.value, GBP, "£")
        break
    }
  
  }

  // função para converter a moeda.

  function convertCurrency(amount, price, symbol) {
    console.log(amount, price, symbol)

  }