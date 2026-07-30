// ================================================
// EJERCICIO 1: MENÚ HAMBURGUESA
// Archivo: js/main.js  ← este archivo
// Funciona en: index.html, productos.html,
//              nosotros.html, contacto.html
// ================================================

// PASO 1 — Buscar el botón hamburguesa en el HTML
// Tu index.html tiene:  <button id="menu-toggle" ...>
// querySelector('#menu-toggle') lo encuentra por su id
const botonMenu = document.querySelector('#menu-toggle');

// PASO 2 — Buscar el nav en el HTML
// Tu index.html tiene:  <nav id="nav-menu" class="nav-menu">
const navMenu = document.querySelector('#nav-menu');

// PASO 3 — Escuchar el clic en el botón
// "cuando el usuario haga clic en botonMenu, ejecuta esta función"
botonMenu.addEventListener('click', function() {

  // PASO 4 — Alternar la clase 'open' en el nav
  // Tu styles.css tiene: .nav-menu.open { display: flex; }
  // toggle agrega 'open' si no la tiene, la quita si ya la tiene
  navMenu.classList.toggle('open');

  // PASO 5 — Actualizar aria-expanded (accesibilidad)
  // Dice si el menú está abierto (true) o cerrado (false)
  const estaAbierto = navMenu.classList.contains('open');
  botonMenu.setAttribute('aria-expanded', estaAbierto);

});

// PASO 6 — Cerrar el menú cuando el usuario toca un enlace
// navMenu.querySelectorAll('a') encuentra los 4 enlaces del nav
const enlaces = navMenu.querySelectorAll('a');

enlaces.forEach(function(enlace) {
  enlace.addEventListener('click', function() {
    // Al tocar un enlace: cerrar el menú
    navMenu.classList.remove('open');
    botonMenu.setAttribute('aria-expanded', 'false');
  });
});

// ================================================
// EJERCICIO 2: VALIDAR FORMULARIO DE CONTACTO
// Funciona en: contacto.html
// El formulario tiene id="form-contacto" y novalidate
// ================================================

// PASO 1 — Encontrar el formulario
// Tu contacto.html tiene:  <form id="form-contacto" novalidate>
const formulario = document.querySelector('#form-contacto');

// PASO 2 — Dos funciones auxiliares para mostrar y limpiar errores
// Los campos en contacto.html tienen esta estructura:
//   <div class="campo">
//     <input id="nombre">
//     <span class="error" id="error-nombre"></span>
//   </div>
// La clase .tiene-error en styles.css pone el borde rojo

function mostrarError(idCampo, mensaje) {
  const campo     = document.querySelector('#' + idCampo);
  const spanError = document.querySelector('#error-' + idCampo);
  campo.closest('.campo').classList.add('tiene-error'); // borde rojo
  spanError.textContent = mensaje;                 // texto del error
}

function limpiarError(idCampo) {
  const campo     = document.querySelector('#' + idCampo);
  const spanError = document.querySelector('#error-' + idCampo);
  campo.closest('.campo').classList.remove('tiene-error'); // quita borde rojo
  spanError.textContent = '';                          // borra el texto
}

// PASO 3 — Escuchar cuando el usuario hace clic en "Enviar mensaje"
// El evento 'submit' se dispara al hacer clic en <button type="submit">
if (formulario) {  // solo corre en contacto.html donde existe el formulario
  formulario.addEventListener('submit', function(evento) {

    // ✏️ LÍNEA 1 — Evitar que la página se recargue al enviar
    // Sin esta línea, la página salta y se pierde todo
    evento.preventDefault(); /* ✏️ escribe: evento.preventDefault() */

    let hayErrores = false; // vamos a cambiar esto a true si hay problemas

    // VALIDAR NOMBRE — id="nombre" en contacto.html
    // .value lee lo que escribió el usuario
    // .trim() elimina espacios al inicio y al final
    const valorNombre = document.querySelector('#nombre').value.trim();
    if (valorNombre.length < 3) {
      mostrarError('nombre', 'Escribe tu nombre completo (mínimo 3 caracteres)');
      hayErrores = true;
    } else {
      limpiarError('nombre');
    }

    // ✏️ LÍNEA 2 — VALIDAR EMAIL — id="email" en contacto.html
    // Un email válido siempre tiene @ y al menos 5 caracteres
    const valorEmail = document.querySelector('#email').value.trim();
    if (!valorEmail.includes('@') || valorEmail.length < 5) {
      mostrarError('email', 'Ingresa un correo válido (debe tener @)');
      hayErrores = true;
    } else {
      limpiarError('email');
    }

    // VALIDAR ASUNTO — id="asunto" (select) en contacto.html
    // value === '' significa que dejaron el "-- Selecciona un asunto --"
    const valorAsunto = document.querySelector('#asunto').value;
    if (valorAsunto === '') {
      mostrarError('asunto', 'Selecciona un asunto');
      hayErrores = true;
    } else {
      limpiarError('asunto');
    }

    // ✏️ LÍNEA 3 — VALIDAR MENSAJE — id="mensaje" (textarea) en contacto.html
    const valorMensaje = document.querySelector('#mensaje').value.trim();
    if (valorMensaje.length < 10) {
      mostrarError('mensaje', 'El mensaje debe tener al menos 10 caracteres');
      hayErrores = true;
    } else {
      limpiarError('mensaje');
    }

    // RESULTADO FINAL — si todo está bien, mostrar el mensaje de éxito
    // Tu contacto.html tiene:  <div id="form-exito" style="display:none">
    if (!hayErrores) {
      document.querySelector('#form-exito').style.display = 'block';
      formulario.reset(); // limpia todos los campos
    }

  });
}

