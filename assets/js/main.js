const menuToggle = document.getElementById('menu-toggle');
const siteNav = document.getElementById('site-nav');
const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');
const curtain = document.getElementById('transition-curtain');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function closeMenu() {
  if (!menuToggle || !siteNav) return;

  menuToggle.setAttribute('aria-expanded', 'false');
  siteNav.classList.remove('is-open');
  document.body.classList.remove('menu-open');
}

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    siteNav.classList.toggle('is-open', !isOpen);
    document.body.classList.toggle('menu-open', !isOpen);
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', event => {
    const targetId = link.getAttribute('href');
    const target = targetId ? document.querySelector(targetId) : null;

    closeMenu();
    if (!target || !curtain || reduceMotion) return;

    event.preventDefault();
    curtain.classList.remove('is-active');
    void curtain.offsetWidth;
    curtain.classList.add('is-active');

    window.setTimeout(() => {
      history.pushState(null, '', targetId);
      target.scrollIntoView({ behavior: 'auto', block: 'start' });
    }, 255);

    window.setTimeout(() => curtain.classList.remove('is-active'), 700);
  });
});

const sections = document.querySelectorAll('main section[id]');
if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      document.querySelectorAll('.site-nav .nav-link').forEach(link => {
        link.classList.toggle('is-active', link.hash === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: '-30% 0px -55% 0px' });

  sections.forEach(section => sectionObserver.observe(section));

  if (!reduceMotion) {
    document.body.classList.add('js-enabled');
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.section-block, .project-card').forEach(element => {
      element.classList.add('reveal');
      revealObserver.observe(element);
    });
  }
}

const typewriter = document.getElementById('typewriter-text');
const roles = [
  'Desarrollador Web Full Stack',
  'Python · Flask · MySQL',
  'Estudiante en Skillnest'
];

if (typewriter && !reduceMotion) {
  let roleIndex = 0;
  let characterIndex = roles[0].length;
  let deleting = false;

  function animateRole() {
    const role = roles[roleIndex];
    typewriter.textContent = role.slice(0, characterIndex);

    if (!deleting && characterIndex === role.length) {
      deleting = true;
      window.setTimeout(animateRole, 1700);
      return;
    }

    if (deleting && characterIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      window.setTimeout(animateRole, 320);
      return;
    }

    characterIndex += deleting ? -1 : 1;
    window.setTimeout(animateRole, deleting ? 32 : 58);
  }

  window.setTimeout(animateRole, 1800);
}
