document.addEventListener("DOMContentLoaded", () => {

    initializeLogin();
    initializeSidebar();

});

function initializeLogin() {

    const loginForm = document.querySelector(".login-form");

    if (loginForm) {

        loginForm.addEventListener("submit", login);

    }

}

function initializeSidebar() {

    const sidebar = document.querySelector(".sidebar");
    const sidebarToggle = document.querySelector(".sidebar-toggle");

    if (!sidebar || !sidebarToggle) {
        return;
    }

    sidebarToggle.addEventListener("click", () => {

        const isCollapsed = sidebar.classList.toggle("is-collapsed");

        sidebarToggle.setAttribute("aria-expanded", String(!isCollapsed));

    });

}

