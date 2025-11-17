import { BaseComponent } from './BaseComponent.js';

class HomeCTA extends BaseComponent {
  connectedCallback() {
    super.connectedCallback();
    
    // Add event listeners after component is loaded
    setTimeout(() => {
      const button = this.querySelector('.cta-card-secondary') || document.querySelector('.cta-card-secondary');
      const closeBtn = this.querySelector('.rickroll-close') || document.querySelector('.rickroll-close');
      
      console.log('Button found:', button); // Debug
      console.log('Close button found:', closeBtn); // Debug
      
      // Function to close the modal
      const closeModal = () => {
        const modal = document.getElementById("rickroll-modal");
        const iframe = document.getElementById("rickroll-iframe");
        if (modal && iframe) {
          modal.style.display = "none";
          iframe.src = "";
          document.body.style.overflow = "auto";
        }
      };
      
      if (button) {
        button.addEventListener('click', () => {
          console.log('Button clicked!'); // Debug
          const modal = document.getElementById("rickroll-modal");
          const iframe = document.getElementById("rickroll-iframe");
          console.log('Modal found:', modal); // Debug
          if (modal && iframe) {
            modal.style.display = "flex";
            iframe.src = "https://www.youtube.com/embed/xvFZjo5PgG0?autoplay=1";
            document.body.style.overflow = "hidden";
          }
        });
      }
      
      // Close button click
      if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
      }
      
      // Click outside modal (on backdrop)
      const modal = document.getElementById("rickroll-modal");
      if (modal) {
        modal.addEventListener('click', (e) => {
          // Only close if clicking the modal backdrop, not the content
          if (e.target === modal) {
            closeModal();
          }
        });
      }
      
      // Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          const modal = document.getElementById("rickroll-modal");
          if (modal && modal.style.display === 'flex') {
            closeModal();
          }
        }
      });
      
    }, 100);
  }
}

customElements.define('home-cta', HomeCTA);