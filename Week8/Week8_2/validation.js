const form = document.getElementById("registration-form");
const fullName = document.getElementById("full-name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const status = document.getElementById("form-status");

const fields = [
    { input: fullName, error: document.getElementById("full-name-error") },
    { input: email, error: document.getElementById("email-error") },
    { input: password, error: document.getElementById("password-error") },
    { input: confirmPassword, error: document.getElementById("confirm-password-error") }
];

const touchedFields = new WeakSet();
let submitted = false;

function getPasswordRules(value) {
    return {
        length: value.length >= 8,
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        number: /\d/.test(value)
    };
}

function updatePasswordRules() {
    const rules = getPasswordRules(password.value);
    document.getElementById("rule-length").classList.toggle("passed", rules.length);
    document.getElementById("rule-uppercase").classList.toggle("passed", rules.uppercase);
    document.getElementById("rule-lowercase").classList.toggle("passed", rules.lowercase);
    document.getElementById("rule-number").classList.toggle("passed", rules.number);

    const valid = Object.values(rules).every(Boolean);
    password.setCustomValidity(
        password.value && !valid
            ? "Use at least 8 characters, including an uppercase letter, a lowercase letter, and a number."
            : ""
    );
}

function updateFieldErrors() {
    updatePasswordRules();
    confirmPassword.setCustomValidity(
        confirmPassword.value && password.value !== confirmPassword.value
            ? "Passwords do not match."
            : ""
    );

    for (const { input, error } of fields) {
        const shouldShow = submitted || touchedFields.has(input);
        const message = shouldShow && !input.validity.valid ? input.validationMessage : "";
        input.setAttribute("aria-invalid", message ? "true" : "false");
        error.textContent = message;
    }
}

for (const { input } of fields) {
    input.addEventListener("input", () => {
        updateFieldErrors();
        if (submitted) {
            status.textContent = "Review the messages by each field before submitting again.";
            status.className = "status";
        }
    });

    input.addEventListener("blur", () => {
        touchedFields.add(input);
        updateFieldErrors();
    });
}

email.addEventListener("blur", () => {
    email.value = email.value.trim();
    updateFieldErrors();
});

fullName.addEventListener("input", () => {
    fullName.setCustomValidity(
        fullName.value.trim() && fullName.value.trim().length < 2
            ? "Enter a name with at least 2 characters."
            : ""
    );
    updateFieldErrors();
});

form.addEventListener("submit", (event) => {
    event.preventDefault();
    submitted = true;
    fullName.setCustomValidity(
        fullName.value.trim() && fullName.value.trim().length < 2
            ? "Enter a name with at least 2 characters."
            : ""
    );
    updateFieldErrors();

    if (!form.checkValidity()) {
        const firstInvalid = fields.find(({ input }) => !input.validity.valid);
        status.textContent = "There are errors to fix. Follow the messages beside the highlighted fields.";
        status.className = "status error";
        firstInvalid?.input.focus();
        return;
    }

    status.textContent = "All entries are valid. This demo did not create an account or send your data.";
    status.className = "status success";
});

updateFieldErrors();
