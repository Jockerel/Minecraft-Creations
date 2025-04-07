// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Manejador para el formulario de contacto
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    // Manejador para el formulario de mapa personalizado
    const customMapForm = document.getElementById('custom-map-form');
    if (customMapForm) {
        customMapForm.addEventListener('submit', handleCustomMapSubmit);
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
    const previewButtons = document.querySelectorAll('.preview-btn');

    // Abrir modal al hacer clic en botón de vista previa
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

    // Funcionalidad para los botones de descarga
    const downloadButtons = document.querySelectorAll('.download-btn');
    if (downloadButtons.length > 0) {
        downloadButtons.forEach(button => {
            button.addEventListener('click', function() {
                const fileUrl = this.getAttribute('data-file');
                if (fileUrl) {
                    // Crear un enlace temporal para la descarga
                    const a = document.createElement('a');
                    a.href = fileUrl;
                    a.download = fileUrl.split('/').pop(); // Extraer nombre del archivo
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                }
            });
        });
    }

    // Funcionalidad para mostrar/ocultar el formulario de mapa personalizado
    const customMapBtn = document.querySelector('.custom-map-btn');
    const customMapSection = document.getElementById('custom-map');
    
    if (customMapBtn && customMapSection) {
        customMapBtn.addEventListener('click', () => {
            customMapSection.classList.add('active');
            customMapSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Funcionalidad para el selector de tamaño del mapa
    const decreaseBtn = document.getElementById('decreaseSize');
    const increaseBtn = document.getElementById('increaseSize');
    const mapSizeDisplay = document.getElementById('mapSize');
    const mapSizeInput = document.getElementById('map-size-value');
    const mapPriceDisplay = document.getElementById('mapPrice');
    
    if (decreaseBtn && increaseBtn && mapSizeDisplay && mapSizeInput && mapPriceDisplay) {
        let currentSize = 1; // Valor inicial 1k x 1k
        
        // Función para actualizar la visualización del tamaño y precio
        const updateSizeAndPrice = () => {
            mapSizeDisplay.textContent = `${currentSize}k x ${currentSize}k`;
            mapSizeInput.value = currentSize;
            const price = currentSize * 15; // $15 por cada 1k x 1k
            mapPriceDisplay.textContent = `$${price}`;
        };
        
        // Disminuir tamaño
        decreaseBtn.addEventListener('click', () => {
            if (currentSize > 1) {
                currentSize--;
                updateSizeAndPrice();
            }
        });
        
        // Aumentar tamaño
        increaseBtn.addEventListener('click', () => {
            if (currentSize < 15) {
                currentSize++;
                updateSizeAndPrice();
            }
        });
    }

    // Implementación del sistema de pago
    const paymentButtons = document.querySelectorAll('.payment-btn');
    const paymentModal = document.getElementById('paymentModal');
    const closePaymentModal = document.getElementById('closePaymentModal');
    const productNameElement = document.getElementById('productName');
    const productPriceElement = document.getElementById('productPrice');
    
    // Variables para almacenar la información del producto actual
    let currentProduct = '';
    let currentPrice = 0;
    
    if (paymentButtons.length > 0 && paymentModal) {
        // Abrir modal de pago al hacer clic en botón de compra
        paymentButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Obtener información del producto
                currentProduct = this.getAttribute('data-product');
                currentPrice = this.getAttribute('data-price');
                
                // Actualizar la información en el modal
                if (productNameElement) {
                    // Convertir nombre del producto a formato legible
                    const formattedName = currentProduct
                        .split('-')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ');
                    
                    productNameElement.textContent = formattedName;
                }
                
                if (productPriceElement) {
                    productPriceElement.textContent = `$${currentPrice}`;
                }
                
                // Mostrar el modal
                paymentModal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Evitar scroll
                
                // Inicializar botones de PayPal
                initPayPalButton(currentProduct, currentPrice);
            });
        });
        
        // Cerrar modal al hacer clic en botón de cierre
        if (closePaymentModal) {
            closePaymentModal.addEventListener('click', closePaymentModalFunction);
        }
        
        // Cerrar modal al hacer clic fuera del contenido
        paymentModal.addEventListener('click', event => {
            if (event.target === paymentModal) {
                closePaymentModalFunction();
            }
        });
    }
    
    // Función para cerrar el modal de pago
    function closePaymentModalFunction() {
        if (paymentModal) {
            paymentModal.classList.remove('active');
            document.body.style.overflow = ''; // Restaurar scroll
            
            // Limpiar el contenedor de botones de PayPal
            const paypalContainer = document.getElementById('paypal-button-container');
            if (paypalContainer) {
                paypalContainer.innerHTML = '';
            }
        }
    }
    
    // Función para inicializar los botones de PayPal
    function initPayPalButton(product, price) {
        if (!window.paypal) {
            console.error('PayPal SDK not loaded');
            return;
        }
        
        const paypalContainer = document.getElementById('paypal-button-container');
        if (!paypalContainer) return;
        
        // Limpiar el contenedor
        paypalContainer.innerHTML = '';
        
        window.paypal.Buttons({
            style: {
                shape: 'rect',
                color: 'gold',
                layout: 'vertical',
                label: 'pay'
            },
            
            createOrder: function(data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        description: `Minecraft Map: ${product}`,
                        amount: {
                            currency_code: 'USD',
                            value: price
                        }
                    }]
                });
            },
            
            onApprove: function(data, actions) {
                return actions.order.capture().then(function(orderData) {
                    // Pago exitoso
                    const transactionID = orderData.purchase_units[0].payments.captures[0].id;
                    
                    // Mostrar mensaje de éxito
                    paypalContainer.innerHTML = `
                        <div class="payment-success">
                            <h3>Payment Successful!</h3>
                            <p>Your transaction ID: ${transactionID}</p>
                            <p>Please check your email for the download link.</p>
                        </div>`;
                    
                    // En un entorno real, aquí enviarías la información a tu servidor
                    // para procesar el pedido y enviar el enlace de descarga por correo
                    console.log('Transaction completed: ' + transactionID);
                    
                    // Después de 3 segundos, cerrar el modal y proceder a la descarga
                    setTimeout(() => {
                        closePaymentModalFunction();
                        triggerDownload(product);
                    }, 3000);
                });
            },
            
            onError: function(err) {
                console.error('PayPal error:', err);
                paypalContainer.innerHTML = `
                    <div class="payment-error">
                        <h3>Payment Error</h3>
                        <p>There was a problem processing your payment. Please try again.</p>
                    </div>`;
            }
        }).render('#paypal-button-container');
    }
    
    // Función para iniciar la descarga después del pago exitoso
    function triggerDownload(product) {
        // En un entorno real, esta URL vendría de tu servidor después de verificar el pago
        const downloadUrls = {
            'mountain-landscape': 'maps/mountain-landscape.rar',
            'volcanic-island': 'maps/volcanic-island.rar',
            'fantasy-world': 'maps/fantasy-world.rar'
        };
        
        const url = downloadUrls[product];
        if (url) {
            const a = document.createElement('a');
            a.href = url;
            a.download = url.split('/').pop();
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }

    // Detectar bloqueador de anuncios
    detectAdBlocker();

    // Inicializar anuncios en carga diferida
    initLazyAds();
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

// Función para manejar el envío del formulario de mapa personalizado
function handleCustomMapSubmit(e) {
    e.preventDefault();
    
    // Obtener los valores del formulario
    const minecraftVersion = document.getElementById('minecraft-version').value;
    const customerEmail = document.getElementById('customer-email').value;
    const mapDetails = document.getElementById('map-details').value;
    const mapSize = document.getElementById('map-size-value').value;
    const price = mapSize * 15;
    
    // Validación básica
    if (!minecraftVersion || !mapDetails || !customerEmail) {
        alert('Por favor, completa todos los campos requeridos.');
        return;
    }
    
    // Crear un objeto con los datos del pedido
    const orderData = {
        customerEmail: customerEmail,
        minecraftVersion: minecraftVersion,
        mapDetails: mapDetails,
        mapSize: `${mapSize}k x ${mapSize}k`,
        price: `$${price}`,
        timestamp: new Date().toISOString()
    };
    
    // Mostrar modal de pago para proceder con la transacción
    showCustomMapPaymentModal(orderData);
}

// Función para mostrar el modal de pago para mapas personalizados
function showCustomMapPaymentModal(orderData) {
    // Si existe un modal de pago previo, lo eliminamos
    const existingModal = document.getElementById('customMapPaymentModal');
    if (existingModal) {
        document.body.removeChild(existingModal);
    }
    
    // Crear el modal de pago
    const paymentModal = document.createElement('div');
    paymentModal.id = 'customMapPaymentModal';
    paymentModal.className = 'payment-modal active';
    
    // Extraer el precio sin el símbolo $ para PayPal
    const priceValue = parseFloat(orderData.price.replace('$', ''));
    
    // Contenido del modal
    paymentModal.innerHTML = `
        <div class="modal-content payment-modal-content">
            <span class="close-modal" id="closeCustomMapPaymentModal">&times;</span>
            <h3>Complete Your Payment for Custom Map</h3>
            
            <div class="product-details">
                <p>Email: <span>${orderData.customerEmail}</span></p>
                <p>Minecraft Version: <span>${orderData.minecraftVersion}</span></p>
                <p>Map Size: <span>${orderData.mapSize}</span></p>
                <p>Estimated Price: <span>${orderData.price}</span></p>
            </div>
            
            <div class="map-details-summary">
                <h4>Map Request Details:</h4>
                <p>${orderData.mapDetails.substring(0, 150)}${orderData.mapDetails.length > 150 ? '...' : ''}</p>
            </div>
            
            <div id="custom-map-paypal-button-container"></div>
            
            <div class="payment-notes">
                <p>After your payment is completed, we'll contact you via email to discuss your custom map in detail.</p>
                <p>For any questions, please contact us at jockerel.creations@gmail.com</p>
            </div>
        </div>
    `;
    
    // Añadir el modal al DOM
    document.body.appendChild(paymentModal);
    
    // Configurar el botón de cierre
    const closeButton = document.getElementById('closeCustomMapPaymentModal');
    closeButton.addEventListener('click', () => {
        paymentModal.classList.remove('active');
        setTimeout(() => {
            document.body.removeChild(paymentModal);
        }, 300);
    });
    
    // Cerrar modal al hacer clic fuera del contenido
    paymentModal.addEventListener('click', event => {
        if (event.target === paymentModal) {
            paymentModal.classList.remove('active');
            setTimeout(() => {
                document.body.removeChild(paymentModal);
            }, 300);
        }
    });
    
    // Configurar PayPal para el mapa personalizado
    if (window.paypal) {
        window.paypal.Buttons({
            style: {
                shape: 'rect',
                color: 'gold',
                layout: 'vertical',
                label: 'pay'
            },
            
            createOrder: function(data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        description: `Custom Minecraft Map (${orderData.mapSize})`,
                        amount: {
                            currency_code: 'USD',
                            value: priceValue
                        }
                    }]
                });
            },
            
            onApprove: function(data, actions) {
                return actions.order.capture().then(function(orderData) {
                    // Pago exitoso
                    const transactionID = orderData.purchase_units[0].payments.captures[0].id;
                    
                    // Mostrar mensaje de éxito
                    const paypalContainer = document.getElementById('custom-map-paypal-button-container');
                    if (paypalContainer) {
                        paypalContainer.innerHTML = `
                            <div class="payment-success">
                                <h3>Payment Successful!</h3>
                                <p>Your transaction ID: ${transactionID}</p>
                                <p>We'll contact you soon at ${orderData.customerEmail} to discuss your custom map.</p>
                            </div>`;
                    }
                    
                    // Enviar la notificación por email incluyendo la información del pago
                    sendCustomMapOrderNotification({
                        ...orderData,
                        transactionID: transactionID,
                        paymentStatus: 'Paid'
                    });
                    
                    // Después de 3 segundos, cerrar el modal
                    setTimeout(() => {
                        paymentModal.classList.remove('active');
                        setTimeout(() => {
                            document.body.removeChild(paymentModal);
                        }, 300);
                        
                        // Limpiar el formulario
                        document.getElementById('custom-map-form').reset();
                        document.getElementById('mapSize').textContent = '1k x 1k';
                        document.getElementById('map-size-value').value = '1';
                        document.getElementById('mapPrice').textContent = '$15';
                    }, 5000);
                });
            },
            
            onError: function(err) {
                console.error('PayPal error:', err);
                const paypalContainer = document.getElementById('custom-map-paypal-button-container');
                if (paypalContainer) {
                    paypalContainer.innerHTML = `
                        <div class="payment-error">
                            <h3>Payment Error</h3>
                            <p>There was a problem processing your payment. Please try again or contact us.</p>
                        </div>`;
                }
            }
        }).render('#custom-map-paypal-button-container');
    } else {
        const paypalContainer = document.getElementById('custom-map-paypal-button-container');
        if (paypalContainer) {
            paypalContainer.innerHTML = `
                <div class="payment-error">
                    <h3>Payment Service Unavailable</h3>
                    <p>We couldn't load the payment service. Please try again later or contact us directly at jockerel.creations@gmail.com</p>
                    <button id="alternativeSubmitBtn" class="btn">Submit Request Without Payment</button>
                </div>`;
                
            // Opción alternativa si PayPal no está disponible
            const alternativeBtn = document.getElementById('alternativeSubmitBtn');
            if (alternativeBtn) {
                alternativeBtn.addEventListener('click', () => {
                    sendCustomMapOrderNotification({
                        ...orderData,
                        paymentStatus: 'Pending'
                    });
                    
                    // Cerrar el modal y mostrar mensaje
                    paymentModal.classList.remove('active');
                    setTimeout(() => {
                        document.body.removeChild(paymentModal);
                        
                        // Limpiar el formulario
                        document.getElementById('custom-map-form').reset();
                        document.getElementById('mapSize').textContent = '1k x 1k';
                        document.getElementById('map-size-value').value = '1';
                        document.getElementById('mapPrice').textContent = '$15';
                        
                        alert(`Thank you for your custom map request!\n\nWe've received your details and will contact you at ${orderData.customerEmail} to arrange payment and discuss your map request.`);
                    }, 300);
                });
            }
        }
    }
}

