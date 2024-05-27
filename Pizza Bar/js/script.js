// Prikaži/sakrij shopping menu s desne strane dodavanjem/brisanjem klase "active"
document.getElementById("shopping").addEventListener("click", () => {
  document.getElementById("shopping-side-menu").classList.toggle("active");
});

let counter = 0; // Inicijalno postavi brojač na nula
document.getElementById("shopping-count").innerText = counter;

// Funkcija koja inkrementira brojač
function incrementCount() {
  document.getElementById("shopping-count").innerText = ++counter;
}

// Funkcija koja računa koliko ima elemenata u košarici
function calculateCount() {
  let totalCount = 0;
  const itemsInShop = document.querySelectorAll(".shopping-item");
  for (let i = 0; i < itemsInShop.length; i++) {
    const item = itemsInShop[i];
    const amount = item.querySelector(".amount").textContent;
    totalCount += parseInt(amount);
  }
  console.log("totalCount:", totalCount);
  document.getElementById("shopping-count").innerText = totalCount;
}

// Dodaj klik "slušač" na crvene button-e za narudžbe pizza
const buttons = document.querySelectorAll("#pizze button.red");
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", onOrderButtonClick);
}

// Poziva se na klik crvenog button-a
function onOrderButtonClick(event) {
  const clickedButtonElement = event.currentTarget; // Dohvaćanje kliknutog elementa
  const articleElement = clickedButtonElement.parentElement; // Dohvati "roditelj element" od kliknutnog elementa

  const pizzaName = articleElement.querySelector("h3").innerText;
  const pizzaPrice = articleElement.querySelector("small em").innerText;

  // Zadatak 2
  const pizzaInShop = document.getElementById(pizzaName.toLowerCase());
  console.log("is there ?", pizzaInShop);
  if (pizzaInShop) {
    const amountElement = pizzaInShop.querySelector(".amount");
    let amountNumber = parseInt(amountElement.textContent);
    amountElement.innerText = ++amountNumber;
  } else {
    createShopItem(pizzaName, pizzaPrice); // Dodaj pizzu u košaricu
  }
  incrementCount(); // Uvećaj brojač

  calculateCount();

  calculateTotalPrice();
}

// Funkcija koja kreira pizza "karticu" u košarici prema imenu i cijeni pizze
function createShopItem(name, price) {
  const shopItem = document.createElement("article"); // Prvo kreiraj prazan element: <article></article>
  shopItem.classList.add("shopping-item"); // Dodaj mu klasu: <article class="shopping-item"></article>

  // Zadatak 1
  shopItem.id = name.toLowerCase();

  // Ubaci u <article> element ostale HTML elemente
  shopItem.innerHTML = `
    <i class="fas fa-times close"></i>
    <h3>${name}</h3>
    <div class="item-info">
      <small>Cijena:</small>
      <strong class="price">${price}</strong>
    </div>
    <div class="item-info">
      <small>Količina:</small>
      <div class="amount-box">
        <button class="minus" disabled><i class="fas fa-minus"></i></button>
        <strong class="amount">1</strong>
        <button class="plus"><i class="fas fa-plus"></i></button>
      </div>
    </div>`;

  // Dodaj novokreirani <article> element (sa svim svojim sadržajem) unutar "#shopping-items" elementa
  document.getElementById("shopping-items").append(shopItem);

  // Zadatak 4
  shopItem.querySelector(".close").addEventListener("click", onDeleteItem);

  // Zadatak 5
  shopItem.querySelector(".plus").addEventListener("click", onPlusClick);

  // Zadatak 6
  shopItem.querySelector(".minus").addEventListener("click", onMinusClick);
}

// Zadatak 3
function calculateTotalPrice() {
  let totalPrice = 0;
  const itemsInShop = document.querySelectorAll(".shopping-item");
  for (let i = 0; i < itemsInShop.length; i++) {
    const item = itemsInShop[i];

    // Dohvati koloćinu i cijenu te ih pomnoži
    const amount = item.querySelector(".amount").textContent;
    const price = item.querySelector(".price").textContent;
    const onlyPrice = price.split(" ")[0];

    //console.log("amount:", amount);
    //console.log("price:", price);
    //console.log("onlyPrice:", onlyPrice);

    const umnozak = parseInt(amount) * parseFloat(onlyPrice);
    //console.log("umnozak: ", umnozak);

    totalPrice += umnozak;
  }
  document.querySelector("#total-price strong").innerText =
    totalPrice.toFixed(2) + " kn";

  // Minus button
  const minusButton = document.querySelectorAll(".minus");
  for (let i = 0; i < minusButton.length; i++) {
    const minusButtonParent = minusButton[i].parentElement;
    const tempValue = minusButtonParent.querySelector(".amount").textContent;

    const tempValueInt = parseInt(tempValue);
    if (tempValue > 1) {
      minusButton[i].disabled = false;
    }
    else {
      minusButton[i].disabled = true;
    }
  }
}

// Zadatak 4
function onDeleteItem(event) {
  const clickedX = event.currentTarget;
  const item = clickedX.parentElement;
  item.remove();

  calculateTotalPrice(); // Ponovno računa ukupnu cijenu
  calculateCount(); // Ponovno postavlja brojač
}

// Zadatak 5
function onPlusClick(event) {
  let clickedPlus = event.currentTarget;
  let amountBox = clickedPlus.parentElement;

  if (clickedPlus) {
    let vrijednost = amountBox.querySelector(".amount").textContent;
    ++vrijednost;
    amountBox.querySelector(".amount").textContent = vrijednost;
  }

  calculateTotalPrice(); // Ponovno računa ukupnu cijenu
  calculateCount(); // Ponovno postavlja brojač
}

// Zadatak 6
function onMinusClick(event) {
  const clickedMinus = event.currentTarget;
  const amountBox = clickedMinus.parentElement;
  const tempValue = amountBox.querySelector(".amount");

  let amountNumber = parseInt(tempValue.textContent);
  tempValue.innerText = --amountNumber;

  calculateTotalPrice(); // Ponovno računa ukupnu cijenu
  calculateCount(); // Ponovno postavlja brojač
}