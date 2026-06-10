document.addEventListener("DOMContentLoaded", () => {

    initializeLogin();
    initializeSidebar();
    initializeSidebarLogo();

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

function initializeSidebarLogo() {

    const logos = document.querySelectorAll("[data-logo-image]");

    logos.forEach((logo) => {

        const logoContainer = logo.closest(".logo-container");

        logo.addEventListener("load", () => {
            logoContainer?.classList.add("has-logo");
        });

        logo.addEventListener("error", () => {
            logo.remove();
        });

        if (logo.complete && logo.naturalWidth > 0) {
            logoContainer?.classList.add("has-logo");
        }

    });

}

