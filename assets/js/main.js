const themeBtn = document.getElementById('theme-toggle');
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const isLight = document.body.getAttribute('data-theme') === 'light';
    if (isLight) {
      document.body.removeAttribute('data-theme');
    } else {
      document.body.setAttribute('data-theme', 'light');
    }

    themeBtn.setAttribute('aria-pressed', String(!isLight));
    themeBtn.setAttribute('aria-label', isLight ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro');
    themeBtn.textContent = isLight ? '☼' : '☾';
  });
}

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

function triggerP5Transition(targetId) {
  if (!overlay) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  overlay.classList.remove('exit');
  overlay.classList.add('active');

  setTimeout(() => {
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      history.pushState(null, '', targetId);
      targetSection.scrollIntoView({ behavior: 'auto' });
    }
<<<<<<< HEAD:portafolio-sergio-bustos/assets/js/main.js
  }, 320);
=======
    if (onComplete) onComplete();
  }, reducedMotion ? 0 : 400);
>>>>>>> 968515cdd759b5517f8faf12247a2b69b8ceb3b4:assets/js/main.js

  setTimeout(() => {
    overlay.classList.add('exit');
    overlay.classList.remove('active');
  }, reducedMotion ? 0 : 780);
}

document.querySelectorAll('.primary-nav a[href^="#"], .hero-actions a[href^="#"], footer a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const targetId = link.getAttribute('href');
    if (!targetId || targetId === '#' || !overlay || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!document.querySelector(targetId)) return;

<<<<<<< HEAD:portafolio-sergio-bustos/assets/js/main.js
    event.preventDefault();
    triggerP5Transition(targetId);
  });
});

const contactForm = document.getElementById('contact-form');
const successAlert = document.getElementById('form-success-alert');
const contactEmail = document.getElementById('email-text');

if (contactForm && contactEmail) {
  contactForm.addEventListener('submit', event => {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const senderEmail = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    const body = `Hola, soy ${name} (${senderEmail}).\n\n${message}`;
    const mailto = `mailto:${contactEmail.textContent.trim()}?${new URLSearchParams({
      subject,
      body
    })}`;

    if (successAlert) {
      successAlert.textContent = 'Se abrirá tu aplicación de correo con el mensaje listo para enviar.';
      successAlert.classList.add('show');
    }

    window.location.href = mailto;
  });
}

=======
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
>>>>>>> 968515cdd759b5517f8faf12247a2b69b8ceb3b4:assets/js/main.js
const copyBtn = document.getElementById('copy-btn');
const copyMessage = document.getElementById('copy-message');

<<<<<<< HEAD:portafolio-sergio-bustos/assets/js/main.js
if (copyBtn && contactEmail && copyMessage) {
  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(contactEmail.textContent.trim());
      copyMessage.textContent = '¡Correo copiado al portapapeles!';
    } catch {
      copyMessage.textContent = 'No se pudo copiar. Puedes seleccionar el correo y copiarlo manualmente.';
    }

    copyMessage.classList.add('show');
    setTimeout(() => copyMessage.classList.remove('show'), 3000);
=======
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
>>>>>>> 968515cdd759b5517f8faf12247a2b69b8ceb3b4:assets/js/main.js
  });
}

const year = document.getElementById('current-year');
if (year) {
  year.textContent = String(new Date().getFullYear());
}

const phrases = [
  'Desarrollador Web Full Stack',
  'Python · Flask · MySQL',
  'Estudiante del programa Skillnest'
];
const typewriter = document.getElementById('typewriter-text');
let phraseIndex = 0;
let characterIndex = 0;

function type() {
  if (!typewriter) return;

  if (characterIndex < phrases[phraseIndex].length) {
    typewriter.textContent += phrases[phraseIndex].charAt(characterIndex);
    characterIndex += 1;
    setTimeout(type, 55);
  } else {
    setTimeout(erase, 1800);
  }
}

function erase() {
  if (!typewriter) return;

  if (characterIndex > 0) {
    typewriter.textContent = phrases[phraseIndex].substring(0, characterIndex - 1);
    characterIndex -= 1;
    setTimeout(erase, 25);
  } else {
    phraseIndex = (phraseIndex + 1) % phrases.length;
    setTimeout(type, 350);
  }
}

if (typewriter && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  type();
} else if (typewriter) {
  typewriter.textContent = phrases[0];
}

const animatedSections = document.querySelectorAll('.fade-in');
if ('IntersectionObserver' in window) {
  document.body.classList.add('js-enabled');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  animatedSections.forEach(section => observer.observe(section));
}
