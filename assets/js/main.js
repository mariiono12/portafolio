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
const wheelItems = document.querySelectorAll('.wheel-item');
const compactNavigation = window.matchMedia('(max-width: 1100px)');

function updateWheelPositions(selectedItem) {
  const selectedIndex = Array.from(wheelItems).indexOf(selectedItem);
  if (selectedIndex < 0) return;

  wheelItems.forEach((item, index) => {
    if (compactNavigation.matches) {
      item.style.left = '';
      item.style.top = '';
    } else {
      const angle = ((index - selectedIndex) * 90 * Math.PI) / 180;
      const x = Math.round(Math.cos(angle) * 80);
      const y = Math.round(Math.sin(angle) * 80);
      item.style.left = `calc(50% + ${x}px)`;
      item.style.top = `calc(50% + ${y}px)`;
    }
    item.classList.toggle('active', index === selectedIndex);
  });
}

if (wheelItems.length > 0) {
  updateWheelPositions(document.querySelector('.wheel-item.active') || wheelItems[0]);
  window.addEventListener('resize', () => {
    updateWheelPositions(document.querySelector('.wheel-item.active') || wheelItems[0]);
  });
}

function triggerP5Transition(targetId, onComplete) {
  if (!overlay) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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
  }, reducedMotion ? 0 : 400);

  setTimeout(() => {
    overlay.classList.add('exit');
    overlay.classList.remove('active');
  }, reducedMotion ? 0 : 780);
}

// Interceptar enlaces con hash (#)
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    if (targetId && targetId !== '#') {
      e.preventDefault();

      if (link.classList.contains('wheel-item')) updateWheelPositions(link);

      triggerP5Transition(targetId);
    }
  });
});

// Sincronización de la Rueda al hacer Scroll Manual
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
  let currentSection = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 200;
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute('id');
    }
  });

  if (wheelItems.length > 0) {
    const activeItem = Array.from(wheelItems).find(item => item.getAttribute('href') === `#${currentSection}`);
    if (activeItem) updateWheelPositions(activeItem);
  }
});

// COPIAR CORREO AL PORTAPAPELES
const copyBtn = document.getElementById('copy-btn');
const emailTextElement = document.getElementById('email-text');
const copyMessage = document.getElementById('copy-message');

if (copyBtn && emailTextElement) {
  copyBtn.addEventListener('click', async () => {
    const email = emailTextElement.textContent.trim();
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else {
        const temporaryInput = document.createElement('textarea');
        temporaryInput.value = email;
        temporaryInput.setAttribute('readonly', '');
        temporaryInput.style.position = 'absolute';
        temporaryInput.style.left = '-9999px';
        document.body.appendChild(temporaryInput);
        temporaryInput.select();
        const copied = document.execCommand('copy');
        temporaryInput.remove();
        if (!copied) throw new Error('No se pudo copiar el correo.');
      }

      if (copyMessage) {
        copyMessage.textContent = '¡Correo copiado al portapapeles!';
        copyMessage.classList.add('show');
      }
    } catch (error) {
      if (copyMessage) {
        copyMessage.textContent = 'No se pudo copiar. Selecciona el correo y cópialo manualmente.';
        copyMessage.classList.add('show');
      }
      console.error('Error al copiar el correo de contacto:', error);
    }

    if (copyMessage) {
      setTimeout(() => copyMessage.classList.remove('show'), 2500);
    }
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