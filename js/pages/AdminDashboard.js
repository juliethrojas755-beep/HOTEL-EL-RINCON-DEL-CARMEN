// AdminDashboard.js - Componente para el panel de administración
import { storageService } from '../services/StorageService.js';

// Este componente permite a los administradores gestionar habitaciones y reservas
class AdminDashboard extends HTMLElement {
  // Estado interno para controlar la pestaña activa y la habitación en edición
  constructor() {
    // Llamada al constructor de HTMLElement
    super();
    // Crear un shadow DOM para encapsular estilos y estructura
    this.attachShadow({ mode: 'open' });
    // Pestaña activa: 'rooms' para gestión de habitaciones, 'reservations' para gestión de reservas
    this.currentTab = 'rooms'; // 'rooms' o 'reservations'
    // ID de la habitación que se está editando (null si no se está editando ninguna)
    this.editingRoomId = null;
  }

  // Verificar que el usuario es admin al conectar el componente
  connectedCallback() {
    // Verificar rol de usuario
    const user = JSON.parse(sessionStorage.getItem('logged_user'));
    // Si no hay usuario o el rol no es admin, redirigir a home
    if (!user || user.rol !== 'admin') {
      // Redirigir a home si no es admin
      window.location.hash = '#home';
      // Mostrar mensaje de acceso denegado (opcional)
      window.showModal('Acceso Denegado', '<p class="alert alert-danger">No tienes permisos para acceder a esta sección.</p>');
      return;
    }
    // Si es admin, renderizar el panel
    this.render();
    // Configurar listeners para interacciones dentro del panel
    this.setupListeners();
  }

  // Configurar listeners para botones y formularios dentro del panel
  setupListeners() {
    // Delegación de eventos para manejar clicks en botones y envíos de formularios
    this.shadowRoot.addEventListener('click', (e) => {
      // Tab switching
      // Si se hace click en un botón de pestaña, cambiar la pestaña activa
      if (e.target.matches('.tab-btn')) {
        // Cambiar la pestaña activa según el botón clickeado
        this.currentTab = e.target.dataset.tab;
        // Limpiar cualquier estado de edición al cambiar de pestaña
        this.render();
      }

      // Rooms management
      // Si se hace click en un botón de eliminar habitación, confirmar y eliminar
      if (e.target.matches('.btn-delete-room')) {
        // Confirmar antes de eliminar la habitación
        if(confirm('¿Seguro de eliminar esta habitación?')) {
          // Eliminar habitación usando el servicio de almacenamiento
          storageService.deleteRoom(e.target.dataset.id);
          // Re-renderizar para actualizar la lista de habitaciones
          this.render();
        }
      }
      // Si se hace click en un botón de editar habitación, cargar los datos en el formulario
      if (e.target.matches('.btn-edit-room')) {
        // Establecer el ID de la habitación que se va a editar
        this.editingRoomId = e.target.dataset.id;
        this.render(); // Re-render para mostrar el formulario con los datos cargados
      }
      // Si se hace click en el botón de cancelar edición, limpiar el estado de edición
      if (e.target.matches('#cancel-edit-room')) {
        // Limpiar el ID de la habitación en edición para volver al modo de creación
        this.editingRoomId = null;
        // Re-render para mostrar el formulario vacío
        this.render();
      }

      // Reservations management
      // Si se hace click en un botón de cancelar reserva, confirmar y cancelar
      if (e.target.matches('.btn-cancel-res')) {
        // Confirmar antes de cancelar la reserva
        if(confirm('¿Seguro de cancelar esta reserva?')) {
          // Cancelar reserva usando el servicio de almacenamiento
          storageService.cancelReservation(e.target.dataset.id);
          // Re-renderizar para actualizar la lista de reservas
          this.render();
        }
      }
    });

    this.shadowRoot.addEventListener('submit', (e) => {
      if (e.target.id === 'room-form') {
        e.preventDefault();
        this.handleRoomSubmit(e.target);
      }
    });
  }

