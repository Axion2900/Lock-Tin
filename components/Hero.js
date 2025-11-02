// Hero Component - Minimal JS, uses HTML template
class AppHero extends HTMLElement {
  async connectedCallback() {
    // Load template
    const response = await fetch('/components/Hero.html');
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const template = doc.querySelector('#app-hero-template');
    
    // Clone and append
    this.appendChild(template.content.cloneNode(true));

    // Minimal event handling
    this.querySelector('.hero-explore-btn')?.addEventListener('click', () => {
      document.querySelector('.card-intro')?.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

customElements.define('app-hero', AppHero);