// ================================================
// EJERCICIO 3: TARJETAS DINÁMICAS DESDE ARRAY
// Funciona en: index.html (y en productos.html si quieres)
// Requiere: <div id="grid-tarjetas"> vacío en index.html
// ================================================

// PASO 1 — Definir los datos en un array
// Cada { } es un producto. Personaliza con los datos REALES de tu proyecto.
// Las URLs de imagen son de Unsplash — funcionan sin descargar nada.
const productos = [
  {
    id: 1,
    icono: "💻",
    nombre: "MacBook Pro M3",
    descripcion: "Chip M3, 16 GB RAM, 512 GB SSD, pantalla Liquid Retina.",
    precio: "$8.999.000",
    imagen: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=250&fit=crop&q=80"
  },
  {
    id: 2,
    icono: "📱",
    nombre: "iPhone 15 Pro",
    descripcion: "Chip A17 Pro, titanio, Dynamic Island, cámara 48 MP.",
    precio: "$4.299.000",
    imagen: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=250&fit=crop&q=80"
  },
  {
    id: 3,
    icono: "🎮",
    nombre: "RTX 4070 Super",
    descripcion: "12 GB GDDR6X, DLSS 3, Ray Tracing. Gaming 4K fluido.",
    precio: "$2.399.000",
    imagen: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=250&fit=crop&q=80"
  },
  {
    id: 4,
    icono: "💼",
    nombre: "Dell XPS 15",
    descripcion: "Intel i7 13va gen, 32 GB RAM, pantalla OLED 4K.",
    precio: "$6.799.000",
    imagen: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=250&fit=crop&q=80"
  },
  {
    id: 5,
    icono: "📲",
    nombre: "Samsung Galaxy S24",
    descripcion: "Snapdragon 8 Gen 3, IA Galaxy, cámara 200 MP.",
    precio: "$3.199.000",
    imagen: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=250&fit=crop&q=80"
  },
  {
    id: 6,
    icono: "🖥️",
    nombre: "Monitor LG UltraWide 34\"",
    descripcion: "Panel IPS curvo, 3440×1440, 144 Hz, HDR10.",
    precio: "$1.899.000",
    imagen: "https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?w=400&h=250&fit=crop&q=80"
  }
];

// PASO 2 — Función que convierte UN objeto producto en HTML de tarjeta
// Usa backtick ` (no comillas) para escribir HTML con variables ${...}
// Las clases .tarjeta .tarjeta-img etc. ya están definidas en styles.css
function crearTarjeta(producto) {
  return `
    <article class="tarjeta"
      data-id="${producto.id}"
      data-icono="${producto.icono || '📦'}"
      data-nombre="${producto.nombre}"
      data-desc="${producto.descripcion}"
      data-precio="${producto.precio}">
      <span class="badge-disponible">✓ Disponible</span>
      <img src="${producto.imagen}" alt="${producto.nombre}" class="tarjeta-img">
      <div class="tarjeta-info">
        <h3 class="tarjeta-nombre">${producto.nombre}</h3>
        <p class="tarjeta-desc">${producto.descripcion}</p>
        <div class="tarjeta-pie">
          <span class="tarjeta-precio">${producto.precio}</span>
          <button class="btn-accion">Ver más</button>
        </div>
      </div>
    </article>
  `;
}

// PASO 3 — Buscar el contenedor en index.html
// Tu index.html tiene:  <div id="grid-tarjetas">
const gridTarjetas = document.querySelector('#grid-tarjetas');

