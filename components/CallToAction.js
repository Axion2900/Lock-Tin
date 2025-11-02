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

    // Subscribe to language changes
    languageService.subscribe(this.updateTranslations);
    
    // Initial translation
    this.updateTranslations();
  }

  updateTranslations() {
    // Vision section
    const visionTitle = this.querySelector('.vision-content h2');
    const visionDescription = this.querySelector('.vision-description');

    // CTA section
    const ctaTitle = this.querySelector('.cta-card h2');
    const ctaSubtitle = this.querySelector('.cta-card p');
    const createAccountBtn = this.querySelector('.cta-card-primary');
    const watchDemoBtn = this.querySelector('.cta-card-secondary');

    // Update content
    if (visionTitle) visionTitle.textContent = languageService.translate('cta.title');
    if (visionDescription) visionDescription.textContent = languageService.translate('cta.description');
    
    if (ctaTitle) ctaTitle.textContent = languageService.translate('cta.join.title');
    if (ctaSubtitle) ctaSubtitle.textContent = languageService.translate('cta.join.subtitle');
    if (createAccountBtn) createAccountBtn.textContent = languageService.translate('cta.button.create');
    if (watchDemoBtn) watchDemoBtn.textContent = languageService.translate('cta.button.demo');
  }

  disconnectedCallback() {
    languageService.unsubscribe(this.updateTranslations);
  }
}

customElements.define('app-cta', AppCTA);
