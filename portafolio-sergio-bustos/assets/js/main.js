document.body.classList.add('js-enabled');

// Cambiador de Tema
const themeBtn = document.getElementById('theme-toggle');
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    if (currentTheme === 'light') {
      document.body.removeAttribute('data-theme');
      themeBtn.textContent = '👁️ MODES';
    } else {
      document.body.setAttribute('data-theme', 'light');
      themeBtn.textContent = '🌟 MODES';
    }
  });
}

// TRANSICIÓN DE CORTINA Y NAVEGACIÓN
const overlay = document.getElementById('p5-transition');

function triggerP5Transition(targetId, onComplete) {
  if (!overlay) return;

  overlay.classList.remove('exit');
  overlay.classList.add('active');

  setTimeout(() => {
    if (targetId) {
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'auto' });
      }
    }
    if (onComplete) onComplete();
  }, 320);

  setTimeout(() => {
    overlay.classList.add('exit');
    overlay.classList.remove('active');
  }, 650);
}

// Interceptar enlaces con hash (#)
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    if (targetId && targetId !== '#') {
      e.preventDefault();

      const wheel = document.getElementById('p5-wheel');
      const angle = link.getAttribute('data-angle');
      if (wheel && angle !== null) {
        wheel.style.transform = `rotate(${angle}deg)`;
        document.querySelectorAll('.wheel-item').forEach(i => i.classList.remove('active'));
        link.classList.add('active');
      }

      triggerP5Transition(targetId);
    }
  });
});

// Sincronización de la Rueda al hacer Scroll Manual
const sections = document.querySelectorAll('section');
const wheelItems = document.querySelectorAll('.wheel-item');
const wheel = document.getElementById('p5-wheel');

window.addEventListener('scroll', () => {
  let currentSection = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 200;
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute('id');
    }
  });

  if (wheelItems.length > 0 && wheel) {
    wheelItems.forEach(item => {
      const targetId = item.getAttribute('href');
      if (targetId === `#${currentSection}`) {
        item.classList.add('active');
        const angle = item.getAttribute('data-angle');
        if (angle !== null) {
          wheel.style.transform = `rotate(${angle}deg)`;
        }
      } else {
        item.classList.remove('active');
      }
    });
  }
});

// PROCESAMIENTO DEL FORMULARIO DE CONTACTO (EVENTO SUBMIT DIRECTO)
const contactForm = document.getElementById('contact-form');
const successAlert = document.getElementById('form-success-alert');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    // 1. Detener navegación y recarga por completo
    e.preventDefault();
    e.stopPropagation();

    // 2. Mostrar la alerta de confirmación
    if (successAlert) {
      successAlert.classList.add('show');
    }

    // 3. Limpiar todos los campos
    contactForm.reset();

    // 4. Ocultar la alerta pasados 4 segundos
    setTimeout(() => {
      if (successAlert) {
        successAlert.classList.remove('show');
      }
    }, 4000);

    return false;
  });
}

// COPIAR CORREO AL PORTAPAPELES
const copyBtn = document.getElementById('copy-btn');
const emailTextElement = document.getElementById('email-text');
const copyMessage = document.getElementById('copy-message');

if (copyBtn && emailTextElement) {
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(emailTextElement.textContent).then(() => {
      if (copyMessage) {
        copyMessage.classList.add('show');
        setTimeout(() => {
          copyMessage.classList.remove('show');
        }, 2500);
      }
    });
  });
}

// MÁQUINA DE ESCRIBIR
const phrases = [
  "Desarrollador Web Full Stack",
  "Especializado en Python & Flask",
  "Estudiante del Programa Skillnest"
];

let pIndex = 0;
let cIndex = 0;
const target = document.getElementById('typewriter-text');

function type() {
  if (target && cIndex < phrases[pIndex].length) {
    target.textContent += phrases[pIndex].charAt(cIndex);
    cIndex++;
    setTimeout(type, 60);
  } else if (target) {
    setTimeout(erase, 1800);
  }
}

function erase() {
  if (target && cIndex > 0) {
    target.textContent = phrases[pIndex].substring(0, cIndex - 1);
    cIndex--;
    setTimeout(erase, 30);
  } else if (target) {
    pIndex = (pIndex + 1) % phrases.length;
    setTimeout(type, 400);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (target) type();
});

// REVELAR SECCIONES AL HACER SCROLL
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));