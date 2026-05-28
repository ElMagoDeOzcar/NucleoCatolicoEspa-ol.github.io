/* ==========================================================================
   NÚCLEO CATÓLICO ESPAÑOL - INTERACTIVIDAD Y LÓGICA (JAVASCRIPT)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. PANTALLA DE PRECARGA (PRELOADER)
    // ==========================================
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        // Un pequeño retraso para asegurar que todo cargue visualmente
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
        }, 800);
    });

    // En caso de que el evento load falle, ocultar tras 3 segundos
    setTimeout(() => {
        if (preloader.style.visibility !== 'hidden') {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
        }
    }, 3000);


    // ==========================================
    // 2. CABECERA ADAPTATIVA (STICKY HEADER)
    // ==========================================
    const header = document.getElementById('masthead');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Ejecutar al inicio por si hay scroll previo


    // ==========================================
    // 3. MENÚ MÓVIL (DRAWER TOGGLE)
    // ==========================================
    const mobileToggle = document.getElementById('mobile-toggle');
    const mainNavigation = document.getElementById('main-navigation');
    const navLinks = document.querySelectorAll('.menu-link');

    const toggleMobileMenu = () => {
        const isOpen = mobileToggle.getAttribute('aria-expanded') === 'true';
        mobileToggle.setAttribute('aria-expanded', !isOpen);
        mainNavigation.classList.toggle('open');
        document.body.classList.toggle('no-scroll');
    };

    mobileToggle.addEventListener('click', toggleMobileMenu);

    // Cerrar menú al hacer clic en un enlace de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNavigation.classList.contains('open')) {
                toggleMobileMenu();
            }
        });
    });


    // ==========================================
    // 4. SCROLL SPY (ENLACES ACTIVOS EN MENÚ)
    // ==========================================
    const sections = document.querySelectorAll('section');
    
    const scrollSpy = () => {
        let currentSectionId = 'inicio';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120; // Compensar la cabecera
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', scrollSpy);
    scrollSpy();


    // ==========================================
    // 5. EFECTO PARTÍCULAS DORADAS (HERO CANVAS)
    // ==========================================
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let width = canvas.width = canvas.offsetWidth;
        let height = canvas.height = canvas.offsetHeight;

        // Ajustar canvas al redimensionar ventana
        window.addEventListener('resize', () => {
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
        });

        // Clase Partícula (Chispa de luz dorada)
        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * width;
                this.y = height + Math.random() * 50; // Iniciar un poco abajo
                this.size = Math.random() * 3.5 + 0.5;
                this.speedY = Math.random() * 1.5 + 0.5; // Velocidad de subida
                this.speedX = Math.random() * 0.8 - 0.4; // Balanceo horizontal
                this.alpha = Math.random() * 0.5 + 0.3; // Opacidad
                this.fadeRate = Math.random() * 0.005 + 0.002;
            }

            update() {
                this.y -= this.speedY;
                this.x += this.speedX;
                this.alpha -= this.fadeRate;

                // Si la partícula desaparece o sale, reiniciarla
                if (this.alpha <= 0 || this.y < -10) {
                    this.reset();
                }
            }

            draw() {
                ctx.save();
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                // Color dorado cálido
                ctx.fillStyle = `rgba(212, 175, 55, ${this.alpha})`;
                ctx.shadowColor = 'rgba(212, 175, 55, 0.8)';
                ctx.shadowBlur = this.size * 2;
                ctx.fill();
                ctx.restore();
            }
        }

        // Inicializar partículas
        const maxParticles = 65;
        for (let i = 0; i < maxParticles; i++) {
            particles.push(new Particle());
            // Pre-llenar la pantalla para que no comience vacío
            particles[i].y = Math.random() * height;
        }

        // Bucle de animación de chispas
        const animateParticles = () => {
            ctx.clearRect(0, 0, width, height);
            
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
            
            requestAnimationFrame(animateParticles);
        };

        animateParticles();
    }


    // ==========================================
    // 6. ACORDEÓN INTERACTIVO DE BASES
    // ==========================================
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const item = this.parentElement;
            const panel = this.nextElementSibling;
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Cerrar todos los demás paneles
            document.querySelectorAll('.accordion-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherHeader = otherItem.querySelector('.accordion-header');
                    otherHeader.setAttribute('aria-expanded', 'false');
                    const otherPanel = otherItem.querySelector('.accordion-panel');
                    otherPanel.style.maxHeight = null;
                }
            });

            // Conmutar el panel actual
            if (isExpanded) {
                this.setAttribute('aria-expanded', 'false');
                item.classList.remove('active');
                panel.style.maxHeight = null;
            } else {
                this.setAttribute('aria-expanded', 'true');
                item.classList.add('active');
                panel.style.maxHeight = panel.scrollHeight + 'px';
            }
        });
    });


    // ==========================================
    // 7. FORMULARIO DE MILITANCIA POR PASOS
    // ==========================================
    const form = document.getElementById('militancy-form');
    const formSuccess = document.getElementById('form-success');
    const nextBtn = document.querySelector('.btn-next-step');
    const prevBtn = document.querySelector('.btn-prev-step');
    const step1 = document.getElementById('step-1');
    const step2 = document.getElementById('step-2');
    const resetFormBtn = document.querySelector('.btn-reset-form');

    // Validación paso 1
    const validateStep1 = () => {
        const name = document.getElementById('form-name');
        const email = document.getElementById('form-email');
        const age = document.getElementById('form-age');
        const province = document.getElementById('form-province');
        
        let isValid = true;
        
        [name, email, age, province].forEach(input => {
            if (!input.value.trim() || !input.checkValidity()) {
                input.style.borderColor = 'var(--accent-crimson)';
                isValid = false;
            } else {
                input.style.borderColor = 'rgba(255, 255, 255, 0.08)';
            }
        });
        
        return isValid;
    };

    // Botón Siguiente
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (validateStep1()) {
                step1.classList.remove('step-active');
                step2.classList.add('step-active');
            } else {
                alert('Por favor, rellene correctamente todos los campos obligatorios del paso 1.');
            }
        });
    }

    // Botón Anterior
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            step2.classList.remove('step-active');
            step1.classList.add('step-active');
        });
    }

    // Envío del formulario
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validar paso 2 también
            const motivation = document.getElementById('form-motivation');
            const role = document.getElementById('form-role');
            
            if (!motivation.value.trim() || !role.value.trim()) {
                alert('Por favor, complete los campos obligatorios de motivación y rol.');
                return;
            }

            // Simular guardado de lead
            const leadData = {
                nombre: document.getElementById('form-name').value,
                email: document.getElementById('form-email').value,
                edad: document.getElementById('form-age').value,
                provincia: document.getElementById('form-province').value,
                telegram: document.getElementById('form-telegram').value || 'No provisto',
                motivacion: motivation.value,
                rol: role.value,
                fecha: new Date().toLocaleString()
            };

            // Guardar localmente
            let leads = JSON.parse(localStorage.getItem('militancia_solicitudes')) || [];
            leads.push(leadData);
            localStorage.setItem('militancia_solicitudes', JSON.stringify(leads));

            // Transición a éxito
            form.style.display = 'none';
            formSuccess.style.display = 'flex';
        });
    }

    // Botón reiniciar formulario
    if (resetFormBtn) {
        resetFormBtn.addEventListener('click', () => {
            form.reset();
            formSuccess.style.display = 'none';
            form.style.display = 'block';
            step2.classList.remove('step-active');
            step1.classList.add('step-active');
        });
    }


    // ==========================================
    // 8. SIMULADOR DE TIENDA Y MODALES
    // ==========================================
    
    // Base de datos de productos oficiales
    const productsDB = {
        'camiseta-nce': {
            title: "Camiseta Oficial - N.C.E.",
            price: 19.95,
            image: "assets/camiseta_oficial.png",
            desc: "Nuestra camiseta insignia fabricada en algodón de alto gramaje (180g) de producción ética. Presenta un entalle clásico y cómodo con dobles costuras, decorado en el pecho con el gran emblema de la cruz de Núcleo Católico Español en serigrafía dorada de alta durabilidad. Diseñada para resistir el uso diario y los eventos de calle."
        },
        'balaclava-nce': {
            title: "Balaclava Oficial - N.C.E.",
            price: 12.00,
            image: "assets/balaclava_oficial.png",
            desc: "Balaclava táctica militar fabricada en poliéster transpirable térmico y elastano para un ajuste ergonómico perfecto y máxima comodidad bajo cascos o capuchas. Protege del frío y las inclemencias climáticas. Incluye el emblema de la cruz heráldica bordado con hilo de precisión carmesí de alta resistencia en el lateral izquierdo."
        },
        'polo-nce': {
            title: "Polo Oficial - España Católica",
            price: 27.95,
            image: "assets/polo_oficial.png",
            desc: "Polo premium de piqué confeccionado en algodón peinado 100%. Un diseño elegante en negro profundo que cuenta con discretas líneas de la bandera nacional (roja y gualda) tejidas en el ribete del cuello y los puños. En el pecho izquierdo lleva bordada a mano con hilo metálico dorado la cruz tradicionalista del movimiento."
        },
        'bandera-oficial': {
            title: "Bandera de Combate - Borgoña",
            price: 15.95,
            image: "assets/bandera_oficial.png",
            desc: "La gloriosa enseña de los Tercios españoles: la Cruz de Borgoña tradicional en rojo carmesí sobre fondo blanco. Fabricada en poliéster náutico brillante y ultra resistente de 115g para aguantar la intemperie. Dimensiones de 150x90 cm con doble pespunte de refuerzo en las esquinas y vaina lateral con anillas para mástil."
        }
    };

    const productModal = document.getElementById('product-modal');
    const modalClose = document.getElementById('modal-close');
    const viewProductBtns = document.querySelectorAll('.btn-view-product');
    
    let currentSelectedProductKey = null;

    // Abrir Modal de Producto
    const openProductModal = (productKey) => {
        const product = productsDB[productKey];
        if (!product) return;

        currentSelectedProductKey = productKey;

        document.getElementById('modal-title').textContent = product.title;
        document.getElementById('modal-price').textContent = product.price.toFixed(2) + '€';
        document.getElementById('modal-desc').textContent = product.desc;
        document.getElementById('modal-img').src = product.image;
        document.getElementById('modal-img').alt = product.title;

        // Ocultar selector de talla si es bandera
        const sizeContainer = document.getElementById('size-selector-container');
        if (productKey === 'bandera-oficial') {
            sizeContainer.style.display = 'none';
        } else {
            sizeContainer.style.display = 'block';
        }

        // Restablecer talla por defecto a M
        const sizeBtns = document.querySelectorAll('.size-btn');
        sizeBtns.forEach(btn => btn.classList.remove('active'));
        const defaultSizeBtn = Array.from(sizeBtns).find(btn => btn.textContent === 'M');
        if (defaultSizeBtn) defaultSizeBtn.classList.add('active');

        productModal.style.display = 'flex';
        // Animación suave de apertura
        setTimeout(() => {
            productModal.classList.add('modal-active');
        }, 10);
        document.body.classList.add('no-scroll');
    };

    // Cerrar Modal de Producto
    const closeProductModal = () => {
        productModal.classList.remove('modal-active');
        setTimeout(() => {
            productModal.style.display = 'none';
        }, 300);
        document.body.classList.remove('no-scroll');
    };

    viewProductBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productKey = this.getAttribute('data-product');
            openProductModal(productKey);
        });
    });

    if (modalClose) modalClose.addEventListener('click', closeProductModal);

    // Cambiar Talla seleccionada en Modal
    const sizeButtons = document.querySelectorAll('.size-btn');
    sizeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            sizeButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });


    // ==========================================
    // 9. LÓGICA DE CARRITO (CART SIMULATOR)
    // ==========================================
    let cart = JSON.parse(localStorage.getItem('nce_cart')) || [];
    const cartTrigger = document.getElementById('cart-trigger');
    const cartModal = document.getElementById('cart-modal');
    const cartClose = document.getElementById('cart-close');
    const addToCartBtn = document.getElementById('modal-add-to-cart-btn');
    const cartCountBadge = document.getElementById('cart-count');

    // Actualizar badge de cantidad
    const updateCartBadge = () => {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountBadge.textContent = totalItems;
        if (totalItems > 0) {
            cartCountBadge.style.display = 'flex';
        } else {
            cartCountBadge.style.display = 'none';
        }
    };

    // Renderizar items del carrito
    const renderCartItems = () => {
        const cartEmpty = document.getElementById('cart-empty');
        const cartItemsList = document.getElementById('cart-items');
        const cartFooter = document.getElementById('cart-footer');
        const cartTotal = document.getElementById('cart-total');

        if (cart.length === 0) {
            cartEmpty.style.display = 'flex';
            cartItemsList.style.display = 'none';
            cartFooter.style.display = 'none';
            return;
        }

        cartEmpty.style.display = 'none';
        cartItemsList.style.display = 'flex';
        cartFooter.style.display = 'block';
        cartItemsList.innerHTML = '';

        let total = 0;

        cart.forEach((item, index) => {
            const product = productsDB[item.id];
            const itemTotal = product.price * item.quantity;
            total += itemTotal;

            const cartItemHTML = `
                <div class="cart-item">
                    <div class="cart-item-img-wrap">
                        <img src="${product.image}" alt="${product.title}" class="cart-item-img">
                    </div>
                    <div class="cart-item-info">
                        <h4 class="cart-item-title">${product.title}</h4>
                        <div class="cart-item-meta">Talla: ${item.size} | Cant: ${item.quantity}</div>
                        <div class="cart-item-price">${itemTotal.toFixed(2)}€</div>
                    </div>
                    <button class="cart-item-remove-btn" data-index="${index}" aria-label="Eliminar artículo">&times;</button>
                </div>
            `;
            cartItemsList.insertAdjacentHTML('beforeend', cartItemHTML);
        });

        cartTotal.textContent = total.toFixed(2) + '€';

        // Agregar listeners para botones de eliminar
        document.querySelectorAll('.cart-item-remove-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                removeCartItem(index);
            });
        });
    };

    // Añadir artículo al carro
    const addProductToCart = () => {
        if (!currentSelectedProductKey) return;
        
        const product = productsDB[currentSelectedProductKey];
        
        let size = 'N/A';
        if (currentSelectedProductKey !== 'bandera-oficial') {
            const activeSizeBtn = document.querySelector('.size-btn.active');
            size = activeSizeBtn ? activeSizeBtn.textContent : 'M';
        }

        const existingItemIndex = cart.findIndex(item => item.id === currentSelectedProductKey && item.size === size);

        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += 1;
        } else {
            cart.push({
                id: currentSelectedProductKey,
                size: size,
                quantity: 1
            });
        }

        // Guardar y actualizar
        localStorage.setItem('nce_cart', JSON.stringify(cart));
        updateCartBadge();
        closeProductModal();

        // Pequeño efecto visual y apertura automática del carrito para feedback
        setTimeout(() => {
            openCartModal();
        }, 300);
    };

    // Eliminar artículo
    const removeCartItem = (index) => {
        cart.splice(index, 1);
        localStorage.setItem('nce_cart', JSON.stringify(cart));
        updateCartBadge();
        renderCartItems();
    };

    // Abrir Modal de Carrito
    const openCartModal = () => {
        renderCartItems();
        cartModal.style.display = 'flex';
        setTimeout(() => {
            cartModal.classList.add('modal-active');
        }, 10);
        document.body.classList.add('no-scroll');
    };

    // Cerrar Modal de Carrito
    const closeCartModal = () => {
        cartModal.classList.remove('modal-active');
        setTimeout(() => {
            cartModal.style.display = 'none';
        }, 300);
        document.body.classList.remove('no-scroll');
    };

    if (addToCartBtn) addToCartBtn.addEventListener('click', addProductToCart);
    if (cartTrigger) cartTrigger.addEventListener('click', openCartModal);
    if (cartClose) cartClose.addEventListener('click', closeCartModal);

    // Enlace de compra rápida en el mensaje de carro vacío
    document.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('btn-shop-now')) {
            closeCartModal();
        }
    });

    // Inicializar badge al cargar
    updateCartBadge();


    // ==========================================
    // 10. CERRAR MODALES AL HACER CLICK FUERA
    // ==========================================
    window.addEventListener('click', (e) => {
        if (e.target === productModal) {
            closeProductModal();
        }
        if (e.target === cartModal) {
            closeCartModal();
        }
    });


    // ==========================================
    // 11. BOTÓN VOLVER ARRIBA (SCROLL TO TOP)
    // ==========================================
    const scrollTopBtn = document.getElementById('scroll-to-top');

    const checkScrollTopVisibility = () => {
        if (window.scrollY > 500) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.pointerEvents = 'auto';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.pointerEvents = 'none';
        }
    };

    if (scrollTopBtn) {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.pointerEvents = 'none';
        scrollTopBtn.style.transition = 'var(--transition-fast)';
        
        window.addEventListener('scroll', checkScrollTopVisibility);
        
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

});
