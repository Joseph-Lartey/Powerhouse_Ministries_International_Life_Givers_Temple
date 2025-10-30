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
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const menuIcon = document.querySelector('.menu-toggle i');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');

  // Toggle between bars and close icon
  menuIcon.classList.toggle('fa-bars');
  menuIcon.classList.toggle('fa-xmark');
});
