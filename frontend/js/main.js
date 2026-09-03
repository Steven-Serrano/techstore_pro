// ================================================
// EJERCICIO 1: MENÚ HAMBURGUESA
// Archivo: js/main.js
// Funciona en: index.html, productos.html,
//              nosotros.html, contacto.html
// ================================================

// PASO 1 — Buscar el botón hamburguesa en el HTML
const botonMenu = document.querySelector('#menu-toggle');

// PASO 2 — Buscar el nav en el HTML
const navMenu = document.querySelector('#nav-menu');

// PASO 3 — Escuchar el clic en el botón
if (botonMenu && navMenu) {
  botonMenu.addEventListener('click', function() {

    // PASO 4 — Alternar la clase 'open' en el nav
    navMenu.classList.toggle('open');

    // PASO 5 — Actualizar aria-expanded
    const estaAbierto = navMenu.classList.contains('open');
    botonMenu.setAttribute('aria-expanded', estaAbierto);

  });
}


// PASO 6 — Cerrar el menú cuando el usuario toca un enlace
if (navMenu && botonMenu) {
  const enlaces = navMenu.querySelectorAll('a');

  enlaces.forEach(function(enlace) {
    enlace.addEventListener('click', function() {

      navMenu.classList.remove('open');
      botonMenu.setAttribute('aria-expanded', 'false');

    });
  });
}


// ================================================
// EJERCICIO 2: VALIDAR FORMULARIO DE CONTACTO
// Funciona en: contacto.html
// ================================================

// PASO 1 — Encontrar el formulario
const formulario = document.querySelector('#form-contacto');


// PASO 2 — Funciones auxiliares para mostrar y limpiar errores

function mostrarError(idCampo, mensaje) {

  const campo = document.querySelector('#' + idCampo);
  const spanError = document.querySelector('#error-' + idCampo);

  if (campo) {
    const contenedor = campo.closest('.campo');

    if (contenedor) {
      contenedor.classList.add('tiene-error');
    }
  }

  if (spanError) {
    spanError.textContent = mensaje;
  }
}


function limpiarError(idCampo) {

  const campo = document.querySelector('#' + idCampo);
  const spanError = document.querySelector('#error-' + idCampo);

  if (campo) {
    const contenedor = campo.closest('.campo');

    if (contenedor) {
      contenedor.classList.remove('tiene-error');
    }
  }

  if (spanError) {
    spanError.textContent = '';
  }
}


// PASO 3 — Escuchar cuando el usuario hace clic en "Enviar mensaje"

if (formulario) {

  formulario.addEventListener('submit', function(evento) {

    // Evitar que la página se recargue
    evento.preventDefault();

    let hayErrores = false;


    // ================================================
    // VALIDAR NOMBRE
    // ================================================

    const campoNombre = document.querySelector('#nombre');

    if (campoNombre) {

      const valorNombre = campoNombre.value.trim();

      if (valorNombre.length < 3) {

        mostrarError(
          'nombre',
          'Escribe tu nombre completo (mínimo 3 caracteres)'
        );

        hayErrores = true;

      } else {

        limpiarError('nombre');

      }
    }


    // ================================================
    // VALIDAR EMAIL
    // ================================================

    const campoEmail = document.querySelector('#email');

    if (campoEmail) {

      const valorEmail = campoEmail.value.trim();

      if (!valorEmail.includes('@') || valorEmail.length < 5) {

        mostrarError(
          'email',
          'Ingresa un correo válido (debe tener @)'
        );

        hayErrores = true;

      } else {

        limpiarError('email');

      }
    }


    // ================================================
    // VALIDAR ASUNTO
    // ================================================

    const campoAsunto = document.querySelector('#asunto');

    if (campoAsunto) {

      const valorAsunto = campoAsunto.value;

      if (valorAsunto === '') {

        mostrarError(
          'asunto',
          'Selecciona un asunto'
        );

        hayErrores = true;

      } else {

        limpiarError('asunto');

      }
    }


    // ================================================
    // VALIDAR MENSAJE
    // ================================================

    const campoMensaje = document.querySelector('#mensaje');

    if (campoMensaje) {

      const valorMensaje = campoMensaje.value.trim();

      if (valorMensaje.length < 10) {

        mostrarError(
          'mensaje',
          'El mensaje debe tener al menos 10 caracteres'
        );

        hayErrores = true;

      } else {

        limpiarError('mensaje');

      }
    }


    // ================================================
    // RESULTADO FINAL
    // ================================================

    if (!hayErrores) {

      const formExito = document.querySelector('#form-exito');

      if (formExito) {
        formExito.style.display = 'block';
      }

      formulario.reset();
    }

  });

}


