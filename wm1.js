//FUNCTIONS
function appendCategory(seat, cat){
  seat.addEventListener('click', function(e){
    category.textContent = `Category: ${cat}`;
  })
}

function appendPrice(seat, money){
  seat.addEventListener('click', function(e){
    price.textContent = `Price: $${money}`;
  })
}

function createSeats(container, letter, rows, seatsPerRow) {
  for (let row = 1; row <= rows; row++) {
    for (let seat = 1; seat <= seatsPerRow; seat++) {
      const seatButton = document.createElement("button");
      seatButton.classList.add("seat");
      seatButton.textContent = letter;
      container.appendChild(seatButton);
    }

    container.appendChild(document.createElement("br"));
  }
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

//SEAT DETAILS
const category = document.getElementById("category")
const price = document.getElementById("price");
const row = document.getElementById("row");
const seat = document.getElementById("column")

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