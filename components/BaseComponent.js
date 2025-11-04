// base component template
export class BaseComponent extends HTMLElement {
  async connectedCallback() {
    await this.loadTemplate();
    this.onReady?.();
  }

  async loadTemplate() {
    const fileName = this.constructor.name;
    
    const response = await fetch(`./components/${fileName}.html`);
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const template = doc.querySelector('template');
    
    if (template) this.appendChild(template.content.cloneNode(true));
  }
}
