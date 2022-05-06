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

btnHamburger.addEventListener("click", onHamburgerClick);
btnMenuClose.addEventListener("click", onBtnMenuCloseClick);

btnCart.addEventListener("click", openCart);

btnPlus.addEventListener("click", productCounterPlus);
btnMinus.addEventListener("click", productCounterMinus);

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
