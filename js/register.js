// XỬ LÍ THÊM CLASS ACTIVE CHO HEADER VÀ GO TO TOP KHI SCROLL
// XỬ LÍ THÊM CLASS ACTIVE CHO HEADER VÀ GO TO TOP KHI SCROLL
const $header = $("[data-header]");
const $goTopBtn = $("[data-go-top]");

window.addEventListener("scroll", () => {
  if (window.scrollY >= 80) {
    $header.addClass("active");
    $goTopBtn.addClass("active");
  } else {
    $header.removeClass("active");
    $goTopBtn.removeClass("active");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("registerForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const email = document.getElementById("email").value;
      const name = document.getElementById("name").value;
      const password = document.getElementById("password").value;
      const phone = document.getElementById("phone").value;
      const passwordConfirm = document.getElementById("passwordConfirm").value;
      const gender = document.querySelector(
        'input[name="gender"]:checked'
      ).value;

      if (password !== passwordConfirm) {
        alert("Passwords do not match!");
        return;
      }

      const data = {
        email: email,
        password: password,
        name: name,
        gender: JSON.parse(gender), // Convert the string to boolean
        phone: phone,
      };

      fetch("https://shop.cyberlearn.vn/api/Users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.statusCode === 200) {
            $("#successModal").modal("show");
          } else {
            alert("Registration failed: " + result.message);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("An error occurred. Please try again.");
        });
    });
  $("#successModal").on("hidden.bs.modal", function () {
    $("#registerForm")[0].reset(); // Reset the form after the modal closes
  });

  // Explicit close handlers for the modal buttons
  document.querySelectorAll('[data-dismiss="modal"]').forEach((button) => {
    button.addEventListener("click", () => {
      $("#successModal").modal("hide");
    });
  });
});
