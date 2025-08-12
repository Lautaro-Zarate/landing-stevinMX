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

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize carousel
    new MachineCarousel();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
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

// Language flag functionality (placeholder)
document.addEventListener('DOMContentLoaded', function() {
    const flags = document.querySelectorAll('.flag');
    
    flags.forEach(flag => {
        flag.addEventListener('click', function() {
            // Remove active class from all flags
            flags.forEach(f => f.classList.remove('active'));
            
            // Add active class to clicked flag
            this.classList.add('active');
            
            // Here you would implement actual language switching
            console.log('Language switched to:', this.classList.contains('us') ? 'English' : 'Deutsch');
        });
    });
});
// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
    const checkbox = document.getElementById('menu-toggle');
    if (checkbox.checked) checkbox.checked = false;
    });
});

function timestamp() {
    let response = document.getElementById("g-recaptcha-response");
    if (response == null || response.value.trim() == "") {
        let elems = JSON.parse(document.getElementsByName("captcha_settings")[0].value);
        elems["ts"] = JSON.stringify(new Date().getTime());
        document.getElementsByName("captcha_settings")[0].value = JSON.stringify(elems);
    }
}
setInterval(timestamp, 500);

// Diccionario de traducciones
const translations = {
    es: {
        title: "Bienvenido a nuestra página",
        description: "Ofrecemos los mejores servicios para tu negocio.",
        nameLabel: "Nombre",
        namePlaceholder: "Ingresa tu nombre",
        emailLabel: "Correo electrónico",
        emailPlaceholder: "Ingresa tu correo",
        messageLabel: "Mensaje",
        messagePlaceholder: "Escribe tu mensaje",
        sendBtn: "Enviar"
    },
    en: {
        title: "Welcome to our website",
        description: "We offer the best services for your business.",
        nameLabel: "Name",
        namePlaceholder: "Enter your name",
        emailLabel: "Email",
        emailPlaceholder: "Enter your email",
        messageLabel: "Message",
        messagePlaceholder: "Write your message",
        sendBtn: "Send"
    },
    de: {
        title: "Willkommen auf unserer Website",
        description: "Wir bieten die besten Dienstleistungen für Ihr Unternehmen an.",
        nameLabel: "Name",
        namePlaceholder: "Geben Sie Ihren Namen ein",
        emailLabel: "E-Mail",
        emailPlaceholder: "Geben Sie Ihre E-Mail ein",
        messageLabel: "Nachricht",
        messagePlaceholder: "Schreiben Sie Ihre Nachricht",
        sendBtn: "Senden"
    }
};

// Función para cambiar idioma
function setLanguage(lang) {
    // Textos
    document.querySelectorAll("[data-translate]").forEach(el => {
        const key = el.getAttribute("data-translate");
        el.textContent = translations[lang][key];
    });

    // Placeholders
    document.querySelectorAll("[data-placeholder]").forEach(el => {
        const key = el.getAttribute("data-placeholder");
        el.placeholder = translations[lang][key];
    });

    localStorage.setItem("lang", lang); // Guardar idioma
}

// Listeners para las banderas
document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
});

// Idioma inicial
document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem("lang") || "es";
    setLanguage(savedLang);
});
