async function cargarPerfil() {
  const token = localStorage.getItem('token');
  if (!token) {
    document.getElementById('estado-cargando').style.display  = 'none';
    document.getElementById('estado-sin-sesion').style.display = 'block';
    return;
  }

  try {
    // 1: enviar el token en el header
    const respuesta = await fetch('http://localhost:3000/api/auth/perfil', {
      headers: { 'Authorization': 'Bearer ' + token }
    });

    // 2: convertir la respuesta a JSON
    const usuario = await respuesta.json();

    if (!respuesta.ok) throw new Error(usuario.error);

    document.getElementById('estado-cargando').style.display = 'none';
    document.getElementById('perfil-datos').style.display    = 'block';

    document.getElementById('perfil-avatar').textContent =
      usuario.nombre.charAt(0).toUpperCase();

    document.getElementById('perfil-nombre').textContent = usuario.nombre;

    document.getElementById('perfil-rol').textContent =
      usuario.rol === 'admin' ? '⭐ Administrador' : '🛍️ Cliente';

    // 3, 4, 5: email, departamento y municipio
    document.getElementById('perfil-email').textContent =
      usuario.email;

    document.getElementById('perfil-departamento').textContent =
      usuario.departamento || 'No registrado';

    document.getElementById('perfil-municipio').textContent =
      usuario.municipio || 'No registrado';

  } catch (err) {
    document.getElementById('estado-cargando').style.display = 'none';
    document.getElementById('estado-error').style.display    = 'block';
  }
}

cargarPerfil();