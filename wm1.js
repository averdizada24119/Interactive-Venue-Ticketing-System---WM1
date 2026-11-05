const seatP = document.getElementById("premium-seat");
for (let seat = 1; seat <= 10; seat++) {
  const seatButton = document.createElement("button");
  seatButton.classList.add("seat");
  seatButton.textContent = 'P';
  seatP.appendChild(seatButton);
}

const seatV = document.getElementById("vip-seat");
for (let row=1; row <=3; row++){
for (let seat = 1; seat <= 15; seat++) {
  const seatButton = document.createElement("button");
  seatButton.classList.add("seat");
  seatButton.textContent = 'V';
  seatV.appendChild(seatButton);}
  seatV.appendChild(document.createElement("br"));
}

const seatS = document.getElementById("standard-seat");
for (let row=1; row <=7; row++){
for (let seat = 1; seat <= 20; seat++) {
  const seatButton = document.createElement("button");
  seatButton.classList.add("seat");
  seatButton.textContent = 'S';
  seatS.appendChild(seatButton);}
  seatS.appendChild(document.createElement("br"));
}

const seatB = document.getElementById("balcony-seat");
for (let row=1; row <=4; row++){
for (let seat = 1; seat <= 18; seat++) {
  const seatButton = document.createElement("button");
  seatButton.classList.add("seat");
  seatButton.textContent = 'B';
  seatB.appendChild(seatButton);}
  seatB.appendChild(document.createElement("br"));
}