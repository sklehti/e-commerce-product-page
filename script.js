const toggleMenu = document.getElementById("toggle-menu");
const closeButton = document.getElementById("close-button");
const elements = document.getElementsByClassName("nav-titles");
const emptyBasket = document.getElementById("empty-basket");
const shoppingCart = document.getElementById("shopping-cart");
const carouselImg = document.getElementById("carousel-img");
const modalCarouselImg = document.getElementById("modal-carousel-img");
const previousArrow = document.getElementById("previous-arrow");
const nextArrow = document.getElementById("next-arrow");
let pruductQuantity = document.getElementById("pruduct-quantity");
let shoppingQuantity = document.getElementById("shopping-quantity");
let shoppingQuantityUnvisible = document.getElementsByClassName(
  "shopping-quantity-unvisible"
);
const dialogTextEmpty = document.getElementById("dialog-text-empty");
const dialogText = document.getElementById("dialog-text");
const minusBtn = document.getElementById("minus-btn");
const plusBtn = document.getElementById("plus-btn");
const title = document.getElementById("product-title");
const price = document.getElementById("product-price");
const orderProducts = document.getElementById("order-products");
const selectedProductImages = document.getElementById(
  "selected-product-images"
);
const modalSelectedProductImages = document.getElementById(
  "modal-selected-product-images"
);
const containerImg = document.getElementById("container-img");

const mainModal = document.getElementById("main-modal");

// img variables
const images = [
  { file: "images/image-product-1.jpg", id: 1 },
  { file: "images/image-product-2.jpg", id: 2 },
  { file: "images/image-product-3.jpg", id: 3 },
  { file: "images/image-product-4.jpg", id: 4 },
];

// thumbnail images
const thumbnailImages = [
  { file: "images/image-product-1-thumbnail.jpg", id: 1 },
  { file: "images/image-product-2-thumbnail.jpg", id: 2 },
  { file: "images/image-product-3-thumbnail.jpg", id: 3 },
  { file: "images/image-product-4-thumbnail.jpg", id: 4 },
];

let allProducts = [];

previousArrow.addEventListener("click", function () {
  const imgNow = carouselImg.src;

  changePreviousimage(imgNow, carouselImg);
});

nextArrow.addEventListener("click", function () {
  const imgNow = carouselImg.src;

  changeNextimage(imgNow, carouselImg);
});

/**
 * carousel show previous image
 */
function changePreviousimage(imgNow, mainImg) {
  for (i = images.length - 1; i >= 0; i--) {
    const activeImg = imgNow.includes(images[i].file);

    if (activeImg) {
      if (i === 0) {
        i = images.length;
      }
      mainImg.src = images[i - 1].file;

      break;
    }
  }
}

/**
 * carousel show next image
 */
function changeNextimage(imgNow, mainImg) {
  for (i = 0; i < images.length; i++) {
    const activeImg = imgNow.includes(images[i].file);

    if (activeImg) {
      if (i === images.length - 1) {
        i = -1;
      }

      mainImg.src = images[i + 1].file;

      break;
    }
  }
}

toggleMenu.addEventListener("click", function () {
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.remove("nav-titles-unvisible");
    elements[i].classList.add("nav-titles");
  }
});

closeButton.addEventListener("click", function () {
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.add("nav-titles-unvisible");
  }
});

function alertInfo() {
  alert("Coming later...");
}

/**
 * modal actions
 */
const myDialog = emptyBasket;

shoppingCart.addEventListener("click", function () {
  if (allProducts.length > 0) {
    dialogTextEmpty.classList.remove("dialog-text-empty");
    dialogTextEmpty.classList.add("dialog-text-empty-unvisible");
    dialogText.classList.remove("dialog-text-filled-unvisible");
  } else {
    dialogTextEmpty.classList.remove("dialog-text-empty-unvisible");
    dialogTextEmpty.classList.add("dialog-text-empty");
    dialogText.classList.add("dialog-text-filled-unvisible");
  }
  myDialog.showModal();
});

myDialog.addEventListener("click", () => myDialog.close());

