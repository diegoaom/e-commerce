const SELECTED_PRODUCT = `${PRODUCT_INFO_URL}${localStorage.getItem("productID")}${EXT_TYPE}`;
const SELECTED_PRODUCT_COMMENTS = `${PRODUCT_INFO_COMMENTS_URL}${localStorage.getItem("productID")}${EXT_TYPE}`;
const relatedProductSection = document.querySelector("#relatedContainer");
let productInfo = undefined;
let relatedProductArray = [];
let productComments = undefined;

const createProductCard = (element)=> {
    let htmlProductToAppend = `
    <div class="list-group-item list-group-item-action custom-card mt-5">
        <div class="row">
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <div class="mb-1">
                        <h4 class="fw-bold mt-2">${element.name}</h4>
                        <br>
                        <p class="fw-bold">Precio</p>
                        <p>${element.currency} ${element.cost}</p>
                        <p class="fw-bold">Descripcion</p>
                        <p>${element.description}</p>
                        <p class="fw-bold">Categoria</p>
                        <p>${element.category}</p>
                        <p class="fw-bold">Cantidad de vendidos</p> 
                        <p>${element.soldCount}</p>
                        <p class="fw-bold">Imagenes ilustrativas</p>
                    </div>
                    <div>
                        <button type="button" class="btn btn-success" id="comprarBtn">Comprar</button>
                    </div>
                </div>
                <div class="container product-imgs-container" id="img-container">

                </div>

            </div>
        </div>
    </div> `

    document.querySelector("#container").innerHTML = htmlProductToAppend;
    createIMGS(element);
}

const createIMGS = (array) => {
    
    for(imagenes of array.images){
    document.querySelector("#img-container").innerHTML += `<img class="product-imgs" src="${imagenes}" alt="imagen de producto">`
    }
}

const showComments = (array) => {

    for (comentario of array) {
        document.querySelector("#comment-section").innerHTML += `
        <div class="list-group-item list-group-item-action custom-card">
            <div class="row">
                <div class="d-flex w-100 justify-content-between">
                    <div class="mb-1">
                        <p><span class="fw-bold">${comentario.user}</span> - ${comentario.dateTime} - ${showStars(comentario.score)}</p>
                        <p>${comentario.description}</p>
                    </div>
                </div>
                <div class="container product-imgs-container" id="img-container">

                </div>

            </div>
        </div>`
    }


}

const showStars = (score) => {
   const starRating = [`<span class="fa fa-star"></span>`, `<span class="fa fa-star"></span>`,
    `<span class="fa fa-star"></span>`, `<span class="fa fa-star"></span>`, `<span class="fa fa-star"></span>`];


    for (let i = 0; i < score; i++){
        starRating.splice(i, 1, `<span class="fa fa-star checked"></span>`)
    }

    starResult = starRating.join('');
    return starResult;

}

function createRelated(arr) {
    let relatedToAppend = "";
    for (related of arr.relatedProducts) {
        relatedToAppend += `<div onclick="setProductID(${related.id})" class="cursor-active">
        <img src="${related.image}" alt="related image" class="img-thumbnail img-related">
        <p class="text-center">${related.name}</p>
        </div>`;
    }
    relatedProductSection.innerHTML = relatedToAppend;
}

document.addEventListener("DOMContentLoaded", ()=> {
    getJSONData(SELECTED_PRODUCT).then((resultObj) =>{
        if (resultObj.status === "ok"){
            productInfo = resultObj.data;
            relatedProductArray = resultObj.data.relatedProducts;
            createProductCard(productInfo);
            createRelated(productInfo);
        }
    });
    getJSONData(SELECTED_PRODUCT_COMMENTS).then((resultObj) =>{
        if (resultObj.status === "ok"){
            productComments = resultObj.data;
            showComments(productComments);
        }
    });
});
