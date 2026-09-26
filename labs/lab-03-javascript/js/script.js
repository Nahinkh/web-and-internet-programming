let availableSeats = 12;


// --------------------------------------------------
// Registration Status
// --------------------------------------------------

function checkRegistration() {
  let message = document.getElementById("registrationStatus");

  message.textContent = "Registration is currently open.";
  console.log(message.textContent)
}


// --------------------------------------------------
//  Seat Availability
// --------------------------------------------------

function checkSeats() {
  let message = document.getElementById("seatMessage");

  if (availableSeats > 0) {
    message.textContent =
      "Seats are available. Remaining seats: " + availableSeats;
      console.log(message.textContent)
  } else {
    message.textContent = "Sorry, no seats are available.";
  }
}


// --------------------------------------------------
// Personalized Greeting
// --------------------------------------------------

function showGreeting() {
  let name = document.getElementById("studentName").value;

  let output = document.getElementById("greetingMessage");

  console.log(name);

  output.textContent = "Welcome, " + name + "!";
  console.log(output.textContent)
}


// --------------------------------------------------
// Show Venue
// --------------------------------------------------

function showVenue() {
  let message = document.getElementById("venueMessage");

  message.textContent =
    "Venue: Department Auditorium and Computer Lab, Southeast University, Tejgaon, Dhaka.";
}