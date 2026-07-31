const header = document.getElementById("header");
const menuButton = document.getElementById("menu-button");
const nav = document.getElementById("nav");

window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 24);
});

menuButton.addEventListener("click", () => {
    nav.classList.toggle("open");
});

nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => nav.classList.remove("open"));
});

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.14 });

document.querySelectorAll(".reveal").forEach(item => observer.observe(item));


document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById("ticker-track");
    if (!track) return;

    // 1. Clonar el contenido lo suficiente para llenar cualquier pantalla
    const originalContent = track.innerHTML;
    
    // Duplicamos unas 4 veces por seguridad para pantallas Ultra-Wide (4K)
    for (let i = 0; i < 4; i++) {
        track.innerHTML += originalContent;
    }

    // 2. Calcular cuánto mide un solo bloque original para saber cuándo reiniciar
    // Creamos un clon temporal para medir exactamente el ancho original con sus gaps
    const totalItems = track.children.length / 5; // Dividido entre el total de copias
    let originalWidth = 0;
    
    for (let i = 0; i < totalItems; i++) {
        originalWidth += track.children[i].offsetWidth + 30; // 30 es el gap en px
    }

    let speed = 1.5; // Velocidad del ticker (puedes subir a 1.5 o 2 si lo quieres más rápido)
    let position = 0;

    function animateTicker() {
        position -= speed;

        // Si ya se desplazó el equivalente a un bloque original completo, reinicia a 0 sin parpadeos
        if (Math.abs(position) >= originalWidth) {
            position = 0;
        }

        track.style.transform = `translateX(${position}px)`;
        requestAnimationFrame(animateTicker);
    }

    // Iniciar la animación de forma fluida
    requestAnimationFrame(animateTicker);
});


window.addEventListener('scroll', () => {
    const logo = document.querySelector('.js-rotate-logo');
    if (!logo) return;

    // Obtiene la posición actual del scroll
    const scrollPosition = window.scrollY;
    
    // Multiplica por una velocidad (0.25 para un giro suave, auméntalo si quieres que gire más rápido)
    const rotationDegree = scrollPosition * 0.25; 

    // Aplica la rotación en 2D al logo
    logo.style.transform = `rotate(${rotationDegree}deg)`;
});


// Seleccionamos la imagen por su ID
    const logoRodante = document.getElementById('logo-rodante');

    // Escuchamos el evento de scroll en la ventana
    window.addEventListener('scroll', () => {
        // Obtenemos la cantidad de píxeles desplazados verticalmente
        const scrollActual = window.scrollY;
        
        // Multiplicamos por 0.4 para darle una velocidad de giro fluida
        const grados = scrollActual * 0.4;
        
        // Aplicamos la rotación
        logoRodante.style.transform = `rotate(${grados}deg)`;
    });
