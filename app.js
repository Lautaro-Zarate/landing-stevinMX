// Services Section - Toggle Functionality
function toggleService(header) {
    const serviceItem = header.parentElement;
    const isActive = serviceItem.classList.contains('active');
    
    // Close all other service items
    document.querySelectorAll('.service-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Toggle current item
    if (!isActive) {
        serviceItem.classList.add('active');
    }
}

class MachineCarousel {
            constructor(wrapper) {
                this.wrapper = wrapper;
                this.track = wrapper.querySelector('.machine-carousel-track');
                this.slides = wrapper.querySelectorAll('.machine-slide');
                this.dots = wrapper.querySelectorAll('.machine-dot');
                this.prevBtn = wrapper.querySelector('.machine-nav.machine-prev');
                this.nextBtn = wrapper.querySelector('.machine-nav.machine-next');
                
                this.currentIndex = 0;
                this.totalSlides = this.slides.length;
                
                this.init();
            }

            init() {
                this.updateCarousel();
                this.bindEvents();
                this.startAutoplay();
            }

            bindEvents() {
                this.prevBtn?.addEventListener('click', () => {
                    this.pauseAutoplay();
                    this.prev();
                    this.startAutoplay();
                });
                
                this.nextBtn?.addEventListener('click', () => {
                    this.pauseAutoplay();
                    this.next();
                    this.startAutoplay();
                });
                
                this.dots.forEach((dot, index) => {
                    dot.addEventListener('click', () => {
                        this.pauseAutoplay();
                        this.goToSlide(index);
                        this.startAutoplay();
                    });
                });

                // Touch events for mobile
                let startX = 0;
                let isDragging = false;

                this.track.addEventListener('touchstart', (e) => {
                    startX = e.touches[0].clientX;
                    isDragging = true;
                    this.pauseAutoplay();
                });

                this.track.addEventListener('touchmove', (e) => {
                    if (!isDragging) return;
                    e.preventDefault();
                });

                this.track.addEventListener('touchend', (e) => {
                    if (!isDragging) return;
                    isDragging = false;
                    
                    const endX = e.changedTouches[0].clientX;
                    const diff = startX - endX;
                    
                    if (Math.abs(diff) > 50) {
                        if (diff > 0) {
                            this.next();
                        } else {
                            this.prev();
                        }
                    }
                    
                    this.startAutoplay();
                });

                // Pause autoplay on hover
                this.wrapper.addEventListener('mouseenter', () => this.pauseAutoplay());
                this.wrapper.addEventListener('mouseleave', () => this.startAutoplay());
            }

            updateCarousel() {
                const translateX = -this.currentIndex * 100;
                this.track.style.transform = `translateX(${translateX}%)`;
                
                // Update dots
                this.dots.forEach((dot, index) => {
                    dot.classList.toggle('machine-active', index === this.currentIndex);
                });
            }

            next() {
                this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
                this.updateCarousel();
            }

            prev() {
                this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
                this.updateCarousel();
            }

            goToSlide(index) {
                this.currentIndex = index;
                this.updateCarousel();
            }

            startAutoplay() {
                this.pauseAutoplay();
                this.autoplayInterval = setInterval(() => {
                    this.next();
                }, 5000);
            }

            pauseAutoplay() {
                if (this.autoplayInterval) {
                    clearInterval(this.autoplayInterval);
                }
            }
        }

        // Initialize all carousels when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            const carouselWrappers = document.querySelectorAll('.machine-carousel-wrapper');
            carouselWrappers.forEach(wrapper => {
                new MachineCarousel(wrapper);
            });
        });


// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            submitBtn.textContent = '¡Mensaje Enviado!';
            submitBtn.style.background = 'linear-gradient(135deg, #43e97b, #38f9d7)';
            
            // Reset form
            setTimeout(() => {
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = 'linear-gradient(135deg, #0066cc, #00d4ff)';
            }, 2000);
        }, 1500);
    });

    // Add smooth focus animations
    const inputs = document.querySelectorAll('.form-input, .form-textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 48; // Account for fixed nav
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Close mobile menu when a link is clicked
function initMobileMenu() {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            const checkbox = document.getElementById('menu-toggle');
            if (checkbox.checked) checkbox.checked = false;
        });
    });
}

// reCAPTCHA timestamp function
function timestamp() {
    let response = document.getElementById("g-recaptcha-response");
    if (response == null || response.value.trim() == "") {
        let elems = JSON.parse(document.getElementsByName("captcha_settings")[0].value);
        elems["ts"] = JSON.stringify(new Date().getTime());
        document.getElementsByName("captcha_settings")[0].value = JSON.stringify(elems);
    }
}

