const menu = document.querySelector(".menu");
const btnHamburger = document.querySelector(".hamburger");
const btnMenuClose = document.querySelector("#btnMenuClose");

const cart = document.querySelector(".cart");
const btnCart = document.querySelector(".btnCart");

const btnPlus = document.querySelector("#btnPlus");
const btnMinus = document.querySelector("#btnMinus");
const productCounter = document.querySelector(".counter");
let productCounterValue = 1;

const gallery = document.querySelectorAll(".pic");
const heroImage = document.querySelector(".product-hero");

const btnNext = document.querySelector(".next");
const btnPrevious = document.querySelector(".previous");

const btnAddToCart = document.querySelector(".btn");
const cartCount = document.querySelector(".cart-count");
const productsinShoppingCart = document.querySelector(".products-in-cart");
let productsInCart = 0;
const msgEmpty = document.querySelector(".msg-empty");
const checkOut = document.querySelector(".checkout");

const carousel = document.querySelector(".carousel");
const lightBox = document.querySelector(".lightbox");

let lightBoxGallery;
let lightBoxHero;

btnHamburger.addEventListener("click", onHamburgerClick);
btnMenuClose.addEventListener("click", onBtnMenuCloseClick);

btnCart.addEventListener("click", openCart);

btnPlus.addEventListener("click", productCounterPlus);
btnMinus.addEventListener("click", productCounterMinus);

btnAddToCart.addEventListener("click", addToCart);

heroImage.addEventListener("click", onHeroImageClick);

gallery.forEach((img) => {
  img.addEventListener("click", onThumbClick);
});

btnNext.addEventListener("click", nextBtn);
btnPrevious.addEventListener("click", previousBtn);

function onHamburgerClick() {
  menu.classList.remove("hidden");
}

function onBtnMenuCloseClick() {
  menu.classList.add("hidden");
}

function openCart() {
  cart.classList.toggle("hidden");
}

function productCounterPlus() {
  setProductCounter(1);
}
function productCounterMinus() {
  setProductCounter(-1);
}

function setProductCounter(value) {
  if (productCounterValue + value > 0) {
    productCounterValue += value;
    productCounter.innerHTML = productCounterValue;
  }
}

function onThumbClick(event) {
  gallery.forEach((img) => {
    img.classList.remove("active");
  });

  event.target.parentElement.classList.add("active");
  heroImage.src = event.target.src.replace("-thumbnail", "");
}

function nextBtn() {
  let imgIndex = getCurrentImageIndex();
  imgIndex++;
  if (imgIndex > 4) {
    imgIndex = 1;
  }
  setHeroImage(imgIndex);
}

function previousBtn() {
  let imgIndex = getCurrentImageIndex();
  imgIndex--;
  if (imgIndex < 1) {
    imgIndex = 4;
  }
  setHeroImage(imgIndex);
}

function getCurrentImageIndex() {
  const imageIndex = +heroImage.src
    .split("\\")
    .pop()
    .split("/")
    .pop()
    .replace(".jpg", "")
    .replace("image-product-", "");
  return imageIndex;
}

function setHeroImage(imageIndex) {
  heroImage.src = `./images/image-product-${imageIndex}.jpg`;

  gallery.forEach((img) => {
    img.classList.remove("active");
  });

  gallery[imageIndex - 1].classList.add("active");
}

function addToCart() {
  productsInCart += productCounterValue;

  const productHTMLElement = `
            <div class="item">
              <img class="product-img" src="./images/image-product-1-thumbnail.jpg" alt="thumbnail 1">
              <div class="details">
                <div class="product-name">Autumn Limited Edition...</div>
                <div class="price-group">
                  <div class="price">$125.00</div> x
                  <div class="count">${productsInCart}</div>
                  <div class="total-amount">$${(productsInCart * 125.0).toFixed(
                    2
                  )}</div>
                </div>
              </div>
              <img id="btnDelete" src="./images/icon-delete.svg" alt="delete">
            </div>
  
  `;

  productsinShoppingCart.innerHTML = productHTMLElement;
  updateCart();

  const btnDelete = document.querySelector("#btnDelete");
  btnDelete.addEventListener("click", onBtnDeleteClick);
}

