// Se importa el servicio de almacenamiento desde otro archivo JavaScript
// Este servicio probablemente se usa para manejar datos guardados
import { storageService } from '../../../../31231231/BORRADOR-PROYECTO-JAVA/js/services/StorageService.js';

// Se crea una clase llamada HotelNavbar que hereda de HTMLElement
// Esto permite crear un componente personalizado reutilizable
class HotelNavbar extends HTMLElement {

  // Constructor del componente
  constructor() {
    super();

    // Se crea un Shadow DOM para encapsular el HTML y CSS
    this.attachShadow({ mode: 'open' });
  }

  // Método que se ejecuta automáticamente cuando el componente
  // es agregado al documento HTML
  connectedCallback() {

    // Renderiza el contenido del navbar
    this.render();

    // Configura los eventos del navbar
    this.setupEventListeners();

    // Escucha cambios de autenticación
    // Por ejemplo: cuando el usuario inicia o cierra sesión
    window.addEventListener('auth-change', () => this.render());
  }

  // Getter que verifica si existe un usuario logueado
  get isUserLoggedIn() {

    // Retorna true si existe logged_user en sessionStorage
    return sessionStorage.getItem('logged_user') !== null;
  }

  // Getter que obtiene los datos del usuario logueado
  get loggedUser() {

    // Convierte el JSON guardado en un objeto JavaScript
    return JSON.parse(sessionStorage.getItem('logged_user'));
  }

  // Método para cerrar sesión
  logout(e) {

    // Evita el comportamiento por defecto del enlace
    e.preventDefault();

    // Elimina el usuario almacenado en sessionStorage
    sessionStorage.removeItem('logged_user');

    // Dispara un evento personalizado para actualizar componentes
    window.dispatchEvent(new CustomEvent('auth-change'));

    // Redirige al inicio usando hash
    window.location.hash = '#home';
  }

  // Método para configurar eventos del navbar
  setupEventListeners() {

    // Escucha clics dentro del Shadow DOM
    this.shadowRoot.addEventListener('click', (e) => {

      // Si se hace clic en el botón de cerrar sesión
      if (e.target.matches('#logout-btn')) {

        // Ejecuta el logout
        this.logout(e);
      }

      // Maneja el botón hamburguesa del menú móvil
      if (e.target.matches('.menu-toggle') || e.target.closest('.menu-toggle')) {

        // Selecciona la lista de enlaces
        const navLinks = this.shadowRoot.querySelector('.nav-links');

        // Agrega o elimina la clase active
        navLinks.classList.toggle('active');
      }
      
      // Cierra el menú móvil cuando se hace clic en un enlace
      if (e.target.matches('a.nav-link')) {

        // Selecciona los enlaces del navbar
        const navLinks = this.shadowRoot.querySelector('.nav-links');

        // Elimina la clase active para ocultar el menú
        navLinks.classList.remove('active');
      }
    });
  }

  // Método encargado de renderizar el navbar
  render() {

    // Verifica si el usuario logueado tiene rol admin
    const isAdmin = this.isUserLoggedIn && this.loggedUser.rol === 'admin';

    // Inserta el HTML dentro del Shadow DOM
    this.shadowRoot.innerHTML = `

      <!-- Archivo CSS para los estilos -->
      <link rel="stylesheet" href="css/components.css">

      <!-- Barra de navegación -->
      <nav class="navbar">

        <!-- Logo o nombre del hotel -->
        <a href="#home" class="logo">Rincón del Carmen</a>

        <!-- Botón hamburguesa para dispositivos móviles -->
        <button class="menu-toggle">☰</button>

        <!-- Lista de enlaces -->
        <ul class="nav-links">

          <!-- Enlace al inicio -->
          <li><a href="#home" class="nav-link">Inicio</a></li>

          <!-- Enlace a disponibilidad -->
          <li><a href="#availability" class="nav-link">Disponibilidad</a></li>

          <!-- Enlace a contacto -->
          <li><a href="#contact" class="nav-link">Contacto</a></li>
          
          <!-- Renderizado condicional dependiendo si hay usuario logueado -->
          ${this.isUserLoggedIn ? `

            <!-- Información del usuario -->
            <li class="user-info">

              <!-- Muestra el primer nombre del usuario -->
              <span>Hola, ${this.loggedUser.nombre.split(' ')[0]}</span>

              <!-- Si es admin muestra panel admin, si no muestra perfil -->
              ${isAdmin ? `<li><a href="#admin" class="nav-link" style="color: #D4AF37;">Panel Admin</a></li>` : `<li><a href="#profile" class="nav-link">Mi Perfil</a></li>`}

              <!-- Botón para cerrar sesión -->
              <li><a href="#" id="logout-btn" class="nav-link">Cerrar Sesión</a></li>
            </li>

          ` : `

            <!-- Si no hay usuario logueado muestra botón iniciar sesión -->
            <li><a href="#login" class="btn-login">Iniciar Sesión</a></li>
          `}
        </ul>
      </nav>
    `;
  }
}

// Se registra el componente personalizado
// Luego podrá usarse como <hotel-navbar></hotel-navbar>
customElements.define('hotel-navbar', HotelNavbar);