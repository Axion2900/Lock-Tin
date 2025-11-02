// Navigation Component - Minimal JS, uses HTML template
class AppNavigation extends HTMLElement {
  constructor() {
    super();
    this.isMenuOpen = false;
  }

  async connectedCallback() {
    const currentPage = this.getAttribute('current-page') || 'home';
    
    // Load template
    const response = await fetch('/components/Navigation.html');
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const template = doc.querySelector('#app-navigation-template');
    
    // Clone and append
    this.appendChild(template.content.cloneNode(true));
    
    // Set active page
    const links = this.querySelectorAll('.navigation-link');
    links.forEach(link => {
      if (link.dataset.page === currentPage) {
        link.classList.add('active');
      }
    });

    // Only JS needed for interactive functionality
    this.setupMenuToggle();
  }

  setupMenuToggle() {
    const burgerMenu = this.querySelector('.burger-menu');
    const navigationMenu = this.querySelector('.navigation-menu');
    const burgerLines = this.querySelectorAll('.burger-line');
    const navLinks = this.querySelectorAll('.navigation-link');

    burgerMenu?.addEventListener('click', () => {
      this.isMenuOpen = !this.isMenuOpen;
      navigationMenu.classList.toggle('open', this.isMenuOpen);
      burgerLines.forEach(line => line.classList.toggle('open', this.isMenuOpen));
      burgerMenu.setAttribute('aria-expanded', this.isMenuOpen);
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        // Close mobile menu
        this.isMenuOpen = false;
        navigationMenu.classList.remove('open');
        burgerLines.forEach(line => line.classList.remove('open'));
        burgerMenu.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

customElements.define('app-navigation', AppNavigation);
