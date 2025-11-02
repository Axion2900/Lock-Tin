import { languageService } from '../scripts/i18n/languageService.js';

// Navigation Component - Minimal JS, uses HTML template
class AppNavigation extends HTMLElement {
  constructor() {
    super();
    this.isMenuOpen = false;
    this.updateTranslations = this.updateTranslations.bind(this);
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

    // Subscribe to language changes
    languageService.subscribe(this.updateTranslations);
    
    // Initial translation
    this.updateTranslations();

    // Setup interactive functionality
    this.setupMenuToggle();
    this.setupLanguageToggle();
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

  setupLanguageToggle() {
    const langToggle = this.querySelector('.language-toggle');
    langToggle?.addEventListener('click', () => {
      languageService.toggleLanguage();
    });
  }

  updateTranslations() {
    // Update navigation links
    const homeLink = this.querySelector('[data-page="home"]');
    const featuresLink = this.querySelector('[data-page="features"]');
    const pricingLink = this.querySelector('[data-page="pricing"]');
    const teamLink = this.querySelector('[data-page="team"]');
    const langToggle = this.querySelector('.language-toggle');
    const heroBadge = this.querySelector('.hero-badge');

    if (homeLink) {
      homeLink.textContent = languageService.translate('nav.home');

    }
    if (featuresLink) {
      featuresLink.textContent = languageService.translate('nav.features');
    }
    if (pricingLink) {
      pricingLink.textContent = languageService.translate('nav.pricing');
    }
    if (teamLink) {
      teamLink.textContent = languageService.translate('nav.team');
    }
    if (langToggle) {
      langToggle.textContent = languageService.translate('nav.language');
    }
    if (heroBadge) {
      heroBadge.textContent = languageService.translate('hero.badge');  
    }
  }

  disconnectedCallback() {
    languageService.unsubscribe(this.updateTranslations);
  }
}

customElements.define('app-navigation', AppNavigation);