// ================================================
// EJERCICIO 3: TARJETAS DINÁMICAS DESDE ARRAY
// ================================================

function crearTarjeta(producto) {

  return `
    <article class="tarjeta"
      data-id="${producto.id}"
      data-icono="${producto.icono || '📦'}"
      data-nombre="${producto.nombre}"
      data-desc="${producto.descripcion}"
      data-precio="${producto.precio}">

      <span class="badge-disponible">✓ Disponible</span>

      <img
        src="${producto.imagen}"
        alt="${producto.nombre}"
        class="tarjeta-img"
      >

      <div class="tarjeta-info">

        <h3 class="tarjeta-nombre">
          ${producto.nombre}
        </h3>

        <p class="tarjeta-desc">
          ${producto.descripcion}
        </p>

        <div class="tarjeta-pie">

          <span class="tarjeta-precio">
            ${producto.precio}
          </span>

          <button class="btn-accion">
            Ver más
          </button>

        </div>

      </div>

    </article>
  `;
}


// ================================================
// MODAL PRODUCTO
// ================================================

const modal = document.querySelector('#modal-producto');


// -----------------------------------------------
// Abrir modal
// -----------------------------------------------

function abrirModal(tarjeta) {

  if (!modal || !tarjeta) return;

  const modalIcono = document.querySelector('#modal-icono');
  const modalTitulo = document.querySelector('#modal-titulo');
  const modalDesc = document.querySelector('#modal-desc');
  const modalPrecio = document.querySelector('#modal-precio');

  if (modalIcono) {
    modalIcono.textContent =
      tarjeta.dataset.icono || '📦';
  }

  if (modalTitulo) {
    modalTitulo.textContent =
      tarjeta.dataset.nombre || 'Producto';
  }

  if (modalDesc) {
    modalDesc.textContent =
      tarjeta.dataset.desc || '';
  }

  if (modalPrecio) {
    modalPrecio.textContent =
      tarjeta.dataset.precio || '';
  }

  modal.classList.add('visible');
}


// -----------------------------------------------
// Registrar botones del modal
// -----------------------------------------------
// IMPORTANTE:
// Esta función está FUERA del if (modal)
// porque cargarProductos() necesita utilizarla.
// -----------------------------------------------

function registrarBotonesModal() {

  if (!modal) return;

  document.querySelectorAll('.btn-accion').forEach(function(boton) {

    boton.addEventListener('click', function() {

      const tarjeta = boton.closest('.tarjeta');

      abrirModal(tarjeta);

    });

  });
}


// -----------------------------------------------
// Eventos para cerrar el modal
// -----------------------------------------------

if (modal) {

  const btnCerrar = document.querySelector('#modal-cerrar');


  // Cerrar con el botón X
  if (btnCerrar) {

    btnCerrar.addEventListener('click', function() {

      modal.classList.remove('visible');

    });

  }


  // Cerrar haciendo clic fuera del contenido
  modal.addEventListener('click', function(e) {

    if (e.target === modal) {

      modal.classList.remove('visible');

    }

  });


  // Cerrar con ESC
  document.addEventListener('keydown', function(e) {

    if (e.key === 'Escape') {

      modal.classList.remove('visible');

    }

  });

}


// ================================================
// S08: CARGAR PRODUCTOS DESDE JSON / API
// ================================================

async function cargarProductos() {

  const grid = document.querySelector('#grid-tarjetas');

  if (!grid) return;


  try {

    // PASO 1 — Pedir los productos al servidor
    const respuesta =
      await fetch('http://localhost:3000/api/productos');


    // Comprobar si el servidor respondió correctamente
    if (!respuesta.ok) {

      throw new Error(
        `Error HTTP: ${respuesta.status}`
      );

    }


    // PASO 2 — Convertir respuesta a JSON
    const productos =
      await respuesta.json();


    // PASO 3 — Renderizar las tarjetas
    grid.innerHTML =
      productos.map(crearTarjeta).join('');


    // PASO 4 — Registrar eventos
    // IMPORTANTE:
    // Se ejecutan DESPUÉS de crear las tarjetas.

    registrarBotonesModal();

    registrarBadgeHover();

    registrarBuscador();


  } catch (error) {

    grid.innerHTML = `
      <div class="error-fetch">

        <p>
          ⚠️ No se pudieron cargar los productos.
        </p>

        <button
          onclick="cargarProductos()"
          class="btn btn-primario">

          Reintentar

        </button>

      </div>
    `;

    console.error(
      'Error al cargar productos:',
      error
    );

  }

}


