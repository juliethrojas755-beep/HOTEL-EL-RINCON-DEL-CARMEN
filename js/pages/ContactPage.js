// Se crea una clase llamada ContactPage
// Hereda de HTMLElement para crear un componente personalizado
class ContactPage extends HTMLElement {

  // Constructor del componente
  constructor() {
    super();

    // Se crea un Shadow DOM para encapsular el HTML y CSS
    this.attachShadow({ mode: 'open' });
  }

  // Método que se ejecuta automáticamente cuando
  // el componente es agregado al HTML
  connectedCallback() {

    // Renderiza el contenido de la página
    this.render();
  }

  // Método encargado de renderizar el contenido
  render() {

    // Se inserta el HTML dentro del Shadow DOM
    this.shadowRoot.innerHTML = `

      <!-- Archivo CSS de estilos -->
      <link rel="stylesheet" href="css/pages.css">

      <!-- Contenedor principal -->
      <div class="container">

        <!-- Título principal -->
        <h2>Contáctenos</h2>
        
        <!-- Grid que divide información y formulario -->
        <div class="contact-grid">

          <!-- Sección de información de contacto -->
          <div class="contact-info">

            <!-- Título -->
            <h3>Información de Contacto</h3>

            <!-- Dirección -->
            <div class="info-item">

              <!-- Ícono -->
              <span>📍</span>

              <!-- Texto dirección -->
              <p>
                Calle 123 #45-67<br>
                El Rincón del Carmen<br>
                Ciudad de Ensueño
              </p>
            </div>

            <!-- Teléfonos -->
            <div class="info-item">

              <!-- Ícono -->
              <span>📞</span>

              <!-- Números -->
              <p>
                +57 300 123 4567<br>
                +57 601 234 5678
              </p>
            </div>

            <!-- Correos electrónicos -->
            <div class="info-item">

              <!-- Ícono -->
              <span>✉️</span>

              <!-- Correos -->
              <p>
                reservas@rincondelcarmen.com<br>
                info@rincondelcarmen.com
              </p>
            </div>
          </div>

          <!-- Contenedor del formulario -->
          <div class="contact-form-container">

            <!-- Formulario de contacto -->
            <form 

              <!-- Evento submit inline -->
              <!-- Evita recargar la página -->
              <!-- Muestra modal de éxito -->
              <!-- Limpia el formulario -->
              onsubmit="
                event.preventDefault(); 
                window.showModal(
                  'Mensaje Enviado', 
                  '<p class=\\'alert alert-success\\'>Gracias por contactarnos. Te responderemos a la brevedad posible.</p>'
                ); 
                this.reset();
              "
            >

              <!-- Campo nombre -->
              <div class="form-group">

                <!-- Label -->
                <label>Nombre Completo</label>

                <!-- Input nombre -->
                <input type="text" class="form-control" required>
              </div>

              <!-- Campo correo -->
              <div class="form-group">

                <!-- Label -->
                <label>Correo Electrónico</label>

                <!-- Input email -->
                <input type="email" class="form-control" required>
              </div>

              <!-- Campo mensaje -->
              <div class="form-group">

                <!-- Label -->
                <label>Mensaje</label>

                <!-- Área de texto -->
                <textarea class="form-control" required></textarea>
              </div>

              <!-- Botón enviar -->
              <button type="submit" class="btn">
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>

        <!-- Contenedor del mapa -->
        <div class="map-container">

          <!-- iframe con mapa embebido de Google Maps -->
          <!-- loading="lazy" carga el mapa solo cuando se necesite -->
          <!-- allowfullscreen permite pantalla completa -->
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127242.78457018318!2d-74.1524301!3d4.6482837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9bfd2da6cb29%3A0x239d635520a33914!2sBogot%C3%A1%2C%20Colombia!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus" 
            allowfullscreen="" 
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      </div>
    `;
  }
}

// Se registra el componente personalizado
// Luego podrá usarse como <contact-page></contact-page>
customElements.define('contact-page', ContactPage);