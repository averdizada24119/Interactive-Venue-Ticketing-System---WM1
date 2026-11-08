//FUNCTIONS

function appendCategory(seat, cat){
  seat.dataset.category = cat;
  seat.addEventListener('click', function(e){
    category.textContent = `Category: ${cat}`;
  })
}

function appendPrice(seat, money){
  seat.dataset.price = money;
  seat.addEventListener('click', function(e){
    price.textContent = `Price: $${money}`;
  })
}

function appendRow(seat, currentRow){
  seat.addEventListener('click', function(e){
    row.textContent = `Row: ${currentRow}`
  })
}

function appendSeat(seat, currentColumn){
  seat.addEventListener('click', function(e){
    column.textContent = `Seat: ${currentColumn}`
  })
}

function appendSelect(seatButton, container, letter, currentRow, currentColumn){
  const id = `${letter}-${currentRow}-${currentColumn}`;
  seatButton.dataset.id = id;

  seatButton.addEventListener('click', function(){

    const prev = document.querySelector(".seat.inspected");
    if (prev) prev.classList.remove("inspected");
    seatButton.classList.add("inspected");

    selected = {
      id: id,
      category: container.dataset.category,
      price: Number(container.dataset.price),
      row: currentRow,
      column: currentColumn
    };
  });
}

let rowOffset = 0;

function createSeats(container, letter, rows, seatsPerRow) {
  for (let row = 1; row <= rows; row++) {
    const theatreRow = rowOffset + row;
    for (let seat = 1; seat <= seatsPerRow; seat++) {
      const seatButton = document.createElement("button");
      seatButton.classList.add("seat");
      seatButton.textContent = letter;

      appendRow(seatButton, theatreRow); //new
      appendSeat(seatButton, seat);
      appendSelect(seatButton, container, letter, theatreRow, seat);

      container.appendChild(seatButton);
    }

    container.appendChild(document.createElement("br"));
  }
  rowOffset += rows;
}

//SEAT EVENTS
function setUnavailable(id) {
  const btn = document.querySelector(`[data-id="${id}"]`);
  if (!btn) return;
  btn.disabled = true;
  btn.classList.remove("in-cart", "inspected");
  btn.classList.add("unavailable");
}

const purchaseBtn = document.getElementById("purchase-btn");

purchaseBtn.addEventListener("click", function () {
  if (cart.length === 0) return;

  cart.forEach(function (item) {
    purchased.push(item.id);
    setUnavailable(item.id);
  });
  try { localStorage.setItem("purchased", JSON.stringify(purchased)); } catch (e) {}

  cart = [];
  selected = null;
  category.textContent = "Category: ";
  price.textContent = "Price: ";
  row.textContent = "Row: ";
  column.textContent = "Seat: ";

  renderCart();
});

//SEAT DETAILS
const category = document.getElementById("category")
const price = document.getElementById("price");
const row = document.getElementById("row");
const column = document.getElementById("column")

//CART
let selected = null;
let cart = [];
const items=document.getElementById('items');
const total = document.getElementById("total");
const addBtn = document.getElementById("add-btn");

addBtn.addEventListener('click', function(){
  if (!selected) return;                              
  if (cart.some(item => item.id === selected.id)) return;

  cart.push(selected);
  markSeat(selected.id, true);
  renderCart();
});

function removeFromCart(id){
  cart = cart.filter(item => item.id !== id);
  markSeat(id, false);
  renderCart();
}

function markSeat(id, inCart){
  const btn = document.querySelector(`[data-id="${id}"]`);
  if (btn) btn.classList.toggle("in-cart", inCart);
}

function renderCart(){
  items.innerHTML = "";
  let sum = 0;

  cart.forEach(function(item){
    const block = document.createElement("div");
    block.classList.add("cart-item");
    block.innerHTML = `
      ${item.category} (${item.price}$) <br>
      [${item.row} - ${item.column}]
    `;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", function(){
      removeFromCart(item.id);
    });

    block.appendChild(removeBtn);
    items.appendChild(block);
    sum += item.price;
  });

  total.textContent = `$${sum}`;
  try { localStorage.setItem("cart", JSON.stringify(cart)); } catch (e) {};
}

//CREATION OF SEAT MAP
const seatP = document.getElementById("premium-seat");
appendCategory(seatP, 'Premium')
appendPrice(seatP, 120);
createSeats(seatP, 'P', 1, 10);


const seatV = document.getElementById("vip-seat");
appendCategory(seatV, 'VIP');
appendPrice(seatV, 85);
createSeats(seatV, 'V', 3, 15);

const seatS = document.getElementById("standard-seat");
appendCategory(seatS, 'Standard');
appendPrice(seatS, 60);
createSeats(seatS, 'S', 7, 20);

const seatB = document.getElementById("balcony-seat");
appendCategory(seatB, 'Balcony')
appendPrice(seatB, 35)
createSeats(seatB, 'B', 4, 18);

//UNAVAILABLE SEATS
const defaultUnavailable = ["P-1-3", "P-1-4", "V-2-7", "V-3-8", "V-4-12", "S-6-5", "S-8-14", "S-10-3", "B-13-9", "B-15-2"];

let purchased = [];
try {
  const savedPurchased = JSON.parse(localStorage.getItem("purchased"));
  if (Array.isArray(savedPurchased)) purchased = savedPurchased;
} catch (e) {}

defaultUnavailable.concat(purchased).forEach(setUnavailable);

try {
  const savedCart = JSON.parse(localStorage.getItem("cart"));
  if (Array.isArray(savedCart)) {
    cart = savedCart.filter(function (item) {
      return !defaultUnavailable.includes(item.id) && !purchased.includes(item.id);
    });
    cart.forEach(function (item) { markSeat(item.id, true); });
    renderCart();
  }
} catch (e) {
  cart = [];
}