// Ejecutar al cargar la página
cargarProductos();


// ================================================
// BARRA DE PROGRESO SCROLL
// ================================================

const barraScroll =
  document.querySelector('#barra-scroll');


if (barraScroll) {

  window.addEventListener('scroll', function() {

    const totalDesplazamiento =
      document.body.scrollHeight -
      window.innerHeight;


    // Evitar división entre cero
    if (totalDesplazamiento <= 0) {

      barraScroll.style.width = '0%';

      return;

    }


    const porcentaje =
      (window.scrollY /
        totalDesplazamiento) * 100;


    barraScroll.style.width =
      porcentaje + '%';

  });

}


// ================================================
// BADGE "DISPONIBLE"
// ================================================

function registrarBadgeHover() {

  document
    .querySelectorAll('.tarjeta')
    .forEach(function(tarjeta) {

      const badge =
        tarjeta.querySelector('.badge-disponible');


      if (badge) {

        tarjeta.addEventListener(
          'mouseover',
          function() {

            badge.classList.add('visible');

          }
        );


        tarjeta.addEventListener(
          'mouseout',
          function() {

            badge.classList.remove('visible');

          }
        );

      }

    });

}


// ================================================
// BUSCADOR
// ================================================

function registrarBuscador() {

  const buscador =
    document.querySelector('#buscador');


  if (!buscador) return;


  buscador.addEventListener(
    'input',
    function() {

      const termino =
        buscador.value.toLowerCase();


      document
        .querySelectorAll('.tarjeta')
        .forEach(function(tarjeta) {

          const nombre =
            tarjeta.dataset.nombre
              .toLowerCase();


          tarjeta.style.display =
            nombre.includes(termino)
              ? 'block'
              : 'none';

        });

    }
  );

}


// ================================================
// S07: TEMA OSCURO
// ================================================

function toggleTema() {

  document.body.classList.toggle(
    'tema-oscuro'
  );


  const btn =
    document.getElementById('btn-tema');


  if (
    document.body.classList.contains(
      'tema-oscuro'
    )
  ) {

    localStorage.setItem(
      'tema',
      'oscuro'
    );


    if (btn) {

      btn.textContent = '☀️';

    }

  } else {

    localStorage.setItem(
      'tema',
      'claro'
    );


    if (btn) {

      btn.textContent = '🌙';

    }

  }

}


// ================================================
// APLICAR TEMA GUARDADO
// ================================================

function aplicarTemaGuardado() {

  const tema =
    localStorage.getItem('tema');


  if (tema === 'oscuro') {

    document.body.classList.add(
      'tema-oscuro'
    );


    const btn =
      document.getElementById('btn-tema');


    if (btn) {

      btn.textContent = '☀️';

    }

  }

}


// ================================================
// CONECTAR BOTÓN DEL TEMA
// ================================================

const btnTema =
  document.getElementById('btn-tema');


if (btnTema) {

  btnTema.addEventListener(
    'click',
    toggleTema
  );

}


aplicarTemaGuardado();


// ================================================
// S07: CARRITO DE COMPRAS
// ================================================


// Leer carrito desde LocalStorage
function leerCarrito() {

  const guardado =
    localStorage.getItem('carrito');


  return guardado
    ? JSON.parse(guardado)
    : [];

}


// Guardar carrito
function guardarCarrito(carrito) {

  localStorage.setItem(
    'carrito',
    JSON.stringify(carrito)
  );


  actualizarBadge();

}


// ================================================
// ACTUALIZAR BADGE DEL CARRITO
// ================================================

function actualizarBadge() {

  const badge =
    document.getElementById(
      'carrito-badge'
    );


  if (!badge) return;


  const carrito =
    leerCarrito();


  badge.textContent =
    carrito.length;


  badge.classList.remove(
    'oculto'
  );

}


// ================================================
// AGREGAR PRODUCTO AL CARRITO
// ================================================

function agregarAlCarrito(producto) {

  const carrito =
    leerCarrito();


  carrito.push(producto);


  guardarCarrito(carrito);


  alert(
    `✅ ${producto.nombre} agregado al carrito`
  );

}