  handleRoomSubmit(form) {
    const roomData = {
      name: form.nombre.value,
      beds: parseInt(form.camas.value),
      maxGuests: parseInt(form.maxPersonas.value),
      pricePerNight: parseFloat(form.precio.value),
      services: form.servicios.value.split(',').map(s => s.trim()),
      images: [form.imagen.value || 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800'],
      active: true
    };

    if (this.editingRoomId) {
      roomData.id = this.editingRoomId;
      storageService.updateRoom(roomData);
      window.showModal('Éxito', '<p class="alert alert-success">Habitación actualizada.</p>');
    } else {
      storageService.addRoom(roomData);
      window.showModal('Éxito', '<p class="alert alert-success">Habitación creada.</p>');
    }
    
    this.editingRoomId = null;
    this.render();
  }

  renderRoomsTab() {
    const rooms = storageService.getActiveRooms();
    let editRoom = null;
    if (this.editingRoomId) {
      editRoom = rooms.find(r => r.id === this.editingRoomId);
    }

    return `
      <div class="admin-section">
        <h3>${editRoom ? 'Editar Habitación' : 'Nueva Habitación'}</h3>
        <form id="room-form" class="form-grid">
          <div class="form-group full-width">
            <label>Nombre de Habitación</label>
            <input type="text" name="nombre" class="form-control" value="${editRoom ? editRoom.name : ''}" required>
          </div>
          <div class="form-group">
            <label>Camas</label>
            <input type="number" name="camas" class="form-control" value="${editRoom ? editRoom.beds : ''}" required min="1">
          </div>
          <div class="form-group">
            <label>Máx Personas</label>
            <input type="number" name="maxPersonas" class="form-control" value="${editRoom ? editRoom.maxGuests : ''}" required min="1">
          </div>
          <div class="form-group">
            <label>Precio por Noche</label>
            <input type="number" name="precio" class="form-control" value="${editRoom ? editRoom.pricePerNight : ''}" required min="1">
          </div>
          <div class="form-group">
            <label>Servicios (separados por coma)</label>
            <input type="text" name="servicios" class="form-control" value="${editRoom ? editRoom.services.join(', ') : ''}" placeholder="Ej: internet, tv, minibar" required>
          </div>
          <div class="form-group full-width">
            <label>URL de Imagen (Opcional)</label>
            <input type="url" name="imagen" class="form-control" value="${editRoom ? editRoom.images[0] : ''}">
          </div>
          <div class="form-actions full-width">
            <button type="submit" class="btn btn-primary">${editRoom ? 'Actualizar' : 'Crear Habitación'}</button>
            ${editRoom ? '<button type="button" class="btn btn-outline" id="cancel-edit-room">Cancelar</button>' : ''}
          </div>
        </form>

        <h3 style="margin-top: 3rem;">Lista de Habitaciones</h3>
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Camas</th>
                <th>Capacidad</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${rooms.map(room => `
                <tr>
                  <td>${room.name}</td>
                  <td>${room.beds}</td>
                  <td>${room.maxGuests}</td>
                  <td>$${room.pricePerNight.toLocaleString('es-CO')}</td>
                  <td>
                    <button class="btn-small btn-edit-room" data-id="${room.id}">Editar</button>
                    <button class="btn-small btn-delete btn-delete-room" data-id="${room.id}">Eliminar</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  renderReservationsTab() {
    const reservations = storageService.getReservations();
    const rooms = storageService.getRooms();
    const users = storageService.getUsers();

    return `
      <div class="admin-section">
        <h3>Todas las Reservas</h3>
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Habitación</th>
                <th>Fechas</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${reservations.map(res => {
                const room = rooms.find(r => r.id === res.habitacionId);
                const user = users.find(u => u.id === res.usuarioId);
                return `
                  <tr>
                    <td><small>${res.id}</small></td>
                    <td>${user ? user.nombre : 'N/A'}</td>
                    <td>${room ? room.name : 'N/A'}</td>
                    <td>${res.fechaEntrada} / ${res.fechaSalida}</td>
                    <td><span class="badge ${res.estado === 'activa' ? 'badge-success' : 'badge-error'}">${res.estado}</span></td>
                    <td>
                      ${res.estado === 'activa' ? `<button class="btn-small btn-delete btn-cancel-res" data-id="${res.id}">Cancelar</button>` : ''}
                    </td>
                  </tr>
                `;
              }).join('')}
              ${reservations.length === 0 ? '<tr><td colspan="6" class="text-center">No hay reservas registradas.</td></tr>' : ''}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  render() {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="css/pages.css">

      <div class="container">
        <div class="header">
          <h2>Panel de Administración</h2>
        </div>
        
        <div class="tabs">
          <button class="tab-btn ${this.currentTab === 'rooms' ? 'active' : ''}" data-tab="rooms">Gestión de Habitaciones</button>
          <button class="tab-btn ${this.currentTab === 'reservations' ? 'active' : ''}" data-tab="reservations">Gestión de Reservas</button>
        </div>

        ${this.currentTab === 'rooms' ? this.renderRoomsTab() : this.renderReservationsTab()}
      </div>
    `;
  }
}

customElements.define('admin-dashboard', AdminDashboard);
