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
            this.translateElement(node);
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
    // Translate the element itself if it has data-i18n
    if (element.hasAttribute('data-i18n')) {
      const key = element.getAttribute('data-i18n');
      const translation = languageService.translate(key);
      element.textContent = translation;
    }
    
    // Translate all children with data-i18n
    const children = element.querySelectorAll('[data-i18n]');
    children.forEach(child => {
      const key = child.getAttribute('data-i18n');
      const translation = languageService.translate(key);
      child.textContent = translation;
    });
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

// Create singleton instance
export const translationHandler = new TranslationHandler();
