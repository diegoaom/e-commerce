const SELECTED_CATEGORY = `${PRODUCTS_URL}${localStorage.getItem("catID")}${EXT_TYPE}`;
const ORDER_ASC_BY_COST = "$ASC";
const ORDER_DESC_BY_COST = "$DESC";
const ORDER_BY_RELEVANCE = "Rel.";
let currentProductsArray = [];
let currentSortCriteriaProducts = undefined;
let minCostProduct = undefined;
let maxCostProduct = undefined;
const searchBox = document.querySelector("#product-search");

function showProducts(arr) {
    let htmlContentToAppend = "";

    for (let element of arr) {

        if (((minCostProduct == undefined) || (minCostProduct != undefined && parseInt(element.cost) >= minCostProduct)) &&
            ((maxCostProduct == undefined) || (maxCostProduct != undefined && parseInt(element.cost) <= maxCostProduct))) {

            htmlContentToAppend += `
                <div onclick="setProductID(${element.id})" class="list-group-item list-group-item-action cursor-active category-card text-white" >
                    <div class="row">
                        <div class="col-3">
                            <img src="${element.image}" alt="product image" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <div class="mb-1">
                                <h4>${element.name} - ${element.currency} $${element.cost}</h4>
                                <p>${element.description}</p> 
                                </div>
                                <small class="text-muted">${element.soldCount} artículos vendidos</small> 
                            </div>
    
                        </div>
                    </div>
                </div>
                `
        }

        document.querySelector("#container").innerHTML = htmlContentToAppend;
    }
}

function displayCurrentCategory() {
    document.querySelector("#productCategory").innerText = categoryName;
    document.querySelector("#productCategory2").innerText = categoryName.toLowerCase();
}

function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_COST) {
        result = array.sort((a, b) => {
            return a.cost - b.cost;
        });
    } else if (criteria === ORDER_DESC_BY_COST) {
        result = array.sort((a, b) => {
            return b.cost - a.cost;
        });
    } else if (criteria === ORDER_BY_RELEVANCE) {
        result = array.sort((a, b) => {
            let aRelevance = parseInt(a.soldCount);
            let bRelevance = parseInt(b.soldCount);

            return bRelevance - aRelevance;
        });
    }

    return result;
}

function sortAndShowProducts(sortCriteria) {
    currentSortCriteriaProducts = sortCriteria;

    currentProductsArray = sortProducts(currentSortCriteriaProducts, currentProductsArray);
    showProducts(currentProductsArray);
}

document.addEventListener("DOMContentLoaded", () => {

    getJSONData(SELECTED_CATEGORY).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentProductsArray = resultObj.data.products;
            categoryName = resultObj.data.catName;
            showProducts(currentProductsArray);
            displayCurrentCategory();
        }
    });

    document.querySelector("#sortAscCost").addEventListener("click", () => {
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.querySelector("#sortDescCost").addEventListener("click", () => {
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    document.querySelector("#sortByRelevance").addEventListener("click", () => {
        sortAndShowProducts(ORDER_BY_RELEVANCE);
    });

    document.querySelector("#clearFilter").addEventListener("click", function () {
        document.querySelector("#rangeFilterCostMin").value = "";
        document.querySelector("#rangeFilterCostMax").value = "";

        minCostProduct = undefined;
        maxCostProduct = undefined;

        showProducts(currentProductsArray);
    });

    document.querySelector("#rangeFilterCost").addEventListener("click", function () {
        minCostProduct = document.querySelector("#rangeFilterCostMin").value;
        maxCostProduct = document.querySelector("#rangeFilterCostMax").value;

        if ((minCostProduct) && (parseInt(minCostProduct)) >= 0) {
            minCostProduct = parseInt(minCostProduct);
        }
        else {
            minCostProduct = undefined;
        }

        if ((maxCostProduct) && (parseInt(maxCostProduct)) >= 0) {
            maxCostProduct = parseInt(maxCostProduct);
        }
        else {
            maxCostProduct = undefined;
        }

        showProducts(currentProductsArray);
    });
});

const searchNormalize = (string, keyword)=> {
    console.log(string);
   return string.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().includes(keyword.toLowerCase());
}

const searchProduct = ()=> {
    let searchProductArray = currentProductsArray.filter(e => searchNormalize(e.name, searchBox.value) || 
    searchNormalize(e.description, searchBox.value));
    showProducts(searchProductArray);
}

searchBox.addEventListener("input", ()=>{
    searchProduct();
})