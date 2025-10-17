// Count up animation
const stats = document.querySelectorAll('.stat-number');
let started = false;

function formatNumber(n) {
  if (n >= 1000000000) return `$${(n / 1e9).toFixed(0)}B+`;
  if (n >= 1000000) return `${(n / 1e6).toFixed(0)}M+`;
  if (n >= 100) return `${Math.floor(n)}+`;
  return n;
}

function animateCount() {
  if (started) return;
  stats.forEach(stat => {
    const target = +stat.getAttribute('data-target');
    const duration = 2000;
    const step = Math.ceil(target / (duration / 16));

    let current = 0;
    const update = () => {
      current += step;
      if (current >= target) {
        stat.textContent = formatNumber(target);
      } else {
        stat.textContent = formatNumber(current);
        requestAnimationFrame(update);
      }
    };
    update();
  });
  started = true;
}

// Trigger when stats section is visible
window.addEventListener('scroll', () => {
  const section = document.getElementById('stats');
  if (section) {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight && !started) {
      animateCount();
    }
  }
});

// FAQ Toggle
document.querySelectorAll('.faq-question').forEach((button) => {
  button.addEventListener('click', () => {
    const answer = button.nextElementSibling;
    const isVisible = answer.style.display === 'block';

    // Close all answers first
    document.querySelectorAll('.faq-answer').forEach((ans) => {
      ans.style.display = 'none';
    });

    // Toggle current
    answer.style.display = isVisible ? 'none' : 'block';
  });
});

// Navbar toggle & overlay
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
const overlay = document.getElementById('overlay');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  overlay.classList.toggle('active');
  menuToggle.textContent = navLinks.classList.contains('active') ? '✖' : '☰';
});

// Close menu on link click
document.querySelectorAll('#nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    overlay.classList.remove('active');
    menuToggle.textContent = '☰';
  });
});

// Close on overlay click
overlay.addEventListener('click', () => {
  navLinks.classList.remove('active');
  overlay.classList.remove('active');
  menuToggle.textContent = '☰';
});
