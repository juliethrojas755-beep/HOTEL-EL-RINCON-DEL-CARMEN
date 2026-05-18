// Se importa el servicio de almacenamiento
// Este servicio maneja usuarios, habitaciones y reservas
import { storageService } from '../services/StorageService.js';

// Se crea una clase llamada UserProfilePage
// Hereda de HTMLElement para crear un componente personalizado
class UserProfilePage extends HTMLElement {

  // Constructor del componente
  constructor() {
    super();

    // Se crea un Shadow DOM para encapsular HTML y CSS
    this.attachShadow({ mode: 'open' });
  }

  // Método que se ejecuta cuando el componente
  // es agregado al documento HTML
  connectedCallback() {

    // Verifica si existe un usuario logueado
    if (!sessionStorage.getItem('logged_user')) {

      // Si no hay sesión, redirige al login
      window.location.hash = '#login';
      return;
    }

    // Renderiza el contenido
    this.render();

    // Configura eventos
    this.setupListeners();
  }

  // Método encargado de configurar eventos
  setupListeners() {

    // Escucha clics dentro del Shadow DOM
    this.shadowRoot.addEventListener('click', (e) => {

      // Verifica si se hizo clic en el botón cancelar reserva
      if (e.target.matches('.btn-cancel')) {

        // Ejecuta cancelación usando el id de la reserva
        this.cancelReservation(e.target.dataset.id);
      }
    });
  }

  // Método encargado de cancelar reservas
  cancelReservation(id) {

    // Muestra mensaje de confirmación
    if(confirm('¿Está seguro de que desea cancelar esta reserva?')) {

      // Cancela la reserva usando el id
      storageService.cancelReservation(id);

      // Muestra mensaje de éxito
      window.showModal(
        'Reserva Cancelada',
        '<p class="alert alert-success">Tu reserva ha sido cancelada exitosamente. La habitación vuelve a estar disponible.</p>'
      );

      // Vuelve a renderizar la página para actualizar la lista
      this.render();
    }
  }

  // Método encargado de renderizar el perfil
  render() {

    // Obtiene el usuario logueado
    const user = JSON.parse(sessionStorage.getItem('logged_user'));

    // Obtiene las reservas del usuario
    const reservations = storageService.getUserReservations(user.id);

    // Obtiene todas las habitaciones
    const rooms = storageService.getRooms();

    // Inserta el HTML dentro del Shadow DOM
    this.shadowRoot.innerHTML = `

      <!-- Archivo CSS -->
      <link rel="stylesheet" href="css/pages.css">

      <!-- Contenedor principal -->
      <div class="container">

        <!-- Encabezado -->
        <div class="header">

          <!-- Título -->
          <h2>Mi Perfil</h2>
        </div>

        <!-- =============================== -->
        <!-- INFORMACIÓN DEL USUARIO -->
        <!-- =============================== -->

        <!-- Tarjeta de datos -->
        <div class="card user-info">

          <!-- Título -->
          <h3>Mis Datos</h3>

          <!-- Nombre -->
          <p><strong>Nombre:</strong> ${user.nombre}</p>

          <!-- Email -->
          <p><strong>Email:</strong> ${user.email}</p>

          <!-- Identificación -->
          <p><strong>Identificación:</strong> ${user.identificacion}</p>

          <!-- Teléfono -->
          <p><strong>Teléfono:</strong> ${user.telefono}</p>
        </div>

        <!-- =============================== -->
        <!-- RESERVAS -->
        <!-- =============================== -->

        <!-- Tarjeta de reservas -->
        <div class="card">

          <!-- Título -->
          <h3>Mis Reservas</h3>

          <!-- Mensaje si no hay reservas -->
          ${reservations.length === 0 
            ? '<p>No tienes reservas registradas.</p>' 
            : ''
          }
          
          <!-- Recorre todas las reservas -->
          ${reservations.map(res => {

            // Busca la habitación correspondiente
            const room = rooms.find(r => r.id === res.habitacionId);

            // Retorna HTML dinámico
            return `

              <!-- Tarjeta de reserva -->
              <div class="reservation-item">

                <!-- Información de la reserva -->
                <div class="res-details">

                  <!-- Nombre habitación -->
                  <h4>${room ? room.name : 'Habitación eliminada'}</h4>

                  <!-- Fecha llegada -->
                  <p><strong>Llegada:</strong> ${res.fechaEntrada}</p>

                  <!-- Fecha salida -->
                  <p><strong>Salida:</strong> ${res.fechaSalida}</p>

                  <!-- Cantidad personas -->
                  <p><strong>Personas:</strong> ${res.cantidadPersonas}</p>

                  <!-- Estado -->
                  <p>
                    <span class="status ${res.estado}">
                      ${res.estado.toUpperCase()}
                    </span>
                  </p>
                </div>

                <!-- Acciones -->
                <div class="res-actions">

                  <!-- Valor total -->
                  <div class="total-value">
                    $${res.valorTotal.toLocaleString('es-CO')}
                  </div>

                  <!-- Botón cancelar solo si está activa -->
                  ${res.estado === 'activa' 
                    ? `<button class="btn-cancel" data-id="${res.id}">Cancelar Reserva</button>` 
                    : ''
                  }
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }
}

// Se registra el componente personalizado
// Ahora podrá usarse como <user-profile></user-profile>
customElements.define('user-profile', UserProfilePage);