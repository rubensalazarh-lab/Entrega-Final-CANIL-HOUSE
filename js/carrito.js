// ===========================
//  Cargar datos del carrito
// ===========================
let carrito = JSON.parse(localStorage.getItem("carrito")) || {};
let productosInfo = JSON.parse(localStorage.getItem("productosInfo")) || {}; // Contendrá descripción, precio, categoria, nombre, img

// ===========================
//  Guardar en LocalStorage
// ===========================
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarBadgeCarrito();
    mostrarCarrito();
}

// ===========================
//  Actualizar badge del carrito
// ===========================
function actualizarBadgeCarrito() {
    const totalProductos = Object.values(carrito).reduce((acc, prod) => acc + prod.cantidad, 0);
    const badge = document.getElementById("badge-carrito");

    if (badge) {
        badge.textContent = totalProductos;
        badge.style.display = totalProductos > 0 ? "flex" : "none";
    }
}

// ===========================
//  Mostrar productos en carrito.html
// ===========================
function mostrarCarrito() {
    const listaCarrito = document.getElementById("lista-carrito");
    if (!listaCarrito) return;

    listaCarrito.innerHTML = ""; // Limpiar contenedor

    for (const [id, producto] of Object.entries(carrito)) {
        if (!productosInfo[id]) continue; // Evitar errores si no hay info

        const info = productosInfo[id];

        const item = document.createElement("div");
        item.classList.add("item-carrito");

        item.innerHTML = `
            <img src="${info.img}" alt="${info.nombre}">
            <div class="detalles">
                <h3>${info.nombre}</h3>
                <p>${info.descripcion}</p>
                <p>Categoría: ${info.categoria}</p>
                <p>Precio unitario: $${info.precio}</p>
                <p>Cantidad: <span class="cantidad-num">${producto.cantidad}</span></p>
                <p>Favorito: ${producto.favorito ? "❤️" : "♡"}</p>
                <div class="btn-vertical">
                    <button class="btn-suma">+</button>
                    <button class="btn-resta">-</button>
                </div>
            </div>
            <div class="subtotal">$${(producto.cantidad * info.precio).toFixed(2)}</div>
        `;

        // Eventos de suma y resta
        const btnSuma = item.querySelector(".btn-suma");
        const btnResta = item.querySelector(".btn-resta");

        btnSuma.addEventListener("click", () => {
            producto.cantidad++;
            guardarCarrito();
        });

        btnResta.addEventListener("click", () => {
            producto.cantidad--;
            if (producto.cantidad <= 0) delete carrito[id];
            guardarCarrito();
        });

        listaCarrito.appendChild(item);
    }

    actualizarTotales();
}

// ===========================
//  Actualizar totales
// ===========================
function actualizarTotales() {
    const totalGeneral = document.getElementById("total-general");
    if (!totalGeneral) return;

    let total = 0;
    for (const [id, producto] of Object.entries(carrito)) {
        if (productosInfo[id]) {
            total += producto.cantidad * productosInfo[id].precio;
        }
    }
    totalGeneral.textContent = total.toFixed(2);
}

// ===========================
//  Vaciar carrito
// ===========================
const btnVaciar = document.getElementById("btn-vaciar");
if (btnVaciar) {
    btnVaciar.addEventListener("click", () => {
        carrito = {};
        guardarCarrito();
    });
}

// ===========================
//  Botón PAGAR
// ===========================
const btnPagar = document.getElementById("btn-pagar");
if (btnPagar) {
    btnPagar.addEventListener("click", () => {
        if (Object.keys(carrito).length === 0) {
            alert("El carrito está vacío. Agrega productos antes de pagar.");
            return;
        }

        alert("¡Gracias por su compra! (Simulación de pago)");
        carrito = {};
        guardarCarrito();
    });
}

// ===========================
//  Inicializar
// ===========================
document.addEventListener("DOMContentLoaded", () => {
    mostrarCarrito();
    actualizarBadgeCarrito();
});