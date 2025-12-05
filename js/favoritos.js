// ===========================
// Cargar favoritos y productos
// ===========================
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || {};
let carrito = JSON.parse(localStorage.getItem("carrito")) || {};
let productosInfo = JSON.parse(localStorage.getItem("productosInfo")) || {};

// ===========================
// Guardar cambios
// ===========================
function guardarTodo() {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarFavoritos();
}

// ===========================
// Mostrar favoritos en pantalla
// ===========================
function mostrarFavoritos() {
    const cont = document.getElementById("lista-favoritos");
    if (!cont) return;

    cont.innerHTML = "";

    for (const id of Object.keys(favoritos)) {

        if (!productosInfo[id]) continue;

        const info = productosInfo[id];
        const cantidad = carrito[id]?.cantidad || 0;

        const item = document.createElement("div");
        item.classList.add("item-carrito");

        item.innerHTML = `
            <img src="${info.img}">
            <div class="detalles">
                <h3>${info.nombre}</h3>
                <p>${info.descripcion}</p>
                <p>Categoría: ${info.categoria}</p>
                <p>Precio unitario: $${info.precio}</p>

                <p>Cantidad: <span class="cantidad-num">${cantidad}</span></p>

                <p>Favorito: <span class="fav-icon" style="cursor:pointer; font-size:1.3rem;">
                    ❤️
                </span></p>

                <div class="btn-vertical">
                    <button class="btn-suma">+</button>
                    <button class="btn-resta">-</button>
                </div>
            </div>

            <div class="subtotal">$${(cantidad * info.precio).toFixed(2)}</div>
        `;

        // --- botones ---
        const btnSuma = item.querySelector(".btn-suma");
        const btnResta = item.querySelector(".btn-resta");
        const favIcon = item.querySelector(".fav-icon");

        // sumar
        btnSuma.addEventListener("click", () => {
            carrito[id] = { cantidad: (carrito[id]?.cantidad || 0) + 1, favorito: true };
            guardarTodo();
        });

        // restar
        btnResta.addEventListener("click", () => {
            if (!carrito[id]) return;

            carrito[id].cantidad--;
            if (carrito[id].cantidad <= 0) delete carrito[id];

            guardarTodo();
        });

        // quitar favorito
        favIcon.addEventListener("click", () => {
            delete favoritos[id];
            if (carrito[id]) carrito[id].favorito = false;
            guardarTodo();
        });

        cont.appendChild(item);
    }
}

// ===========================
// Inicializar
// ===========================
document.addEventListener("DOMContentLoaded", () => {
    mostrarFavoritos();
});