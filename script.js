const currencyEl_One = document.getElementById("currency-one");
const amountEl_one = document.getElementById("amount-one");

const currencyEl_Two = document.getElementById("currency-two");
const amountEl_Two = document.getElementById("amount-two");

const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

//Fetch exchange rate and update the DOM
function calculate() {
  const currency_one = currencyEl_One.value;
  const curreny_two = currencyEl_Two.value;

  fetch(
    `https://v6.exchangerate-api.com/v6/7a5051f18166f2e04e316bd2/latest/${currency_one}`
  )
    .then(res => res.json())
    .then(data => {
      //onsole.log(data);
      const rate = data.conversion_rates[curreny_two];
      rateEl.innerText = `1 ${currency_one} = ${rate}`;
      amountEl_Two.value = (amountEl_one.value * rate).toFixed(2);
    });
}

//Event listeners
currencyEl_One.addEventListener("change", calculate);
amountEl_one.addEventListener("input", calculate);
currencyEl_Two.addEventListener("change", calculate);
amountEl_Two.addEventListener("input", calculate);

swap.addEventListener("click", () => {
  const temp = currencyEl_One.value;
  currencyEl_One.value = currencyEl_Two.value;
  currencyEl_Two.value = temp;
  calculate();
});

calculate();
