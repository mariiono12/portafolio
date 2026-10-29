document.addEventListener('DOMContentLoaded', () => {
  // Inicializar Lucide Icons
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

  // 2. Scrollspy - Resaltado Menú Lateral
  const sections = document.querySelectorAll('.content-section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === currentSection) {
        link.classList.add('active');
      }
    });
  });

  // 3. Copiado Rápido de Correo
  const copyEmailBtn = document.getElementById('quick-copy-email');
  copyEmailBtn.addEventListener('click', () => {
    navigator.clipboard.writeText('ian.bustos@gmail.com').then(() => {
      showToast('¡Correo copiado al portapapeles!');
    });
  });

  // 4. Filtro de Proyectos
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 5. Laboratorio JS - Generador de Sombras
  const blurInput = document.getElementById('blur-input');
  const colorInput = document.getElementById('color-input');
  const previewBox = document.getElementById('preview-box');
  const blurVal = document.getElementById('blur-val');
  const cssCodeOutput = document.getElementById('css-code-output');
  const copyCssBtn = document.getElementById('copy-css-btn');

  function updateShadow() {
    const blur = blurInput.value;
    const color = colorInput.value;
    blurVal.textContent = `${blur}px`;
    const shadowString = `box-shadow: 0px 10px ${blur}px ${color};`;
    previewBox.style.boxShadow = `0px 10px ${blur}px ${color}`;
    cssCodeOutput.textContent = shadowString;
  }

  blurInput.addEventListener('input', updateShadow);
  colorInput.addEventListener('input', updateShadow);

  copyCssBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(cssCodeOutput.textContent).then(() => {
      showToast('¡Código CSS copiado!');
    });
  });

  // 6. Laboratorio JS - Analizador de Texto
  const textInput = document.getElementById('text-counter-input');
  const charCount = document.getElementById('char-count');
  const wordCount = document.getElementById('word-count');
  const readingTime = document.getElementById('reading-time');

  textInput.addEventListener('input', () => {
    const text = textInput.value;
    charCount.textContent = text.length;

    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    wordCount.textContent = words.length;

    const minutes = Math.ceil(words.length / 200);
    readingTime.textContent = text.length > 0 ? `${minutes} min` : '0 min';
  });

  // 7. Formulario de Contacto
  const contactForm = document.getElementById('contact-form');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    if (name.value.trim() === '') {
      name.parentElement.classList.add('invalid');
      isValid = false;
    } else {
      name.parentElement.classList.remove('invalid');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      email.parentElement.classList.add('invalid');
      isValid = false;
    } else {
      email.parentElement.classList.remove('invalid');
    }

    if (message.value.trim() === '') {
      message.parentElement.classList.add('invalid');
      isValid = false;
    } else {
      message.parentElement.classList.remove('invalid');
    }

    if (isValid) {
      showToast('¡Mensaje enviado correctamente!');
      contactForm.reset();
    }
  });

  function showToast(msg) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');

    toastMessage.textContent = msg;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
});