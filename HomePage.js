import {storageService} from '../services/Storage.Service.js';

/** se crea un componente personalizado para la pagina de inicio, se extiende de HTMLElement */
class HomePage extends HTMLElement { 
    constructor() {
        super();
    }

    /** se ejecuta cada vez que el componente se agrega al DOM */
    connectedCallback() {
        this.render();
    }

    /** se encarga de renderizar el contenido del componente */
    render() {
        const rooms = storageService.getActiveRooms(); // se obtiene la lista de habitaciones desde el servicio de almacenamiento

        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="/styles/HomePage.css">

            <div class="hero">
               <div class="hero-content">
                    <h1>Bienvenido al Descanso Perfecto</h1>
                    <p>Encuentra tu habitación ideal para una estancia inolvidable</p>
                    <a href="#availability" class="btn-cta">Ver Disponibilidad</a>
                </div>
            </div>

            <div class="section">
                <h2 class="secion-title">Nuestras Habitaciones</h2>
                <div class="rooms-grid">
                    ${rooms.slice(0, 3).map(room => `
                       <div class="room-card">
                         <img src="${room.image}" alt="${room.name}"class="room-image">
                         <div class="room-info">
                            <h3>${room.name}</h3>
                            <p>Hasta ${room.maxGuests} personas • ${room.beds} cama (s) </p>
                            <div class="room-price">Desde $${room.pricePerNight.toLocaleString('es-CO')} por noche</div>
                            <a href="#availability" class="btn-cta" style="display: block; text-align: center; padding: 0.5rem;">Reservar Ahora</a>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        
            <div class="section" style="background-color: #f9f9f9; border-top: 1px solid #ddd;">
                <h2 class="secion-title">¿Por qué elegirnos?</h2>
                <div class="areas-grid">
                    <div class="area-card">
                        <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=600" alt="Spa">
                        <div class="area-overlay">
                            <h3>Spa de Lujo</h3>
                            <p>Relájate y rejuvenece en nuestro spa de clase mundial, con tratamientos exclusivos y un ambiente sereno.</p>
                        </div>
                    </div>
                    <div class="area-card">
                        <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600" alt="Gastronomía">
                        <div class="area-overlay">
                            <h3>Gastronomía Exquisita</h3>
                            <p>Disfruta de una experiencia culinaria única con platos gourmet preparados por nuestros chefs expertos.</p>
                        </div>
                    </div>
                    <div class="area-card">
                        <img src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&q=80&w=600" alt="Piscina">
                        <div class="area-overlay">
                            <h3>Piscina Infinita</h3>
                            <p>Sumérgete en nuestra piscina infinita con vistas panorámicas, el lugar perfecto para relajarte y disfrutar del sol.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

    }
}
/** se define el nuevo elemento personalizado con el nombre 'home-page' */
customElements.define('home-page', HomePage);

                            
            