// ================================================
// BOTÓN "AGREGAR AL CARRITO"
// DEL MODAL
// ================================================

const btnModalCarrito =
  document.querySelector(
    '.modal-btn-carrito'
  );


if (btnModalCarrito) {

  btnModalCarrito.addEventListener(
    'click',
    function() {


      const modalTitulo =
        document.getElementById(
          'modal-titulo'
        );


      const modalPrecio =
        document.getElementById(
          'modal-precio'
        );


      const modalIcono =
        document.getElementById(
          'modal-icono'
        );


      const producto = {

        nombre:
          modalTitulo
            ? modalTitulo.textContent
            : 'Producto',

        precio:
          modalPrecio
            ? modalPrecio.textContent
            : '',

        icono:
          modalIcono
            ? modalIcono.textContent
            : '📦',

        fecha:
          new Date().toLocaleDateString(
            'es-CO'
          )

      };


      agregarAlCarrito(producto);


      const modalProducto =
        document.getElementById(
          'modal-producto'
        );


      if (modalProducto) {

        modalProducto.classList.remove(
          'visible'
        );

      }

    }
  );

}


// ================================================
// INICIALIZAR BADGE
// ================================================

actualizarBadge();


// ================================================
// CLIC EN BADGE → CARRITO
// ================================================

const badgeContenedor =
  document.querySelector(
    '.carrito-badge-contenedor'
  );


if (badgeContenedor) {

  badgeContenedor.addEventListener(
    'click',
    function() {

      window.location.href =
        'carrito.html';

    }
  );

}


// ================================================
// S07: PÁGINA CARRITO
// ================================================

function mostrarPaginaCarrito() {

  const lista =
    document.getElementById(
      'lista-carrito'
    );


  const resumen =
    document.getElementById(
      'carrito-resumen'
    );


  // Solo ejecutar en carrito.html
  if (!lista) return;


  const carrito =
    leerCarrito();


  // ================================================
  // CARRITO VACÍO
  // ================================================

  if (carrito.length === 0) {

    if (resumen) {

      resumen.textContent =
        'Tu carrito está vacío';

    }


    lista.innerHTML = `
      <p class="carrito-vacio">

        No hay productos en el carrito.

        <a href="index.html">
          Ver productos →
        </a>

      </p>
    `;


    return;

  }


  // ================================================
  // RESUMEN
  // ================================================

  if (resumen) {

    resumen.textContent =
      `${carrito.length} producto(s) en el carrito`;

  }


  // Limpiar lista antes de renderizar
  lista.innerHTML = '';


  // ================================================
  // CREAR ITEMS
  // ================================================

  carrito.forEach(function(
    producto,
    indice
  ) {

    const item =
      document.createElement('div');


    item.classList.add(
      'carrito-item'
    );


    item.innerHTML = `

      <span class="carrito-item-icono">
        ${producto.icono}
      </span>

      <div class="carrito-item-info">

        <div class="carrito-item-nombre">
          ${producto.nombre}
        </div>

        <div class="carrito-item-precio">
          ${producto.precio}
        </div>

        <div class="carrito-item-fecha">
          Agregado: ${producto.fecha}
        </div>

      </div>

      <button
        class="btn-eliminar"
        data-indice="${indice}">

        Eliminar

      </button>

    `;


    lista.appendChild(item);

  });


  // ================================================
  // BOTONES ELIMINAR
  // ================================================

  document
    .querySelectorAll('.btn-eliminar')
    .forEach(function(btn) {


      btn.addEventListener(
        'click',
        function() {


          const indice =
            parseInt(
              this.dataset.indice
            );


          const carritoActual =
            leerCarrito();


          carritoActual.splice(
            indice,
            1
          );


          guardarCarrito(
            carritoActual
          );


          mostrarPaginaCarrito();

        }
      );

    });

}


// ================================================
// BOTÓN VACIAR CARRITO
// ================================================

const btnVaciar =
  document.getElementById(
    'btn-vaciar'
  );


if (btnVaciar) {

  btnVaciar.addEventListener(
    'click',
    function() {


      if (
        confirm(
          '¿Seguro que quieres vaciar el carrito?'
        )
      ) {

        localStorage.removeItem(
          'carrito'
        );


        actualizarBadge();


        mostrarPaginaCarrito();

      }

    }
  );

}


// ================================================
// MOSTRAR PÁGINA CARRITO
// ================================================

mostrarPaginaCarrito();