// ===============
// Typewriter Effect
// Author: Dan Shan
// Date: Oct 31, 2025
// ===============

function runWhenReady(fn) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fn);
    } else {
        fn();
    }
}

function startTypingOnElement(element, typingSpeed = 60, startDelay = 400) {
    if (!element) return;
    const text = element.textContent || '';
    if (!text) return;

    element.textContent = '';
    element.style.opacity = '1';

    let index = 0;
    function typeWriter() {
        if (index < text.length) {
            element.textContent += text.charAt(index++);
            setTimeout(typeWriter, typingSpeed);
        }
    }

    setTimeout(typeWriter, startDelay);
}

export function initTypewriter(selector = 'h1', typingSpeed = 60, startDelay = 400) {
    runWhenReady(() => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el) => startTypingOnElement(el, typingSpeed, startDelay));
    });
}

export function applyTypewriterToElement(element, typingSpeed = 60, startDelay = 400) {
    startTypingOnElement(element, typingSpeed, startDelay);
}

initTypewriter();
