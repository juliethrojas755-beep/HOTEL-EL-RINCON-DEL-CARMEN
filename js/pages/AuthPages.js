// Se importa el servicio de almacenamiento
// Este servicio maneja usuarios, login y registros
import { storageService } from '../services/StorageService.js';

// ===============================
// COMPONENTE LOGIN
// ===============================

// Se crea una clase llamada LoginPage
// Hereda de HTMLElement para crear un componente personalizado
class LoginPage extends HTMLElement {

  // Constructor del componente
  constructor() {
    super();

    // Se crea un Shadow DOM para encapsular HTML y CSS
    this.attachShadow({ mode: 'open' });
  }

  // Método que se ejecuta cuando el componente se agrega al HTML
  connectedCallback() {

    // Renderiza el contenido
    this.render();

    // Configura los eventos
    this.setupListeners();
  }

  // Método para configurar eventos
  setupListeners() {

    // Escucha el evento submit del formulario
    this.shadowRoot.addEventListener('submit', (e) => {

      // Evita que la página se recargue
      e.preventDefault();

      // Obtiene el correo ingresado
      const email = e.target.email.value;

      // Obtiene la contraseña ingresada
      const password = e.target.password.value;

      try {

        // Intenta iniciar sesión
        const user = storageService.loginUser(email, password);

        // Guarda el usuario en sessionStorage
        sessionStorage.setItem('logged_user', JSON.stringify(user));
        
        // Dispara un evento global para actualizar el navbar
        window.dispatchEvent(new CustomEvent('auth-change'));
        
        // Muestra mensaje de éxito
        window.showModal('Éxito', '<p class="alert alert-success">Sesión iniciada correctamente.</p>');
        
        // Espera 1.5 segundos antes de redirigir
        setTimeout(() => {

          // Si es admin va al panel admin
          // Si no, va al perfil
          window.location.hash = user.rol === 'admin' ? '#admin' : '#profile';

        }, 1500);

      } catch (error) {

        // Si ocurre un error muestra un modal
        window.showModal('Error', `<p class="alert alert-error">${error.message}</p>`);
      }
    });
  }

  // Método encargado de renderizar el login
  render() {

    // Inserta el HTML dentro del Shadow DOM
    this.shadowRoot.innerHTML = `

      <!-- Archivo CSS -->
      <link rel="stylesheet" href="css/pages.css">

      <!-- Tarjeta principal -->
      <div class="auth-card">

        <!-- Título -->
        <h2>Iniciar Sesión</h2>

        <!-- Formulario -->
        <form>

          <!-- Campo correo -->
          <div class="form-group">
            <label>Correo Electrónico</label>
            <input type="email" name="email" class="form-control" required>
          </div>

          <!-- Campo contraseña -->
          <div class="form-group">
            <label>Contraseña</label>
            <input type="password" name="password" class="form-control" required>
          </div>

          <!-- Botón ingresar -->
          <button type="submit" class="btn">Ingresar</button>
        </form>

        <!-- Enlace al registro -->
        <p class="text-center">
          ¿No tienes una cuenta? <a href="#register">Regístrate aquí</a>
        </p>
      </div>
    `;
  }
}

// ===============================
// COMPONENTE REGISTER
// ===============================

// Se crea una clase llamada RegisterPage
// Hereda de HTMLElement
class RegisterPage extends HTMLElement {

  // Constructor
  constructor() {
    super();

    // Se crea Shadow DOM
    this.attachShadow({ mode: 'open' });
  }

  // Método que se ejecuta al agregar el componente al HTML
  connectedCallback() {

    // Renderiza el contenido
    this.render();

    // Configura eventos
    this.setupListeners();
  }

  // Método para manejar eventos
  setupListeners() {

    // Escucha el submit del formulario
    this.shadowRoot.addEventListener('submit', (e) => {

      // Evita recargar la página
      e.preventDefault();

      // Guarda referencia al formulario
      const form = e.target;
      
      // Crea objeto con datos del usuario
      const user = {

        // Identificación
        identificacion: form.identificacion.value,

        // Nombre completo
        nombre: form.nombre.value,

        // Nacionalidad
        nacionalidad: form.nacionalidad.value,

        // Correo electrónico
        email: form.email.value,

        // Teléfono
        telefono: form.telefono.value,

        // Contraseña
        password: form.password.value
      };

      try {

        // Agrega el usuario al sistema
        storageService.addUser(user);

        // Muestra mensaje de éxito
        window.showModal('Registro Exitoso', '<p class="alert alert-success">Tu cuenta ha sido creada. Ahora puedes iniciar sesión.</p>');

        // Espera 2 segundos antes de redirigir
        setTimeout(() => {

          // Redirige al login
          window.location.hash = '#login';

        }, 2000);

      } catch (error) {

        // Si hay error muestra mensaje
        window.showModal('Error', `<p class="alert alert-error">${error.message}</p>`);
      }
    });
  }

  // Método encargado de renderizar el formulario de registro
  render() {

    // Inserta el HTML dentro del Shadow DOM
    this.shadowRoot.innerHTML = `

      <!-- Archivo CSS -->
      <link rel="stylesheet" href="css/pages.css">

      <!-- Tarjeta principal -->
      <div class="auth-card">

        <!-- Título -->
        <h2>Registro de Usuario</h2>

        <!-- Formulario -->
        <form class="form-grid">

          <!-- Campo nombre -->
          <div class="form-group full-width">
            <label>Nombre Completo</label>
            <input type="text" name="nombre" class="form-control" required>
          </div>

          <!-- Campo identificación -->
          <div class="form-group">
            <label>Identificación</label>
            <input type="text" name="identificacion" class="form-control" required>
          </div>

          <!-- Campo nacionalidad -->
          <div class="form-group">
            <label>Nacionalidad</label>
            <input type="text" name="nacionalidad" class="form-control" required>
          </div>

          <!-- Campo teléfono -->
          <div class="form-group">
            <label>Teléfono</label>
            <input type="tel" name="telefono" class="form-control" required>
          </div>

          <!-- Campo correo -->
          <div class="form-group">
            <label>Correo Electrónico</label>
            <input type="email" name="email" class="form-control" required>
          </div>

          <!-- Campo contraseña -->
          <div class="form-group full-width">
            <label>Contraseña</label>
            <input type="password" name="password" class="form-control" required>
          </div>

          <!-- Botón registrarse -->
          <button type="submit" class="btn">Registrarse</button>

          <!-- Enlace al login -->
          <p class="text-center">
            ¿Ya tienes una cuenta? <a href="#login">Inicia sesión aquí</a>
          </p>
        </form>
      </div>
    `;
  }
}

// Se registran los componentes personalizados
// Ahora pueden usarse como etiquetas HTML
customElements.define('login-page', LoginPage);
customElements.define('register-page', RegisterPage);