const currencyElement_one = document.getElementById("currency-one");
const currencyElement_two = document.getElementById("currency-two");
const amountElement_one = document.getElementById("amount-one");
const amountElement_two = document.getElementById("amount-two");

const rateElement = document.getElementById("rate");
const swapButton = document.getElementById("swap");

// Fetch exchange rates and update DOM
function calculate(event) {
    const changedElement = event.target;
    if (changedElement === currencyElement_one || changedElement === amountElement_one) {
        calculateHelper(currencyElement_one, amountElement_one, currencyElement_two, amountElement_two);
    } else {
        calculateHelper(currencyElement_two, amountElement_two, currencyElement_one, amountElement_one);
    }
}

function calculateHelper(changedCurrency, changedAmount, otherCurrency, otherAmount) {
    const currency_one = changedCurrency.value;
    const currency_two = otherCurrency.value;

    fetch(`https://open.exchangerate-api.com/v6/latest/${currency_one}`)
    .then(res => res.json())
    .then(data => {
        //console.log(data);
        const rate = data.rates[currency_two];
        rateElement.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

        otherAmount.value = (changedAmount.value * rate).toFixed(2);
    })
}

// Event Listeners
currencyElement_one.addEventListener("change", calculate);
amountElement_one.addEventListener("input", calculate);
currencyElement_two.addEventListener("change", calculate);
amountElement_two.addEventListener("input", calculate);


calculate(currencyElement_one);