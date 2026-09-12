
document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const form = document.getElementById("registrationForm");
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toastMessage");

  // Sticky navbar state
  const updateNavbar = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 12);
  };

  updateNavbar();
  window.addEventListener("scroll", updateNavbar, { passive: true });

  // Mobile navigation
  const closeMenu = () => {
    mobileMenu.classList.remove("open");
    document.body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
  };

  menuToggle.setAttribute("aria-expanded", "false");

  menuToggle.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("open");
    document.body.classList.toggle("menu-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Scroll reveal animation
  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observerInstance.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("visible"));
  }

  // Registration form validation
  const fields = {
    fullname: {
      input: document.getElementById("fullname"),
      error: document.getElementById("fullnameError"),
      validate: (value) => value.trim().length >= 2
    },
    studentid: {
      input: document.getElementById("studentid"),
      error: document.getElementById("studentidError"),
      validate: (value) => /^\d+$/.test(value.trim())
    },
    email: {
      input: document.getElementById("email"),
      error: document.getElementById("emailError"),
      validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
    }
  };

  const setFieldState = (field, valid) => {
    field.input.classList.toggle("invalid", !valid);
    field.error.classList.toggle("show", !valid);
  };

  Object.values(fields).forEach((field) => {
    field.input.addEventListener("blur", () => {
      setFieldState(field, field.validate(field.input.value));
    });

    field.input.addEventListener("input", () => {
      if (field.input.classList.contains("invalid")) {
        setFieldState(field, field.validate(field.input.value));
      }
    });
  });

  // Set a sensible minimum date for the optional date field.
  const dateInput = document.getElementById("date");
  if (dateInput) {
    const today = new Date();
    const localDate = new Date(
      today.getTime() - today.getTimezoneOffset() * 60000
    )
      .toISOString()
      .split("T")[0];

    dateInput.min = localDate;
  }

  // Form submission
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let valid = true;

    Object.values(fields).forEach((field) => {
      const fieldValid = field.validate(field.input.value);
      setFieldState(field, fieldValid);

      if (!fieldValid) {
        valid = false;
      }
    });

    if (!valid) {
      const firstInvalid = document.querySelector(".form-input.invalid");
      firstInvalid?.focus();
      return;
    }

    const formData = new FormData(form);
    const interests = formData.getAll("interest_webdev").concat(
      formData.getAll("interest_ai")
    );

    // Demo-only: data is shown in the browser console.
    console.log("Registration:", {
      fullName: formData.get("fullname"),
      studentId: formData.get("studentid"),
      email: formData.get("email"),
      preferredStartDate: formData.get("date"),
      attendanceMode: formData.get("mode") || "Not selected",
      interests: interests.length ? interests : ["Not selected"]
    });

    showToast("Registration submitted successfully!");
    form.reset();
    Object.values(fields).forEach((field) => setFieldState(field, true));
  });

  function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add("show");

    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => {
      toast.classList.remove("show");
    }, 3500);
  }
});
