const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";
const CART_URL = "https://japceibal.github.io/emercado-api/user_cart/25801.json"
const CART_COUNT = document.querySelector("#cart-count");
let cartArray = [];

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

function authentication() {
  if (localStorage.getItem("email") === null){
    window.location.href = "login.html"
  }
}

function displayUser() {
  if (localStorage.getItem("email") !== null){
    document.querySelector("#userDisplay").innerText = localStorage.getItem("email");
  }
}

function logOut() {
  if (localStorage.getItem("email") !== null){
    localStorage.removeItem("email");
  }
}

function setProductID(id) {
  localStorage.setItem("productID", id);
  window.location = "product-info.html"
}

const checkLocalStorageCart = ()=> {
  if(localStorage.getItem("cart")){
      cartArray = JSON.parse(localStorage.getItem("cart"));
  } 
}

const updateLocalStorageCart = ()=> {
  localStorage.setItem("cart", JSON.stringify(cartArray));
}

const fetchPeugeot = () => {

  getJSONData(CART_URL).then(function (resultObj) {
      if (resultObj.status === "ok") {
          let PeugeotFetch = resultObj.data.articles;
          cartArray.unshift(PeugeotFetch[0]);
          updateLocalStorageCart();
          showCartCount();
      }
  });
}

const checkPeugeot = () => {
  checkLocalStorageCart();
  if (!cartArray.some(e => e.id === 50924)) {
      fetchPeugeot();
  }
}

const showCartCount = () => {
  checkLocalStorageCart();
  CART_COUNT.innerText = ` ${cartArray.length}`;

}

document.addEventListener("DOMContentLoaded", () =>{
  authentication();
  displayUser();
  showCartCount();
  checkPeugeot();
  updateLocalStorageCart();
});