// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Cargar los mapas dinámicamente
    loadMaps();

    // Manejador para el formulario de contacto
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    // Efecto de desplazamiento suave para los enlaces de navegación
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });

    // Funcionalidad para el menú móvil
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const menu = document.querySelector('.menu');
    if (menuBtn && menu) {
        menuBtn.addEventListener('click', () => {
            menu.classList.toggle('active');
            menuBtn.textContent = menu.classList.contains('active') ? '✕' : '☰';
        });
        
        // Cerrar menú al hacer clic en un enlace
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                menuBtn.textContent = '☰';
            });
        });
    }

    // Efecto de botón "Conoce más" en la sección hero
    const heroButton = document.querySelector('.hero .btn');
    if (heroButton) {
        heroButton.addEventListener('click', () => {
            const serviciosSection = document.getElementById('servicios');
            if (serviciosSection) {
                serviciosSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Animación de aparición en scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    // Observar las tarjetas de servicios y mapas
    const cards = document.querySelectorAll('.service-card, .map-card');
    cards.forEach(card => {
        card.classList.add('fade-in');
        observer.observe(card);
    });

    // Añadir clase al header cuando se hace scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    // Funcionalidad para el modal de video
    const videoModal = document.getElementById('videoModal');
    const youtubeFrame = document.getElementById('youtubeFrame');
    const closeModal = document.querySelector('.close-modal');

    // Cerrar modal al hacer clic en botón de cierre
    if (closeModal && videoModal) {
        closeModal.addEventListener('click', () => {
            videoModal.style.display = 'none';
            if (youtubeFrame) {
                youtubeFrame.src = ''; // Detener reproducción del video
            }
            document.body.style.overflow = ''; // Restaurar scroll del body
        });
    }

    // Cerrar modal al hacer clic fuera del contenido
    if (videoModal) {
        videoModal.addEventListener('click', (event) => {
            if (event.target === videoModal) {
                videoModal.style.display = 'none';
                if (youtubeFrame) {
                    youtubeFrame.src = '';
                }
                document.body.style.overflow = '';
            }
        });
    }

    // Configurar los botones de compra para redireccionar a Gumroad
    const paymentButtons = document.querySelectorAll('.payment-btn');
    if (paymentButtons.length > 0) {
        paymentButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.getAttribute('data-product');
                
                // Verificar si GUMROAD_LINKS está definido (desde gumroad-config.js)
                if (typeof GUMROAD_LINKS === 'undefined') {
                    console.error('Error: La configuración de Gumroad no está disponible.');
                    alert('Lo sentimos, ha ocurrido un error al intentar acceder a la tienda.');
                    return;
                }
                
                // Obtener la URL de Gumroad desde la configuración externa
                const gumroadUrl = GUMROAD_LINKS[productId];
                if (gumroadUrl) {
                    console.log(`Redirigiendo a Gumroad para producto: ${productId}`);
                    window.open(gumroadUrl, '_blank');
                } else {
                    console.error('No se encontró una URL de Gumroad para el producto:', productId);
                    alert('Lo sentimos, este producto no está disponible actualmente.');
                }
            });
        });
    }

    // Detectar bloqueador de anuncios
    // detectAdBlocker(); // Desactivado

    // Inicializar anuncios en carga diferida
    // initLazyAds(); // Desactivado
});

// Función para manejar el envío del formulario
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Obtener los valores del formulario
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Validación básica
    if (!name || !email || !message) {
        alert('Por favor, completa todos los campos.');
        return;
    }
    
    // Aquí iría el código para enviar el formulario a un servidor
    // Por ahora, solo mostramos un mensaje de éxito
    alert(`Thank you ${name}! Your message has been sent successfully.`);
    
    // Limpiar el formulario
    e.target.reset();
}

// Función para desplazamiento suave
function smoothScroll(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
    }
}

// Detectar bloqueador de anuncios
function detectAdBlocker() {
    // Función desactivada
    return;
    
    // Código original comentado
    /*
    // Crear un elemento div temporal para detección
    const adDetectionDiv = document.createElement('div');
    adDetectionDiv.className = 'ad-detection';
    adDetectionDiv.style.cssText = 'position: absolute; opacity: 0;';
    document.body.appendChild(adDetectionDiv);
    
    // Comprobar si el elemento fue bloqueado
    setTimeout(() => {
        let isBlocked = adDetectionDiv.offsetHeight === 0 || 
                        adDetectionDiv.offsetParent === null || 
                        window.getComputedStyle(adDetectionDiv).display === 'none';
        
        if (isBlocked) {
            // Crear una notificación amigable
            const adBlockNotice = document.createElement('div');
            adBlockNotice.className = 'adblock-notice';
            adBlockNotice.innerHTML = `
                <div class="adblock-notice-content">
                    <h3>We noticed you're using an ad blocker</h3>
                    <p>This site is supported by advertising. Please consider disabling your ad blocker to support our content.</p>
                    <button class="btn" id="closeAdBlockNotice">Continue with Ad Blocker</button>
                </div>
            `;
            
            document.body.appendChild(adBlockNotice);
            
            // Cerrar la notificación
            document.getElementById('closeAdBlockNotice').addEventListener('click', () => {
                adBlockNotice.style.display = 'none';
            });
            
            // Añadir estilos para la notificación
            const style = document.createElement('style');
            style.textContent = `
                .adblock-notice {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background-color: #fff;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
                    border-radius: 0;
                    border: 3px solid #4CAF50;
                    padding: 20px;
                    max-width: 350px;
                    z-index: 999;
                }
                .adblock-notice h3 {
                    margin-top: 0;
                    color: #333;
                }
                .adblock-notice p {
                    margin-bottom: 15px;
                }
            `;
            document.head.appendChild(style);
        }
        
        // Eliminar el div de detección
        document.body.removeChild(adDetectionDiv);
    }, 100);
    */
}

