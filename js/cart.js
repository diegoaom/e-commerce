const tablaCarrito = document.querySelector("#cartTable");
const subtotal = document.querySelector("#subtotalSpan");
const shipping = document.querySelector("#shippingCostSpan");
const total = document.querySelector("#totalSpan");
const $form = document.querySelector("#cart-form");
const buyBtn = document.querySelector("#completeBuy");
const TransferBtn = document.querySelector("#bankTransfer");
const CreditCardBtn = document.querySelector("#creditCard");
let inputsCreditCard = document.querySelectorAll(".cd-inputs");
let paymentOption = document.querySelector("#cart-form").paymentMethod.value;
const displayPaymentMethod = document.querySelector("#payment-method");
const inputAccountNumber = document.querySelector("#accountNumber");
const closeModal = document.querySelector("#close-modal");
const closeModalX = document.querySelector("#close-modal-x");
const PaymentMethodFeed = document.querySelector("#payment-method-feedback");

const showCart = (arr) => {
    let htmlToAppend = "";
    for (let elements of arr) {
        htmlToAppend += `
        <tr>
        <td><img src="${elements.image}" class="product-thumbnail"></td>
        <td>${elements.name}</td>
        <td>${elements.currency} ${elements.unitCost}</td>
        <td>
        <input type="number" min="1" class="form-control text-center input-cantidad" value="${elements.count}" id="inputID${elements.id}" 
        oninput="updateCount(${elements.id}), everythingCalc(), showPrice(${elements.id})"
         onchange="this.value = Math.floor(Math.max(this.value,1))" step="1">
        </td>
        <td class="fw-bold">${elements.currency} <span id="subtotalID${elements.id}">${elements.unitCost * elements.count}</span></td>
        <td><button class="fas fa-trash-alt" aria-hidden="true" id="delete${elements.id}" onclick="deleteItem(${elements.id})")></button></td>
        </tr>`
    }
    tablaCarrito.innerHTML = htmlToAppend;
    everythingCalc();
}

const showPrice = (productCartID) => {
    let articleIndex = cartArray.findIndex(e => e.id == productCartID);
    let price = cartArray[articleIndex].unitCost * cartArray[articleIndex].count;

    let subtotalAppendPlace = document.querySelector(`#subtotalID${productCartID}`);
    subtotalAppendPlace.innerHTML = price;
}

const deleteItem = (id) => {
    cartArray = cartArray.filter(itemToRemove => itemToRemove.id !== id);
    updateLocalStorageCart();
    showCart(cartArray);
    showCartCount();
}

const subtotalCalc = () => {
    let subtotalSum = 0;

    for (let articles of cartArray) {
        if (articles.currency === 'UYU') {
            subtotalSum += Math.round((articles.unitCost / 40) * articles.count);
        } else {
            subtotalSum += articles.unitCost * articles.count;
        }
    }

    subtotal.innerHTML = subtotalSum;
}

const shippingCostCalc = () => {
    const shippingValue = document.querySelector('input[name="envio"]:checked').value;
    let shippingCost = Math.round(parseInt(subtotal.innerText) * parseFloat(shippingValue));
    shipping.innerHTML = shippingCost;
}

const totalCalc = () => {
    let totalSum = parseInt(subtotal.innerText) + parseInt(shipping.innerText);
    total.innerHTML = totalSum;
}

const everythingCalc = () => {
    subtotalCalc();
    shippingCostCalc();
    totalCalc();
}

const updateCount = (id) => {
    let inputIDValue = parseInt(document.querySelector(`#inputID${id}`).value);
    if (inputIDValue > 0) {
        let itemIndex = cartArray.findIndex(e => e.id == id)
        cartArray[itemIndex].count = parseInt(inputIDValue);
        updateLocalStorageCart();
    } else {
        let itemIndex = cartArray.findIndex(e => e.id == id)
        cartArray[itemIndex].count = 1;
        updateLocalStorageCart();
    }
}

const disableInputs = () => {
    paymentOption = document.querySelector("#cart-form").paymentMethod.value;
    if (paymentOption == 1) {
        inputAccountNumber.setAttribute("disabled", "");
        inputsCreditCard.forEach(e => e.removeAttribute("disabled"));
    } else if (paymentOption == 2) {
        inputsCreditCard.forEach(e => e.setAttribute("disabled", ""));
        inputAccountNumber.removeAttribute("disabled");
    }
}

const validateAllInputs = () => {
    if (inputsCreditCard[0].checkValidity() && inputsCreditCard[1].checkValidity() && inputsCreditCard[2].checkValidity()) {
        return true;
    } else {
        return false;
    }
}

const validateModal = () => {
    paymentOption = document.querySelector("#cart-form").paymentMethod.value;
    if (paymentOption == 1 && validateAllInputs()) {
        displayPaymentMethod.innerText = "Tarjeta de credito";
    } else if (paymentOption == 2 && inputAccountNumber.checkValidity()) {
        displayPaymentMethod.innerText = "Transferencia bancaria";
    } else {
        displayPaymentMethod.innerText = "No has seleccionado";
    }
}

const successfulbuy = () => {
    if ($form.checkValidity()) {
        document.querySelector("#sucess-buy").classList.add("show");
        setTimeout(() => { document.querySelector("#sucess-buy").classList.remove("show"); }, 1500);
    }
}

const modalFeedback = () => {
    if (!validateAllInputs() || !inputAccountNumber.checkValidity()) {
        PaymentMethodFeed.style.display = "inline";
    } else {
        PaymentMethodFeed.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    checkLocalStorageCart();
    showCart(cartArray);
});

TransferBtn.addEventListener("click", disableInputs);
CreditCardBtn.addEventListener("click", disableInputs);

closeModal.addEventListener("click", validateModal);
closeModalX.addEventListener("click", validateModal);

$form.addEventListener("submit", (e) => {
    $form.classList.add("was-validated");
    e.preventDefault();
    successfulbuy();
    modalFeedback();
})