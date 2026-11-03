const form = document.getElementById("registration-form");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const status = document.getElementById("form-status");

function validatePasswordMatch() {
    const passwordsDiffer =
        confirmPassword.value !== "" && password.value !== confirmPassword.value;
    confirmPassword.setCustomValidity(
        passwordsDiffer ? "Passwords do not match." : ""
    );
}

form.addEventListener("input", () => {
    validatePasswordMatch();
    status.textContent = "";
    status.className = "status";
});

form.addEventListener("submit", (event) => {
    event.preventDefault();
    validatePasswordMatch();

    if (!form.reportValidity()) {
        status.textContent = "Please correct the highlighted fields and try again.";
        status.className = "status error";
        return;
    }

    status.textContent = "Success! All fields are valid and the passwords match.";
    status.className = "status success";
});
