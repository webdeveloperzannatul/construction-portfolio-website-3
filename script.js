/**
 * Indusza – Industrial Services Website
 * script.js
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Sticky Header ── */
  const header = document.getElementById('header');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Mobile Nav Toggle ── */
  const navToggle = document.getElementById('navToggle');
  const nav       = document.getElementById('nav');

  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    navToggle.classList.toggle('active', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Close nav when a link is clicked
  nav.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      navToggle.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Close nav on outside click
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
      nav.classList.remove('open');
      navToggle.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  /* ── Active nav link on scroll ── */
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks  = document.querySelectorAll('.nav__link');

  const activateLink = () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) {
        current = sec.id;
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  };
  window.addEventListener('scroll', activateLink, { passive: true });

  /* ── Stats Counter Animation ── */
  const statNums = document.querySelectorAll('.stat-num');

  const animateCounter = (el) => {
    const target = parseInt(el.textContent, 10);
    const duration = 1600;
    const step = target / (duration / 16);
    let current = 0;

    const tick = () => {
      current += step;
      if (current < target) {
        el.textContent = Math.floor(current);
        requestAnimationFrame(tick);
      } else {
        el.textContent = target;
      }
    };
    tick();
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => statsObserver.observe(el));

  /* ── Reveal on Scroll ── */
  const revealEls = document.querySelectorAll(
    '.service-card, .team-card, .news-card, .testi-card, .about__feature, .feat-box'
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = `opacity 0.55s ease ${i * 0.06}s, transform 0.55s ease ${i * 0.06}s`;
    revealObserver.observe(el);
  });

  /* ── Hero slide dots (cosmetic) ── */
  const heroDots = document.querySelectorAll('.hero__dot');
  let heroIdx = 0;
  const cycleDots = () => {
    heroDots[heroIdx].classList.remove('active');
    heroIdx = (heroIdx + 1) % heroDots.length;
    heroDots[heroIdx].classList.add('active');
  };
  setInterval(cycleDots, 3500);

  /* ── Project dots (cosmetic) ── */
  const projDots = document.querySelectorAll('.proj-dot');
  let projIdx = 0;
  const cycleProjDots = () => {
    projDots[projIdx].classList.remove('active');
    projIdx = (projIdx + 1) % projDots.length;
    projDots[projIdx].classList.add('active');
  };
  setInterval(cycleProjDots, 4000);

  /* ── Testimonial nav (cosmetic) ── */
  const testiCards = document.querySelectorAll('.testi-card');
  const prevBtn = document.querySelector('.testi-nav--prev');
  const nextBtn = document.querySelector('.testi-nav--next');

  // On mobile, show one card at a time
  const isMobile = () => window.innerWidth < 768;

  let testiIdx = 0;
  const showTesti = (idx) => {
    if (!isMobile()) return;
    testiCards.forEach((c, i) => {
      c.style.display = i === idx ? 'block' : 'none';
    });
  };

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      testiIdx = (testiIdx - 1 + testiCards.length) % testiCards.length;
      showTesti(testiIdx);
    });
    nextBtn.addEventListener('click', () => {
      testiIdx = (testiIdx + 1) % testiCards.length;
      showTesti(testiIdx);
    });
  }

  window.addEventListener('resize', () => {
    if (!isMobile()) {
      testiCards.forEach(c => (c.style.display = ''));
    } else {
      showTesti(testiIdx);
    }
  });

  /* ── Newsletter form (cosmetic validation) ── */
  const newsInput = document.querySelector('.footer__newsletter input');
  const newsBtn   = document.querySelector('.footer__newsletter .btn');

  if (newsBtn && newsInput) {
    newsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const val = newsInput.value.trim();
      if (!val || !val.includes('@')) {
        newsInput.style.borderColor = '#e02020';
        newsInput.focus();
        return;
      }
      newsInput.style.borderColor = '#28a745';
      newsBtn.textContent = 'Subscribed!';
      newsBtn.style.background = '#28a745';
      newsBtn.style.borderColor = '#28a745';
      setTimeout(() => {
        newsInput.value = '';
        newsInput.style.borderColor = '';
        newsBtn.textContent = 'Subscribe';
        newsBtn.style.background = '';
        newsBtn.style.borderColor = '';
      }, 3000);
    });
  }

  /* ── Smooth hover underline for logo ── */
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.addEventListener('mouseenter', () => {
      logo.querySelector('.logo__icon').style.transform = 'rotate(-8deg) scale(1.08)';
      logo.querySelector('.logo__icon').style.transition = 'transform 0.3s ease';
    });
    logo.addEventListener('mouseleave', () => {
      logo.querySelector('.logo__icon').style.transform = '';
    });
  }

});
