// ── MOBILE NAV ──
const menuIcon = document.getElementById('menu-icon');
const nav = document.getElementById('nav');
const overlay = document.getElementById('nav-overlay');

menuIcon.addEventListener('click', () => {
    nav.classList.toggle('active');
    overlay.classList.toggle('active');
    menuIcon.className = nav.classList.contains('active') ? 'bx bx-x' : 'bx bx-menu';
});

overlay.addEventListener('click', () => {
    nav.classList.remove('active');
    overlay.classList.remove('active');
    menuIcon.className = 'bx bx-menu';
});

// Close nav on link click
nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        overlay.classList.remove('active');
        menuIcon.className = 'bx bx-menu';
    });
});

// ── ACTIVE NAV ON SCROLL ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    sections.forEach(section => {
        const sTop = section.offsetTop - 120;
        const sHeight = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollY >= sTop && scrollY < sTop + sHeight) {
            navLinks.forEach(a => a.classList.remove('active'));
            const activeLink = document.querySelector(`nav a[href="#${id}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });

    // Scroll to top button
    const scrollTop = document.getElementById('scrollTop');
    scrollTop.classList.toggle('show', scrollY > 500);
});

document.getElementById('scrollTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── TYPEWRITER ──
const texts = ['Web Developer & Digital Marketing Specialist', 'Data Analyst skilled in Python & SQL', 'Building Data-Driven Digital Solutions'];
let textIdx = 0, charIdx = 0, deleting = false;
const tw = document.getElementById('typewriter');

function type() {
    const current = texts[textIdx];
    if (deleting) {
        tw.textContent = current.substring(0, charIdx--);
        if (charIdx < 0) {
            deleting = false;
            textIdx = (textIdx + 1) % texts.length;
            setTimeout(type, 400);
            return;
        }
    } else {
        tw.textContent = current.substring(0, charIdx++);
        if (charIdx > current.length) {
            deleting = true;
            setTimeout(type, 2000);
            return;
        }
    }
    setTimeout(type, deleting ? 60 : 100);
}
type();

// ── RESUME TABS ──
const resumeBtns = document.querySelectorAll('.resume-btn');
const resumeDetails = document.querySelectorAll('.resume-detail');

resumeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        resumeBtns.forEach(b => b.classList.remove('active'));
        resumeDetails.forEach(d => d.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('tab-' + tab).classList.add('active');
    });
});

// ── PORTFOLIO CAROUSEL ──
const portfolioDetails = document.querySelectorAll('.portfolio-detail');
const imgSlide = document.getElementById('img-slide');
const arrowLeft = document.getElementById('arrow-left');
const arrowRight = document.getElementById('arrow-right');
const dotsContainer = document.getElementById('proj-dots');
let currentProj = 0;
const totalProj = portfolioDetails.length;

// Create dots
portfolioDetails.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'proj-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToProject(i));
    dotsContainer.appendChild(dot);
});

function goToProject(idx) {
    if (idx === currentProj) return;
    
    portfolioDetails[currentProj].classList.remove('active');
    document.querySelectorAll('.proj-dot')[currentProj].classList.remove('active');

    currentProj = idx;

    portfolioDetails[currentProj].classList.add('active');
    document.querySelectorAll('.proj-dot')[currentProj].classList.add('active');

    // FIXED: Proper transform calculation for carousel
    const slideWidth = document.querySelector('.portfolio-carousel').offsetWidth;
    imgSlide.style.transform = `translateX(-${currentProj * slideWidth}px)`;

    // Update buttons
    arrowLeft.classList.toggle('disabled', currentProj === 0);
    arrowRight.classList.toggle('disabled', currentProj === totalProj - 1);
}

arrowLeft.addEventListener('click', () => {
    if (currentProj > 0) goToProject(currentProj - 1);
});

arrowRight.addEventListener('click', () => {
    if (currentProj < totalProj - 1) goToProject(currentProj + 1);
});

// Fix carousel on window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        goToProject(currentProj);
    }, 100);
});


// ── SEND TO GMAIL ──
function sendToGmail() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    // Basic validation
    if (!name || !email || !subject || !message) {
        alert("Please fill all required fields!");
        return;
    }

    const body =
`Name: ${name}
Email: ${email}
Phone: ${phone}

Message:
${message}`;

    const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=akashvr91@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.open(gmailURL, "_blank");
}