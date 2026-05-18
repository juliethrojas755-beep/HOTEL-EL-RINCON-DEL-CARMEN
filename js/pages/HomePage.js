// Se importa el servicio de almacenamiento
// Este servicio permite obtener información de habitaciones
import { storageService } from '../services/StorageService.js';

// Se crea una clase llamada HomePage
// Hereda de HTMLElement para crear un componente personalizado
class HomePage extends HTMLElement {

  // Constructor del componente
  constructor() {
    super();

    // Se crea un Shadow DOM para encapsular el HTML y CSS
    this.attachShadow({ mode: 'open' });
  }

  // Método que se ejecuta automáticamente cuando
  // el componente es agregado al documento HTML
  connectedCallback() {

    // Renderiza el contenido de la página
    this.render();
  }

  // Método encargado de renderizar el contenido
  render() {

    // Obtiene las habitaciones activas desde storageService
    const rooms = storageService.getActiveRooms();
    
    // Inserta el HTML dentro del Shadow DOM
    this.shadowRoot.innerHTML = `

      <!-- Archivo CSS de estilos -->
      <link rel="stylesheet" href="css/pages.css">
      
      <!-- =============================== -->
      <!-- SECCIÓN HERO -->
      <!-- =============================== -->

      <!-- Sección principal de bienvenida -->
      <div class="hero">

        <!-- Contenido del hero -->
        <div class="hero-content">

          <!-- Título principal -->
          <h1>Bienvenido al Descanso Perfecto</h1>

          <!-- Texto descriptivo -->
          <p>
            Experimente el lujo, la tranquilidad y el mejor servicio en el corazón de la ciudad.
          </p>

          <!-- Botón que lleva a disponibilidad -->
          <a href="#availability" class="btn-cta">
            Consultar Disponibilidad
          </a>
        </div>
      </div>

      <!-- =============================== -->
      <!-- SECCIÓN HABITACIONES -->
      <!-- =============================== -->

      <!-- Contenedor de sección -->
      <div class="section">

        <!-- Título -->
        <h2 class="section-title">Nuestras Habitaciones</h2>

        <!-- Grid de habitaciones -->
        <div class="rooms-grid">

          <!-- Se toman solo las primeras 3 habitaciones -->
          ${rooms.slice(0, 3).map(room => `

            <!-- Tarjeta de habitación -->
            <div class="room-card">

              <!-- Imagen principal -->
              <img 
                src="${room.images[0]}" 
                alt="${room.name}" 
                class="room-image"
              >

              <!-- Información de la habitación -->
              <div class="room-info">

                <!-- Nombre -->
                <h3>${room.name}</h3>

                <!-- Capacidad y camas -->
                <p>
                  Hasta ${room.maxGuests} personas • ${room.beds} cama(s)
                </p>

                <!-- Precio -->
                <div class="room-price">
                  $${room.pricePerNight.toLocaleString('es-CO')} / noche
                </div>

                <!-- Botón reservar -->
                <a 
                  href="#availability" 
                  class="btn-cta" 
                  style="display:block; text-align:center; padding: 0.5rem;"
                >
                  Reservar
                </a>
              </div>
            </div>

          `).join('')}
        </div>
      </div>

      <!-- =============================== -->
      <!-- SECCIÓN INSTALACIONES -->
      <!-- =============================== -->

      <!-- Sección de servicios -->
      <div 
        class="section" 
        style="background-color: #0f0f11; border-top: 1px solid #222;"
      >

        <!-- Título -->
        <h2 class="section-title">
          Instalaciones y Servicios
        </h2>

        <!-- Grid de instalaciones -->
        <div class="areas-grid">

          <!-- =============================== -->
          <!-- CARD SPA -->
          <!-- =============================== -->

          <div class="area-card">

            <!-- Imagen -->
            <img 
              src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=600" 
              alt="Spa"
            >

            <!-- Overlay encima de la imagen -->
            <div class="area-overlay">

              <!-- Título -->
              <h3>Spa y Zonas Húmedas</h3>
            </div>
          </div>

          <!-- =============================== -->
          <!-- CARD RESTAURANTE -->
          <!-- =============================== -->

          <div class="area-card">

            <!-- Imagen -->
            <img 
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600" 
              alt="Restaurante"
            >

            <!-- Overlay -->
            <div class="area-overlay">

              <!-- Título -->
              <h3>Restaurante Gourmet</h3>
            </div>
          </div>

          <!-- =============================== -->
          <!-- CARD PISCINA -->
          <!-- =============================== -->

          <div class="area-card">

            <!-- Imagen -->
            <img 
              src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=600" 
              alt="Piscina"
            >

            <!-- Overlay -->
            <div class="area-overlay">

              <!-- Título -->
              <h3>Piscina Climatizada</h3>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

// Se registra el componente personalizado
// Ahora podrá usarse como <home-page></home-page>
customElements.define('home-page', HomePage);