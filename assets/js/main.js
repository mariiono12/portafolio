const menuToggle = document.getElementById('menu-toggle');
const siteNav = document.getElementById('site-nav');
const commandWheelLinks = document.querySelectorAll('.command-wheel-link[href^="#"]');
const curtain = document.getElementById('transition-curtain');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function updateCommandWheel(selectedLink) {
  const selectedIndex = Array.from(commandWheelLinks).indexOf(selectedLink);
  if (selectedIndex < 0) return;

  commandWheelLinks.forEach((link, index) => {
    const angle = ((index - selectedIndex) * 90 * Math.PI) / 180;
    const radius = 57;
    const x = Math.round(Math.cos(angle) * radius);
    const y = Math.round(Math.sin(angle) * radius);

    link.style.left = `calc(50% + ${x}px)`;
    link.style.top = `calc(50% + ${y}px)`;
    link.classList.toggle('is-active', index === selectedIndex);

    if (index === selectedIndex) {
      link.setAttribute('aria-current', 'location');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

if (commandWheelLinks.length > 0) {
  updateCommandWheel(commandWheelLinks[0]);
}

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

document.querySelectorAll('.site-nav a[href^="#"], .command-wheel-link[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const targetId = link.getAttribute('href');
    const target = targetId ? document.querySelector(targetId) : null;

    closeMenu();
    if (link.classList.contains('command-wheel-link')) {
      updateCommandWheel(link);
    }

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

      const activeSectionHash = entry.target.id === 'inicio' ? '#sobre-mi' : `#${entry.target.id}`;
      const activeWheelLink = Array.from(commandWheelLinks).find(link => link.hash === activeSectionHash);
      if (activeWheelLink) updateCommandWheel(activeWheelLink);
    });
  }, { rootMargin: '-30% 0px -55% 0px' });

  sections.forEach(section => sectionObserver.observe(section));

  if (!reduceMotion) {
    document.body.classList.add('js-enabled');
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        const delay = parseInt(entry.target.style.getPropertyValue('--reveal-delay'), 10) || 0;
        window.setTimeout(() => entry.target.style.removeProperty('--reveal-delay'), delay + 650);
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.section-block, .project-card, .principle-card, .skill-group').forEach(element => {
      if (element.matches('.project-card, .principle-card, .skill-group')) {
        const siblings = Array.from(element.parentElement.children)
          .filter(sibling => sibling.matches('.project-card, .principle-card, .skill-group'));
        element.style.setProperty('--reveal-delay', `${siblings.indexOf(element) * 90}ms`);
      }

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