// PASO 4 — Llenar el grid con las tarjetas generadas
// .map(crearTarjeta) → convierte cada objeto del array en HTML (string)
// .join('')         → une todos esos strings en uno solo
if (gridTarjetas) {  // ✏️ solo corre en páginas que tienen #grid-tarjetas
  gridTarjetas.innerHTML = productos.map(crearTarjeta).join('');
}

// ══════════════════════════════════════════════
// EJERCICIO 1 · MODAL PRODUCTO
// Solo en productos.html (donde existe #modal-producto)
// ══════════════════════════════════════════════

const modal = document.querySelector('#modal-producto');

if (modal) {
  const btnCerrar = document.querySelector('#modal-cerrar');
  const botonesVerMas = document.querySelectorAll('.btn-accion');

  // ✏️ Llenar el modal con los datos del producto
  function abrirModal(tarjeta) {
    document.querySelector('#modal-icono').textContent  = tarjeta.dataset.icono  || '📦';
    document.querySelector('#modal-titulo').textContent = tarjeta.dataset.nombre || 'Producto';
    document.querySelector('#modal-desc').textContent   = tarjeta.dataset.desc   || '';
    document.querySelector('#modal-precio').textContent = tarjeta.dataset.precio || '';
    modal.classList.add('visible');
  }

  // Cada botón "Ver más" abre el modal con los datos de su tarjeta
  botonesVerMas.forEach(function(boton) {
    boton.addEventListener('click', function() {
      const tarjeta = boton.closest('.tarjeta');
      abrirModal(tarjeta);
    });
  });

  // Cerrar con el botón ×
  btnCerrar.addEventListener('click', function() {
    modal.classList.remove('visible');
  });

  // Cerrar al hacer clic fuera del modal
  modal.addEventListener('click', function(evento) {
    if (evento.target === modal) {
      modal.classList.remove('visible');
    }
  });

  // Cerrar con la tecla Escape
  document.addEventListener('keydown', function(evento) {
    if (evento.key === 'Escape') {
      modal.classList.remove('visible');
    }
  });
}

// ══════════════════════════════════════════════
// EJERCICIO 2 · BARRA DE PROGRESO SCROLL
// Funciona en todas las páginas
// ══════════════════════════════════════════════

const barraScroll = document.querySelector('#barra-scroll');

if (barraScroll) {
  window.addEventListener('scroll', function() {
    // scrollY = cuántos píxeles hemos bajado
    // scrollHeight - innerHeight = total de píxeles posibles
    const totalDesplazamiento = document.body.scrollHeight - window.innerHeight;
    const porcentaje = (window.scrollY / totalDesplazamiento) * 100;
    barraScroll.style.width = porcentaje + '%';
  });
}

// ══════════════════════════════════════════════
// EJERCICIO 3 · BADGE HOVER EN TARJETAS
// Solo en productos.html
// ══════════════════════════════════════════════

const todasLasTarjetas = document.querySelectorAll('.tarjeta');

todasLasTarjetas.forEach(function(tarjeta) {
  const badge = tarjeta.querySelector('.badge-disponible');

  if (badge) {
    // Mostrar badge al entrar el mouse
    tarjeta.addEventListener('mouseover', function() {
      badge.classList.add('visible');
    });

    // Ocultar badge al salir el mouse
    tarjeta.addEventListener('mouseout', function() {
      badge.classList.remove('visible');
    });
  }
});

const buscador = document.querySelector('#buscador');

if (buscador) {
  buscador.addEventListener('input', function() {
    const termino = buscador.value.toLowerCase();
    
    todasLasTarjetas.forEach(function(tarjeta) {
      const nombre = tarjeta.dataset.nombre.toLowerCase();
      if (nombre.includes(termino)) {
        tarjeta.style.display = 'block';
      } else {
        tarjeta.style.display = 'none';
      }
    });
  });
}

// ===== S07: TEMA OSCURO =====

// ✏️ COMPLETA: Lee el tema guardado en LocalStorage
// Si existe, aplícalo al body. Si no existe, no hagas nada.
function aplicarTemaGuardado() {
  const tema = localStorage.getItem('tema');
  if (tema === 'oscuro') {
    document.body.classList.add('tema-oscuro');
    const btn = document.getElementById('btn-tema');
    if (btn) btn.textContent = '☀️'; // cambiar el ícono
  }
}

// ✏️ COMPLETA: Alterna entre claro y oscuro y guarda la preferencia
function toggleTema() {
  const esOscuro = document.body.classList.toggle('tema-oscuro');
  const btn = document.getElementById('btn-tema');
  
  if (esOscuro) {
    localStorage.setItem('tema', 'oscuro');
    if (btn) btn.textContent = '☀️';
  } else {
    localStorage.setItem('tema', 'claro');
    if (btn) btn.textContent = '🌙';
  }
}

