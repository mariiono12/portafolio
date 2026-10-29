document.addEventListener('DOMContentLoaded', () => {
  // Inicialización de Iconos Lucide
  if (window.lucide) {
    lucide.createIcons();
  }

  // 1. Selector de Tema (Dark / Light Mode)
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  themeToggleBtn.addEventListener('click', () => {
    htmlElement.classList.toggle('light');
    htmlElement.classList.toggle('dark');
  });

  // 2. Copia Rápida de Correo con Toast
  const copyEmailBtn = document.getElementById('copy-email-btn');
  copyEmailBtn.addEventListener('click', () => {
    navigator.clipboard.writeText('ian.bustos@gmail.com').then(() => {
      showToast('¡Correo copiado al portapapeles!');
    });
  });

  // 3. Filtro de Categorías en Proyectos
  const pills = document.querySelectorAll('.pill');
  const projectCards = document.querySelectorAll('.project-bento-card');

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.getAttribute('data-filter');
      projectCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 4. Laboratorio JS - Generador de Sombras
  const blurRange = document.getElementById('blur-range');
  const blurVal = document.getElementById('blur-val');
  const shadowPreview = document.getElementById('shadow-preview');
  const cssCode = document.getElementById('css-code');
  const copyCodeBtn = document.getElementById('copy-code-btn');

  blurRange.addEventListener('input', () => {
    const val = blurRange.value;
    blurVal.textContent = `${val}px`;
    const shadowStr = `box-shadow: 0px 10px ${val}px rgba(6,182,212,0.4);`;
    shadowPreview.style.boxShadow = `0px 10px ${val}px rgba(6,182,212,0.4)`;
    cssCode.textContent = shadowStr;
  });

  copyCodeBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(cssCode.textContent).then(() => {
      showToast('¡Código CSS Copiado!');
    });
  });

  // 5. Laboratorio JS - Analizador de Texto en Tiempo Real
  const labText = document.getElementById('lab-text');
  const charCount = document.getElementById('char-count');
  const wordCount = document.getElementById('word-count');
  const readTime = document.getElementById('read-time');

  labText.addEventListener('input', () => {
    const text = labText.value;
    charCount.textContent = text.length;

    const words = text.trim().split(/\s+/).filter(w => w.length > 0);
    wordCount.textContent = words.length;

    const minutes = Math.ceil(words.length / 200);
    readTime.textContent = text.length > 0 ? `${minutes} min` : '0 min';
  });

  // 6. Validación de Formulario de Contacto
  const contactForm = document.getElementById('contact-form');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('¡Mensaje enviado con éxito!');
    contactForm.reset();
  });

  // Notificación Toast Helper
  function showToast(msg) {
    const toast = document.getElementByIsd('toast');
    const toastText = document.getElementById('toast-text');
    toastText.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
});