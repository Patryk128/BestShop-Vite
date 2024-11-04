function makeBurger() {
  const btn = document.querySelector(".burger");
  const body = document.querySelector("body");

  btn.onclick = () => {
    body.classList.toggle("show-menu");
  };
}

makeBurger();

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const productsInput = $("#products");
const ordersInput = $("#orders");
const packageSelect = $(".select__input");
const selectDropdown = $(".select__dropdown");
const accountingCheckbox = $("#accounting");
const terminalCheckbox = document.querySelector("#terminal");

const products = $('.list__item[data-id="products"]');
const orders = $('.list__item[data-id="orders"]');
const accounting = $('[data-id="accounting"]');
const terminal = $('[data-id="terminal"]');
const packageName = $('[data-id="package"]');

const totalPriceEl = $(".total__price");

let selectedPackage = "";

function handleOpen() {
  selectDropdown.classList.toggle("open");
}

function handleDocument(event) {
  if (!packageSelect.contains(event.target)) {
    selectDropdown.classList.remove("open");
  }
}

function handleDropdown(event) {
  const selectedElement = event.target;
  if (selectedElement.tagName.toUpperCase() === "LI") {
    selectedPackage = selectedElement.getAttribute("data-value");
    packageSelect.innerText = selectedElement.innerText;
    const packagePrice = +selectedElement.getAttribute("data-price");
    packageName.setAttribute("data-price", packagePrice);
    selectDropdown.classList.remove("open");
    updatePrice();
  }
}

function updatePrice() {
  let totalPrice = 0;

  const productsQty = +productsInput.value;
  const productsPrice = +productsInput.getAttribute("data-price");
  const productsCost = productsQty * productsPrice;

  products.querySelector(
    ".item__calc"
  ).innerText = `${productsQty} * $${productsPrice}`;
  products.querySelector(".item__price").innerText = `$${productsCost}`;
  totalPrice += productsCost;

  const ordersQty = +ordersInput.value;
  const ordersPrice = +ordersInput.getAttribute("data-price");
  const ordersCost = ordersQty * ordersPrice;

  orders.querySelector(
    ".item__calc"
  ).innerText = `${ordersQty} * $${ordersPrice}`;
  orders.querySelector(".item__price").innerText = `$${ordersCost}`;
  totalPrice += ordersCost;

  const packageSinglePrice = +packageName.getAttribute("data-price");

  packageName.querySelector(".item__calc").innerText = packageSelect.innerText;
  packageName.querySelector(
    ".item__price"
  ).innerText = `$${packageSinglePrice}`;
  totalPrice += packageSinglePrice;

  let accountingPrice;
  if (accountingCheckbox.checked) {
    accountingPrice = +accountingCheckbox.getAttribute("data-price");
  } else {
    accountingPrice = 0;
  }
  accounting.querySelector(".item__price").innerText = `$${accountingPrice}`;
  totalPrice += accountingPrice;

  let terminalPrice;
  if (terminalCheckbox.checked) {
    terminalPrice = +terminalCheckbox.getAttribute("data-price");
  } else {
    terminalPrice = 0;
  }
  terminal.querySelector(".item__price").innerText = `$${terminalPrice}`;
  totalPrice += terminalPrice;

  totalPriceEl.innerText = "$" + totalPrice.toFixed(2);
}

selectDropdown.addEventListener("click", handleDropdown);
packageSelect.addEventListener("click", handleOpen);
productsInput.addEventListener("input", updatePrice);
ordersInput.addEventListener("input", updatePrice);
accountingCheckbox.addEventListener("change", updatePrice);
terminalCheckbox.addEventListener("change", updatePrice);
document.addEventListener("click", handleDocument);
