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


// Mise en évidence automatique de la page active
const currentPage = window.location.pathname.split("/").pop();

const pageActuelle = currentPage === "" ? "index.html" : currentPage;
const navLinks = document.querySelectorAll(".nav-menu a");

navLinks.forEach(link => {

    const linkPage = link.getAttribute("href").split("/").pop();

    link.classList.remove("active");

    if (linkPage === pageActuelle) {
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


// Gestion du formulaire Netlify - Message de succès
document.addEventListener('DOMContentLoaded', function() {
    // Vérifie si le paramètre success=true est dans l'URL
    if (window.location.search.includes('success=true')) {
        const messageSucces = document.getElementById('message-succes');
        const formulaire = document.getElementById('contact-form');
        
        if (messageSucces) {
            messageSucces.style.display = 'block';
        }
        if (formulaire) {
            formulaire.style.display = 'none';
        }
    }
});



/* =====================================
   MENU HAMBURGER SUR MOBILE
   ===================================== */

    document.addEventListener("DOMContentLoaded", () => {

    const boutonMenu = document.getElementById("nav-toggle");
    const menuNavigation = document.getElementById("nav-menu");

    if (!boutonMenu || !menuNavigation) {
        return;
    }

    // Ouvrir ou fermer le menu
    boutonMenu.addEventListener("click", () => {

        const menuOuvert = menuNavigation.classList.toggle("active");

        boutonMenu.setAttribute("aria-expanded", menuOuvert);
        boutonMenu.setAttribute(
            "aria-label",
            menuOuvert ? "Fermer le menu" : "Ouvrir le menu"
        );

    });

    // Fermer le menu après un clic sur un lien
    const liensMenu = menuNavigation.querySelectorAll("a");

    liensMenu.forEach(lien => {

        lien.addEventListener("click", () => {

            menuNavigation.classList.remove("active");

            boutonMenu.setAttribute("aria-expanded", "false");
            boutonMenu.setAttribute("aria-label", "Ouvrir le menu");

        });

    });

});