// Función para enviar la notificación por email del pedido de mapa personalizado
function sendCustomMapOrderNotification(orderData) {
    // Enviar el formulario usando EmailJS
    if (window.emailjs) {
        const serviceID = 'default_service'; // Reemplazar con tu Service ID
        const templateID = 'template_custom_map'; // Reemplazar con tu Template ID
        const templateParams = {
            to_email: 'jockerel.creations@gmail.com',
            from_name: orderData.customerEmail,
            message: `
                Nuevo pedido de mapa personalizado:
                
                Email del cliente: ${orderData.customerEmail}
                Versión de Minecraft: ${orderData.minecraftVersion}
                Tamaño del mapa: ${orderData.mapSize}
                Precio estimado: ${orderData.price}
                Estado del pago: ${orderData.paymentStatus || 'No procesado'}
                ${orderData.transactionID ? 'ID de transacción: ' + orderData.transactionID : ''}
                
                Detalles del mapa:
                ${orderData.mapDetails}
                
                Fecha del pedido: ${new Date().toLocaleString()}
            `
        };
        
        // Enviar el email
        emailjs.send(serviceID, templateID, templateParams)
            .then(function(response) {
                console.log('Email enviado correctamente', response.status, response.text);
            }, function(error) {
                console.error('Error al enviar el email', error);
                // Alternativa: usar la API de Formspree
                submitFormWithFormspree(orderData);
            });
    } else {
        // Si EmailJS no está disponible, usar Formspree como alternativa
        submitFormWithFormspree(orderData);
    }
}

