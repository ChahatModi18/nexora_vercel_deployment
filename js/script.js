document.documentElement.classList.add('js-ready');

const demoModal = document.getElementById('demoModal');
const modalTitle = document.getElementById('demoModalTitle');
const modalCopy = document.getElementById('demoModalCopy');
const defaultModalTitle = 'Thanks for choosing Nexora!';
const defaultModalCopy = 'This is a demonstration landing page. Account creation will be connected later.';

if (demoModal) {
  demoModal.addEventListener('show.bs.modal', (event) => {
    const trigger = event.relatedTarget;
    const title = trigger?.dataset.modalTitle;
    const copy = trigger?.dataset.modalCopy;
    const plan = trigger?.dataset.plan;

    modalTitle.textContent = plan ? defaultModalTitle : title || defaultModalTitle;
    modalCopy.textContent = plan
      ? `${plan} is a great place to start. ${defaultModalCopy}`
      : copy || defaultModalCopy;
  });
}

document.querySelectorAll('.plan-button').forEach((button) => {
  button.addEventListener('click', () => {
    if (window.bootstrap?.Modal && demoModal) {
      window.bootstrap.Modal.getOrCreateInstance(demoModal).show(button);
    }
  });
});

const progressChecks = Array.from(document.querySelectorAll('.mini-task input, .upcoming-task input'));
const initialChecked = progressChecks.filter((checkbox) => checkbox.checked).length;
const initialProgress = 78;

function updateProgress() {
  const completedChange = progressChecks.filter((checkbox) => checkbox.checked).length - initialChecked;
  const progress = Math.max(0, Math.min(100, initialProgress + completedChange * 5));

  document.querySelectorAll('.js-progress-value').forEach((value) => {
    value.textContent = `${progress}%`;
  });

  document.querySelectorAll('.mini-progress, .stat-progress').forEach((bar) => {
    bar.setAttribute('aria-valuenow', String(progress));
  });

  document.querySelectorAll('.js-progress-bar').forEach((bar) => {
    bar.style.width = `${progress}%`;
  });
}

progressChecks.forEach((checkbox) => checkbox.addEventListener('change', updateProgress));

const backToTop = document.querySelector('.back-to-top');

function updateBackToTop() {
  backToTop?.classList.toggle('is-visible', window.scrollY > 480);
}

window.addEventListener('scroll', updateBackToTop, { passive: true });
updateBackToTop();

backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
});

document.querySelectorAll('#mainNav .nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    const nav = document.getElementById('mainNav');
    if (nav?.classList.contains('show') && window.bootstrap?.Collapse) {
      window.bootstrap.Collapse.getOrCreateInstance(nav).hide();
    }
  });
});

const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('is-visible'));
}
