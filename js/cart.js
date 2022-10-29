const CART_URL = "https://japceibal.github.io/emercado-api/user_cart/25801.json"
const tablaCarrito = document.querySelector("#cartTable");
let cartArray = [];

const showCart = (arr)=>{
    let htmlToAppend = "";
    for(elements of arr.articles){
        htmlToAppend += `
        <tr>
        <td><img src="${elements.image}" class="product-thumbnail"></td>
        <td>${elements.name}</td>
        <td>${elements.currency} $${elements.unitCost}</td>
        <td>
        <input type="number" class="form-control text-center input-cantidad" value="${elements.count}" id="inputID${elements.id}" 
        oninput="showPrice(${elements.unitCost},${elements.id})">
        </td>
        <td class="fw-bold">${elements.currency} $<span id="subtotalID${elements.id}">${elements.unitCost * elements.count}</span></td>
        <td><button class="fa fa-trash trash-icon" aria-hidden="true"></button></td>
        </tr>`
    }
    tablaCarrito.innerHTML = htmlToAppend;
}

const showPrice = (cost, productCartID)=> {
    let precio = cost;
    let cantidad = document.querySelector(`#inputID${productCartID}`).value;
    let subtotalAppendPlace = document.querySelector(`#subtotalID${productCartID}`);
    subtotalAppendPlace.innerHTML = precio * cantidad;
}

document.addEventListener("DOMContentLoaded", ()=> {
    getJSONData(CART_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            cartArray = resultObj.data;
        } 
        showCart(cartArray);
    });
});