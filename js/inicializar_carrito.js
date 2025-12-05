// SI productosInfo NO existe en localStorage,
// lo inicializamos vacío para evitar errores
if (!localStorage.getItem("productosInfo")) {
    localStorage.setItem("productosInfo", JSON.stringify({}));
}

// Actualizar ícono del carrito en cualquier página
let carrito = JSON.parse(localStorage.getItem("carrito")) || {};

function actualizarBadgeCarrito() {
    const badge = document.getElementById("badge-carrito");
    if (!badge) return;

    const total = Object.values(carrito).reduce((sum, p) => sum + p.cantidad, 0);
    badge.textContent = total;
    badge.style.display = total > 0 ? "flex" : "none";
}

actualizarBadgeCarrito();