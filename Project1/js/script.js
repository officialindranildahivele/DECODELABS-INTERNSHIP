const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.querySelector('.theme-icon');
const backToTop = document.getElementById('backToTop');
const typingTarget = document.querySelector('.typing');
const revealItems = document.querySelectorAll('.reveal');
const navLinks = document.querySelectorAll('.site-nav a');
const faqItems = document.querySelectorAll('.faq-item');
const contactForm = document.getElementById('contactForm');
const formMessage = document.querySelector('.form-message');
const stats = document.querySelectorAll('[data-count]');

const strings = ['fast digital products', 'beautiful user experiences', 'scalable software platforms'];
let stringIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingTimer = null;
let ticking = false;

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const supportsIntersectionObserver = 'IntersectionObserver' in window;

function setTheme(isDark) {
  document.documentElement.classList.toggle('dark', isDark);

  if (themeIcon) {
    themeIcon.textContent = isDark ? '🌙' : '☀️';
  }

  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', String(isDark));
  }

  localStorage.setItem('decodelabs-theme', isDark ? 'dark' : 'light');
}

function toggleMenu() {
  if (!menuToggle || !siteNav) {
    return;
  }

  const isOpen = menuToggle.classList.toggle('active');
  siteNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
}

function closeMenu() {
  if (!menuToggle || !siteNav) {
    return;
  }

  menuToggle.classList.remove('active');
  siteNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}

function typeLoop() {
  if (!typingTarget) {
    return;
  }

  if (prefersReducedMotion) {
    typingTarget.textContent = strings[0];
    return;
  }

  const current = strings[stringIndex];
  typingTarget.textContent = current.slice(0, charIndex);

  if (!isDeleting && charIndex < current.length) {
    charIndex += 1;
    typingTimer = window.setTimeout(typeLoop, 90);
  } else if (isDeleting && charIndex > 0) {
    charIndex -= 1;
    typingTimer = window.setTimeout(typeLoop, 50);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) {
      stringIndex = (stringIndex + 1) % strings.length;
    }
    typingTimer = window.setTimeout(typeLoop, 900);
  }
}

function initReveal() {
  if (!supportsIntersectionObserver || !revealItems.length) {
    revealItems.forEach((item) => item.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function updateActiveLink() {
  const sections = document.querySelectorAll('main section[id]');
  const scrollPosition = window.scrollY + 120;
  let activeFound = false;

  sections.forEach((section) => {
    const id = section.id;
    const link = document.querySelector(`.site-nav a[href="#${id}"]`);
    if (!link) {
      return;
    }

    const offsetTop = section.offsetTop;
    const offsetBottom = offsetTop + section.offsetHeight;
    if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
      navLinks.forEach((navLink) => navLink.classList.remove('active'));
      link.classList.add('active');
      activeFound = true;
    }
  });

  if (!activeFound) {
    navLinks.forEach((navLink) => navLink.classList.remove('active'));
  }
}

function animateCounters() {
  stats.forEach((stat) => {
    if (stat.dataset.animated === 'true') {
      return;
    }

    const target = Number(stat.getAttribute('data-count'));
    const duration = 1400;
    const startTime = performance.now();

    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const current = Math.floor(progress * target);
      stat.textContent = `${current}${target === 95 ? '%' : '+'}`;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        stat.textContent = `${target}${target === 95 ? '%' : '+'}`;
      }
    };

    requestAnimationFrame(step);
    stat.dataset.animated = 'true';
  });
}

function initCounters() {
  const statsSection = document.querySelector('.stats');
  if (!statsSection) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.disconnect();
        }
      });
    },
    { threshold: 0.4 }
  );

  observer.observe(statsSection);
}

function handleScroll() {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const shouldShow = window.scrollY > 600;
      backToTop.classList.toggle('visible', shouldShow);
      updateActiveLink();
      ticking = false;
    });
    ticking = true;
  }
}

if (faqItems.length) {
  faqItems.forEach((item) => {
    const button = item.querySelector('.faq-question');
    if (!button) {
      return;
    }

    button.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach((faq) => {
        faq.classList.remove('active');
        faq.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        item.classList.add('active');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

if (contactForm) {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const name = formData.get('name').toString().trim();
    const email = formData.get('email').toString().trim();
    const subject = formData.get('subject').toString().trim();
    const message = formData.get('message').toString().trim();
    const fields = [contactForm.elements.name, contactForm.elements.email, contactForm.elements.subject, contactForm.elements.message];

    fields.forEach((field) => {
      field.setAttribute('aria-invalid', field.value.trim() ? 'false' : 'true');
    });

    if (!name || !email || !subject || !message) {
      if (formMessage) {
        formMessage.textContent = 'Please complete all fields before sending.';
      }
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      contactForm.elements.email.setAttribute('aria-invalid', 'true');
      if (formMessage) {
        formMessage.textContent = 'Please enter a valid email address.';
      }
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({ name, email, subject, message })
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.message || 'Unable to send your message right now.');
      }

      if (formMessage) {
        formMessage.textContent = data.message || `Thanks ${name}! Your message has been received.`;
      }
      contactForm.reset();
      fields.forEach((field) => field.setAttribute('aria-invalid', 'false'));
    } catch (error) {
      if (formMessage) {
        formMessage.textContent = error.message || 'Something went wrong. Please try again later.';
      }
    }
  });
}

if (menuToggle) {
  menuToggle.addEventListener('click', toggleMenu);
}

if (navLinks.length) {
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 768) {
        closeMenu();
      }
    });
  });
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    setTheme(isDark);
  });
}

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

window.addEventListener('scroll', handleScroll, { passive: true });
window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) {
    closeMenu();
  }
});

window.addEventListener('load', () => {
  const storedTheme = localStorage.getItem('decodelabs-theme');
  setTheme(storedTheme === 'dark');
  initReveal();
  updateActiveLink();
  initCounters();
  typeLoop();
});
