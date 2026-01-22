/* =========================================
   TRANSITION DISCRÈTE ENTRE PAGES (HACKING)
   ========================================= */

/*
  Ce script :
  - intercepte les clics sur les liens internes
  - déclenche une animation de sortie
  - puis change de page après l'animation
*/

document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("a[href]");

  links.forEach(link => {
    link.addEventListener("click", event => {
      const href = link.getAttribute("href");

      // On ignore :
      // - les liens externes
      // - les ancres (#)
      // - les liens qui s'ouvrent dans un nouvel onglet
      if (
        href.startsWith("http") ||
        href.startsWith("#") ||
        link.target === "_blank"
      ) {
        return;
      }

      // On empêche le changement immédiat de page
      event.preventDefault();

      // Déclenche l'effet de sortie
      document.body.classList.add("page-exit");

      // Après l'animation, on navigue vers la page cible
      setTimeout(() => {
        window.location.href = href;
      }, 350); // même durée que le CSS
    });
  });
});

/* =====================================
   NAVIGATION ACTIVE + EFFET STICKY
   ===================================== */

// Mise en évidence du lien actif
const currentPage = window.location.pathname.split("/").pop();
const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(link => {
  const linkPage = link.getAttribute("href");

  if (linkPage === currentPage) {
    link.classList.add("active");
  }
});

// Effet sticky au scroll
const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});
