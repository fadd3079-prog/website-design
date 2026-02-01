window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  
  setTimeout(() => {
    preloader.classList.add("preloader-hide");
  }, 500);
});

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  const hamburger = document.querySelector(".hamburger-menu");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    document.body.classList.toggle("no-scroll");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.classList.remove("no-scroll");
    });
  });

  const revealElements = document.querySelectorAll(
    ".reveal-text, .reveal-card"
  );

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    {
      root: null,
      threshold: 0.15,
      rootMargin: "0px",
    }
  );

  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });
});


const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm) {
  contactForm.addEventListener("submit", async function (event) {
    event.preventDefault(); 

    const data = new FormData(event.target);

    
    const submitBtn = contactForm.querySelector("button");
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML =
      'MENGIRIM... <i class="fa-solid fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;

    fetch(event.target.action, {
      method: contactForm.method,
      body: data,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          formStatus.innerHTML =
            "Terimakasih, pesan berhasil terkirim! Kami akan segera membalas";
          formStatus.className = "success-msg";
          contactForm.reset(); 
        } else {
          response.json().then((data) => {
            if (Object.hasOwn(data, "errors")) {
              formStatus.innerHTML = data["errors"]
                .map((error) => error["message"])
                .join(", ");
            } else {
              formStatus.innerHTML = "Maaf, ada masalah saat mengirim pesan.";
            }
            formStatus.className = "error-msg";
          });
        }
      })
      .catch((error) => {
        formStatus.innerHTML = "Terjadi kesalahan jaringan. Silakan coba lagi.";
        formStatus.className = "error-msg";
      })
      .finally(() => {
        
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
      });
  });
}



const logoLink = document.querySelector('.logo');

if (logoLink) {
    logoLink.addEventListener('click', () => {
        const hamburger = document.querySelector(".hamburger-menu");
        const navMenu = document.querySelector(".nav-menu");
        // Hapus class active dari menu & hamburger saat logo diklik
        if (navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });
}
