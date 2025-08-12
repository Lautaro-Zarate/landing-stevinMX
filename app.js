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

// Machine Carousel Class
class MachineCarousel {
    constructor() {
        this.track = document.getElementById('carouselTrack');
        this.slides = this.track ? this.track.children : [];
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.indicatorsContainer = document.getElementById('indicators');
        this.currentSlide = 0;
        this.totalSlides = this.slides.length;
        
        if (this.track && this.totalSlides > 0) {
            this.init();
        }
    }

    init() {
        this.createIndicators();
        this.updateCarousel();
        this.bindEvents();
        this.startAutoPlay();
    }

    createIndicators() {
        if (!this.indicatorsContainer) return;
        
        for (let i = 0; i < this.totalSlides; i++) {
            const indicator = document.createElement('div');
            indicator.className = 'indicator';
            indicator.addEventListener('click', () => this.goToSlide(i));
            this.indicatorsContainer.appendChild(indicator);
        }
    }

    updateCarousel() {
        if (!this.track) return;
        
        const translateX = -this.currentSlide * 100;
        this.track.style.transform = `translateX(${translateX}%)`;
        
        // Update indicators
        if (this.indicatorsContainer) {
            const indicators = this.indicatorsContainer.children;
            for (let i = 0; i < indicators.length; i++) {
                indicators[i].classList.toggle('active', i === this.currentSlide);
            }
        }
        
        // Update buttons
        if (this.prevBtn) this.prevBtn.disabled = this.currentSlide === 0;
        if (this.nextBtn) this.nextBtn.disabled = this.currentSlide === this.totalSlides - 1;
    }

    goToSlide(index) {
        this.currentSlide = Math.max(0, Math.min(index, this.totalSlides - 1));
        this.updateCarousel();
        this.resetAutoPlay();
    }

    nextSlide() {
        if (this.currentSlide < this.totalSlides - 1) {
            this.currentSlide++;
        } else {
            this.currentSlide = 0; // Loop back to first slide
        }
        this.updateCarousel();
    }

    prevSlide() {
        if (this.currentSlide > 0) {
            this.currentSlide--;
        } else {
            this.currentSlide = this.totalSlides - 1; // Loop to last slide
        }
        this.updateCarousel();
    }

