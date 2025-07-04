const productosArray = [];

// Función para agregar producto
function agregarProducto() {
  const name = document.getElementById("nombre").value.trim();
  const description = document.getElementById("descripcion").value.trim();
  const price = parseFloat(document.getElementById("precio").value.trim());
  const material = document.getElementById("material").value.trim();
  const image_url = document.getElementById("imgUrl").value.trim();
  const stock = parseInt(document.getElementById("stock").value.trim());
  const categoryId = parseInt(document.getElementById("category").value.trim());
  const stoneId = parseInt(document.getElementById("stone").value.trim());

  if (!name || !description || !price || !stock || !categoryId || !stoneId) {
    alert("Por favor completa todos los campos.");
    return;
  }

  const producto = {
    name,
    description,
    price,
    material,
    image_url,
    stock,
    category: {
      id_category: categoryId
    },
    stone: {
      id_stone: stoneId
    }
  };

  productosArray.push(producto);
  console.log(JSON.stringify(productosArray, null, 2));

  // Save to both APIs
  fetch("http://localhost:8080/api/productos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(producto)
  }).then(response => {
    if (response.ok) {
      console.log("Producto guardado en la bd (8080)");
    } else {
      console.log("Error al guardar en bd (8080)");
    }
  });

  addProducto(producto);
  mostrarProducto(producto);
  limpiarFormulario();
  alert("¡Producto agregado correctamente!");
}

function limpiarFormulario() {
  document.getElementById("nombre").value = "";
  document.getElementById("descripcion").value = "";
  document.getElementById("precio").value = "";
  document.getElementById("material").value = "";
  document.getElementById("imgUrl").value = "";
  document.getElementById("stock").value = "";
  document.getElementById("category").value = "";
  document.getElementById("stone").value = "";
}

function addProducto(producto) {
  fetch("http://localhost:8081/api/productos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(producto)
  }).then(response => {
    if (response.ok) {
      console.log("Producto guardado en la bd (8081)");
    } else {
      console.log("Error al guardar en bd (8081)");
    }
  });
}

// Función para mostrar un producto en el contenedor
function mostrarProducto(producto) {
  const contenedor = document.getElementById("productos");

  const productoCard = document.createElement("div");
  productoCard.className = "producto card";

  productoCard.innerHTML = `
    <div class="producto-header">
      <strong>${producto.name}</strong>
      <span>${producto.image_url ? `<img src='${producto.image_url}' alt="img" width="40">` : 'Sin imagen'}</span>
    </div>
    <div class="producto-info">
      <p>${producto.description}</p>
      <p><strong>PRECIO:</strong> $${producto.price}</p>
    </div>
    <div class="botones">
      <button class="modificar" onclick="modificarProducto(this)">✏️</button>
      <button class="eliminar" onclick="eliminarProducto(this)">🗑️</button>
    </div>`;

  contenedor.appendChild(productoCard);
}

// Función para modificar producto
function modificarProducto(button) {
  const productoCard = button.closest('.producto');
  // TODO: Implement product modification logic
}

// Función para eliminar producto
function eliminarProducto(button) {
  const productoCard = button.closest('.producto');
  productoCard.remove();
}

// Función para borrar todos los productos
function borrarTodo() {
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = "";
  productosArray.length = 0;
  alert("Todos los productos han sido eliminados.");
}

// Función para cargar los productos desde el JSON y mostrar en la página
function cargarProductos() {
  fetch('./data/joyas.json')
    .then(response => response.json())
    .then(data => {
      data.forEach(producto => {
        productosArray.push(producto);
        mostrarProducto(producto);
      });
    })
    .catch(error => console.log('Error al cargar los productos:', error));
}

// Cargar los productos al cargar la página
window.onload = cargarProductos;
