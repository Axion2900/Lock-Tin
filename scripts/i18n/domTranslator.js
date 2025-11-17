import { languageService } from './languageService.js';

class TranslationHandler {
  constructor() {
    this.observer = null;
    this.init();
  }

  init() {
    // Subscribe to language changes
    languageService.subscribe(() => this.translatePage());
    
    // Setup mutation observer to handle dynamically added elements
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const elements = [node, ...node.querySelectorAll('[data-i18n]')];
            elements.forEach(element => this.translateElement(element));
          }
        });
      });
    });
    
    this.observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    // Initial translation when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.translatePage());
    } else {
      this.translatePage();
    }
  }

  translatePage() {
    // Find all elements with data-i18n attribute
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => this.translateElement(element));
  }

  translateElement(element) {
    const key = element.getAttribute('data-i18n');
    if (!key || element.dataset.i18nTranslated === 'true') return;

    const translation = languageService.translate(key);
    element.textContent = translation;
    element.dataset.i18nTranslated = 'true';
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

// Create singleton instance
export const translationHandler = new TranslationHandler();
