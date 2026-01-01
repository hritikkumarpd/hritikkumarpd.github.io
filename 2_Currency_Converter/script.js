const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const fromAmount = document.getElementById("from-amount");
const toAmount = document.getElementById("to-amount");
const exchangeRate = document.querySelector(".exchange-rate");

async function updateRate() {
  const amount = fromAmount.value;

  if (!amount || amount <= 0) {
    toAmount.value = "";
    exchangeRate.innerText = "Enter a valid amount";
    return;
  }

  try {
    const res = await fetch(
      `https://v6.exchangerate-api.com/v6/d9dd75eea8b45eefb4409499/latest/${fromCurrency.value}`
    );

    const data = await res.json();

    const rate = data.conversion_rates[toCurrency.value];


    const convertedValue = amount * rate;


    toAmount.value = convertedValue.toFixed(2);
    exchangeRate.innerText = `1 ${fromCurrency.value} = ${rate.toFixed(4)} ${toCurrency.value}`;

  } catch (error) {
    exchangeRate.innerText = "Error fetching exchange rates";
    console.error(error);
  }
}

fromCurrency.addEventListener("change", updateRate);
toCurrency.addEventListener("change", updateRate);
fromAmount.addEventListener("input", updateRate);

updateRate();
