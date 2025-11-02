import { languageService } from '../scripts/i18n/languageService.js';

// Hero Component - Minimal JS, uses HTML template
class AppHero extends HTMLElement {
  constructor() {
    super();
    this.updateTranslations = this.updateTranslations.bind(this);
  }

  async connectedCallback() {
    // Load template
    const response = await fetch('/components/Hero.html');
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const template = doc.querySelector('#app-hero-template');
    
    // Clone and append
    this.appendChild(template.content.cloneNode(true));

    // Subscribe to language changes
    languageService.subscribe(this.updateTranslations);
    
    // Initial translation
    this.updateTranslations();

    // Event handling
    this.querySelector('.hero-explore-btn')?.addEventListener('click', () => {
      document.querySelector('.card-intro')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  updateTranslations() {
    const badge = this.querySelector('.hero-badge');
    const subtitle = this.querySelector('.card-hero-subtitle');
    const exploreBtn = this.querySelector('.hero-explore-btn');

    if (badge) badge.textContent = languageService.translate('hero.badge');
    if (subtitle) subtitle.textContent = languageService.translate('hero.subtitle');
    if (exploreBtn) exploreBtn.textContent = languageService.translate('hero.explore');
  }

  disconnectedCallback() {
    languageService.unsubscribe(this.updateTranslations);
  }
}

customElements.define('app-hero', AppHero);
