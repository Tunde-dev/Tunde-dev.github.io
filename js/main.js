const cheeseBurgerPrice = 800;
const simpleBurgerPrice = 600;
const doubleBurgerPrice = 1000;
const veggieBurgerPrice = 900;
const extraHotBurgerPrice = 1200;

let dayTemps = []; 

const tempLimits = [0, 15, 20, 25, 50];
const offers = [
    " Ha kint minuszok vannak, ugorj be egy forró csokira.",
    " Mai ajánlatunk egy jó meleg tea.",
    " Nincs is jobb ma egy finom sütinél.",
    " Hűsítsd le magad a kedvenc fagyiddal.",
    " Melegben a legjobb választás egy jéghideg limonádé.",
];

const xmlhttp = new XMLHttpRequest();
const url = "https://api.openweathermap.org/data/2.5/onecall?lat=48.40983&lon=22.18967&exclude=hourly,current,minutely&appid=a737f616ba8bc4980f7a8ff6a2d5df84&units=metric";
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myArr = JSON.parse(this.responseText);
        createDayTemps(myArr);
    }
};
  
xmlhttp.open("GET", url, true);
xmlhttp.send();

function createDayTemps(data) {
    console.log(data);
    for(let i = 0; i < data.daily.length-1; i++ ) {
        const date = new Date(data.daily[i].dt * 1000);
        dayTemps[date.getDay()] = data.daily[i].temp.day; 
    }
    console.log(dayTemps);
    calcMinTemp();
    calcMaxTemp();
    calcAverageTemp();
}

function calcAmount() {
    let subAmount = 0;
    let cheeseBurgerAmount = getAmount("input[name='cheese-burger']");
    let simpleBurgerAmount = getAmount("input[name='simple-burger']");
    let doubleBurgerAmount = getAmount("input[name='double-burger']");
    let veggieBurgerAmount = getAmount("input[name='veggie-burger']");
    let extraHotBurgerAmount = getAmount("input[name='extra-hot-burger']");

    if (cheeseBurgerAmount > 20 || simpleBurgerAmount > 20 || doubleBurgerAmount > 20 || veggieBurgerAmount > 20 || extraHotBurgerAmount > 20) {
        alert("Minden hamburgerünkből maximum 20db választható");
    } else if (cheeseBurgerAmount < 0 || simpleBurgerAmount < 0 || doubleBurgerAmount < 0 || veggieBurgerAmount < 0 || extraHotBurgerAmount < 0) {
        alert("Minimum 1db terméket kell választania");
    } else {
        subAmount = subAmount + cheeseBurgerAmount * cheeseBurgerPrice;
        subAmount = subAmount + simpleBurgerAmount * simpleBurgerPrice;
        subAmount = subAmount + doubleBurgerAmount * doubleBurgerPrice;
        subAmount = subAmount + veggieBurgerAmount * veggieBurgerPrice;
        subAmount = subAmount + extraHotBurgerAmount * extraHotBurgerPrice;
    }

    subAmount = subAmount + calcToppingAmount("input[name='tomato']:checked");
    subAmount = subAmount + calcToppingAmount("input[name='onion']:checked");
    subAmount = subAmount + calcToppingAmount("input[name='cheese']:checked");
    subAmount = subAmount + calcToppingAmount("input[name='bacon']:checked");
    subAmount = subAmount + calcToppingAmount("input[name='pickles']:checked");
    subAmount = subAmount + calcToppingAmount("input[name='pepper']:checked");

    let showAmount = document.querySelector("span.show-amount");
    showAmount.innerHTML = subAmount;
}
function getAmount(selector) {
    let input = document.querySelector(selector);
    let amount = parseInt(input.value);
    return isNaN(amount) ? 0 : amount;
}
function calcToppingAmount(selector) {
    let checkbox = document.querySelector(selector);
    if (checkbox !== null) {
        return parseInt(checkbox.value);
    }
    return 0;
}

function personalDataValidator(firstname, lastname, address) {
    if (!firstname) {
        alert("A név megadása kötelező!");
        return false;
    }
    if (!lastname) {
        alert("A név megadása kötelező!");
        return false;
    }
    if (address.lenght < 10) {
        alert("Kérjük pontos lakcímet adjon meg");
        return false;
    }
    return true;
}
function emailValidator(email) {
    if (!email || email.indexOf('.') === -1 || email.indexOf('@') === -1) {
        alert("Helytelen e-mail cím!");
        return false;
    }
    return true;
}
function validate() {
    let firstname = document.querySelector("input[name='firstname']");
    let lastname = document.querySelector("input[name='lastname']");
    let address = document.querySelector("input[name='address']");
    let email = document.querySelector("input[name='email']").value;
    return personalDataValidator(firstname, lastname, address) && emailValidator(email);
}
function wheatherWidget() {
    let daySelect = document.querySelector("#days-select");
    let day = daySelect.options[daySelect.selectedIndex].value;
    let temperatures = document.querySelector("span.temperatures");
    let offer = document.querySelector("span.offer");

    temperatures.innerHTML = dayTemps[day];
    for (let i = 0; i < tempLimits.length; i++) {
        if (dayTemps[day] <= tempLimits[i]) {
            offer.innerHTML = offers[i];
            break;
        }
    }
}
function calcMinTemp() {
    let minTemp = document.querySelector("span.min-temp");
    let least = dayTemps[0];
    for (let i = 0; i < dayTemps.length; i++) {
        if (dayTemps[i] < least) {
            least = dayTemps[i];
        }
    }
    minTemp.innerHTML = "Min: " + least;
}


function calcMaxTemp() {
    let maxTemp = document.querySelector("span.max-temp");
    let biggest = dayTemps[0];
    for (let i = 0; i < dayTemps.length; i++) {
        if (dayTemps[i] > biggest) {
            biggest = dayTemps[i];
        }
    }
    maxTemp.innerHTML = "Max: " + biggest;
}


function calcAverageTemp() {
    let sumTemp = 0;
    let avgTemp = document.querySelector("span.average-temp");
    for (let i = 0; i < dayTemps.length; i++) {
        sumTemp += dayTemps[i];
    }
    const averageTemp = Math.round(sumTemp / dayTemps.length);
    avgTemp.innerHTML = "Átl: " + averageTemp;
}


