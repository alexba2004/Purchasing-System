// Programa desarrollado por Jose Alejandro Briones Arroyo el 19 de septiembre de 2023

// Declaración de arreglos para almacenar los productos y sus detalles
const nombres = []; // Almacena los nombres de los productos
const precios = []; // Almacena los precios de los productos
const cantidades = []; // Almacena las cantidades de los productos
const productos = []; // Almacena los objetos de productos con nombre, precio y cantidad

// Función para agregar un producto a las listas
function agregarProducto() {
    // Obtener los elementos de entrada del formulario
    const productoInput = document.getElementById("producto");
    const precioInput = document.getElementById("precio");
    const cantidadInput = document.getElementById("cantidad");

    // Obtener los valores ingresados por el usuario y validarlos
    const nombre = productoInput.value.trim();
    const precio = parseFloat(precioInput.value.trim());
    const cantidad = parseInt(cantidadInput.value.trim());

    // Validar los datos ingresados
    if (!nombre || isNaN(precio) || isNaN(cantidad) || precio < 0 || cantidad < 1) {
        alert("Por favor, ingrese datos válidos.");
        return;
    }

    // Agregar los datos a los arreglos correspondientes
    nombres.push(nombre);
    precios.push(precio);
    cantidades.push(cantidad);
    productos.push({ nombre, precio, cantidad });

    // Actualizar la lista de productos y calcular el total
    actualizarLista();
    calcularTotal();

    // Limpiar los campos del formulario
    productoInput.value = "";
    precioInput.value = "";
    cantidadInput.value = "";
}

// Función para editar un producto existente
function editarProducto(index) {
    // Obtener el producto y sus detalles previos
    const producto = productos[index];
    const nombreAnterior = nombres[index];
    const precioAnterior = precios[index];
    const cantidadAnterior = cantidades[index];

    // Crear una tabla para editar los detalles del producto
    const table = document.createElement("table");
    table.classList.add("editar-table");

    // Crear una fila para editar el nombre del producto
    const nombreRow = document.createElement("tr");
    const nombreLabel = document.createElement("td");
    nombreLabel.textContent = "Nombre del Producto:";
    const nombreInput = document.createElement("input");
    nombreInput.type = "text";
    nombreInput.value = producto.nombre;
    nombreRow.appendChild(nombreLabel);
    nombreRow.appendChild(nombreInput);
    table.appendChild(nombreRow);

    // Crear una fila para editar el precio del producto
    const precioRow = document.createElement("tr");
    const precioLabel = document.createElement("td");
    precioLabel.textContent = "Precio:";
    const precioInput = document.createElement("input");
    precioInput.type = "number";
    precioInput.step = "0.01";
    precioInput.value = producto.precio;
    precioRow.appendChild(precioLabel);
    precioRow.appendChild(precioInput);
    table.appendChild(precioRow);

    // Crear una fila para editar la cantidad del producto
    const cantidadRow = document.createElement("tr");
    const cantidadLabel = document.createElement("td");
    cantidadLabel.textContent = "Cantidad:";
    const cantidadInput = document.createElement("input");
    cantidadInput.type = "number";
    cantidadInput.step = "1";
    cantidadInput.min = "1";
    cantidadInput.value = producto.cantidad;

    // Evitar valores negativos o no numéricos en la cantidad
    cantidadInput.addEventListener("input", () => {
        if (cantidadInput.value < 1 || isNaN(cantidadInput.value)) {
            cantidadInput.value = 1;
        }
    });

    cantidadRow.appendChild(cantidadLabel);
    cantidadRow.appendChild(cantidadInput);
    table.appendChild(cantidadRow);

    // Crear botón para guardar cambios
    const guardarBtn = document.createElement("button");
    guardarBtn.textContent = "Guardar";
    guardarBtn.classList.add("guardar-btn");
    guardarBtn.addEventListener("click", () => {
        // Obtener los nuevos valores y validarlos
        const nuevoNombre = nombreInput.value.trim();
        const nuevoPrecio = parseFloat(precioInput.value.trim());
        const nuevaCantidad = parseInt(cantidadInput.value.trim());

        if (!nuevoNombre || isNaN(nuevoPrecio) || isNaN(nuevaCantidad) || nuevoPrecio < 0 || nuevaCantidad < 1) {
            alert("Por favor, ingrese datos válidos.");
            return;
        }

        // Actualizar los datos del producto
        nombres[index] = nuevoNombre;
        precios[index] = nuevoPrecio;
        cantidades[index] = nuevaCantidad;
        productos[index] = { nombre: nuevoNombre, precio: nuevoPrecio, cantidad: nuevaCantidad };

        // Actualizar la lista y el total
        actualizarLista();
        calcularTotal();

        // Eliminar la tabla de edición
        table.remove();
    });

    // Crear botón para cancelar la edición
    const cancelarBtn = document.createElement("button");
    cancelarBtn.textContent = "Cancelar";
    cancelarBtn.classList.add("cancelar-btn");
    cancelarBtn.addEventListener("click", () => {
        // Restaurar valores anteriores
        nombres[index] = nombreAnterior;
        precios[index] = precioAnterior;
        cantidades[index] = cantidadAnterior;
        productos[index] = { nombre: nombreAnterior, precio: precioAnterior, cantidad: cantidadAnterior };

        // Actualizar la lista y el total
        actualizarLista();
        calcularTotal();

        // Eliminar la tabla de edición
        table.remove();
    });

    // Crear fila para botones de guardar y cancelar
    const buttonsRow = document.createElement("tr");
    const buttonsCell = document.createElement("td");
    buttonsCell.colSpan = "2";
    buttonsCell.appendChild(guardarBtn);
    buttonsCell.appendChild(cancelarBtn);
    buttonsRow.appendChild(buttonsCell);
    table.appendChild(buttonsRow);

    // Obtener el elemento de lista a editar y reemplazar su contenido
    const li = listaProductos.children[index];
    li.innerHTML = "";
    li.appendChild(table);
}

