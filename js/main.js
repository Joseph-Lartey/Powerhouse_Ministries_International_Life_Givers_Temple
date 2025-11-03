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
const donateBtn = document.querySelector('.donate-btn');

menuToggle.addEventListener('click', (e) => {
  e.stopPropagation(); // prevent click from bubbling
  navLinks.classList.toggle('active');
  menuIcon.classList.toggle('fa-bars');
  menuIcon.classList.toggle('fa-xmark');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (
    navLinks.classList.contains('active') &&
    !navLinks.contains(e.target) &&
    !menuToggle.contains(e.target)
  ) {
    navLinks.classList.remove('active');
    menuIcon.classList.add('fa-bars');
    menuIcon.classList.remove('fa-xmark');
  }
});

// Close menu when clicking a nav link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    menuIcon.classList.add('fa-bars');
    menuIcon.classList.remove('fa-xmark');
  });
});

// --- Donate Button: Hide on mobile, show in menu ---
function handleDonatePlacement() {
  if (window.innerWidth <= 768) {
    if (donateBtn) donateBtn.style.display = 'none';
    if (!document.querySelector('.nav-links .donate-link')) {
      const donateLink = document.createElement('a');
      donateLink.textContent = 'Donate Now';
      donateLink.href = '#donate';
      donateLink.classList.add('donate-link');
      navLinks.appendChild(donateLink);
    }
  } else {
    if (donateBtn) donateBtn.style.display = 'inline-block';
    const donateLink = document.querySelector('.nav-links .donate-link');
    if (donateLink) donateLink.remove();
  }
}

window.addEventListener('resize', handleDonatePlacement);
handleDonatePlacement();

// --- Force start at top of page when site loads ---
window.addEventListener('load', function () {
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, 100);
});

// --- Progress Images (responsive behavior) ---
function handleProgressImages() {
  const progressImages = document.querySelectorAll('.progress-images img');

  if (progressImages.length === 0) return;

  if (window.innerWidth <= 768) {
    // On mobile: show only first image
    progressImages.forEach((img, i) => {
      img.style.display = i === 0 ? 'block' : 'none';
      img.style.position = 'relative';
      img.style.width = '100%';
      img.style.height = 'auto';
      img.style.objectFit = 'cover';
      img.style.borderRadius = '10px';
      img.style.opacity = '1';
    });
  } else {
    // On desktop: restore overlapping layout
    progressImages.forEach((img, i) => {
      img.style.display = 'block';
      img.style.position = 'absolute';
      img.style.opacity = '1';
      img.style.width = '230px';
      img.style.height = '150px';
      img.style.objectFit = 'cover';
      img.style.borderRadius = '10px';
    });

    if (progressImages[0]) {
      progressImages[0].style.top = '0';
      progressImages[0].style.left = '0';
    }
    if (progressImages[1]) {
      progressImages[1].style.top = '60px';
      progressImages[1].style.left = '130px';
    }
    if (progressImages[2]) {
      progressImages[2].style.top = '120px';
      progressImages[2].style.left = '260px';
    }
  }
}

window.addEventListener('resize', handleProgressImages);
handleProgressImages();