function updateCart() {
  updateCartIcon();
  updateMsgEmpty();
  updateCheckOutButton();
}

function updateCartIcon() {
  cartCount.textContent = productsInCart;
  if (productsInCart == 0) {
    if (!cartCount.classList.contains("hidden")) {
      cartCount.classList.add("hidden");
    }
  } else {
    cartCount.classList.remove("hidden");
  }
}

function updateMsgEmpty() {
  if (productsInCart == 0) {
    if (msgEmpty.classList.contains("hidden")) {
      msgEmpty.classList.remove("hidden");
    }
  } else {
    if (!msgEmpty.classList.contains("hidden")) {
      msgEmpty.classList.add("hidden");
    }
  }
}

function updateCheckOutButton() {
  if (productsInCart == 0) {
    if (!checkOut.classList.contains("hidden")) {
      checkOut.classList.add("hidden");
    }
  } else {
    checkOut.classList.remove("hidden");
  }
}

function onBtnDeleteClick() {
  productsInCart--;
  updateCart();

  const counterInCart = document.querySelector(".count");
  const itemsInCart = document.querySelector(".total-amount");

  counterInCart.innerHTML = productsInCart;
  itemsInCart.innerHTML = `$${(125.0 * productsInCart).toFixed(2)}`;

  if (productsInCart == 0) {
    productsinShoppingCart.innerHTML = "";
  }
}

function onHeroImageClick() {
  if (window.innerWidth >= 1440) {
    if (carousel.childElementCount == 1) {
      const newNode = lightBox.cloneNode(true);
      carousel.appendChild(newNode);

      const carouselCloser = document.querySelector("#btnCarouselCloser");
      carouselCloser.addEventListener("click", onCarouselCloserClick);

      lightBoxGallery = carousel.querySelectorAll(".pic");
      lightBoxHero = carousel.querySelector(".product-hero");
      lightBoxGallery.forEach((img) => {
        img.addEventListener("click", onThumbClickLightBox);
      });

      const btnCarouselNext = carousel.querySelector(".next");
      const btnCarouselPrevious = carousel.querySelector(".previous");

      btnCarouselNext.addEventListener("click", nextBtnCarousel);
      btnCarouselPrevious.addEventListener("click", previousBtnCarousel);
    }

    carousel.classList.remove("hidden");
  }
}

function onCarouselCloserClick() {
  carousel.classList.add("hidden");
}

function onThumbClickLightBox(event) {
  lightBoxGallery.forEach((img) => {
    img.classList.remove("active");
  });

  event.target.parentElement.classList.add("active");
  lightBoxHero.src = event.target.src.replace("-thumbnail", "");
}

function nextBtnCarousel() {
  let imgIndex = getCurrentCarouselImageIndex();
  imgIndex++;
  if (imgIndex > 4) {
    imgIndex = 1;
  }
  setCarouselHeroImage(imgIndex);
}

function previousBtnCarousel() {
  let imgIndex = getCurrentCarouselImageIndex();
  imgIndex--;
  if (imgIndex < 1) {
    imgIndex = 4;
  }
  setCarouselHeroImage(imgIndex);
}

function getCurrentCarouselImageIndex() {
  const imageIndex = +lightBoxHero.src
    .split("\\")
    .pop()
    .split("/")
    .pop()
    .replace(".jpg", "")
    .replace("image-product-", "");
  return imageIndex;
}

function setCarouselHeroImage(imageIndex) {
  lightBoxHero.src = `./images/image-product-${imageIndex}.jpg`;

  lightBoxGallery.forEach((img) => {
    img.classList.remove("active");
  });

  lightBoxGallery[imageIndex - 1].classList.add("active");
}
