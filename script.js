/*************************************************
 * LOGIN OVERLAY + RESPONSIVE BEHAVIOR
 *************************************************/
window.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     LOGIN OVERLAY
  ================================ */
  const overlay = document.getElementById("loginOverlay");
  const loginBtn = overlay?.querySelector("button");

  if (overlay) {
    overlay.style.display = "flex";
    document.body.style.overflow = "hidden";
  }

  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      const username = document.getElementById("username")?.value.trim();
      const email = document.getElementById("email")?.value.trim();

      if (!username || !email) {
        alert("Please fill in both fields!");
        return;
      }

      fetch("login.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}`
      })
        .then(res => res.json())
        .then(data => {
          if (data.status === "success") {
            overlay.style.display = "none";
            document.body.style.overflow = "auto";
            alert(`Welcome, ${username}!`);
          } else {
            alert(data.message || "Login failed");
          }
        })
        .catch(() => alert("Server error. Try again later."));
    });
  }

  /* ===============================
     HEADING TYPING EFFECT (OPTIMIZED)
  ================================ */
  const text = "🎓 BACHELOR BOYZ";
  const element = document.getElementById("typingText");
  let index = 0;

  if (element) {
    setInterval(() => {
      element.textContent = text.slice(0, index++);
      if (index > text.length) index = 0;
    }, 200);
  }

  /* ===============================
     HOME BUTTON + CARD SLIDER
  ================================ */
  const homeBtn = document.getElementById("homeBtn");
  const homeCards = document.getElementById("homeCards");
  const hero = document.querySelector(".hero-section");
  const cards = document.querySelectorAll(".home-cards .card");

  let current = 0;
  let sliderInterval = null;

  if (homeBtn && homeCards && hero) {
    homeBtn.addEventListener("click", (e) => {
      e.preventDefault();

      hero.style.display = "none";
      homeCards.style.display = "flex";

      cards.forEach(c => c.classList.remove("active"));
      cards[0]?.classList.add("active");
      current = 0;

      homeCards.scrollIntoView({ behavior: "smooth" });

      if (sliderInterval) clearInterval(sliderInterval);

      sliderInterval = setInterval(() => {
        cards[current]?.classList.remove("active");
        current = (current + 1) % cards.length;
        cards[current]?.classList.add("active");
      }, 3000);
    });
  }

  /* ===============================
     MOBILE NAVBAR DROPDOWN CLICK
  ================================ */
  document.querySelectorAll("nav button").forEach(button => {
    button.addEventListener("click", () => {
      if (window.innerWidth <= 900) {
        const dropdown = button.nextElementSibling;
        dropdown?.classList.toggle("show");
      }
    });
  });

  document.querySelectorAll(".dropdown-content > li > a").forEach(link => {
    link.addEventListener("click", (e) => {
      if (window.innerWidth <= 900) {
        const submenu = link.nextElementSibling;
        if (submenu && submenu.classList.contains("submenu")) {
          e.preventDefault();
          submenu.classList.toggle("show");
        }
      }
    });
  });

});
