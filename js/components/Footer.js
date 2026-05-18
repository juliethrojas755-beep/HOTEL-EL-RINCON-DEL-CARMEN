// Se crea una clase llamada HotelFooter que hereda de HTMLElement
// Esto permite crear un componente personalizado en HTML
class HotelFooter extends HTMLElement {

  // El constructor se ejecuta cuando el componente es creado
  constructor() {
    super();

    // Se crea un Shadow DOM para aislar los estilos y estructura
    // mode: 'open' permite acceder al shadowRoot desde JavaScript
    this.attachShadow({ mode: 'open' });
  }

  // connectedCallback se ejecuta automáticamente cuando
  // el componente es agregado al HTML
  connectedCallback() {

    // Se llama al método render para mostrar el contenido
    this.render();
  }

  // Método encargado de renderizar el contenido del footer
  render() {

    // innerHTML inserta todo el contenido HTML dentro del Shadow DOM
    this.shadowRoot.innerHTML = `

      <!-- Se conecta el archivo CSS para dar estilos al componente -->
      <link rel="stylesheet" href="css/components.css">

      <!-- Contenedor principal del footer -->
      <div class="footer-container">

        <!-- Primera sección del footer -->
        <div>

          <!-- Título del hotel -->
          <h3>Hotel el Rincón del Carmen</h3>

          <!-- Descripción del hotel -->
          <p>Experimente el lujo, la tranquilidad y el mejor servicio en el corazón de la ciudad. Su descanso es nuestra prioridad.</p>
        </div>

        <!-- Segunda sección con enlaces rápidos -->
        <div>

          <!-- Título de la sección -->
          <h3>Enlaces Rápidos</h3>

          <!-- Enlace hacia la sección inicio -->
          <p><a href="#home">Inicio</a></p>

          <!-- Enlace hacia la sección de reservas -->
          <p><a href="#availability">Reservar</a></p>

          <!-- Enlace hacia la sección contacto -->
          <p><a href="#contact">Contacto</a></p>
        </div>

        <!-- Tercera sección con información de contacto -->
        <div>

          <!-- Título de contacto -->
          <h3>Contacto</h3>

          <!-- Dirección del hotel -->
          <p>📍 Calle 123 #45-67, Ciudad</p>

          <!-- Número telefónico -->
          <p>📞 +57 300 123 4567</p>

          <!-- Correo electrónico -->
          <p>✉️ info@rincondelcarmen.com</p>
        </div>
      </div>

      <!-- Parte inferior del footer -->
      <div class="footer-bottom">

        <!-- Se muestra el año actual automáticamente con JavaScript -->
        <p>&copy; ${new Date().getFullYear()} Hotel el Rincón del Carmen. Todos los derechos reservados.</p>
      </div>
    `;
  }
}

// Se registra el componente personalizado con el nombre 'hotel-footer'
// Luego podrá usarse en HTML como <hotel-footer></hotel-footer>
customElements.define('hotel-footer', HotelFooter);