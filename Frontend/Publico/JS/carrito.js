// === Control de apertura/cierre del carrito ===
document.addEventListener("DOMContentLoaded", () => {
  const verCarritoBtn = document.getElementById("ver-carrito");
  const cartSidebar = document.getElementById("cart-sidebar");
  const cartOverlay = document.getElementById("cart-overlay");
  const closeCartBtn = document.getElementById("close-cart");
  

  function abrirCarrito() {
    cartSidebar.classList.add("active");
    cartOverlay.classList.add("active");
  }

  function cerrarCarrito() {
    cartSidebar.classList.remove("active");
    cartOverlay.classList.remove("active");
  }

  verCarritoBtn.addEventListener("click", (e) => {
    e.preventDefault();
    abrirCarrito();
  });

  closeCartBtn.addEventListener("click", cerrarCarrito);
  cartOverlay.addEventListener("click", cerrarCarrito);
});

// === Lógica del carrito ===
const cartItemsContainer = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartSubtotal = document.getElementById("cart-subtotal");
const cartTax = document.getElementById("cart-tax");
const cartTotal = document.getElementById("cart-total");
let carrito = []; // array en memoria

function renderCarrito() {
  cartItemsContainer.innerHTML = "";

  if (carrito.length === 0) {
    cartItemsContainer.innerHTML = '<p class="empty">Tu carrito está vacío.</p>';
    cartSubtotal.textContent = "$0.00";
    cartTax.textContent = "$0.00";
    cartTotal.textContent = "$0.00";
    cartCount.textContent = 0;
    return;
  }

  let subtotal = 0;

  carrito.forEach(item => {
    subtotal += item.precio * item.cantidad;

    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <div style="display:flex;align-items:center;gap:8px;">
        <img src="${item.imagen}" alt="${item.nombre}" width="50" height="50">
        <div>
          <strong>${item.nombre}</strong><br>
          $${item.precio} x ${item.cantidad}
        </div>
      </div>
    `;
    cartItemsContainer.appendChild(div);
  });

  // aquí calculas impuestos y total:
  const IVA = 0.19; // 19 % ejemplo
  const impuestos = subtotal * IVA;
  const costoEnvio = 0; // de momento 0, luego lo pones dinámico
  const total = subtotal + impuestos + costoEnvio;

  cartSubtotal.textContent = "$" + subtotal.toFixed(2);
  cartTax.textContent = "$" + impuestos.toFixed(2);
  cartTotal.textContent = "$" + total.toFixed(2);

  // cantidad total de artículos:
  cartCount.textContent = carrito.reduce((acc, item) => acc + item.cantidad, 0);
}

// Delegar clicks en botones “Añadir al carrito”
document.addEventListener("click", e => {
  if (e.target.classList.contains("add-to-cart")) {
    const id = e.target.dataset.id;
    const nombre = e.target.dataset.nombre;
    const precio = parseFloat(e.target.dataset.precio);
    const imagen = e.target.dataset.imagen;

    // comprobar si ya existe en el carrito
    const existente = carrito.find(p => p.id === id);
    if (existente) {
      existente.cantidad += 1;
    } else {
      carrito.push({ id, nombre, precio, imagen, cantidad: 1 });
    }

    renderCarrito();
  }
});