// Conectar el botón y aplicar el tema al cargar
const btnTema = document.getElementById('btn-tema');
if (btnTema) {
  btnTema.addEventListener('click', toggleTema);
}

aplicarTemaGuardado(); // ← ejecutar al cargar la página

// ===== S07: CARRITO DE COMPRAS =====

// Lee el carrito de LocalStorage (o devuelve array vacío)
function leerCarrito() {
  const guardado = localStorage.getItem('carrito');
  return guardado ? JSON.parse(guardado) : [];
}

// Guarda el carrito en LocalStorage y actualiza el badge
function guardarCarrito(carrito) {
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarBadge();
}

// ✏️ COMPLETA: Actualiza el número que aparece en el badge del header
function actualizarBadge() {
  const badge = document.getElementById('carrito-badge');
  if (!badge) return; // el badge puede no existir en todas las páginas
  
  const carrito = leerCarrito();
  badge.textContent = carrito.length;
  
  badge.classList.remove('oculto');
}

// ✏️ COMPLETA: Agrega un producto al carrito
function agregarAlCarrito(producto) {
  const carrito = leerCarrito();
  carrito.push(producto);
  guardarCarrito(carrito); // guarda y actualiza badge
  
  // Feedback visual al usuario
  alert(`✅ ${producto.nombre} agregado al carrito`);
}

// Conectar el botón "Agregar al carrito" del modal
const btnModalCarrito = document.querySelector('.modal-btn-carrito');
if (btnModalCarrito) {
  btnModalCarrito.addEventListener('click', function() {
    // Leer los datos del producto desde el modal
    const producto = {
      nombre: document.getElementById('modal-titulo').textContent,
      precio: document.getElementById('modal-precio').textContent,
      icono: document.getElementById('modal-icono').textContent,
      fecha:  new Date().toLocaleDateString('es-CO')
    };
    
    agregarAlCarrito(producto);
    
    // Cerrar el modal
    document.getElementById('modal-producto').classList.remove('visible');
  });
}

// Inicializar el badge al cargar la página
actualizarBadge();

// Clic en el badge → ir a carrito.html
const badgeContenedor = document.querySelector('.carrito-badge-contenedor');
if (badgeContenedor) {
  badgeContenedor.addEventListener('click', function() {
    window.location.href = 'carrito.html';
  });
}

// ===== S07: PÁGINA CARRITO =====

// ✏️ COMPLETA: Solo ejecutar si estamos en carrito.html
function mostrarPaginaCarrito() {
  const lista = document.getElementById('lista-carrito');
  const resumen = document.getElementById('carrito-resumen');
  if (!lista) return; // no estamos en carrito.html
  
  const carrito = leerCarrito();
  
  if (carrito.length === 0) {
    resumen.textContent = 'Tu carrito está vacío';
    lista.innerHTML = '<p class="carrito-vacio">No hay productos en el carrito. <a href="index.html">Ver productos →</a></p>';
    return;
  }
  
  resumen.textContent = `${carrito.length} producto(s) en el carrito`;
  
  lista.innerHTML = ''; // limpiar antes de renderizar
  
  carrito.forEach(function(producto, indice) {
    const item = document.createElement('div');
    item.classList.add('carrito-item');
    item.innerHTML = `
      <span class="carrito-item-icono">${producto.icono}</span>
      <div class="carrito-item-info">
        <div class="carrito-item-nombre">${producto.nombre}</div>
        <div class="carrito-item-precio">${producto.precio}</div>
        <div class="carrito-item-fecha">Agregado: ${producto.fecha}</div>
      </div>
      <button class="btn-eliminar" data-indice="${indice}">Eliminar</button>
    `;
    lista.appendChild(item);
  });
  
  // Conectar los botones "Eliminar"
  document.querySelectorAll('.btn-eliminar').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const indice = parseInt(this.dataset.indice);
      const carritoActual = leerCarrito();
      carritoActual.splice(indice, 1); // eliminar ese índice
      guardarCarrito(carritoActual);
      mostrarPaginaCarrito(); // re-renderizar
    });
  });
}

// Botón vaciar carrito
const btnVaciar = document.getElementById('btn-vaciar');
if (btnVaciar) {
  btnVaciar.addEventListener('click', function() {
    if (confirm('¿Seguro que quieres vaciar el carrito?')) {
      localStorage.removeItem('carrito');
      actualizarBadge();
      mostrarPaginaCarrito();
    }
  });
}

mostrarPaginaCarrito(); // llamar al cargar