import { languageService } from '../scripts/i18n/languageService.js';
import { BaseComponent } from './BaseComponent.js';
// one of the more complicated components
class FeatureCard extends BaseComponent {
  async loadTemplate() {
    await super.loadTemplate();
    
    this.querySelector('.feature-card-large')?.classList.add(this.getAttribute('card-class') || 'feature-card-1');
    this.querySelector('[data-slot="icon"]').textContent = this.getAttribute('icon') || '📱';
    
    this.titleEl = this.querySelector('[data-slot="title"]');
    this.descEl = this.querySelector('[data-slot="description"]');
    this.featuresList = this.querySelector('[data-slot="features"]');
    
    this.titleKey = this.getAttribute('title') || 'Feature';
    this.descKey = this.getAttribute('description') || '';
    this.featuresKey = this.getAttribute('features') || '';
    
    this.updateContent();
    
    this.featuresKey.split('|').filter(f => f.trim()).forEach(key => {
      const li = document.createElement('li');
      li.dataset.key = key.trim();
      li.textContent = languageService.translate(key.trim());
      this.featuresList.appendChild(li);
    });
  }
  
  onReady() {
    languageService.subscribe(() => this.updateContent());
    
    this.querySelector('.card-btn')?.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('feature-click', {
        bubbles: true,
        detail: { title: this.titleKey, description: this.descKey }
      }));
    });
  }
  
  updateContent() {
    if (this.titleEl) this.titleEl.textContent = languageService.translate(this.titleKey);
    if (this.descEl) this.descEl.textContent = languageService.translate(this.descKey);
    this.featuresList?.querySelectorAll('li').forEach(li => {
      if (li.dataset.key) li.textContent = languageService.translate(li.dataset.key);
    });
  }
}

customElements.define('feature-card', FeatureCard);
