// --- Reveal animation script ---
function reveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = reveals[i].getBoundingClientRect().top;
    const elementVisible = 100;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add('active');
    } else {
      reveals[i].classList.remove('active');
    }
  }
}

window.addEventListener('scroll', reveal);
reveal(); // run on load

// --- Mobile navbar toggle script ---
// toggles the nav-right (so the same element contains donate + links)
const menuToggle = document.querySelector('.menu-toggle');
const navRight = document.querySelector('.nav-right');
const menuIcon = document.querySelector('.menu-toggle i');

if (menuToggle && navRight) {
  menuToggle.addEventListener('click', () => {
    navRight.classList.toggle('open');

    // Toggle icon between bars and x
    if (menuIcon) {
      menuIcon.classList.toggle('fa-bars');
      menuIcon.classList.toggle('fa-xmark');
    }
  });
}

// --- Force start at top of page when site loads ---
window.addEventListener('load', function() {
  // small delay to ensure browser doesn't restore scroll
  setTimeout(() => window.scrollTo(0, 0), 50);
});
