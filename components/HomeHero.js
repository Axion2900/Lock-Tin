import { BaseComponent } from './BaseComponent.js';

class HomeHero extends BaseComponent {
  onReady() {
    // animation
    this.querySelector('.hero-explore-btn')?.addEventListener('click', () => 
      document.querySelector('.card-intro')?.scrollIntoView({ behavior: 'smooth' })
    );
  }
}

customElements.define('home-hero', HomeHero);
