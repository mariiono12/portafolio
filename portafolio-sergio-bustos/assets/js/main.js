document.addEventListener('DOMContentLoaded', () => {
  // Inicializar Iconos Lucide
  if (window.lucide) {
    lucide.createIcons();
  }

  // Modo Oscuro / Claro
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  themeToggleBtn.addEventListener('click', () => {
    htmlElement.classList.toggle('light');
    htmlElement.classList.toggle('dark');
  });

  // Copiado Rápido de Correo
  const copyEmailBtn = document.getElementById('copy-email-btn');
  copyEmailBtn.addEventListener('click', () => {
    navigator.clipboard.writeText('ian.bustos@gmail.com').then(() => {
      showToast('¡Correo copiado al portapapeles!');
    });
  });

  // Filtro de Proyectos
  const pills = document.querySelectorAll('.pill');
  const projectItems = document.querySelectorAll('.project-item');

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.getAttribute('data-filter');
      projectItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // JS Lab: Sombras
  const blurRange = document.getElementById('blur-range');
  const blurVal = document.getElementById('blur-val');
  const shadowBox = document.getElementById('shadow-box');

  blurRange.addEventListener('input', () => {
    const val = blurRange.value;
    blurVal.textContent = `${val}px`;
    shadowBox.style.boxShadow = `0px 5px ${val}px rgba(6, 182, 212, 0.4)`;
  });

  // JS Lab: Contador de Caracteres
  const labTextarea = document.getElementById('lab-textarea');
  const charNum = document.getElementById('char-num');

  labTextarea.addEventListener('input', () => {
    charNum.textContent = labTextarea.value.length;
  });

  // Formulario Contacto
  const contactForm = document.getElementById('contact-form');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('¡Mensaje enviado con éxito!');
    contactForm.reset();
  });

  // Función Notificación Toast
  function showToast(msg) {
    const toast = document.getElementById('toast');
    const toastText = document.getElementById('toast-text');
    toastText.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
});