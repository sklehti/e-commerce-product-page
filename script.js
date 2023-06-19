const toggleMenu = document.getElementById("toggle-menu");
const closeButton = document.getElementById("close-button");
const elements = document.getElementsByClassName("nav-titles");
const emptyBasket = document.getElementById("empty-basket");
const shoppingCart = document.getElementById("shopping-cart");
const carouselImg = document.getElementById("carousel-img");
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

// img variables
const images = [
  "images/image-product-1.jpg",
  "images/image-product-2.jpg",
  "images/image-product-3.jpg",
  "images/image-product-4.jpg",
];

let allProducts = [];

previousArrow.addEventListener("click", function () {
  const imgNow = carouselImg.src;

  changePreviousimage(imgNow);
});

nextArrow.addEventListener("click", function () {
  const imgNow = carouselImg.src;

  changeNextimage(imgNow);
});

/**
 * carousel show previous image
 */
function changePreviousimage(imgNow) {
  const relativeFileAddress = imgNow.split("images")[1];

  for (i = images.length - 1; i >= 0; i--) {
    const activeImg = images[i].includes(relativeFileAddress);

    if (activeImg) {
      if (i === 0) {
        i = images.length;
      }
      carouselImg.src = images[i - 1];

      break;
    }
  }
}

/**
 * carousel show next image
 */
function changeNextimage(imgNow) {
  const relativeFileAddress = imgNow.split("images")[1];

  for (i = 0; i < images.length; i++) {
    const activeImg = images[i].includes(relativeFileAddress);

    if (activeImg) {
      if (i === images.length - 1) {
        i = -1;
      }

      carouselImg.src = images[i + 1];

      break;
    }
  }
}

toggleMenu.addEventListener("click", function () {
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.remove("nav-titles-unvisible");
    elements[i].classList.add("nav-titles");
  }
});

closeButton.addEventListener("click", function () {
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.add("nav-titles-unvisible");
  }
});

// document.getElementById("close-button").addEventListener("click", function () {
//   for (var i = 0; i < elements.length; i++) {
//     elements[i].classList.add("nav-titles-unvisible");
//   }
// });

function alertInfo() {
  alert("Coming later...");
}

/**
 * modal actions
 */
const myDialog = emptyBasket;

shoppingCart.addEventListener("click", function () {
  // if (Number(pruductQuantity.innerHTML) > 0) {
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
    // shoppingQuantity.innerHTML = Number(shoppingQuantity.innerHTML) - 1;

    // const productExist = allProducts.some((p) => p.name === title.innerHTML);
    // let priceNow = price.innerHTML.split("<")[0];
    // priceNow = priceNow.trim();

    // let index = 0;

    // if (productExist) {
    //   allProducts.forEach((p) => {
    //     if (p.name === title.innerHTML) {
    //       if (p.quantity === 1) {
    //         allProducts.splice(index, 1);
    //       } else {
    //         p.quantity = p.quantity - 1;
    //       }
    //     }
    //     index++;
    //   });
    // }
    // shoppingBag();
  }
});

plusBtn.addEventListener("click", function () {
  pruductQuantity.innerHTML = Number(pruductQuantity.innerHTML) + 1;
  // shoppingQuantity.innerHTML = Number(shoppingQuantity.innerHTML) + 1;

  // const productExist = allProducts.some((p) => p.name === title.innerHTML);
  // let priceNow = price.innerHTML.split("<")[0];
  // priceNow = priceNow.trim();

  // const basketImg = carouselImg.src.split("images")[1];
  // console.log(basketImg);

  // if (!productExist) {
  //   allProducts = [
  //     ...allProducts,
  //     {
  //       img: basketImg,
  //       name: title.innerHTML,
  //       price: priceNow,
  //       quantity: 1,
  //     },
  //   ];
  // } else {
  //   allProducts.forEach((p) => {
  //     if (p.name === title.innerHTML) {
  //       p.quantity = p.quantity + 1;
  //     }
  //   });
  // }

  // shoppingBag();
});

function shoppingBag() {
  const orderProductsList = allProducts.map((p) => {
    return `<li id="dialog-text-filled">
              <div class="basket-text" >
                  <img class="basket-img"  src=images/${
                    p.img
                  } alt="product image"/>
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
                <img src=${"images/icon-delete.svg"} alt="delete item"/>
              </div>
            </li>`;
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

  const basketImg = carouselImg.src.split("images")[1];

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
