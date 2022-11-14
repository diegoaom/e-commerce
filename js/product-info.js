const SELECTED_PRODUCT = `${PRODUCT_INFO_URL}${localStorage.getItem("productID")}${EXT_TYPE}`;
const SELECTED_PRODUCT_COMMENTS = `${PRODUCT_INFO_COMMENTS_URL}${localStorage.getItem("productID")}${EXT_TYPE}`;
const relatedProductSection = document.querySelector("#relatedContainer");
let productInfo = undefined;
let relatedProductArray = [];
let productComments = undefined;
const $formCommentary = document.querySelector("#commentary-send");
const scoringValue = document.querySelector("#inputGroupSelect01");
const comment = document.querySelector("#comment");

const createProductCard = (element) => {
  let htmlProductToAppend = `
    <div class="card m-5">
  <div class="row carrousel-row">
    <div class="col-6 carrousel-col">
      <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"
            aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
            aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
            aria-label="Slide 3"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3"
            aria-label="Slide 4"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="${element.images[0]}" class="d-block w-100">
          </div>
          <div class="carousel-item">
            <img src="${element.images[1]}" class="d-block w-100">
          </div>
          <div class="carousel-item">
            <img src="${element.images[2]}" class="d-block w-100">
          </div>
          <div class="carousel-item">
            <img src="${element.images[3]}" class="d-block w-100">
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    <div class="col-6">
      <div class="d-flex justify-content-between">
        <h2 class="m-3">${element.name}</h2>
        <button type="button" class="btn btn-success m-3" id="comprarBtn" onclick="buyProduct()">Comprar</button>
      </div>
      <div>
        <ul class="product-list">
          <li class="fw-bold">Precio</li>
          <li>${element.currency} ${element.cost}</li>
          <li class="fw-bold">Descripcion</li>
          <li>${element.description}</li>
          <li class="fw-bold">Categoria</li>
          <li>${element.category}</li>
          <li class="fw-bold">Cantidad de vendidos</li>
          <li>${element.soldCount}</li>
        </ul>
      </div>
    </div>
  </div>
</div>`

  document.querySelector("#container").innerHTML = htmlProductToAppend;

}

const showComments = (array) => {
  document.querySelector("#comment-section").innerHTML = "";
  for (let comentario of array) {
    document.querySelector("#comment-section").innerHTML += `
        <div class="list-group-item list-group-item-action custom-card">
            <div class="row">
                <div class="d-flex w-100 justify-content-between">
                    <div class="mb-1">
                        <p><span class="fw-bold">${comentario.user}</span> - ${comentario.dateTime} - ${showStars(comentario.score)}</p>
                        <p>${comentario.description}</p>
                    </div>
                </div>
            </div>
        </div>`
  }


}

const showStars = (score) => {
  const starRating = [`<span class="fa fa-star"></span>`, `<span class="fa fa-star"></span>`,
    `<span class="fa fa-star"></span>`, `<span class="fa fa-star"></span>`, `<span class="fa fa-star"></span>`];


  for (let i = 0; i < score; i++) {
    starRating.splice(i, 1, `<span class="fa fa-star checked"></span>`)
  }

  starResult = starRating.join('');
  return starResult;

}

function createRelated(arr) {
  let relatedToAppend = "";
  for (let related of arr.relatedProducts) {
    relatedToAppend += `<div onclick="setProductID(${related.id})" class="cursor-active">
        <img src="${related.image}" alt="related image" class="img-thumbnail img-related">
        <p class="text-center">${related.name}</p>
        </div>`;
  }
  relatedProductSection.innerHTML = relatedToAppend;
}

const createBoughtProductInfo = () => {
  productBought = {
    id: productInfo.id,
    name: productInfo.name,
    count: 1,
    unitCost: productInfo.cost,
    currency: productInfo.currency,
    image: productInfo.images[0]
  }
}

const buyFeedbackOK = () => {
  document.querySelector("#ok-buy").classList.add("show");
  setTimeout(() => { document.querySelector("#ok-buy").classList.remove("show"); }, 1500);
}

const buyFeedbackNOTok = () => {
  document.querySelector("#not-ok-buy").classList.add("show");
  setTimeout(() => { document.querySelector("#not-ok-buy").classList.remove("show"); }, 1500);
}

const pushProductToCart = () => {
  checkLocalStorageCart();
  if (!cartArray.some(e => e.id === productBought.id)) {
    cartArray.push(productBought);
    updateLocalStorageCart();
    buyFeedbackOK();
  } else {
    buyFeedbackNOTok();
  }
}

const buyProduct = () => {
  createBoughtProductInfo();
  pushProductToCart();
}

const commentSaveLS = (comment) => {
  if (localStorage.getItem("savedComments")) {
    let commentsArray = JSON.parse(localStorage.getItem("savedComments"))
    commentsArray.push(comment);
    localStorage.setItem("savedComments", JSON.stringify(commentsArray));
  } else {
    let commentsArray = [];
    commentsArray.push(comment);
    localStorage.setItem("savedComments", JSON.stringify(commentsArray));
  }
}

const loadComment = () => {
  if (localStorage.getItem("savedComments") && JSON.parse(localStorage.getItem("savedComments")).filter(e => e.product === productInfo.id) != []) {
    let commentsInLocalStorage = JSON.parse(localStorage.getItem("savedComments")).filter(e => e.product === productInfo.id);
    productComments = productComments.concat(commentsInLocalStorage);
  }
}

const getCommentDate = () => {
  const date = new Date();
  const commentDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  return commentDate;
}

const createComment = () => {
  if ($formCommentary.checkValidity()) {
    let newComment = {
      product: parseInt(productInfo.id),
      score: parseInt(scoringValue.value),
      description: comment.value,
      user: userCommentaryName(),
      dateTime: getCommentDate()
    }
    productComments.push(newComment);
    commentSaveLS(newComment);
    showComments(productComments);

  }
}

const userCommentaryName = () => {
  let fullName = undefined;
  if (localStorage.getItem("profileInfo")) {
    let user = JSON.parse(localStorage.getItem("profileInfo"));
    fullName = `${user.name} ${user.surname}`
    return fullName;
  } else {
    fullName = localStorage.getItem("email");
    return fullName;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  getJSONData(SELECTED_PRODUCT).then((resultObj) => {
    if (resultObj.status === "ok") {
      productInfo = resultObj.data;
      relatedProductArray = resultObj.data.relatedProducts;
      createProductCard(productInfo);
      createRelated(productInfo);
    }
  });
  getJSONData(SELECTED_PRODUCT_COMMENTS).then((resultObj) => {
    if (resultObj.status === "ok") {
      productComments = resultObj.data;
      loadComment();
      showComments(productComments);
    }
  });
});

$formCommentary.addEventListener("submit", (e) => {
  $formCommentary.classList.add("was-validated");
  e.preventDefault();
  createComment();
})


