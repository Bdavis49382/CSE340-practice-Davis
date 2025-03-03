document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registration-form");
    const passwordInput = document.getElementById("password");
    const messageArea = document.getElementById("message-area");
 
    form.addEventListener("submit", (event) => {
        const password = passwordInput.value;
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
 
        let errors = [];
 
        if (!passwordRegex.test(password)) {
            errors.push("Password must be at least 8 characters long, include one uppercase letter, one number, and one symbol.");
        }
 
        if (errors.length > 0) {
            // Prevent form submission and display error message(s)
            event.preventDefault();
            errors.forEach((error) => {
                const errorMessage = document.createElement("div");
                errorMessage.classList.add("error");
                errorMessage.textContent = error;
                messageArea.appendChild(errorMessage);
            });
        }
    });
});