// Función para eliminar un producto
function eliminarProducto(index) {
    // Eliminar el producto y sus detalles de los arreglos
    nombres.splice(index, 1);
    precios.splice(index, 1);
    cantidades.splice(index, 1);
    productos.splice(index, 1);

    // Actualizar la lista y el total
    actualizarLista();
    calcularTotal();
}

// Función para actualizar la lista de productos en el DOM
function actualizarLista() {
    const listaProductos = document.getElementById("listaProductos");
    listaProductos.innerHTML = "";

    // Recorrer los productos y crear elementos para cada uno
    productos.forEach((producto, index) => {
        const li = document.createElement("li");

        // Crear botones para editar y eliminar
        const editarBtn = document.createElement("button");
        editarBtn.textContent = "Editar";
        editarBtn.classList.add("editar-btn");
        editarBtn.addEventListener("click", () => {
            editarProducto(index);
        });

        const eliminarBtn = document.createElement("button");
        eliminarBtn.textContent = "Eliminar";
        eliminarBtn.classList.add("eliminar-btn");
        eliminarBtn.addEventListener("click", () => {
            eliminarProducto(index);
        });

        // Mostrar el nombre del producto, subtotal y cantidad
        li.textContent = `${nombres[index]}: (Subtotal: $${(precios[index] * cantidades[index]).toFixed(2)}) (Cantidad: ${cantidades[index]})`;

        // Agregar botones a la lista de productos
        li.appendChild(editarBtn);
        li.appendChild(eliminarBtn);

        // Agregar la lista de productos actualizada al DOM
        listaProductos.appendChild(li);
    });
}

// Función para calcular el total de la compra
function calcularTotal() {
    const totalCompraSpan = document.getElementById("totalCompra");
    const totalCompra = productos.reduce((total, producto, index) => total + precios[index] * cantidades[index], 0);
    totalCompraSpan.textContent = totalCompra.toFixed(2);
}
