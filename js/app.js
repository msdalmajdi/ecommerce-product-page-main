const menu = document.querySelector(".menu");
const btnHamburger = document.querySelector(".hamburger");
const btnMenuClose = document.querySelector("#btnMenuClose");

btnHamburger.addEventListener("click", onHamburgerClick);
btnMenuClose.addEventListener("click", onBtnMenuCloseClick);

function onHamburgerClick() {
  menu.classList.remove("hidden");
}

function onBtnMenuCloseClick() {
  menu.classList.add("hidden");
}