// Translation Resources
const translations = {
    es: {
        // Page Title
        pageTitle: "STEVIN - Moldes de Inyección de Plástico y Zamak",
        
        // Navigation
        navHome: "Inicio",
        navAbout: "Nosotros",
        navServices: "Servicios",
        navTechnology: "Tecnología",
        navContact: "Contacto",
        
        // Hero Section
        heroTitle: "Moldes de Inyección de Plástico y Zamak,",
        heroWelcome: "¡Bienvenidos a STEVIN!",
        
        // Services Preview
        servicesTitle: "Servicios",
        servicesDescription1: "Nos dedicamos a algo más que a la fabricación de moldes",
        servicesDescription2: "Hacemos los proyectos realidad asumiendo siempre los retos que supone industrializar nuevos productos de Plástico y Zamak.",
        
        // About Section
        aboutTitle: "Nosotros",
        aboutDescription: "Establecida en el año 2001 por Randolph Mutz, STEVIN es una empresa que atiende las necesidades de diversos clientes en un amplio ramo de industrias como la automotriz, farmacéutica y productos para el hogar.",
        aboutQuote: "Crear moldes a la medida sigue siendo el compromiso que nos distingue",
        
        // Mission, Vision, Values
        missionTitle: "MISIÓN",
        missionContent: "Satisfacer las necesidades de nuestros clientes a través de la fabricación de moldes de inyección de plástico y Zamak, brindándoles excelente servicio y calidad.",
        visionTitle: "VISIÓN",
        visionContent: "Ser líderes en la fabricación de moldes de inyección de Plástico y Zamak, manteniéndonos siempre la mejor calidad y diferenciarnos por nuestra excelencia en el servicio.",
        valuesTitle: "VALORES",
        value1: "Trabajo en Equipo",
        value2: "Compromiso",
        value3: "Honestidad",
        value4: "Puntualidad",
        value5: "Salud y Seguridad",
        value6: "Responsabilidad con el medio ambiente",
        
        // Services Section
        servicesMainTitle: "Servicios",
        servicesSubtitle1: "Desarrollo de Producto, Moldes de Inyección y Dispositivos",
        servicesSubtitle2: "Tenemos como objetivo el crecimiento sostenido de la empresa y el desarrollo profesional de sus colaboradores.",
        
        // Individual Services
        service1Title: "Fabricación de moldes de inyección de plástico y Zamak",
        service1Description: "Gracias a nuestra infraestructura que cuenta con un área de diseño y diversos Centros de Maquinado CNC y a nuestra cultura de precisión alemana, nos es posible integrar verticalmente el proceso de fabricación, desde la etapa del diseño hasta la entrega del molde listo para ser inyectado, asegurando con esto la calidad que nuestros clientes exigen.",
        service2Title: "Inyección de plástico",
        service2Description: "Descubre la excelencia en la inyección de plástico con nuestros servicios de vanguardia. Desde el diseño innovador hasta productos impecablemente terminados, nuestro enfoque de precisión garantiza resultados de alta calidad. Con tecnología de última generación y un compromiso con la satisfacción del cliente, damos vida a tus ideas. Experimenta la diferencia de una inyección de plástico eficiente, adaptada a tus necesidades.",
        service3Title: "Cambios de ingeniería",
        service3Description: "Aplicamos cambios de ingeniería a moldes y piezas en base a las necesidades de nuestros clientes. Gracias a nuestra área de diseño podemos generar propuestas 3D para analizar los cambios de ingeniería y posteriormente llevarlos a cabo en nuestros centros de maquinado.",
        service4Title: "Mantenimiento preventivo y correctivo",
        service4Description: "Desarmamos el molde y reemplazamos todos los elementos de sello, revisamos el sistema de refrigeración y sistema de botado, posteriormente lubricamos y armamos, esto ayuda a que los moldes de nuestros clientes tengan menos interrupciones productivas.",
        service5Title: "Fabricación de dispositivos y bases para laqueado y vibración",
        service5Description: "Desarrollo de dispositivos especializados y bases de precisión para sistemas de localización y posicionamiento en procesos industriales.",
        service6Title: "Inyección de termofijos",
        service6Description: "Servicio completo de inyección de termofijos con control de calidad riguroso y capacidad de producción en serie, especializado en piezas de alta resistencia térmica y mecánica para diversos sectores industriales.",
        
        // Machines Section
        machinesTitle: "Nuestras Máquinas",
        machinesSubtitle: "Contamos con un moderno y equipado taller para así ofrecer resultados eficientes y producir con los más altos niveles de calidad.",
        
        // Machine Specifications
        technologieTitle: "Tecnología",
        machineTitle: "Máquinas CNC",
        machineTitle2: "Máquinas de Inyección",
        machineTitle3: "Calidad",
        // Contact Section
        contactTitle: "¡Contáctanos!",
        contactSubtitle: "Te ayudamos a resolver tus dudas, estamos a una llamada de distancia.",
        
        // Form Labels and Placeholders
        nameLabel: "Nombre",
        namePlaceholder: "Tu nombre",
        lastNameLabel: "Apellido",
        lastNamePlaceholder: "Tu apellido",
        emailLabel: "Email",
        emailPlaceholder: "tu@email.com",
        phoneLabel: "Teléfono",
        phonePlaceholder: "+52 55 1234 5678",
        companyLabel: "Empresa",
        companyPlaceholder: "Nombre de tu empresa",
        descriptionLabel: "Descripción",
        messagePlaceholder: "Cuéntanos sobre tu proyecto...",
        sendBtn: "Enviar Mensaje",
        
        // Location
        locationTitle: "Nuestra Ubicación",
        locationAddress: "Ciudad de México, México",
        
        // Social
        followLinkedIn: "Síguenos en LinkedIn",
        
        // Footer
        footerDescription: "Especialistas en moldes de inyección de plástico y Zamak. Más de 20 años de experiencia ofreciendo soluciones de calidad para la industria automotriz, farmacéutica y productos para el hogar.",
        footerLocation: "Ciudad de México, México",
        footerServicesTitle: "Servicios",
        footerService1: "Moldes de Inyección",
        footerService2: "Inyección de Plástico",
        footerService3: "Cambios de Ingeniería",
        footerService4: "Mantenimiento",
        footerCompanyTitle: "Empresa",
        footerAbout: "Nosotros",
        footerMissionVision: "Misión y Visión",
        footerMachines: "Nuestras Máquinas",
        footerContact: "Contacto",
        footerCopyright: "© 2025 STEVIN. Todos los derechos reservados.",
        footerMadeBy: "Hecho por",
        footerPrivacy: "Aviso de Privacidad",
        privacyPolicy: "Política de Privacidad",
        termsOfUse: "Términos de Uso",

        // Aviso de privacidad
        adviseTitle: "Identidad y domicilio del responsable",
        adviseText: "Con fundamento en los artículos 15 y 16 de la Ley Federal de Protección de Datos Personales en Posesión de Particulares, STEVIN, Sociedad Anónima de Capital Variable (en adelante también referida como la “Sociedad”), por conducto de la Lic. Ana Luisa G. de Mutz, con domicilio en Calle 3RA Sur núm. 30, Colonia la Independencia, 54914, Tultitlán, Estado de México, ES RESPONSABLE del uso y protección de los datos personales que Usted como Titular proporcionará a la Sociedad.",

        adviseTitle2: "Finalidades del tratamiento de los datos personales",
        adviseText2: "Las finalidades del tratamiento de sus datos personales serán las siguientes:",
        advise1: "1.- Emitir comprobantes fiscales digitales",
        advise2: "2.- Realizar depósitos bancarios en las cuentas del titular",
        advise3: "3.- Desarrollar los proyectos solicitados por el titular con base a la información técnica del trabajo a realizar",

        adviseTitle3: "Datos personales que se tratarán",
        adviseText3: "Los datos personales que serán requeridos para cumplir con las finalidades señaladas en el párrafo anterior serán los siguientes:",
        advise4: "1.- Nombre comercial del Titular, en caso de ser aplicable.",
        advise5: "2.- Razón social del Titular en caso de ser aplicable.",
        advise6: "3.- Nombre del Representante Legal del Titular, en caso de ser aplicable.",
        advise7: "4.- Domicilio fiscal del Titular.",
        advise8: "5.- Domicilio de la oficina corporativa o local comercial del Titular.",
        advise9: "6.- Número telefónico y correo electrónico del Titular.",
        advise10: "7.- Los datos bancarios del Titular (Banco, Cuenta, Cuenta Clabe, Nombre).",
        adviseText4: "Adicionalmente, se protegerán los datos personales contenidos en la documentación que Usted como Titular, entrega a la Sociedad, mismos que se enlistan a continuación.",
        advise11: "1.- Credencial para votar del Representante Legal o del mismo Titular.",
        advise12: "2.- R1 del Titular expedido por la Secretaría de Hacienda y Crédito Público.",
        advise13: "3.- Cualquier información técnica del trabajo a realizar, incluyendo planos, fotos y elementos en tercera dimensión.",

        adviseTitle4: "Transferenciad de datos",
        adviseText5: "La Sociedad NO llevará a cabo transferencias de los datos personales recabados y proporcionados por el Titular.",

        adviseTitle5: "Medios para el ejercicio de los derechos arco y medios para limitar el uso o divulgación de sus datos personales",
        adviseText6: "Usted como Titular, tiene derecho a conocer qué datos personales se tienen de usted, para qué se utilizan y las condiciones de uso que se les da (Acceso). Asimismo, es su derecho solicitar la corrección de su información personal en caso de que esté desactualizada, sea inexacta o incompleta (Rectificación); que será eliminada de los registros o bases de datos cuando considere que la misma no está siendo utilizada conforme a los principios deberes y obligaciones previstas en la normativa (Cancelación); así como oponerse al uso de sus datos personales para fines específicos (Oposición). Estos derechos se conocen como Derechos ARCO.",
        adviseText7: "Cualquier solicitud de limitación en el uso o divulgación de sus datos personales o cualquier acto relacionado con el tratamiento de sus datos personales, así como el ejercicio de los Derechos ARCO, usted como Titular se podrá comunicar directamente al número de teléfono 55 2605 3481, con la RESPONSABLE la Lic. Ana Luisa G. de Mutz, quién le hará saber los requisitos de su solicitud, información que deberá acompañar a ésta, plazos de respuesta y los medios de respuesta.",

        adviseTitle6: "Revocación del consentimiento.",
        adviseText8: "Cualquier solicitud de revocación en el uso de sus datos personales, usted como Titular se podrá comunicar directamente al número de teléfono 55 2605 3481, con la RESPONSABLE la Lic. Ana Luisa G. de Mutz, quién le hará saber los requisitos de su solicitud, información que deberá acompañar a ésta, plazos de respuesta y los medios de respuesta.",

        adviseTitle7: "Cambios al aviso de privacidad.",
        adviseText9: "El procedimiento para el cambio de este aviso de privacidad consiste en la obtención de la autorización correspondiente por parte del RESPONSABLE, el medio por el que se comunicará el contenido de dicho cambio, en su caso, será mediante la publicación en el dominio de internet: www.stevin.mx",
        adviseText10: "Firmo de conformidad el presente aviso de privacidad y manifestó mi consentimiento para la utilización de mis datos personales:",
        advise14: "Nombre:",
        advise15: "Firma:",
        advise16: "Fecha:"
    },
    en: {
        // Page Title
        pageTitle: "STEVIN - Plastic and Zamak Injection Molds",
        
        // Navigation
        navHome: "Home",
        navAbout: "About Us",
        navServices: "Services",
        navTechnology: "Technology",
        navContact: "Contact",
        
        // Hero Section
        heroTitle: "Plastic and Zamak Injection Molding,",
        heroWelcome: "Welcome to STEVIN!",
        
        // Services Preview
        servicesTitle: "Services",
        servicesDescription1: "Product development, injection molding and devices",
        servicesDescription2: "We make projects a reality by taking the risks involved in industrializing new plastic and Zamak products.",
        
        // About Section
        aboutTitle: "About Us",
        aboutDescription: "Founded in 2001 by Randolph Mutz, STEVIN is a company that tends to the needs of different clients in a broad range of industries like the automotive, pharmaceutical and home products industries.",
        aboutQuote: "Creating tailor-made molds is how we continue to commit to differentiate ourselves.",
        
        // Mission, Vision, Values
        missionTitle: "MISSION",
        missionContent: "To satisfy the needs of our clients by manufacturing plastic and Zamak injection molding, providing excellent service and quality.",
        visionTitle: "VISION",
        visionContent: "To be the industry leaders in plastic and Zamak injection molding manufacture, distinguishing ourselves with the best quality and excellent service.",
        valuesTitle: "VALUES",
        value1: "Teamwork",
        value2: "Commitment",
        value3: "Honesty",
        value4: "Punctuality",
        value5: "5'S System",
        value6: "Environmental Responsibility",
        
        // Services Section
        servicesMainTitle: "Services",
        servicesSubtitle1: "Product Development, Injection molding and devices",
        servicesSubtitle2: "Our objective is to have sustained company growth alongside the personal development of our collaborators.",
        
        // Individual Services
        service1Title: "Plastic and Zamak injection Molding Production",
        service1Description: "Thanks to our infrastructure, complete with a design area and different CNC Machining Centers, and to our German culture of precision, we can vertically integrate the process of manufacturing, from the design stage to the delivery of the molding ready for injection, ensuring the quality our clients demand and expect.",
        service2Title: "Plastic injection",
        service2Description: "Discover excellence in plastic injection with our cutting-edge services. From innovative design to flawlessly finished products, our precision-driven approach ensures top-quality results. With state-of-the-art technology and a commitment to client satisfaction, we bring your ideas to life. Experience the difference of seamless plastic injection, tailored to your needs.",
        service3Title: "Engineering changes",
        service3Description: "We apply engineering changes to molding and base pieces according to our clients needs. Thanks to our design area, we can generate 3D proposals to analyze engineering changes and then carry them out in our machining centers.",
        service4Title: "Preventive and corrective maintenance",
        service4Description: "We dismantle the molding and replace all of the sealing elements, check the refrigeration and disposal system, and then lubricate and put the mold back together. This helps to keep client molding production interruptions to a minimum.",
        service5Title: "Manufacturing of devices and bases for locators and positioning",
        service5Description: "Development of specialized devices and precision bases for location and positioning systems in industrial processes.",
        service6Title: "Thermoset injection molding",
        service6Description: "Comprehensive thermoset injection molding service with rigorous quality control and serial production capacity, specialized in high thermal and mechanical resistance parts for various industrial sectors.",
        
        // Machines Section
        machinesTitle: "Our Machines",
        machinesSubtitle: "We have a modern and well-equipped workshop for efficient results and to produce with the highest quality standards.",
        
        // Machine Specifications
        technologieTitle: "Technology",
        machineTitle: "CNC Machines",
        machineTitle2: "Injection Molding Machines",
        machineTitle3: "Quality Assurance",
        
        // Contact Section
        contactTitle: "Contact Us!",
        contactSubtitle: "We can answer all your questions; we're just a phone call away.",
        
        // Form Labels and Placeholders
        nameLabel: "Name",
        namePlaceholder: "Your name",
        lastNameLabel: "Last Name",
        lastNamePlaceholder: "Your last name",
        emailLabel: "Email",
        emailPlaceholder: "your@email.com",
        phoneLabel: "Phone",
        phonePlaceholder: "+52 55 1234 5678",
        companyLabel: "Company",
        companyPlaceholder: "Your company name",
        descriptionLabel: "Description",
        messagePlaceholder: "Tell us about your project...",
        sendBtn: "Send Message",
        
        // Location
        locationTitle: "Our Location",
        locationAddress: "Mexico City, Mexico",
        
        // Social
        followLinkedIn: "Follow us on LinkedIn",
        
        // Footer
        footerDescription: "Specialists in plastic and Zamak injection molds. More than 20 years of experience offering quality solutions for the automotive, pharmaceutical and household products industries.",
        footerLocation: "Mexico City, Mexico",
        footerServicesTitle: "Services",
        footerService1: "Injection Molds",
        footerService2: "Plastic Injection",
        footerService3: "Engineering Changes",
        footerService4: "Maintenance",
        footerCompanyTitle: "Company",
        footerAbout: "About Us",
        footerMissionVision: "Mission and Vision",
        footerMachines: "Our Machines",
        footerContact: "Contact",
        footerPrivacy: "Privacy Policy",
        footerCopyright: "© 2025 STEVIN. All rights reserved.",
        footerMadeBy: "Made by",
        privacyPolicy: "Privacy Policy",
        termsOfUse: "Terms of Use",

        // Privacy policy
    adviseTitle: "Identity and address of the responsible party",
    adviseText: "Based on Articles 15 and 16 of the Federal Law on the Protection of Personal Data Held by Private Parties, STEVIN, Sociedad Anónima de Capital Variable (hereinafter also referred to as the “Company”), through Lic. Ana Luisa G. de Mutz, located at Calle 3RA Sur No. 30, Colonia La Independencia, 54914, Tultitlán, State of Mexico, IS RESPONSIBLE for the use and protection of the personal data that you, as the Data Subject, will provide to the Company.",

    adviseTitle2: "Purposes of processing personal data",
    adviseText2: "The purposes of processing your personal data will be the following:",
    advise1: "1.- Issue digital tax receipts",
    advise2: "2.- Make bank deposits into the account of the data subject",
    advise3: "3.- Develop the projects requested by the data subject based on the technical information of the work to be carried out",

    adviseTitle3: "Personal data to be processed",
    adviseText3: "The personal data required to fulfill the purposes mentioned in the previous paragraph will be the following:",
    advise4: "1.- Trade name of the Data Subject, if applicable.",
    advise5: "2.- Corporate name of the Data Subject, if applicable.",
    advise6: "3.- Name of the Legal Representative of the Data Subject, if applicable.",
    advise7: "4.- Tax address of the Data Subject.",
    advise8: "5.- Address of the corporate office or business premises of the Data Subject.",
    advise9: "6.- Telephone number and email address of the Data Subject.",
    advise10: "7.- Banking information of the Data Subject (Bank, Account, CLABE Account, Name).",
    adviseText4: "Additionally, the personal data contained in the documentation that you, as the Data Subject, deliver to the Company will be protected, which are listed below.",
    advise11: "1.- Voting ID card of the Legal Representative or of the Data Subject.",
    advise12: "2.- R1 of the Data Subject issued by the Ministry of Finance and Public Credit.",
    advise13: "3.- Any technical information about the work to be carried out, including plans, photos, and 3D elements.",

    adviseTitle4: "Data transfers",
    adviseText5: "The Company will NOT carry out transfers of personal data collected and provided by the Data Subject.",

    adviseTitle5: "Means for exercising ARCO rights and for limiting the use or disclosure of your personal data",
    adviseText6: "You, as the Data Subject, have the right to know what personal data we hold about you, what it is used for, and the conditions of use given to it (Access). Likewise, it is your right to request the correction of your personal information if it is outdated, inaccurate, or incomplete (Rectification); that it be deleted from the records or databases when you consider that it is not being used in accordance with the principles, duties, and obligations set forth in the regulations (Cancellation); as well as to oppose the use of your personal data for specific purposes (Opposition). These rights are known as ARCO Rights.",
    adviseText7: "Any request to limit the use or disclosure of your personal data or any act related to the processing of your personal data, as well as the exercise of ARCO Rights, may be made directly by contacting the phone number 55 2605 3481, with the RESPONSIBLE party, Lic. Ana Luisa G. de Mutz, who will inform you of the requirements for your request, the information that must accompany it, response deadlines, and means of response.",

    adviseTitle6: "Revocation of consent",
    adviseText8: "Any request for revocation of the use of your personal data may be made directly by contacting the phone number 55 2605 3481, with the RESPONSIBLE party, Lic. Ana Luisa G. de Mutz, who will inform you of the requirements for your request, the information that must accompany it, response deadlines, and means of response.",

    adviseTitle7: "Changes to the privacy notice",
    adviseText9: "The procedure for changing this privacy notice consists of obtaining the corresponding authorization from the RESPONSIBLE party. The means by which the content of such change will be communicated, if applicable, will be through publication on the website: www.stevin.mx",
    adviseText10: "I sign in agreement with this privacy notice and declare my consent for the use of my personal data:",
    advise14: "Name:",
    advise15: "Signature:",
    advise16: "Date:"
    },
    de: {
        // Page Title
        pageTitle: "STEVIN - Kunststoff- und Zamak-Spritzgussformen",
        
        // Navigation
        navHome: "Startseite",
        navAbout: "Über uns",
        navServices: "Unsere leistungen",
        navTechnology: "Technologie",
        navContact: "Kontakt",
        
        // Hero Section
        heroTitle: "Spritzgussformen für Kunststoffe und Zamak,",
        heroWelcome: "Willkommen bei STEVIN!",
        
        // Services Preview
        servicesTitle: "Unsere Leistungen",
        servicesDescription1: "Wir bietenmehr, als der reine Produktion von Spritzgussformen",
        servicesDescription2: "Wir setzen unsere Projekte in die Tat um und stellen uns den Herausforderungen, die eine Industrialisierung von neuen Kunststoff- und Zamakprodukten mit sich bringt.",
        
        // About Section
        aboutTitle: "Über uns",
        aboutDescription: "Das Unternehmen STEVIN wurde im Jahre 2001 von Randolph Mutz gegründet und erfreut sich höchster Kundenzufriedenheit in unterschiedlichen Industriebereichen, wie der Automobilindustrie, Pharmaindustrie oder Herstellung von Haushaltsprodukten.",
        aboutQuote: "Wir widmen uns der maßgerechten Anfertigung von Spritzgussformen. Das ist es, was uns einzigartig macht",
        
        // Mission, Vision, Values
        missionTitle: "MISSION",
        missionContent: "Unserere Kunden zufriedenzustellen durch die Herstellung von Spritzgussformen für Kunststoff und Zamak, bei exzellentem Service und höchster Qualität.",
        visionTitle: "VISION",
        visionContent: "Marktführer in der Herstellung von Spritzgussformen für Kunststoff und Zamak zu sein, dabei höchste Qualität zu bieten und uns durch unsere außergewöhnliche Servicequalität zu behaupten.",
        valuesTitle: "WERTE",
        value1: "Teamarbeit",
        value2: "Verbindlichkeit",
        value3: "Ehrlichkeit",
        value4: "Pünktlichkeit",
        value5: "System 5S",
        value6: "Umweltbewusstes Handeln",
        
        // Services Section
        servicesMainTitle: "Dienstleistungen",
        servicesSubtitle1: "Produktentwicklung, Formen für Spritzguss und Vorrichtungen.",
        servicesSubtitle2: "Unser Ziel ist das nachhaltige Wachstum des Unternehmens und die berufliche Entwicklung der Mitarbeiter.",
        
        // Individual Services
        service1Title: "Herstellung von Spritzgussformen aus Kunststoff und Zamak",
        service1Description: "Unser Geheimnis liegt in der Kombination unserer außerordentlichen Infrastruktur – wir verfügen über eine Design-Abteilung und verschiedene CNC-Bearbeitungszentren – gepaart mit unserer deutschen Mentalität und dem eigenen Anspruch Präzision. So ist es uns möglich, einen übergreifenden Fertigungsprozess zu bieten, von der Planung bis zur Auslieferung der Form.",
        service2Title: "Plastikeinspritzung",
        service2Description: "Entdecken Sie Exzellenz in der Kunststoff-Spritzguss mit unseren modernen Dienstleistungen. Von innovativem Design bis zu makellosen Endprodukten gewährleistet unser präzisionsgetriebener Ansatz erstklassige Ergebnisse. Mit modernster Technologie und einem Engagement für Kundenzufriedenheit setzen wir Ihre Ideen um. Erleben Sie perfekte Kunststoff-Spritzguss-Teile, maßgeschneidert für Ihre Bedürfnisse.",
        service3Title: "Technische Änderungen",
        service3Description: "Wir bieten technische Änderungen von Spritzgussformen und Werkstücken, zugeschnitten auf die Bedürfnisse unserer Kunden. Dank unserer professionellen Design-Abteilung ist es uns möglich, Vorschläge in 3D zu präsentieren und die technischen Änderungen detailliert zu analysieren. Die Durchführung geschieht im Anschluss in unseren Bearbeitungszentren.",
        service4Title: "Präventive und korrektive Wartung",
        service4Description: "Wir demontieren die Form, ersetzen alle Elemente und überprüfen das Start- und Kühlsystem. Anschließend wird die Form eingeschmiert und wieder montiert. Auf diese Weise werden Störungen reduziert.",
        service5Title: "Herstellung von Geräten und Lackierungs- und Schwingungsgrundlagen",
        service5Description: "Entwicklung spezialisierter Geräte und Präzisionsbasen für Lokalisierungs- und Positionierungssysteme in industriellen Prozessen.",
        service6Title: "Spritzgießen von Duroplasten",
        service6Description: "Kompletter Spritzgießservice für Duroplasten mit strengster Qualitätskontrolle und Serienproduktionskapazität, spezialisiert auf Bauteile mit hoher thermischer und mechanischer Beständigkeit für verschiedene Industriebranchen.",
        
        // Machines Section
        machinesTitle: "Unsere Maschinen",
        machinesSubtitle: "Wir verfügen über eine moderne und gut ausgestattete Werkstatt, um effiziente Ergebnisse auf höchsten Qualitätsstufen zu bieten.",
        
        // Machine Specifications
        technologieTitle: "Technologie",
        machineTitle: "CNC-Maschine",
        machineTitle2: "Spritzgießmaschinen",
        machineTitle3: "Qualitätssicherung",
        
        // Contact Section
        contactTitle: "Kontaktiere uns!",
        contactSubtitle: "Gerne stehen wir jederzeit für alle Fragen zur Verfügung. Wir sind nur einen Anruf entfernt.",
        
        // Form Labels and Placeholders
        nameLabel: "Name",
        namePlaceholder: "Ihr Name",
        lastNameLabel: "Nachname",
        lastNamePlaceholder: "Ihr Nachname",
        emailLabel: "E-Mail",
        emailPlaceholder: "ihre@email.com",
        phoneLabel: "Telefon",
        phonePlaceholder: "+52 55 1234 5678",
        companyLabel: "Unternehmen",
        companyPlaceholder: "Ihr Firmenname",
        descriptionLabel: "Beschreibung",
        messagePlaceholder: "Erzählen Sie uns von Ihrem Projekt...",
        sendBtn: "Nachricht senden",
        
        // Location
        locationTitle: "Unser Standort",
        locationAddress: "Mexiko-Stadt, Mexiko",
        
        // Social
        followLinkedIn: "Folgen Sie uns auf LinkedIn",
        
        // Footer
        footerDescription: "Spezialisten für Kunststoff- und Zamak-Spritzgussformen. Mehr als 20 Jahre Erfahrung in der Bereitstellung von Qualitätslösungen für die Automobil-, Pharma- und Haushaltsprodukteindustrie.",
        footerLocation: "Mexiko-Stadt, Mexiko",
        footerServicesTitle: "Dienstleistungen",
        footerService1: "Spritzgussformen",
        footerService2: "Kunststoffspritzguss",
        footerService3: "Konstruktionsänderungen",
        footerService4: "Wartung",
        footerCompanyTitle: "Unternehmen",
        footerAbout: "Über uns",
        footerMissionVision: "Mission und Vision",
        footerMachines: "Unsere Maschinen",
        footerContact: "Kontakt",
        footerPrivacy: "DATENSCHUTZERKLÄRUNG",
        footerCopyright: "© 2025 STEVIN. Alle Rechte vorbehalten.",
        footerMadeBy: "Erstellt von",
        privacyPolicy: "Datenschutzrichtlinie",
        termsOfUse: "Nutzungsbedingungen",

        // Aviso de privacidad

        adviseTitle: "Identität und Adresse des Verantwortlichen",
        adviseText: "Basierend auf den Artikeln 15 und 16 des Bundesgesetzes zum Schutz personenbezogener Daten im Besitz von Privatpersonen ist STEVIN, Sociedad Anónima de Capital Variable (nachfolgend auch als das „Unternehmen“ bezeichnet), vertreten durch Lic. Ana Luisa G. de Mutz, mit Sitz in Calle 3RA Sur Nr. 30, Colonia La Independencia, 54914, Tultitlán, Bundesstaat Mexiko, VERANTWORTLICH für die Nutzung und den Schutz der personenbezogenen Daten, die Sie als Betroffener dem Unternehmen zur Verfügung stellen.",

        adviseTitle2: "Zwecke der Verarbeitung personenbezogener Daten",
        adviseText2: "Die Zwecke der Verarbeitung Ihrer personenbezogenen Daten sind die folgenden:",
        advise1: "1.- Ausstellung digitaler Steuerbelege",
        advise2: "2.- Durchführung von Bankeinzahlungen auf das Konto des Betroffenen",
        advise3: "3.- Entwicklung der vom Betroffenen angeforderten Projekte auf Grundlage der technischen Informationen der auszuführenden Arbeit",

        adviseTitle3: "Zu verarbeitende personenbezogene Daten",
        adviseText3: "Die personenbezogenen Daten, die erforderlich sind, um die im vorherigen Absatz genannten Zwecke zu erfüllen, sind die folgenden:",
        advise4: "1.- Handelsname des Betroffenen, falls zutreffend.",
        advise5: "2.- Firmenname des Betroffenen, falls zutreffend.",
        advise6: "3.- Name des gesetzlichen Vertreters des Betroffenen, falls zutreffend.",
        advise7: "4.- Steuerliche Anschrift des Betroffenen.",
        advise8: "5.- Anschrift des Unternehmenssitzes oder Geschäftslokals des Betroffenen.",
        advise9: "6.- Telefonnummer und E-Mail-Adresse des Betroffenen.",
        advise10: "7.- Bankdaten des Betroffenen (Bank, Konto, CLABE-Konto, Name).",
        adviseText4: "Darüber hinaus werden die personenbezogenen Daten geschützt, die in den Unterlagen enthalten sind, die Sie als Betroffener dem Unternehmen übergeben, und die nachstehend aufgeführt sind.",
        advise11: "1.- Wählerausweis des gesetzlichen Vertreters oder des Betroffenen selbst.",
        advise12: "2.- R1 des Betroffenen, ausgestellt vom Finanzministerium und der öffentlichen Kreditbehörde.",
        advise13: "3.- Alle technischen Informationen über die auszuführende Arbeit, einschließlich Pläne, Fotos und 3D-Elemente.",

        adviseTitle4: "Datenübermittlungen",
        adviseText5: "Das Unternehmen wird KEINE Übermittlungen der vom Betroffenen erhobenen und bereitgestellten personenbezogenen Daten durchführen.",

        adviseTitle5: "Möglichkeiten zur Ausübung der ARCO-Rechte und zur Einschränkung der Nutzung oder Weitergabe Ihrer personenbezogenen Daten",
        adviseText6: "Sie als Betroffener haben das Recht zu erfahren, welche personenbezogenen Daten wir über Sie besitzen, wofür sie verwendet werden und unter welchen Bedingungen (Zugang). Ebenso haben Sie das Recht, die Berichtigung Ihrer personenbezogenen Daten zu verlangen, wenn diese veraltet, unrichtig oder unvollständig sind (Berichtigung); deren Löschung aus den Registern oder Datenbanken, wenn Sie der Ansicht sind, dass sie nicht gemäß den in den Vorschriften festgelegten Grundsätzen, Pflichten und Verpflichtungen verwendet werden (Löschung); sowie der Nutzung Ihrer personenbezogenen Daten für bestimmte Zwecke zu widersprechen (Widerspruch). Diese Rechte sind als ARCO-Rechte bekannt.",
        adviseText7: "Jede Anfrage zur Einschränkung der Nutzung oder Weitergabe Ihrer personenbezogenen Daten oder jeder Akt im Zusammenhang mit der Verarbeitung Ihrer personenbezogenen Daten sowie die Ausübung der ARCO-Rechte können direkt telefonisch unter der Nummer 55 2605 3481 an die VERANTWORTLICHE, Lic. Ana Luisa G. de Mutz, gerichtet werden, die Sie über die Anforderungen Ihrer Anfrage, die beizufügenden Informationen, die Fristen für die Beantwortung und die Antwortmöglichkeiten informiert.",

        adviseTitle6: "Widerruf der Einwilligung",
        adviseText8: "Jede Anfrage zum Widerruf der Nutzung Ihrer personenbezogenen Daten kann direkt telefonisch unter der Nummer 55 2605 3481 an die VERANTWORTLICHE, Lic. Ana Luisa G. de Mutz, gerichtet werden, die Sie über die Anforderungen Ihrer Anfrage, die beizufügenden Informationen, die Fristen für die Beantwortung und die Antwortmöglichkeiten informiert.",

        adviseTitle7: "Änderungen an der Datenschutzerklärung",
        adviseText9: "Das Verfahren zur Änderung dieser Datenschutzerklärung besteht darin, die entsprechende Genehmigung der VERANTWORTLICHEN einzuholen. Die Art und Weise, wie der Inhalt einer solchen Änderung mitgeteilt wird, erfolgt gegebenenfalls durch Veröffentlichung auf der Website: www.stevin.mx",
        adviseText10: "Ich unterzeichne diese Datenschutzerklärung in Übereinstimmung und erkläre meine Einwilligung zur Verwendung meiner personenbezogenen Daten:",
        advise14: "Name:",
        advise15: "Unterschrift:",
        advise16: "Datum:"
    }
};

