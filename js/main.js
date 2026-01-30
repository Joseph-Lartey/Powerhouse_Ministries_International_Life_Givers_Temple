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
  const progressContainer = document.querySelector('.progress-images');

  if (progressImages.length === 0 || !progressContainer) return;

  const width = window.innerWidth;

  if (width <= 768) {
    // On mobile phones: show only first image
    progressContainer.style.height = '220px';
    progressImages.forEach((img, i) => {
      if (i === 0) {
        img.style.display = 'block';
        img.style.position = 'absolute';
        img.style.top = '0';
        img.style.left = '0';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        img.style.borderRadius = '10px';
        img.style.opacity = '1';
      } else {
        img.style.display = 'none';
      }
    });
  } else if (width > 768 && width <= 1366) {
    // On tablets (iPad Mini, Air, Pro): show only first image, full size
    progressContainer.style.height = '280px';
    progressContainer.style.minHeight = '280px';
    progressContainer.style.flexShrink = '0';
    progressImages.forEach((img, i) => {
      if (i === 0) {
        img.style.display = 'block';
        img.style.position = 'absolute';
        img.style.top = '0';
        img.style.left = '0';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        img.style.borderRadius = '12px';
        img.style.opacity = '1';
      } else {
        img.style.display = 'none';
      }
    });
  } else {
    // On desktop: restore overlapping layout
    progressContainer.style.height = '380px';
    progressContainer.style.minHeight = '';
    progressContainer.style.flexShrink = '';
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


// --- Mobile dropdown toggle for "Events" ---
const eventsLink = document.querySelector('.nav-item.dropdown > a');
const dropdownMenu = document.querySelector('.dropdown-menu');

if (eventsLink && dropdownMenu) {
  eventsLink.addEventListener('click', (e) => {
    e.preventDefault();
    dropdownMenu.classList.toggle('active');
  });

  // Close when tapping outside
  document.addEventListener('click', (e) => {
    if (!dropdownMenu.contains(e.target) && !eventsLink.contains(e.target)) {
      dropdownMenu.classList.remove('active');
    }
  });
}

// --- Animated Counter for Stats ---
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  const isPercentage = element.textContent.includes('%');
  const isCurrency = element.textContent.includes('GHS');

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }

    if (isPercentage) {
      element.textContent = Math.floor(start) + '%';
    } else if (isCurrency) {
      element.textContent = 'GHS ' + Math.floor(start).toLocaleString();
    } else {
      element.textContent = Math.floor(start).toLocaleString();
    }
  }, 16);
}

// Trigger counter animation when stats section is visible
function initCounters() {
  const statsSection = document.querySelector('.progress-stats');
  if (!statsSection) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statNumbers = statsSection.querySelectorAll('h3');
        statNumbers.forEach(stat => {
          const text = stat.textContent;
          let numericValue;

          if (text.includes('GHS')) {
            numericValue = parseInt(text.replace(/[^0-9]/g, ''));
          } else if (text.includes('%')) {
            numericValue = parseInt(text.replace('%', ''));
          } else {
            numericValue = parseInt(text.replace(/[^0-9]/g, ''));
          }

          if (!isNaN(numericValue)) {
            stat.dataset.original = text;
            animateCounter(stat, numericValue, 2000);
          }
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(statsSection);
}

// --- Staggered Reveal for Pastor Cards ---
function initStaggeredReveal() {
  const pastorItems = document.querySelectorAll('.pastor-item');
  if (pastorItems.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('active');
        }, index * 150);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  pastorItems.forEach(item => {
    item.classList.add('reveal-item');
    observer.observe(item);
  });
}

// Initialize on page load
window.addEventListener('load', () => {
  initCounters();
  initStaggeredReveal();
});

