// Tableau vide du panier
let cart = [];

document.querySelector("#btnSearch").addEventListener("click", function () {
  const departure = document.querySelector("#departureInput").value;
  const arrival = document.querySelector("#arrivalInput").value;
  const date = document.querySelector("#dateInput").value;

  // Fetch the routes of the match with criteres and req.query
  fetch(`/trips/match?departure=${departure}&arrival=${arrival}&date=${date}`)
    .then((res) => res.json())
    .then((trips) => {
      document.querySelector("#resultsBox").innerHTML = "";

      trips.forEach((trip) => {
        const li = document.createElement("li");
        li.textContent = `${trip.departure} > ${trip.arrival} ${moment(
          trip.time
        ).format("LT")} ${trip.price}`;
        // Button to book a trip, add the trip in the cart
        const bookBtn = document.createElement("button");
        bookBtn.textContent = "Book";
        bookBtn.addEventListener("click", function () {
          addTripToCart(trip);
        });
        li.appendChild(bookBtn);
        document.querySelector("#resultsBox").appendChild(li);
      });
    })
    .catch((error) => console.log(error));
});

// Ajout des trips au panier (cart)
cart.forEach((trip) => {
  const li = document.createElement("li");
  li.textContent = `${trip.departure} to ${trip.arrival} at ${moment(
    trip.time
  ).format("LT")} for ${trip.price}`;
  // Button "Delete"
  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  // AddEventListener au button delete
  removeBtn.addEventListener("click", function () {
    // Delete button
    removeTripFromCart(trip);
  });
  li.appendChild(removeBtn);
  document.querySelector("#cart").appendChild(li);
});

// Update bookings
// function updateBookings() {
// Code to change "isPaid" to true for all bookings in the cart
// ...
// }

// Delete trip
function removeTripFromCart(trip) {
  // Chercher l'index du trip dans le cart array
  const index = cart.indexOf(trip);
  // Remove trip du cart array
  cart.splice(index, 1);
  // Remove booking de la collection "bookings"
  removeBooking(trip);
  // Update cart display
  updateCartDisplay();
}

// Remove booking from "bookings" collection
// function removeBooking(trip) {
// Code to remove booking from "bookings" collection
// ...
// }
