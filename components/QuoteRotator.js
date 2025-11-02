// ===============
// Quote Rotator Web Component
// Author: Dan Shan
// Date: Oct 31, 2025
// ===============

class QuoteRotator extends HTMLElement {
    constructor() {
        super();
        this.quotes = [
            '"Success is the sum of small efforts, repeated day in and day out." - R. Collier',
            '"Don\'t watch the clock; do what it does. Keep going." - Sam Levenson',
            '"Discipline is the bridge between goals and accomplishment." - Jim Rohn',
            '"Strive for progress, not perfection."',
            '"The secret to getting ahead is getting started." - Mark Twain',
        ];
        this.quoteIndex = 0;
        this.intervalId = null;
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        await this.loadTemplate();
        this.render();
        this.startRotation();
    }

    disconnectedCallback() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }

    async loadTemplate() {
        try {
            const response = await fetch('/components/QuoteRotator.html');
            const text = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');
            const template = doc.querySelector('template');
            
            if (template) {
                const content = template.content.cloneNode(true);
                this.shadowRoot.appendChild(content);
            }
        } catch (error) {
            console.error('Failed to load QuoteRotator template:', error);
        }
    }

    render() {
        // Template is already loaded in loadTemplate()
    }

    showQuote() {
        const quoteBox = this.shadowRoot.querySelector('.quote-box');
        if (!quoteBox) return;

        quoteBox.classList.remove('fade-in');
        // Force reflow to restart animation
        void quoteBox.offsetWidth;
        
        quoteBox.textContent = this.quotes[this.quoteIndex];
        quoteBox.classList.add('fade-in');
        
        this.quoteIndex = (this.quoteIndex + 1) % this.quotes.length;
    }

    startRotation() {
        // Show initial quote after a brief delay
        setTimeout(() => this.showQuote(), 100);
        
        // Rotate quotes every 5 seconds
        this.intervalId = setInterval(() => this.showQuote(), 5000);
    }
}

// Define the custom element
customElements.define('quote-rotator', QuoteRotator);
