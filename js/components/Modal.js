// Se crea una clase llamada HotelModal que hereda de HTMLElement
// Esto permite crear un componente personalizado reutilizable
class HotelModal extends HTMLElement {

  // Constructor que se ejecuta al crear el componente
  constructor() {
    super();

    // Se crea un Shadow DOM para encapsular el HTML y CSS del modal
    this.attachShadow({ mode: 'open' });
  }

  // Método que se ejecuta automáticamente cuando el componente
  // es agregado al documento HTML
  connectedCallback() {

    // Se renderiza el contenido del modal
    this.render();

    // Se configuran los eventos del modal
    this.setupListeners();
  }

  // Método encargado de configurar los eventos
  setupListeners() {

    // Se escucha cualquier clic dentro del Shadow DOM
    this.shadowRoot.addEventListener('click', (e) => {

      // Si se hace clic en el fondo oscuro del modal
      // o en el botón de cerrar, el modal se cierra
      if (e.target.matches('.modal-overlay') || e.target.matches('.close-btn')) {
        this.close();
      }
    });
  }

  // Método para abrir el modal
  // Recibe un título y contenido HTML dinámico
  open(title, contentHtml) {

    // Se selecciona el elemento donde irá el título
    const titleEl = this.shadowRoot.querySelector('.modal-title');

    // Se selecciona el contenedor del contenido
    const contentEl = this.shadowRoot.querySelector('.modal-body');

    // Se selecciona el overlay del modal
    const overlayEl = this.shadowRoot.querySelector('.modal-overlay');
    
    // Se coloca el texto del título
    titleEl.textContent = title;

    // Se inserta el contenido HTML dentro del modal
    contentEl.innerHTML = contentHtml;

    // Se agrega la clase active para mostrar el modal
    overlayEl.classList.add('active');
  }

  // Método para cerrar el modal
  close() {

    // Se selecciona el overlay del modal
    const overlayEl = this.shadowRoot.querySelector('.modal-overlay');

    // Se elimina la clase active para ocultarlo
    overlayEl.classList.remove('active');
  }

  // Método encargado de renderizar la estructura HTML del modal
  render() {

    // Se inserta el HTML dentro del Shadow DOM
    this.shadowRoot.innerHTML = `

      <!-- Archivo CSS para los estilos del modal -->
      <link rel="stylesheet" href="css/components.css">

      <!-- Fondo oscuro del modal -->
      <div class="modal-overlay">

        <!-- Caja principal del contenido del modal -->
        <div class="modal-content">

          <!-- Botón para cerrar el modal -->
          <button class="close-btn">&times;</button>

          <!-- Título dinámico del modal -->
          <h2 class="modal-title"></h2>

          <!-- Contenido dinámico del modal -->
          <div class="modal-body"></div>
        </div>
      </div>
    `;
  }
}

// Se registra el componente personalizado
// Luego podrá usarse como <hotel-modal></hotel-modal>
customElements.define('hotel-modal', HotelModal);

// Función global para facilitar la apertura del modal desde cualquier parte
window.showModal = (title, contentHtml) => {

  // Busca el modal con el id global-modal
  const modal = document.getElementById('global-modal');

  // Verifica si el modal existe
  if (modal) {

    // Abre el modal enviando el título y contenido
    modal.open(title, contentHtml);
  }
};