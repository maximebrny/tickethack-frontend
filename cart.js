const BACKEND_URL = "http://localhost:3000";

fetch("http://localhost:3000/bookings")
  .then((response) => response.json())
  .then((bookings) => {
    bookings.forEach((booking) => {
      const li = document.createElement("li");
      li.setAttribute("class", "litrips");
      li.textContent = `${booking.trip.departure} > ${
        booking.trip.arrival
      } ${moment(booking.trip.time).format("LT")} ${booking.trip.price}€`;
      // Button to delete a booking
      const deleteBtn = document.createElement("button");
      deleteBtn.setAttribute("class", "deleteBtn");
      deleteBtn.textContent = "X";
      deleteBtn.addEventListener("click", () => deleteBooking(booking._id));
      li.appendChild(deleteBtn);
      document.querySelector("#cart").appendChild(li);
    });
  });

// Delete booking function
function deleteBooking(id) {
  fetch(`${BACKEND_URL}/bookings/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message === "Booking deleted successfully") {
        // Remove the booking's li element from the cart
        const bookingLi = document.querySelector(`li[data-booking-id="${id}"]`);
        bookingLi.parentNode.removeChild(bookingLi);
        // Update the total price
        updateTotalPrice();
      }
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
