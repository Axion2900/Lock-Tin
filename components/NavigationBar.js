import { languageService } from '../scripts/i18n/languageService.js';
import { BaseComponent } from './BaseComponent.js';

class NavigationBar extends BaseComponent {
  onReady() {
    // Set active page
    const currentPage = this.getAttribute('current-page') || 'home';
    this.querySelectorAll('.navigation-link').forEach(link => {
      link.classList.toggle('active', link.dataset.page === currentPage);
    });

    // Menu toggle
    const burger = this.querySelector('.burger-menu');
    const menu = this.querySelector('.navigation-menu');
    const lines = this.querySelectorAll('.burger-line');
    
    burger?.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      lines.forEach(line => line.classList.toggle('open', isOpen));
      burger.setAttribute('aria-expanded', isOpen);
    });

    // Close menu on link click
    this.querySelectorAll('.navigation-link').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
        lines.forEach(line => line.classList.remove('open'));
        burger.setAttribute('aria-expanded', 'false');
      });
    });

    // Language toggle
    this.querySelector('.language-toggle')?.addEventListener('click', () => {
      languageService.toggleLanguage();
    });
  }
}

customElements.define('navigation-bar', NavigationBar);
