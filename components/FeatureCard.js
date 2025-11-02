// Reusable Feature Card Component - Minimal JS, uses HTML template
class FeatureCard extends HTMLElement {
  async connectedCallback() {
    // Load template
    const response = await fetch('/components/FeatureCard.html');
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const template = doc.querySelector('#feature-card-template');
    
    // Clone template
    const content = template.content.cloneNode(true);
    
    // Populate from attributes
    const cardClass = this.getAttribute('card-class') || 'feature-card-1';
    content.querySelector('.feature-card-large').classList.add(cardClass);
    content.querySelector('[data-slot="icon"]').textContent = this.getAttribute('icon') || '📱';
    content.querySelector('[data-slot="title"]').textContent = this.getAttribute('title') || 'Feature';
    content.querySelector('[data-slot="description"]').textContent = this.getAttribute('description') || '';
    
    // Handle features list
    const features = this.getAttribute('features') || '';
    const featuresList = content.querySelector('[data-slot="features"]');
    if (features) {
      features.split('|').filter(f => f.trim()).forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature.trim();
        featuresList.appendChild(li);
      });
    }
    
    this.appendChild(content);
    
    // Minimal event handling
    this.querySelector('.card-btn')?.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('feature-click', {
        bubbles: true,
        detail: { 
          title: this.getAttribute('title'),
          description: this.getAttribute('description')
        }
      }));
    });
  }
}

customElements.define('feature-card', FeatureCard);
