const cheeseBurgerPrice = 800;
const simpleBurgerPrice = 600;
const doubleBurgerPrice = 1000;
const veggieBurgerPrice = 900;
const extraHotBurgerPrice = 1200;

const dayTemps = [25, 30, 32, 35, 33, 27, 29];

function calcAmount () {
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
    if (!email || email.indexOf('.') === -1 || email.indexOf('@') === -1)  {
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

    temperatures.innerHTML = dayTemps[day];
}

