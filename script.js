//jshint esversion: 8


/*

Author: Anthony Noel
This page connects to an API to get the current exchange rate between the USD and the Switzerland, Japanese and
South African Currencies. I choose to only get the currency on the page loading/refreshing due to the limitation in calls
that I have with the free membership of the API that I have. This is for test purposes only

Don't forget to add that api.txt to git ignore

Future Dev:
-I would have much rather preferred to call the getCurrentExchange and updateDisplay seperately in the init function
but I wasn't sure how to wait for the reponse from my
fetch request
-A better way to require that a number remains in the input number
-Add some moving clouds in the background
-Add symbols to the currencies
-Figure out a way if using the same 0 in destructoring to pass them as all of the vars recieving it

*/
const usInput = document.querySelector("input[type=number]");
const endpoint = "https://open.exchangerate-api.com/v6/latest";

const chOutput = document.querySelector("input[data-currency=chf]");
const jpOutput = document.querySelector("input[data-currency=jpy]");
const saOutput = document.querySelector("input[data-currency=zar]");

//Holders for the currentExchange rates
let usToChf, usToJPN, usToZar;

console.log(endpoint);

const initPage = () => {
  //Get the initial currency rate and set all the inputs to the rate for 1 USD
   getCurrentExchange();
  //Adds an event listener to the us input
  usInput.onchange = updateDisplay;
  usInput.onkeyup = updateDisplay;
};


const getCurrentExchange = async () => {
  //fetch the current data from the API
  await fetch(endpoint)
  .then((response) => {
    if (!response.ok) throw new Error('HTTP error, status = ' + response.status);
    return response.json();
}).then(data => {
    console.log(data);

    [usToChf, usToJPN,usToZar] = [data.rates.CHF,data.rates.JPY, data.rates.ZAR];

    console.log("These are the rates: "+usToChf, usToJPN, usToZar);
  });
  //update the display;
  updateDisplay();
};

const updateDisplay = () => {
  //To make sure that the number input always corresponds to the correct amounts
  if(!usInput.value) {
    [chOutput.value,jpOutput.value, saOutput.value] = ["","",""];
    return;
  }
  //Grab the value in the input box
  let usd = parseInt(usInput.value);

  //Multiply it times the conversion rate for the 3 other currencies to get the amount in the Currencies
  console.log("I think these are the errors"+usToChf,usToJPN,usToZar);
  console.log(`UStoCHF is ${usToChf} and type is ${typeof usToChf}`);
  let [chf, jpy, zar] = [usToChf*usd,usToJPN*usd,usToZar*usd];
  console.log("The currencies"+chf,jpy,zar);
  //Change the input boxes values for the other currencies to reflect that new value
  [chOutput.value,jpOutput.value, saOutput.value] = [chf, jpy, zar];
};

initPage();
