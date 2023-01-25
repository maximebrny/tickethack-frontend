const BACKEND_URL = "http://localhost:3000";

document.querySelector("#btnSearch").addEventListener("click", function () {
  const departure = document.querySelector("#departureInput").value;
  const arrival = document.querySelector("#arrivalInput").value;
  const date = document.querySelector("#dateInput").value;

  if (!departure || !arrival || !date) {
    return res.json({ error: "Missing required fields" });
  }

  // Fetch the routes of the match with criteres and req.query
  fetch(
    `${BACKEND_URL}/trips/match?departure=${departure}&arrival=${arrival}&date=${date}`
  )
    .then((res) => res.json())
    .then((trips) => {
      document.querySelector("#resultsBox").innerHTML = "";

      trips.forEach((trip) => {
        const li = document.createElement("li");
        li.setAttribute("class", "litrips");
        li.textContent = `${trip.departure} > ${trip.arrival} ${moment(
          trip.time
        ).format("LT")} ${trip.price}€`;
        // Button to book a trip, add the trip in the cart
        const bookBtn = document.createElement("button");
        bookBtn.setAttribute("class", "bookbtn");
        bookBtn.textContent = "Book";
        bookBtn.addEventListener("click", function () {
          // Use fetch to send a POST request to the server to create a new booking
          fetch(`${BACKEND_URL}/bookings/new`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ trip }),
          })
            .then((res) => res.json())
            .then((booking) => {
              console.log("Booking created:", booking);
            })
            .catch((error) => console.log(error));
        });
        li.appendChild(bookBtn);
        document.querySelector("#resultsBox").appendChild(li);
      });
    })
    .catch((error) => console.log(error));
});
