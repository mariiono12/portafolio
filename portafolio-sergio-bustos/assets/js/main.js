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

function triggerP5Transition(targetId) {
  if (!overlay) return;

  overlay.classList.remove('exit');
  overlay.classList.add('active');

  setTimeout(() => {
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      history.pushState(null, '', targetId);
      targetSection.scrollIntoView({ behavior: 'auto' });
    }
  }, 320);

  setTimeout(() => {
    overlay.classList.add('exit');
    overlay.classList.remove('active');
  }, 650);
}

document.querySelectorAll('.primary-nav a[href^="#"], .hero-actions a[href^="#"], footer a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const targetId = link.getAttribute('href');
    if (!targetId || targetId === '#' || !overlay || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!document.querySelector(targetId)) return;

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

const copyBtn = document.getElementById('copy-btn');
const copyMessage = document.getElementById('copy-message');

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
