let availableSeats = 12;

function checkRegistration() {
  let message = document.getElementById("registrationStatus");
  message.textContent = "Registration is currently open.";
}

function checkSeats() {
  let message = document.getElementById("seatMessage");

  if (availableSeats > 0) {
    message.textContent =
      "Seats are available. Remaining seats: " + availableSeats;
  } else {
    message.textContent = "Sorry, no seats are available.";
  }
}

function showGreeting() {
  let name = document.getElementById("studentName").value;
  let output = document.getElementById("greetingMessage");

  if (name === "") {
    output.textContent = "Please enter your full name first.";
    return;
  }

  output.textContent = "Welcome, " + name + "!";
}

function showVenue() {
  let message = document.getElementById("venueMessage");
  message.textContent =
    "Venue: Department Auditorium and Computer Lab, Southeast University, Tejgaon, Dhaka.";
}



function submitRegistration() {
  // Read required form values.
  let name = document.getElementById("studentName").value;
  let studentId = document.getElementById("studentId").value;
  let email = document.getElementById("studentEmail").value;
  let workshop = document.getElementById("workshop").value;
  let message = document.getElementById("formMessage");

  
  if (name === "") {
    message.textContent = "Please enter your full name.";
    return;
  }

  
  if (studentId === "") {
    message.textContent = "Please enter your student ID.";
    return;
  }

  
  if (email === "") {
    message.textContent = "Please enter your email address.";
    return;
  }

  
  if (workshop === "") {
    message.textContent = "Please select a workshop.";
    return;
  }

  
  let registration = {
    name: name,
    studentId: studentId,
    email: email,
    workshop: workshop
  };

 
  let jsonData = JSON.stringify(registration);

 
  localStorage.setItem("registration", jsonData);

 
  document.getElementById("jsonOutput").textContent = jsonData;

 
  message.textContent = "Registration saved successfully.";
}


function showSavedRegistration() {
  let savedData = localStorage.getItem("registration");
  let output = document.getElementById("savedMessage");

  if (savedData === null) {
    output.textContent = "No saved registration was found.";
    return;
  }

  let registration = JSON.parse(savedData);

  output.textContent =
    registration.name +
    " (ID: " +
    registration.studentId +
    ") registered for " +
    registration.workshop +
    ".";
  document.getElementById("jsonOutput").textContent = savedData;
}


function clearRegistration() {
  localStorage.removeItem("registration");

  document.getElementById("jsonOutput").textContent =
    "No registration saved yet.";

  document.getElementById("savedMessage").textContent =
    "Saved registration cleared.";

  document.getElementById("formMessage").textContent = "";
}
