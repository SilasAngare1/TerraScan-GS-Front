const items = document.querySelectorAll(".faq-item");

items.forEach(item => {
    const button = item.querySelector(".faq-question");

    button.addEventListener("click", () => {

        items.forEach(el => {
            if (el !== item) {
                el.classList.remove("active");
            }
        });

        item.classList.toggle("active");
    });
});