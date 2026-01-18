// ===== Favoriten-Zähler im Header =====
let favoritesCount = 0;
const favoritesCountElement = document.getElementById("favorites-count");

function setFavoritesCount(newCount) {
  favoritesCount = Math.max(0, newCount);

  if (!favoritesCountElement) return;

  favoritesCountElement.textContent = favoritesCount;

  if (favoritesCount > 0) {
    favoritesCountElement.style.display = "inline-flex";
  } else {
    favoritesCountElement.style.display = "none";
  }
}

function incrementFavorites() {
  setFavoritesCount(favoritesCount + 1);
}

function decrementFavorites() {
  setFavoritesCount(favoritesCount - 1);
}

// ===== Scroll-Animation (IntersectionObserver) =====
function initScrollAnimations() {
  const elements = document.querySelectorAll(".reveal-on-scroll");
  if (!("IntersectionObserver" in window)) {
    // Fallback: alles sofort sichtbar
    elements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target); // nur einmal animieren
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  elements.forEach((el) => observer.observe(el));
}

// ===== Produkt-Like-Logik =====
function initProductLikes() {
  // Alle Herz-Buttons auf der Seite
  const likeButtons = document.querySelectorAll(".product-like-button");

  likeButtons.forEach((likeButton) => {
    likeButton.addEventListener("click", () => {
      // Button-Zustand toggeln (CSS färbt das Icon ein)
      const isLiked = likeButton.classList.toggle("is-liked");

      // Header-Zähler anpassen
      if (isLiked) {
        incrementFavorites();
      } else {
        decrementFavorites();
      }
    });
  });
}

// ===== Initialisierung nach DOM-Load =====
document.addEventListener("DOMContentLoaded", () => {
  // Zähler beim Laden ausblenden (0)
  setFavoritesCount(0);

  // Produkt-Likes aktivieren
  initProductLikes();

  // Scroll-Animation aktivieren
  initScrollAnimations();

  // Optional: Header-Buttons (Warenkorb / Herz) loggen o.Ä.
  const cartButton = document.querySelector(".cart-button");
  if (cartButton) {
    cartButton.addEventListener("click", () => {
      console.log("Warenkorb-Button geklickt");
    });
  }

  const headerFavoritesButton = document.querySelector(".favorites-button");
  if (headerFavoritesButton) {
    headerFavoritesButton.addEventListener("click", () => {
      console.log("Header-Favoriten-Button geklickt");
    });
  }
});

  (function () {
    const mq = window.matchMedia("(max-width: 768px)");

    function initFooterAccordions() {
      const accordions = document.querySelectorAll("[data-footer-accordion]");

      accordions.forEach((acc) => {
        const btn = acc.querySelector(".footer-accordion-header");
        const icon = acc.querySelector(".footer-accordion-icon");
        const links = acc.querySelector(".footer-links");

        // Entferne alte Click-Handler
        btn.replaceWith(btn.cloneNode(true));
      });

      // Nach dem Klonen erneut referenzieren und Events setzen
      document.querySelectorAll("[data-footer-accordion]").forEach((acc) => {
        const btn = acc.querySelector(".footer-accordion-header");
        const icon = acc.querySelector(".footer-accordion-icon");
        const links = acc.querySelector(".footer-links");

        if (!mq.matches) {
          /* Desktop: immer offen, kein Akkordeon-Verhalten */
          acc.classList.remove("is-open");
          if (icon) icon.textContent = "";
          links.style.maxHeight = "none";
          btn.setAttribute("aria-expanded", "true");
          btn.style.cursor = "default";
          return;
        }

        /* Mobile: Akkordeon aktiv */
        acc.classList.remove("is-open");
        links.style.maxHeight = null;
        btn.style.cursor = "pointer";
        btn.setAttribute("aria-expanded", "false");
        if (icon) icon.textContent = "+";

        btn.addEventListener("click", () => {
          const open = acc.classList.toggle("is-open");
          btn.setAttribute("aria-expanded", open ? "true" : "false");
          if (icon) icon.textContent = open ? "–" : "+";
        });
      });
    }

    // Initial aufrufen
    initFooterAccordions();

    // Bei Resize neu konfigurieren (Desktop <-> Mobile)
    window.addEventListener("resize", () => {
      initFooterAccordions();
    });
  })();

