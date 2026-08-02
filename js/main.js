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


    document.addEventListener('DOMContentLoaded', () => {
    const path = document.querySelector('#svg-mono');
    const container = document.querySelector('.intro-process-wrapper');
    
    if (!path || !container) return;

    const pathLength = path.getTotalLength();

    // Inicializa el estado oculto del trazo
    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;

    function animateOnScroll() {
        const rect = container.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Porcentaje base de scroll
        const totalDistance = rect.height + windowHeight;
        const currentProgress = (windowHeight - rect.top) / totalDistance;

        // ⚡ MULTIPLICADOR DE VELOCIDAD:
        // Multiplicamos por 1.8 (o 2.0) para que se complete antes de que la sección salga de pantalla
        const speedMultiplier = 1.8; 
        const scrollPercentage = Math.min(Math.max(currentProgress * speedMultiplier, 0), 1);

        // Dibuja la línea dinámicamente
        const drawLength = pathLength * scrollPercentage;
        path.style.strokeDashoffset = pathLength - drawLength;
    }

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
});

// Efecto de escritura para múltiples bloques de texto

function crearEfectoEscritura(elementId, listaPalabras) {
    const elementoTexto = document.getElementById(elementId);
    if (!elementoTexto) return;

    let palabraIndex = 0;
    let charIndex = 0;
    let estaBorrando = false;

    const VELOCIDAD_ESCRIBIR = 100;
    const VELOCIDAD_BORRAR = 50;
    const TIEMPO_ESPERA = 2000;

    function animar() {
        const palabraActual = listaPalabras[palabraIndex];

        if (estaBorrando) {
            elementoTexto.textContent = palabraActual.substring(0, charIndex - 1);
            charIndex--;
        } else {
            elementoTexto.textContent = palabraActual.substring(0, charIndex + 1);
            charIndex++;
        }

        let tiempoSiguiente = estaBorrando ? VELOCIDAD_BORRAR : VELOCIDAD_ESCRIBIR;

        if (!estaBorrando && charIndex === palabraActual.length) {
            tiempoSiguiente = TIEMPO_ESPERA;
            estaBorrando = true;
        } else if (estaBorrando && charIndex === 0) {
            estaBorrando = false;
            palabraIndex = (palabraIndex + 1) % listaPalabras.length;
            tiempoSiguiente = 400;
        }

        setTimeout(animar, tiempoSiguiente);
    }

    animar();
}

document.addEventListener("DOMContentLoaded", () => {
    // Bloque 1: Para marcas
    crearEfectoEscritura("typed-experiencias", [
        "experiencias.",
        "resultados.",
        "ventas.",
        "conexiones."
    ]);

    // Bloque 2: Para empresas
    crearEfectoEscritura("typed-trabajan", [
        "trabajan",
        "venden",
        "crecen",
        "destacan"
    ]);

    // Bloque 3: Para proyectos
    crearEfectoEscritura("typed-realidad", [
        "realidad.",
        "impacto.",
        "ejecución.",
        "físico."
    ]);
});