// Inicializar anuncios en carga diferida
function initLazyAds() {
    // Función desactivada
    return;
    
    // Código original comentado
    /*
    // Observador para cargar anuncios cuando sean visibles
    if ('IntersectionObserver' in window) {
        const adObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const adContainer = entry.target;
                    
                    // Verificar si el contenedor ya tiene un anuncio cargado
                    if (!adContainer.dataset.loaded) {
                        // Marcar como cargado
                        adContainer.dataset.loaded = true;
                        
                        // Forzar la carga del anuncio si está usando AdSense
                        const adSlot = adContainer.querySelector('ins.adsbygoogle');
                        if (adSlot && window.adsbygoogle) {
                            (window.adsbygoogle = window.adsbygoogle || []).push({});
                        }
                        
                        // Desconectar el observador de este elemento
                        adObserver.unobserve(adContainer);
                    }
                }
            });
        }, { threshold: 0.1 });
        
        // Observar todos los contenedores de anuncios
        document.querySelectorAll('.ad-container').forEach(adContainer => {
            if (!adContainer.dataset.loaded) {
                adObserver.observe(adContainer);
            }
        });
    } else {
        // Fallback para navegadores que no soportan IntersectionObserver
        document.querySelectorAll('.ad-container').forEach(adContainer => {
            if (!adContainer.dataset.loaded) {
                adContainer.dataset.loaded = true;
                const adSlot = adContainer.querySelector('ins.adsbygoogle');
                if (adSlot && window.adsbygoogle) {
                    (window.adsbygoogle = window.adsbygoogle || []).push({});
                }
            }
        });
    }
    */
}

// Función para cargar los mapas dinámicamente
function loadMaps() {
    const mapsContainer = document.getElementById('maps-container');
    
    // Verificar si el contenedor existe y si MAPS_DATA está definido
    if (!mapsContainer || typeof MAPS_DATA === 'undefined') {
        console.error("No se pudo cargar los mapas: contenedor no encontrado o datos no disponibles");
        return;
    }
    
    // Limpiar el contenedor
    mapsContainer.innerHTML = '';
    
    // Filtrar solo los mapas visibles y generar el HTML para cada uno
    MAPS_DATA.filter(map => map.visible).forEach(map => {
        const mapCard = document.createElement('div');
        mapCard.className = 'map-card';
        mapCard.innerHTML = `
            <div class="map-images">
                <img src="${map.image}" alt="${map.name} Map" class="map-preview">
            </div>
            <h3>${map.name}</h3>
            <p>${map.description}</p>
            <div class="map-details">
                <div class="map-info">
                    <span>Version: ${map.version}</span>
                    <span>Size: ${map.size}</span>
                </div>
                <div class="price-tag">
                    <span class="map-price">$${map.price.toFixed(2)}</span>
                </div>
                <div class="map-actions">
                    <button class="btn payment-btn" data-product="${map.id}" data-price="${map.price}">Purchase</button>
                    <button class="btn preview-btn" data-video="${map.videoUrl}">Watch Video</button>
                </div>
            </div>
        `;
        
        mapsContainer.appendChild(mapCard);
    });
    
    // Inicializar los botones después de crear las tarjetas
    initPreviewButtons();
    initPaymentButtons();
}

// Función para inicializar los botones de vista previa
function initPreviewButtons() {
    const videoModal = document.getElementById('videoModal');
    const youtubeFrame = document.getElementById('youtubeFrame');
    const previewButtons = document.querySelectorAll('.preview-btn');
    
    if (previewButtons.length > 0) {
        previewButtons.forEach(button => {
            button.addEventListener('click', function() {
                const videoUrl = this.getAttribute('data-video');
                if (videoUrl && youtubeFrame) {
                    youtubeFrame.src = videoUrl;
                    if (videoModal) {
                        videoModal.style.display = 'flex';
                        document.body.style.overflow = 'hidden'; // Evitar scroll del body
                    }
                }
            });
        });
    }
}

// Función para inicializar los botones de compra
function initPaymentButtons() {
    const paymentButtons = document.querySelectorAll('.payment-btn');
    if (paymentButtons.length > 0) {
        paymentButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.getAttribute('data-product');
                
                // Verificar si GUMROAD_LINKS está definido
                if (typeof GUMROAD_LINKS === 'undefined') {
                    console.error('Error: La configuración de Gumroad no está disponible.');
                    alert('Lo sentimos, ha ocurrido un error al intentar acceder a la tienda.');
                    return;
                }
                
                // Obtener la URL de Gumroad desde la configuración externa
                const gumroadUrl = GUMROAD_LINKS[productId];
                if (gumroadUrl) {
                    console.log(`Redirigiendo a Gumroad para producto: ${productId}`);
                    window.open(gumroadUrl, '_blank');
                } else {
                    console.error('No se encontró una URL de Gumroad para el producto:', productId);
                    alert('Lo sentimos, este producto no está disponible actualmente.');
                }
            });
        });
    }
}

// Agregamos algunos estilos dinámicos
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    header.scrolled {
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
`;
document.head.appendChild(style); 