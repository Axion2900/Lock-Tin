// ===============
// Team Page JavaScript
// Author: Dan Shan
// Date: Oct 31, 2025
// ===============

// ===============
// Typewriter Effect
// ===============
document.addEventListener("DOMContentLoaded", () => {
    const title = document.querySelector("h1");
    const text = title.textContent;
    title.textContent = "";

    let index = 0;
    function typeWriter() {
        if (index < text.length) {
            title.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 60); // typing speed
        }
    }

    // Start typing after a short delay
    setTimeout(typeWriter, 400);
});

// ===============
// Quote Rotator
// ===============
const quotes = [
    "“Success is the sum of small efforts, repeated day in and day out.” – R. Collier",
    "“Don’t watch the clock; do what it does. Keep going.” – Sam Levenson",
    "“Discipline is the bridge between goals and accomplishment.” – Jim Rohn",
    "“Strive for progress, not perfection.”",
    "“The secret to getting ahead is getting started.” – Mark Twain",
];

let quoteIndex = 0;
const quoteElement = document.createElement("div");
quoteElement.classList.add("quote-box");
document.body.appendChild(quoteElement);

function showQuote() {
    quoteElement.classList.remove("fade-in");
    void quoteElement.offsetWidth; // restart CSS animation
    quoteElement.textContent = quotes[quoteIndex];
    quoteElement.classList.add("fade-in");
    quoteIndex = (quoteIndex + 1) % quotes.length;
}

setInterval(showQuote, 5000); // every 5 seconds
showQuote(); // initial quote

// ===============
// Smooth Fade-In for Content
// ===============
window.addEventListener("load", () => {
    document.body.classList.add("page-loaded");
});
