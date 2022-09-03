
const CATEGORIES = `${PRODUCTS_URL}${localStorage.getItem("catID")}${EXT_TYPE}`;


function showProducts(array){
    let htmlContentToAppend = "";

    for(let element of array){ 
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action custom-card">
            <div class="row">
                <div class="col-3">
                    <img src="` + element.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ element.name + " - " + element.currency + " $" + element.cost + `</h4>
                        <p> `+ element.description +`</p> 
                        </div>
                        <small class="text-muted">` + element.soldCount + ` artículos vendidos</small> 
                    </div>

                </div>
            </div>
        </div>
        `
        document.querySelector("#container").innerHTML = htmlContentToAppend; 
    }
}

function displayCurrentCategory(array){
    document.querySelector("#productCategory").innerText = array.catName;
    document.querySelector("#productCategory2").innerText = array.catName.toLowerCase();
}

async function getData() {
    let response = await fetch (CATEGORIES);
    let result = await response.json();
    showProducts(result.products);
    displayCurrentCategory(result);
}

getData();