// Función alternativa usando Formspree para enviar el formulario
function submitFormWithFormspree(orderData) {
    // Formspree es una alternativa que no requiere JavaScript adicional
    const formspreeEndpoint = 'https://formspree.io/f/jockerel.creations@gmail.com';
    
    fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            subject: 'New Custom Map Order',
            ...orderData
        })
    })
    .then(response => {
        if (response.ok) {
            console.log('Form successfully submitted to Formspree');
        } else {
            // Usar una solución de respaldo local si todo falla
            console.error('Error al enviar a Formspree', response);
            fallbackLocalAlert(orderData);
        }
    })
    .catch(error => {
        console.error('Error al enviar el formulario', error);
        fallbackLocalAlert(orderData);
    });
}

// Función de respaldo local cuando todo lo demás falla
function fallbackLocalAlert(orderData) {
    console.log('Custom Map Order Details (SAVE THIS):', JSON.stringify(orderData, null, 2));
    
    // Solo mostrar alerta si no hay UI activa informando al usuario
    if (!document.getElementById('customMapPaymentModal')) {
        alert(`Thank you for your custom map request!\n\nOrder details:\n- Minecraft version: ${orderData.minecraftVersion}\n- Size: ${orderData.mapSize}\n- Estimated price: ${orderData.price}\n\nWe will contact you soon at ${orderData.customerEmail} to discuss your map request.\n\nIMPORTANT: Please take a screenshot of this message as a backup.`);
    }
}

// Detectar bloqueador de anuncios
function detectAdBlocker() {
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
}

// Inicializar anuncios en carga diferida
function initLazyAds() {
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