    bindEvents() {
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.nextSlide();
                this.resetAutoPlay();
            });
        }
        
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.prevSlide();
                this.resetAutoPlay();
            });
        }

        // Touch/swipe support
        if (this.track) {
            let startX = 0;
            let endX = 0;

            this.track.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
            });

            this.track.addEventListener('touchend', (e) => {
                endX = e.changedTouches[0].clientX;
                const diff = startX - endX;
                
                if (Math.abs(diff) > 50) { // Minimum swipe distance
                    if (diff > 0) {
                        this.nextSlide();
                    } else {
                        this.prevSlide();
                    }
                    this.resetAutoPlay();
                }
            });
        }
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000); // Change slide every 5 seconds
    }

    resetAutoPlay() {
        clearInterval(this.autoPlayInterval);
        this.startAutoPlay();
    }
}

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
        service1Description: "Diseño y fabricación de moldes de alta precisión para inyección de plástico y Zamak, utilizando tecnología de vanguardia y materiales de primera calidad.",
        service2Title: "Inyección de plástico",
        service2Description: "Servicio completo de inyección de plástico con control de calidad riguroso y capacidad de producción en serie para diversos sectores industriales.",
        service3Title: "Cambios de ingeniería",
        service3Description: "Modificaciones y mejoras en diseños existentes, optimización de procesos y adaptación de moldes para nuevos requerimientos del cliente.",
        service4Title: "Mantenimiento preventivo y correctivo",
        service4Description: "Programas de mantenimiento especializado para moldes y equipos, garantizando la máxima vida útil y rendimiento óptimo de sus herramientas.",
        service5Title: "Fabricación de dispositivos y bases para localizadores y ubicación",
        service5Description: "Desarrollo de dispositivos especializados y bases de precisión para sistemas de localización y posicionamiento en procesos industriales.",
        service6Title: "Inyección de termofijos",
        service6Description: "Servicio completo de inyección de termofijos con control de calidad riguroso y capacidad de producción en serie, especializado en piezas de alta resistencia térmica y mecánica para diversos sectores industriales.",
        
        // Machines Section
        machinesTitle: "Nuestras Máquinas",
        machinesSubtitle: "Contamos con un moderno y equipado taller para así ofrecer resultados eficientes y producir con los más altos niveles de calidad.",
        
        // Machine Specifications
        specDiameter: "Diámetro",
        specLength: "Largo",
        specPrecision: "Precisión",
        specSpeed: "Velocidad",
        specTableX: "Mesa X",
        specTableY: "Mesa Y",
        specAxisZ: "Eje Z",
        specSpindle: "Husillo",
        specChuck: "Chuck",
        specCapacity: "Capacidad",
        specPower: "Potencia",
        specTorque: "Torque",
        specMaxDiameter: "Diámetro Max",
        specTools: "Herramientas",
        specControl: "Control",
        cncMachines: "MÁQUINAS CNC",
        injectionMachines: "MÁQUINAS DE INYECCIÓN",
        opticalComparator: "COMPARADOR ÓPTICO",
        
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
        privacyPolicy: "Política de Privacidad",
        termsOfUse: "Términos de Uso"
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
        heroTitle: "Plastic and Zamak Injection Molds,",
        heroWelcome: "Welcome to STEVIN!",
        
        // Services Preview
        servicesTitle: "Services",
        servicesDescription1: "We are dedicated to more than just mold manufacturing",
        servicesDescription2: "We make projects a reality by always taking on the challenges of industrializing new Plastic and Zamak products.",
        
        // About Section
        aboutTitle: "About Us",
        aboutDescription: "Established in 2001 by Randolph Mutz, STEVIN is a company that serves the needs of various clients in a wide range of industries such as automotive, pharmaceutical and household products.",
        aboutQuote: "Creating custom molds remains the commitment that distinguishes us",
        
        // Mission, Vision, Values
        missionTitle: "MISSION",
        missionContent: "To satisfy our customers' needs through the manufacture of plastic and Zamak injection molds, providing them with excellent service and quality.",
        visionTitle: "VISION",
        visionContent: "To be leaders in the manufacture of Plastic and Zamak injection molds, always maintaining the best quality and differentiating ourselves through our excellence in service.",
        valuesTitle: "VALUES",
        value1: "Teamwork",
        value2: "Commitment",
        value3: "Honesty",
        value4: "Punctuality",
        value5: "Health and Safety",
        value6: "Environmental Responsibility",
        
        // Services Section
        servicesMainTitle: "Services",
        servicesSubtitle1: "Product Development, Injection Molds and Devices",
        servicesSubtitle2: "We aim for sustained company growth and professional development of our collaborators.",
        
        // Individual Services
        service1Title: "Manufacturing of plastic and Zamak injection molds",
        service1Description: "Design and manufacture of high-precision molds for plastic and Zamak injection, using cutting-edge technology and top-quality materials.",
        service2Title: "Plastic injection",
        service2Description: "Complete plastic injection service with rigorous quality control and series production capacity for various industrial sectors.",
        service3Title: "Engineering changes",
        service3Description: "Modifications and improvements to existing designs, process optimization and mold adaptation for new customer requirements.",
        service4Title: "Preventive and corrective maintenance",
        service4Description: "Specialized maintenance programs for molds and equipment, guaranteeing maximum useful life and optimal performance of your tools.",
        service5Title: "Manufacturing of devices and bases for locators and positioning",
        service5Description: "Development of specialized devices and precision bases for location and positioning systems in industrial processes.",
        service6Title: "Thermoset injection",
        service6Description: "Complete thermoset injection service with rigorous quality control and series production capacity, specialized in parts with high thermal and mechanical resistance for various industrial sectors.",
        
        // Machines Section
        machinesTitle: "Our Machines",
        machinesSubtitle: "We have a modern and equipped workshop to offer efficient results and produce with the highest quality levels.",
        
        // Machine Specifications
        specDiameter: "Diameter",
        specLength: "Length",
        specPrecision: "Precision",
        specSpeed: "Speed",
        specTableX: "Table X",
        specTableY: "Table Y",
        specAxisZ: "Z Axis",
        specSpindle: "Spindle",
        specChuck: "Chuck",
        specCapacity: "Capacity",
        specPower: "Power",
        specTorque: "Torque",
        specMaxDiameter: "Max Diameter",
        specTools: "Tools",
        specControl: "Control",
        cncMachines: "CNC MACHINES",
        injectionMachines: "INJECTION MACHINES",
        opticalComparator: "OPTICAL COMPARATOR",
        
        // Contact Section
        contactTitle: "Contact Us!",
        contactSubtitle: "We help you solve your doubts, we are just a phone call away.",
        
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
        footerCopyright: "© 2025 STEVIN. All rights reserved.",
        footerMadeBy: "Made by",
        privacyPolicy: "Privacy Policy",
        termsOfUse: "Terms of Use"
    },
    de: {
        // Page Title
        pageTitle: "STEVIN - Kunststoff- und Zamak-Spritzgussformen",
        
        // Navigation
        navHome: "Startseite",
        navAbout: "Über uns",
        navServices: "Dienstleistungen",
        navTechnology: "Technologie",
        navContact: "Kontakt",
        
        // Hero Section
        heroTitle: "Kunststoff- und Zamak-Spritzgussformen,",
        heroWelcome: "Willkommen bei STEVIN!",
        
        // Services Preview
        servicesTitle: "Dienstleistungen",
        servicesDescription1: "Wir widmen uns mehr als nur der Formherstellung",
        servicesDescription2: "Wir verwirklichen Projekte, indem wir immer die Herausforderungen der Industrialisierung neuer Kunststoff- und Zamak-Produkte annehmen.",
        
        // About Section
        aboutTitle: "Über uns",
        aboutDescription: "STEVIN wurde 2001 von Randolph Mutz gegründet und ist ein Unternehmen, das die Bedürfnisse verschiedener Kunden in einem breiten Spektrum von Branchen wie Automobil, Pharmazie und Haushaltsprodukte bedient.",
        aboutQuote: "Die Herstellung maßgeschneiderter Formen bleibt das Engagement, das uns auszeichnet",
        
        // Mission, Vision, Values
        missionTitle: "MISSION",
        missionContent: "Die Bedürfnisse unserer Kunden durch die Herstellung von Kunststoff- und Zamak-Spritzgussformen zu erfüllen und ihnen exzellenten Service und Qualität zu bieten.",
        visionTitle: "VISION",
        visionContent: "Führend in der Herstellung von Kunststoff- und Zamak-Spritzgussformen zu sein, dabei stets die beste Qualität zu gewährleisten und uns durch unsere Exzellenz im Service zu unterscheiden.",
        valuesTitle: "WERTE",
        value1: "Teamarbeit",
        value2: "Engagement",
        value3: "Ehrlichkeit",
        value4: "Pünktlichkeit",
        value5: "Gesundheit und Sicherheit",
        value6: "Umweltverantwortung",
        
        // Services Section
        servicesMainTitle: "Dienstleistungen",
        servicesSubtitle1: "Produktentwicklung, Spritzgussformen und Geräte",
        servicesSubtitle2: "Wir streben nachhaltiges Unternehmenswachstum und die berufliche Entwicklung unserer Mitarbeiter an.",
        
        // Individual Services
        service1Title: "Herstellung von Kunststoff- und Zamak-Spritzgussformen",
        service1Description: "Design und Herstellung hochpräziser Formen für Kunststoff- und Zamak-Spritzguss unter Verwendung modernster Technologie und hochwertiger Materialien.",
        service2Title: "Kunststoffspritzguss",
        service2Description: "Kompletter Kunststoffspritzguss-Service mit rigoroser Qualitätskontrolle und Serienproduktionskapazität für verschiedene Industriezweige.",
        service3Title: "Konstruktionsänderungen",
        service3Description: "Modifikationen und Verbesserungen bestehender Designs, Prozessoptimierung und Formanpassung für neue Kundenanforderungen.",
        service4Title: "Vorbeugende und korrektive Wartung",
        service4Description: "Spezialisierte Wartungsprogramme für Formen und Ausrüstung, die maximale Lebensdauer und optimale Leistung Ihrer Werkzeuge gewährleisten.",
        service5Title: "Herstellung von Geräten und Basen für Lokalisatoren und Positionierung",
        service5Description: "Entwicklung spezialisierter Geräte und Präzisionsbasen für Lokalisierungs- und Positionierungssysteme in industriellen Prozessen.",
        service6Title: "Duroplast-Spritzguss",
        service6Description: "Kompletter Duroplast-Spritzguss-Service mit rigoroser Qualitätskontrolle und Serienproduktionskapazität, spezialisiert auf Teile mit hoher thermischer und mechanischer Beständigkeit für verschiedene Industriezweige.",
        
        // Machines Section
        machinesTitle: "Unsere Maschinen",
        machinesSubtitle: "Wir verfügen über eine moderne und ausgestattete Werkstatt, um effiziente Ergebnisse zu liefern und mit höchsten Qualitätsstandards zu produzieren.",
        
        // Machine Specifications
        specDiameter: "Durchmesser",
        specLength: "Länge",
        specPrecision: "Präzision",
        specSpeed: "Geschwindigkeit",
        specTableX: "Tisch X",
        specTableY: "Tisch Y",
        specAxisZ: "Z-Achse",
        specSpindle: "Spindel",
        specChuck: "Spannfutter",
        specCapacity: "Kapazität",
        specPower: "Leistung",
        specTorque: "Drehmoment",
        specMaxDiameter: "Max. Durchmesser",
        specTools: "Werkzeuge",
        specControl: "Steuerung",
        cncMachines: "CNC-MASCHINEN",
        injectionMachines: "SPRITZGUSSMASCHINEN",
        opticalComparator: "OPTISCHER KOMPARATOR",
        
        // Contact Section
        contactTitle: "Kontaktieren Sie uns!",
        contactSubtitle: "Wir helfen Ihnen bei der Lösung Ihrer Fragen, wir sind nur einen Anruf entfernt.",
        
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
        footerCopyright: "© 2025 STEVIN. Alle Rechte vorbehalten.",
        footerMadeBy: "Erstellt von",
        privacyPolicy: "Datenschutzrichtlinie",
        termsOfUse: "Nutzungsbedingungen"
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
    new MachineCarousel();
    
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
