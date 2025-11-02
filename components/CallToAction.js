// Call to Action Component - Minimal JS, uses HTML template
class AppCTA extends HTMLElement {
  async connectedCallback() {
    // Load template
    const response = await fetch('/components/CallToAction.html');
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const template = doc.querySelector('#app-cta-template');
    
    // Clone and append
    this.appendChild(template.content.cloneNode(true));

    // Minimal event handling - only if needed for actual functionality
    // For now, these are just placeholders
  }
}

customElements.define('app-cta', AppCTA);
