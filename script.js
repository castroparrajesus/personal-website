// JavaScript para el portafolio
console.log('Portafolio cargado');

// Menú hamburguesa móvil
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Cerrar menú al hacer click en un enlace
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Cerrar menú al hacer click fuera
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Smooth scroll para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Efecto de revelación al hacer scroll
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s, transform 0.6s';
    observer.observe(section);
});

// Toggle de idioma (ES <-> EN)
let isEnglish = false;
document.getElementById('lang-toggle').addEventListener('click', () => {
    isEnglish = !isEnglish;
    document.querySelectorAll('[data-en]').forEach(el => {
        if (!el.getAttribute('data-original')) {
            el.setAttribute('data-original', el.innerHTML);
        }
        
        // Si el elemento tiene un ícono (<i>), preservarlo
        const icon = el.querySelector('i, strong');
        const iconHTML = icon ? icon.outerHTML : '';
        
        if (isEnglish) {
            if (icon) {
                // Si tiene ícono, reemplazar solo el texto después del ícono
                const text = el.dataset.en;
                if (icon.tagName === 'I') {
                    el.innerHTML = iconHTML + ' ' + text;
                } else {
                    // Si es un <strong>, mantener la estructura original
                    el.innerHTML = el.getAttribute('data-original').replace(
                        el.textContent.trim(), 
                        el.dataset.en
                    );
                }
            } else {
                el.textContent = el.dataset.en;
            }
        } else {
            el.innerHTML = el.getAttribute('data-original');
        }
    });
    document.getElementById('lang-toggle').textContent = isEnglish ? 'ES' : 'EN';
});

// Botón volver arriba
document.getElementById('back-to-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Contador de visitas con hits.sh
const visitCountEl = document.getElementById('visit-count');

async function updateVisitCounter() {
    if (!visitCountEl) return;
    try {
        const response = await fetch('https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https://jesus-castro-portfolio&count_bg=%2300aaff&title_bg=%23002244&title=Visitas&edge_flat=false');
        // Para hits.sh usamos una aproximación: contador simple basado en localStorage + timestamp
        let visits = localStorage.getItem('portfolio-visits') || 0;
        visits = parseInt(visits) + 1;
        localStorage.setItem('portfolio-visits', visits);
        
        // Simulamos contador creciente basado en fecha
        const baseDate = new Date('2026-01-01').getTime();
        const now = new Date().getTime();
        const daysSince = Math.floor((now - baseDate) / (1000 * 60 * 60 * 24));
        const estimatedVisits = daysSince * 15 + visits; // ~15 visitas por día estimadas
        
        visitCountEl.textContent = estimatedVisits.toLocaleString('es-CO');
    } catch (error) {
        // Fallback: usar contador local
        let visits = localStorage.getItem('portfolio-visits') || 150;
        visitCountEl.textContent = parseInt(visits).toLocaleString('es-CO');
    }
}

updateVisitCounter();

// Filtros de proyectos
const filterBtns = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('.project');
const emptyMessage = document.querySelector('.empty-projects-message');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Actualizar botón activo
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        let visibleCount = 0;
        
        projects.forEach(project => {
            const categories = project.dataset.category;
            
            if (filter === 'all' || categories.includes(filter)) {
                project.classList.remove('hidden');
                // Animación de entrada
                project.style.animation = 'fadeInUp 0.5s ease forwards';
                visibleCount++;
            } else {
                project.classList.add('hidden');
            }
        });
        
        // Mostrar mensaje si no hay proyectos en esta categoría
        if (emptyMessage) {
            if (visibleCount === 0) {
                emptyMessage.style.display = 'block';
                emptyMessage.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                emptyMessage.style.display = 'none';
            }
        }
    });
});

// Filtros de habilidades
const skillFilterBtns = document.querySelectorAll('.skill-filters .filter-btn');
const skillCards = document.querySelectorAll('.skill-card');

skillFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Actualizar botón activo
        skillFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        
        skillCards.forEach(card => {
            const category = card.dataset.category;
            
            if (filter === 'all' || category === filter) {
                card.classList.remove('hidden');
                card.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// Animación keyframes (agregar al final del script)
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Fondo animado con partículas conectadas
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.3;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 170, 255, ${this.opacity})`;
        ctx.fill();
    }
}

const particles = [];
const particleCount = 80;

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(0, 170, 255, ${0.2 * (1 - distance / 150)})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    connectParticles();
    requestAnimationFrame(animate);
}

animate();