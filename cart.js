const BACKEND_URL = "http://localhost:3000";

fetch("http://localhost:3000/bookings")
  .then((response) => response.json())
  .then((booking) => {
    booking.forEach((booking) => {
      const li = document.createElement("li");
      li.setAttribute("class", "litrips");
      li.textContent = `${booking.departure} > ${booking.arrival} ${moment(
        booking.time
      ).format("LT")} ${booking.price}€`;
      // Button to book a trip, add the trip in the cart
      const deleteBtn = document.createElement("button");
      deleteBtn.setAttribute("class", "deleteBtn");
      deleteBtn.textContent = "X";
    });
    li.appendChild(deleteBtn);
    document.querySelector("#cart").appendChild(li);
    updateDeleteTripListener();
  });

function updateDeleteTripListener() {
  for (let i = 0; i < document.querySelectorAll(".deleteBtn").length; i++) {
    document
      .querySelectorAll(".deleteBtn")
      [i].addEventListener("click", function deleteBooking(id) {
        fetch(`${BACKEND_URL}/bookings/${id}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.result) {
              this.parentNode.remove();
            }
          });
      });
  }
}

//Button "Delete"
const removeBtn = document.createElement("button");
removeBtn.textContent = "Remove";
//AddEventListener au button delete
removeBtn.addEventListener("click", function () {
  //Delete button
  deleteBooking(booking._id);
});
li.appendChild(removeBtn);
document.querySelector("#cart").appendChild(li);

// Delete booking function
function deleteBooking(id) {
  fetch(`${BACKEND_URL}/bookings/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      // Remove the trip from the cart
      removeTripFromCart(trip);
    })
    .catch((error) => console.log(error));
}

function updateTotalPrice() {
  let totalPrice = 0;
  cart.forEach((trip) => {
    totalPrice += trip.price;
  });
  document.querySelector("#totalPrice").innerHTML = totalPrice;
}
