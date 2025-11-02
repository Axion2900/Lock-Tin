// Features Component - Minimal JS, uses HTML template
class AppFeatures extends HTMLElement {
  async connectedCallback() {
    // Load template
    const response = await fetch('/components/Features.html');
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const template = doc.querySelector('#app-features-template');
    
    // Clone and append
    this.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('app-features', AppFeatures);
