//FUNCTIONS
function appendCategory(seat, cat){
  seat.dataset.category = cat;          // new
  seat.addEventListener('click', function(e){
    category.textContent = `Category: ${cat}`;
  })
}

function appendPrice(seat, money){
  seat.dataset.price = money;           // new
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
    selected = {
      id: id,
      category: container.dataset.category,
      price: Number(container.dataset.price),
      row: currentRow,
      column: currentColumn
    };
  });
}

function createSeats(container, letter, rows, seatsPerRow) {
  for (let row = 1; row <= rows; row++) {
    for (let seat = 1; seat <= seatsPerRow; seat++) {
      const seatButton = document.createElement("button");
      seatButton.classList.add("seat");
      seatButton.textContent = letter;

      appendRow(seatButton, row);
      appendSeat(seatButton, seat);
      appendSelect(seatButton, container, letter, row, seat);   // new

      container.appendChild(seatButton);
    }

    container.appendChild(document.createElement("br"));
  }
}

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
  if (!selected) return;                                  // nothing inspected yet
  if (cart.some(item => item.id === selected.id)) return; // already in cart

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
      ${item.category} (${item.price}$)
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