const modalDiv = document.getElementById("modal-div");
modalDiv.addEventListener("click", (event) => event.stopPropagation());

minusBtn.addEventListener("click", function () {
  if (Number(pruductQuantity.innerHTML) > 0) {
    pruductQuantity.innerHTML = Number(pruductQuantity.innerHTML) - 1;
  }
});

plusBtn.addEventListener("click", function () {
  pruductQuantity.innerHTML = Number(pruductQuantity.innerHTML) + 1;
});

function shoppingBag() {
  const orderProductsList = allProducts.map((p) => {
    return `
            <li id="dialog-text-filled">
              <div class="basket-text" >
                  <img class="basket-img"  src=${p.img} alt="product image"/>
                <div>
                  <div>${p.name}</div>
                  <div>${p.price} x ${
      p.quantity
    } <spam style="font-weight:bold; color:#000">$${Math.round(
      (Number(p.price.split("$")[1]) * Number(p.quantity) * 100) / 100
    ).toFixed(2)}</spam></div>
                </div>
              </div>
              <div onclick="emptingBasket()" class="delete-basket" >
                <img src="images/icon-delete.svg" alt="delete item"/>
              </div>
            </li>
          `;
  });

  const orderProductsHTML = orderProductsList.join("");

  orderProducts.innerHTML = orderProductsHTML;
}

function addBasket() {
  shoppingQuantity.innerHTML =
    Number(shoppingQuantity.innerHTML) + Number(pruductQuantity.innerHTML);

  const productExist = allProducts.some((p) => p.name === title.innerHTML);
  let priceNow = price.innerHTML.split("<")[0];
  priceNow = priceNow.trim();

  let basketImg;

  images.map((img) => {
    if (carouselImg.src.includes(img.file)) {
      basketImg = img.file;
    }
  });

  if (!productExist) {
    allProducts = [
      ...allProducts,
      {
        img: basketImg,
        name: title.innerHTML,
        price: priceNow,
        quantity: shoppingQuantity.innerHTML,
      },
    ];
  } else {
    let index = 0;
    allProducts.forEach((p) => {
      if (Number(shoppingQuantity.innerHTML) === 0) {
        allProducts.splice(index, 1);
      } else if (p.name === title.innerHTML) {
        p.quantity = Number(shoppingQuantity.innerHTML);
      }
    });
  }

  shoppingBag();

  if (Number(shoppingQuantity.innerHTML) > 0) {
    shoppingQuantity.classList.remove("shopping-quantity-unvisible");
  }
  if (allProducts.length < 1) {
    shoppingQuantity.classList.add("shopping-quantity-unvisible");
  }

  pruductQuantity.innerHTML = 0;
}

function emptingBasket() {
  shoppingQuantity.innerHTML = 0;
  pruductQuantity.innerHTML = 0;

  addBasket();

  dialogTextEmpty.classList.remove("dialog-text-empty-unvisible");
  dialogTextEmpty.classList.add("dialog-text-empty");
  dialogText.classList.add("dialog-text-filled-unvisible");
}

function thumbnailImagesView(id) {
  const selectedProductImg = thumbnailImages.map((p) => {
    if (Number(id) === Number(p.id)) {
      return `
      <li>
        <button id="thumbnail-${p.id}" class="thumbnail-btn-all thumbnail-btn-selected" title="thumbnail image"><img id="thumbnail-img-${p.id}" class="thumbnail-img-lighter" src="${p.file}" alt="thumbnail-img-${p.id}"/> 
        </button> 
      </> 
    `;
    } else {
      return `
      <li>
        <button id="thumbnail-${p.id}" class="thumbnail-btn-all thumbnail-btn" title="thumbnail image"><img id="thumbnail-img-${p.id}" class="thumbnail-img" src="${p.file}" alt="thumbnail-img-${p.id}"/> 
        </button> 
      </> 
    `;
    }
  });
  const orderImagesHTML = selectedProductImg.join("");
  selectedProductImages.innerHTML = orderImagesHTML;
}

thumbnailImagesView(1);

