document.addEventListener("DOMContentLoaded", () => {

    initializeLogin();

});

function initializeLogin() {

    const loginForm = document.querySelector(".login-form");

    if (loginForm) {

        loginForm.addEventListener("submit", login);

    }

}

