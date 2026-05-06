const themeToggle = document.getElementById('theme-toggle');
// Target the actual image tag inside the span
const themeIconImg = document.querySelector('#theme-icon img'); 

const iconHtml = document.getElementById('icon-html');
const iconCss = document.getElementById('icon-css');
const iconJs = document.getElementById('icon-js');

const lightModeIcon = "Pics/light.png"; 
const darkModeIcon = "Pics/dark.png";   

themeToggle.addEventListener('click', () => {
  const html = document.documentElement;
  
  if (html.getAttribute('data-theme') === 'dark') {
   
    html.removeAttribute('data-theme');
    
    themeIconImg.src = darkModeIcon; 
    
    if(iconHtml) iconHtml.src = 'Pics/html.png';
    if(iconCss) iconCss.src = 'Pics/css.png';
    if(iconJs) iconJs.src = 'Pics/js.png';
    
  } else {
    html.setAttribute('data-theme', 'dark');
    
   
    themeIconImg.src = lightModeIcon; 
    
    if(iconHtml) iconHtml.src = 'Pics/html_b.png';
    if(iconCss) iconCss.src = 'Pics/css_b.png';
    if(iconJs) iconJs.src = 'Pics/js_b.jpg';
  }
});

const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navContainer = document.querySelector('.nav-container');
const navControls = document.querySelector('.nav-controls');

const mobileDropdown = document.createElement('ul');
mobileDropdown.classList.add('mobile-dropdown');
navContainer.appendChild(mobileDropdown);

function adaptMenu() {
  while (mobileDropdown.firstChild) {
    navMenu.appendChild(mobileDropdown.firstChild);
  }

  const logo = document.querySelector('.logo');
  // Total width minus logo, minus icons, minus an 80px safety buffer
  const availableSpace = navContainer.clientWidth - logo.offsetWidth - navControls.offsetWidth - 80;

  const checkLinksWidth = () => {
    let totalWidth = 0;
    Array.from(navMenu.children).forEach(child => {
      totalWidth += child.offsetWidth + 24; // 24px accounts for the CSS gap
    });
    return totalWidth;
  };

  
  while (checkLinksWidth() > availableSpace && navMenu.children.length > 0) {
    mobileDropdown.insertBefore(navMenu.lastElementChild, mobileDropdown.firstChild);
  }

  if (mobileDropdown.children.length > 0) {
    navToggle.style.display = 'block';
  } else {
    navToggle.style.display = 'none';
    mobileDropdown.classList.remove('active'); 
  }
}

window.addEventListener('load', adaptMenu);
window.addEventListener('resize', adaptMenu);

navToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  mobileDropdown.classList.toggle('active');
});

mobileDropdown.addEventListener('click', (e) => {
  if (e.target.tagName === 'A' || e.target.closest('a')) {
    mobileDropdown.classList.remove('active');
  }
});

document.addEventListener('click', (e) => {
  if (!mobileDropdown.contains(e.target) && !navToggle.contains(e.target)) {
    mobileDropdown.classList.remove('active');
  }
});

window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercentage = (scrollTop / scrollHeight) * 100;
  document.getElementById('progressBar').style.width = scrollPercentage + '%';
});



const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = 'block';
  } else {
    backToTopBtn.style.display = 'none';
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


const typewriterText = ["Web Developer", "Software Engineer", "Network Engineer"];
let currentWordIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
const typewriterElement = document.getElementById('typewriter');

function type() {
  const currentWord = typewriterText[currentWordIndex];
  
  if (isDeleting) {
    typewriterElement.textContent = currentWord.substring(0, currentCharIndex - 1);
    currentCharIndex--;
  } else {
    typewriterElement.textContent = currentWord.substring(0, currentCharIndex + 1);
    currentCharIndex++;
  }

  let typingSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && currentCharIndex === currentWord.length) {
    typingSpeed = 2000; 
    isDeleting = true;
  } else if (isDeleting && currentCharIndex === 0) {
    isDeleting = false;
    currentWordIndex = (currentWordIndex + 1) % typewriterText.length;
    typingSpeed = 500; 
  }

  setTimeout(type, typingSpeed);
}
if(typewriterElement) type();


const reveals = document.querySelectorAll('.reveal');

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  const revealPoint = 100;

  reveals.forEach(reveal => {
    const revealTop = reveal.getBoundingClientRect().top;
    if (revealTop < windowHeight - revealPoint) {
      reveal.classList.add('active');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();


const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
 
    btn.classList.add('active');

    const filterValue = btn.getAttribute('data-filter');

    projectCards.forEach(card => {
      if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

const openModalBtns = document.querySelectorAll('.open-modal');
const closeBtns = document.querySelectorAll('.close-modal');

openModalBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const modalId = btn.getAttribute('data-modal');
    document.getElementById(modalId).style.display = 'flex';
  });
});

closeBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.target.closest('.modal-overlay').style.display = 'none';
  });
});

window.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.style.display = 'none';
  }
});


const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

if(contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); 
    const formData = new FormData(contactForm);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
    })
    .then(async (response) => {
        let json = await response.json();
        if (response.status == 200) {
            successMessage.style.display = 'block';
            contactForm.reset(); 
            setTimeout(() => { successMessage.style.display = 'none'; }, 5000);
        } else {
            alert(json.message);
        }
    })
    .catch(error => {
        console.log(error);
        alert("Something went wrong!");
    });
  });
}