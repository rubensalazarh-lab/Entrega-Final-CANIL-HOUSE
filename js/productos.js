// ------- VARIABLES GLOBALES -------
let carrito = JSON.parse(localStorage.getItem("carrito")) || {};
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || {};

// Inicializar badge al cargar la página
actualizarBadgeCarrito();

// ------- SISTEMA DE CONTROL -------
document.querySelectorAll(".producto").forEach(producto => {

    const id = producto.dataset.id;
    const cantidadSpan = producto.querySelector(".cantidad-num");
    const btnSuma = producto.querySelector(".btn-suma");
    const btnResta = producto.querySelector(".btn-resta");
    const btnFavorito = producto.querySelector(".btn-favorito");

    // Inicializar cantidad y favorito si ya estaban en localStorage
    let cantidad = carrito[id]?.cantidad || 0;
    cantidadSpan.textContent = cantidad;

    if (favoritos[id]) {
        btnFavorito.classList.add("fav-activo");
        btnFavorito.textContent = "❤️";
    } else {
        btnFavorito.textContent = "♡";
    }

    // --- BOTÓN + ---
    btnSuma.addEventListener("click", () => {
        cantidad++;
        cantidadSpan.textContent = cantidad;
        carrito[id] = { cantidad, favorito: favoritos[id] || false };
        guardarCarrito();
    });

    // --- BOTÓN - ---
    btnResta.addEventListener("click", () => {
        if (cantidad > 0) {
            cantidad--;
            cantidadSpan.textContent = cantidad;
            if (cantidad === 0) {
                delete carrito[id];
            } else {
                carrito[id] = { cantidad, favorito: favoritos[id] || false };
            }
            guardarCarrito();
        }
    });

    // --- BOTÓN FAVORITO ---
    btnFavorito.addEventListener("click", () => {
        btnFavorito.classList.toggle("fav-activo");

        if (btnFavorito.classList.contains("fav-activo")) {
            favoritos[id] = true;
            btnFavorito.textContent = "❤️";
        } else {
            delete favoritos[id];
            btnFavorito.textContent = "♡";
        }

        // Actualizar estado en carrito también
        if (carrito[id]) carrito[id].favorito = !!favoritos[id];

        localStorage.setItem("favoritos", JSON.stringify(favoritos));
        guardarCarrito();
    });
});

// ------- FUNCIONES -------
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarBadgeCarrito();
}

// Actualiza el badge del carrito en la cabecera
function actualizarBadgeCarrito() {
    const badge = document.getElementById("badge-carrito");
    if (!badge) return;

    const total = Object.values(carrito).reduce((sum, p) => sum + p.cantidad, 0);
    badge.textContent = total;
    badge.style.display = total > 0 ? "flex" : "none";
}

// Al cargar la página, guardar info de productos
const productosInfo = {};

document.querySelectorAll(".producto").forEach(producto => {
    const id = producto.dataset.id;
    const nombre = producto.querySelector(".overlay-info h3").textContent;
    const descripcion = producto.querySelector(".overlay-info p").textContent.replace("Descripción: ", "");
    const categoria = producto.querySelector(".overlay-info .categoria").textContent.replace("Categoría:", "");
    const precio = parseFloat(producto.querySelector(".overlay-info .precio").textContent.replace("$",""));
    const img = producto.querySelector("img").src;

    productosInfo[id] = { nombre, descripcion, categoria, precio, img };
});

localStorage.setItem("productosInfo", JSON.stringify(productosInfo));