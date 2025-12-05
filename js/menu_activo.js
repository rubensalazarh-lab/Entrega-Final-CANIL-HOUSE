document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll("nav.navegacion a");
    const actual = window.location.pathname.split("/").pop(); 

    links.forEach(link => {
        const href = link.getAttribute("href");

        if (href.includes(actual)) {
            link.classList.add("activo");
        }
    });
});