// i18n Functionality
let currentLanguage = 'es';

function updateContent() {
    // Update regular text content
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
    
    // Update placeholders
    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            element.placeholder = translations[currentLanguage][key];
        }
    });
    
    // Update page title
    const titleElement = document.querySelector('title[data-translate]');
    if (titleElement) {
        const key = titleElement.getAttribute('data-translate');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            titleElement.textContent = translations[currentLanguage][key];
        }
    }
    
    // Update HTML lang attribute
    document.documentElement.lang = currentLanguage;
}

function setLanguage(lang) {
    if (translations[lang]) {
        currentLanguage = lang;
        updateContent();
        localStorage.setItem('selectedLanguage', lang);
        
        // Update flag active states
        document.querySelectorAll('.flag').forEach(flag => {
            flag.classList.remove('active');
        });
        document.querySelector(`.flag[data-lang="${lang}"]`)?.classList.add('active');
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize carousel
    // new MachineCarousel();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize reCAPTCHA timestamp
    setInterval(timestamp, 500);
    
    // Initialize language functionality
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'es';
    setLanguage(savedLanguage);
    
    // Add language flag event listeners
    document.querySelectorAll('.flag[data-lang]').forEach(flag => {
        flag.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            setLanguage(lang);
        });
    });
    
    // Add scroll effect to navigation
    const nav = document.querySelector('.nav');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.8)';
            nav.style.boxShadow = 'none';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections for scroll animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});


        class BrandCarousel {
            constructor() {
                this.track = document.querySelector('.carousel-track-brand');
                this.slides = document.querySelectorAll('.brand-slide');
                this.dots = document.querySelectorAll('.dot');
                this.prevBtn = document.querySelector('.carousel-nav-brand.prev');
                this.nextBtn = document.querySelector('.carousel-nav-brand.next');
                
                this.currentIndex = 0;
                this.slidesToShow = this.getSlidesToShow();
                this.totalSlides = this.slides.length;
                this.maxIndex = Math.max(0, this.totalSlides - this.slidesToShow);
                
                this.init();
            }

            getSlidesToShow() {
                const width = window.innerWidth;
                if (width > 1200) return 7;
                if (width > 992) return 6;
                if (width > 768) return 5;
                if (width > 576) return 4;
                if (width > 400) return 3;
                return 2;
            }

            init() {
                this.updateCarousel();
                this.bindEvents();
                this.startAutoplay();
            }

            bindEvents() {
                this.prevBtn?.addEventListener('click', () => this.prev());
                this.nextBtn?.addEventListener('click', () => this.next());
                
                this.dots.forEach((dot, index) => {
                    dot.addEventListener('click', () => this.goToSlide(index));
                });

                window.addEventListener('resize', () => {
                    this.slidesToShow = this.getSlidesToShow();
                    this.maxIndex = Math.max(0, this.totalSlides - this.slidesToShow);
                    this.currentIndex = Math.min(this.currentIndex, this.maxIndex);
                    this.updateCarousel();
                });

                // Touch events for mobile
                let startX = 0;
                let isDragging = false;

                this.track.addEventListener('touchstart', (e) => {
                    startX = e.touches[0].clientX;
                    isDragging = true;
                    this.pauseAutoplay();
                });

                this.track.addEventListener('touchmove', (e) => {
                    if (!isDragging) return;
                    e.preventDefault();
                });

                this.track.addEventListener('touchend', (e) => {
                    if (!isDragging) return;
                    isDragging = false;
                    
                    const endX = e.changedTouches[0].clientX;
                    const diff = startX - endX;
                    
                    if (Math.abs(diff) > 50) {
                        if (diff > 0) {
                            this.next();
                        } else {
                            this.prev();
                        }
                    }
                    
                    this.startAutoplay();
                });
            }

            updateCarousel() {
                const slideWidth = 100 / this.slidesToShow;
                const translateX = -this.currentIndex * slideWidth;
                
                this.track.style.transform = `translateX(${translateX}%)`;
                
                // Update dots
                this.dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === Math.floor(this.currentIndex / this.slidesToShow));
                });
            }

            next() {
                if (this.currentIndex < this.maxIndex) {
                    this.currentIndex++;
                } else {
                    this.currentIndex = 0; // Loop back to start
                }
                this.updateCarousel();
            }

            prev() {
                if (this.currentIndex > 0) {
                    this.currentIndex--;
                } else {
                    this.currentIndex = this.maxIndex; // Loop to end
                }
                this.updateCarousel();
            }

            goToSlide(dotIndex) {
                this.currentIndex = dotIndex * this.slidesToShow;
                this.currentIndex = Math.min(this.currentIndex, this.maxIndex);
                this.updateCarousel();
            }

            startAutoplay() {
                this.pauseAutoplay();
                this.autoplayInterval = setInterval(() => {
                    this.next();
                }, 4000);
            }

            pauseAutoplay() {
                if (this.autoplayInterval) {
                    clearInterval(this.autoplayInterval);
                }
            }
        }

        // Initialize carousel when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            new BrandCarousel();
        });