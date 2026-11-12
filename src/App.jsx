
import { useState } from 'react';
import './App.css';

// Usuario inicial para realizar las pruebas de autenticación.
const usuariosIniciales = [
  {
    usuario: 'usuario_prueba',
    contrasena: 'Prueba2026'
  }
];

function App() {
  // Estados para almacenar los usuarios y los datos del formulario.
  const [usuarios, setUsuarios] = useState(usuariosIniciales);
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');

  // Estado para controlar si se muestra el registro o el inicio de sesión.
  const [modoRegistro, setModoRegistro] = useState(false);

  // Estado para mostrar los mensajes de validación.
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('');

  // Registra un nuevo usuario.
  const registrarUsuario = (e) => {
    e.preventDefault();

    if (!usuario.trim() || !contrasena.trim()) {
      setTipoMensaje('error');
      setMensaje('Todos los campos son obligatorios.');
      return;
    }

    const usuarioExiste = usuarios.some(
      (u) => u.usuario === usuario.trim()
    );

    if (usuarioExiste) {
      setTipoMensaje('error');
      setMensaje('El usuario ya está registrado.');
      return;
    }

    setUsuarios([
      ...usuarios,
      {
        usuario: usuario.trim(),
        contrasena: contrasena
      }
    ]);

    setTipoMensaje('exito');
    setMensaje('Usuario registrado correctamente.');

    setUsuario('');
    setContrasena('');
  };

  // Valida las credenciales para iniciar sesión.
  const iniciarSesion = (e) => {
    e.preventDefault();

    const usuarioEncontrado = usuarios.find(
      (u) =>
        u.usuario === usuario.trim() &&
        u.contrasena === contrasena
    );

    if (usuarioEncontrado) {
      setTipoMensaje('exito');
      setMensaje('Autenticación satisfactoria.');
    } else {
      setTipoMensaje('error');
      setMensaje('Error en la autenticación. Verifica tus datos.');
    }
  };

  // Cambia entre el formulario de registro y el de inicio de sesión.
  const cambiarModo = () => {
    setModoRegistro(!modoRegistro);
    setUsuario('');
    setContrasena('');
    setMensaje('');
  };

  return (
    <main className="contenedor">
      <section className="formulario">
        <h1>
          {modoRegistro ? 'Crear cuenta' : 'Iniciar sesión'}
        </h1>

        <p>
          {modoRegistro
            ? 'Registra un nuevo usuario.'
            : 'Ingresa tus credenciales para continuar.'}
        </p>

        <form onSubmit={modoRegistro ? registrarUsuario : iniciarSesion}>
          <label htmlFor="usuario">Usuario</label>

          <input
            id="usuario"
            type="text"
            placeholder="Ingresa tu usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />

          <label htmlFor="contrasena">Contraseña</label>

          <input
            id="contrasena"
            type="password"
            placeholder="Ingresa tu contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />

          <button type="submit">
            {modoRegistro ? 'Registrarse' : 'Iniciar sesión'}
          </button>
        </form>

        {mensaje && (
          <p className={`mensaje ${tipoMensaje}`}>
            {mensaje}
          </p>
        )}

        <button className="boton-cambio" onClick={cambiarModo}>
          {modoRegistro
            ? '¿Ya tienes una cuenta? Inicia sesión'
            : '¿No tienes una cuenta? Regístrate'}
        </button>
      </section>
    </main>
  );
}

export default App;