selectedProductImages.addEventListener("click", function (event) {
  const button = event.target.closest("button");
  if (!button) return;

  const imgId = button.id.split("-")[1];

  if (imgId) {
    thumbnailImagesView(imgId);
    images.map((p) => {
      if (Number(imgId) === Number(p.id)) {
        carouselImg.src = p.file;
      }
    });
  }
});

/* Main modal open and close actions */
const mainModalImg = mainModal.querySelector("#modal-carousel-img");

carouselImg.addEventListener("click", function () {
  mainModalImg.src = carouselImg.src;

  images.map((p) => {
    if (mainModalImg.src.includes(p.file)) {
      console.log(p.id, "src");
      modalThumbnailImagesView(p.id);
    }
  });
  mainModal.showModal();

  document.getElementById("modal-arrows").classList.remove("arrows-unvisible");
});

document
  .getElementById("modal-close-btn")
  .addEventListener("click", function () {
    mainModal.close();
  });

/* Main modal actions */
const mainModalActions = mainModal.querySelector(
  "#modal-selected-product-images"
);

mainModalActions.addEventListener("click", function (event) {
  const button = event.target.closest("button");

  if (!button) return;

  const imgIdModal = button.id.split("-")[2];
  if (imgIdModal) {
    console.log(imgIdModal, "fff");
    modalThumbnailImagesView(imgIdModal);

    mainModalImg.src = `images/image-product-${imgIdModal}.jpg`;
  }
});

/* Main modal arrow actions */
const mainPreviousArrow = mainModal.querySelector("#modal-previous-arrow");
const mainNextArrow = mainModal.querySelector("#modal-next-arrow");

mainPreviousArrow.addEventListener("click", function (event) {
  const imgNow = mainModalImg.src;

  let imgIdPrev = 0;

  images.map((img) => {
    if (imgNow.includes(img.file)) {
      imgIdPrev = img.id;
    }
  });

  if (Number(imgIdPrev) === 1) {
    imgIdPrev = images.length;
  } else {
    imgIdPrev = Number(imgIdPrev) - 1;
  }

  modalThumbnailImagesView(imgIdPrev);

  changePreviousimage(imgNow, mainModalImg);
});

mainNextArrow.addEventListener("click", function () {
  const imgNow = mainModalImg.src;
  let imgIdNext = 0;

  images.map((img) => {
    if (imgNow.includes(img.file)) {
      imgIdNext = img.id;
    }
  });

  if (Number(imgIdNext) === images.length) {
    imgIdNext = 1;
  } else {
    imgIdNext = Number(imgIdNext) + 1;
  }

  modalThumbnailImagesView(imgIdNext);
  changeNextimage(imgNow, mainModalImg);
});

function modalThumbnailImagesView(id) {
  const selectedProductImg = thumbnailImages.map((p) => {
    if (Number(id) === Number(p.id)) {
      return `
      <li>
        <button id="modal-thumbnail-${p.id}" class="thumbnail-btn-all thumbnail-btn-selected" title="thumbnail image"><img id="modal-thumbnail-img-${p.id}" class="thumbnail-img-lighter" src="${p.file}" alt="thumbnail-img-${p.id}"/> 
        </button> 
      </> 
    `;
    } else {
      return `
      <li>
        <button id="modal-thumbnail-${p.id}" class="thumbnail-btn-all thumbnail-btn" title="thumbnail image"><img id="modal-thumbnail-img-${p.id}" class="thumbnail-img" src="${p.file}" alt="thumbnail-img-${p.id}"/> 
        </button> 
      </> 
    `;
    }
  });
  const orderImagesHTML = selectedProductImg.join("");
  modalSelectedProductImages.innerHTML = orderImagesHTML;
}

modalSelectedProductImages.addEventListener("click", function (event) {
  const button = event.target.closest("button");
  if (!button) return;

  const imgId = button.id.split("-")[2];

  if (imgId) {
    modalThumbnailImagesView(imgId);
    images.map((p) => {
      if (Number(imgId) === Number(p.id)) {
        modalCarouselImg.src = p.file;
      }
    });
  }
});
