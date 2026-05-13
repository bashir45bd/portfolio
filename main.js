/* ═══════════════════════════════════════════
   BASHIR AHMED — PORTFOLIO MAIN JS
═══════════════════════════════════════════ */

// ═══════════ LOADER ═══════════
const loader = document.getElementById("loader");
const loaderPct = document.getElementById("loader-pct");

let loadValue = 0;

const loading = setInterval(() => {
  loadValue++;

  if (loadValue < 10) {
    loaderPct.textContent = `0${loadValue}%`;
  } else {
    loaderPct.textContent = `${loadValue}%`;
  }

  if (loadValue >= 100) {
    clearInterval(loading);

    setTimeout(() => {
      loader.classList.add("hidden");
      document.body.style.overflow = "visible";
    }, 400);
  }
}, 20);

// Prevent scrolling during loading
document.body.style.overflow = "hidden";


// ═══════════ NAVBAR SCROLL EFFECT ═══════════
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});


// ═══════════ REVEAL ANIMATION ═══════════
const revealElements = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.88;

  revealElements.forEach((element) => {
    const rect = element.getBoundingClientRect();

    if (rect.top < triggerBottom) {
      element.classList.add("visible");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);


// ═══════════ ACTIVE NAV LINK ═══════════
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});


// ═══════════ SMOOTH CLOSE MOBILE MENU ═══════════
const navMenu = document.getElementById("navMenu");
const bsCollapse = new bootstrap.Collapse(navMenu, {
  toggle: false,
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth < 992) {
      bsCollapse.hide();
    }
  });
});


// ═══════════ PARALLAX HERO EFFECT ═══════════
const hero = document.getElementById("hero");
const deco1 = document.querySelector(".c1");
const deco2 = document.querySelector(".c2");

window.addEventListener("mousemove", (e) => {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  if (deco1) {
    deco1.style.transform = `translate(${x * 30}px, ${y * 30}px)`;
  }

  if (deco2) {
    deco2.style.transform = `translate(-${x * 20}px, -${y * 20}px)`;
  }
});


// ═══════════ TYPE EFFECT HERO TITLE (OPTIONAL) ═══════════
const heroTitle = document.querySelector(".hero-title");

if (heroTitle) {
  heroTitle.style.opacity = "0";

  window.addEventListener("load", () => {
    setTimeout(() => {
      heroTitle.style.transition = "opacity 1s ease";
      heroTitle.style.opacity = "1";
    }, 300);
  });
}


// ═══════════ CONTACT FORM UI FEEDBACK ═══════════
const contactForm = document.getElementById("contactForm");
const formMsg = document.getElementById("form-msg");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {

    // Remove this preventDefault() if using real PHP backend
    e.preventDefault();

    const submitBtn = contactForm.querySelector("button[type='submit']");
    const originalBtn = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <span class="spinner-border spinner-border-sm me-2"></span>
      Sending...
    `;

    setTimeout(() => {
      formMsg.innerHTML = `
        <div class="success">
          Message sent successfully!
        </div>
      `;

      contactForm.reset();

      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtn;

      setTimeout(() => {
        formMsg.innerHTML = "";
      }, 4000);

    }, 1800);
  });
}


// ═══════════ PROJECT CARD HOVER GLOW ═══════════
const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.background = `
      radial-gradient(
        circle at ${x}px ${y}px,
        rgba(0,229,160,0.08),
        #111316 45%
      )
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.background = "";
  });
});


// ═══════════ SCROLL TO TOP ON REFRESH ═══════════
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};


// ═══════════ DYNAMIC YEAR (OPTIONAL) ═══════════
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


// ═══════════ CONSOLE SIGNATURE ═══════════
console.log(`
╔══════════════════════════════════════╗
║   Bashir Ahmed Portfolio Loaded     ║
║   Mobile App Developer 🚀           ║
╚══════════════════════════════════════╝
`);

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.querySelector("input[name='name']").value;
  const email = document.querySelector("input[name='email']").value;
  const subject = document.querySelector("input[name='subject']").value;
  const message = document.querySelector("textarea[name='message']").value;

  // Show success text (your existing #form-msg)
  document.getElementById("form-msg").innerHTML =
    "<span class='success'>Message sent successfully! Your idea has been shared.</span>";

  // Open Gmail / Email client
  const mailtoLink =
    "mailto:bashir45.me@gmail.com"
    + "?subject=" + encodeURIComponent(subject)
    + "&body=" + encodeURIComponent(
        "Name: " + name +
        "\nEmail: " + email +
        "\n\nMessage:\n" + message
      );

  window.location.href = mailtoLink;

  // Reset form
  this.reset();
});