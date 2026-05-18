class ContactPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="/styles/ContactPage.css">

            <div class="container">
                <h1>Contáctanos</h1>
                 <p>Estamos aquí para ayudarte. Si tienes alguna pregunta o necesitas asistencia, no dudes en contactarnos.</p>

                <div class="contact-grid">
                    <div class="contact-info">
                        <h2>Información de Contacto</h2>
                        <div class="info-item">
                            <span>📍</span>
                            <p>Calle Principal 123, Ciudad, País</p>
                        </div>
                        <div class="info-item">
                            <span>📞</span>
                            <p>+57 3505734288 </p>
                        </div>
                        <div class="info-item">
                            <span>✉️</span>
                            <p>reservas@rincondelcarmen.com</p>
                        </div>
                    </div>

                    <div class="contact-form-container">
                       <form onsubmit="event.preventDefault(); window.showModal('Mensaje Enviado', '<p class=\\'alert alert-success\\'>Gracias por contactarnos. Te responderemos a la brevedad posible.</p>'); this.reset();">
              <div class="form-group">
                <label>Nombre Completo</label>
                <input type="text" class="form-control" required>
                </div>
                <div class="form-group">
                <label>Correo Electrónico</label>
                <input type="email" class="form-control" required>
                </div>
                <div class="form-group">
                <label>Mensaje</label>
                <textarea class="form-control" required></textarea>
                </div>
                <button type="submit" class="btn-submit">Enviar Mensaje</button>
            </form>
                    </div>
                </div>

            <div class="map-container">
               <!-- Mapa de Google Maps -->
               <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.1234567890123!2d-74.12345678901234!3d4.123456789012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e1234567890123%3A0x1234567890123456!2sHotel%20Rinc%C3%B3n%20del%20Carmen!5e0!3m2!1ses-419!2sco!4v1700000000000" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
            </div>
        </div>
        `;
    }
}

customElements.define('contact-page', ContactPage);
