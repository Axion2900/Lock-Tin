// ===============
// Features Page JavaScript
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
    "“A dream doesn't become reality through magic; it takes sweat, determination and hard work.” – Colin Powell",
    "“The price of success is hard work, dedication to the job at hand.” – Vince Lombardi",
    "“Talent is cheap; dedication is expensive. It will cost you your life.” – Irving Stone",
    "“Strive for progress, not perfection.”",
    "“Hard work beats talent when talent doesn't work hard.” – Tim Notke",
    "“The secret to getting ahead is getting started.” – Mark Twain",
    "“There's no shame in being weak. Shame is in staying weak.” – Black Clover",
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

setInterval(showQuote, 10000); // every 10 seconds
showQuote(); // initial quote

// ===============
// Smooth Fade-In for Content
// ===============
window.addEventListener("load", () => {
    document.body.classList.add("page-loaded");
});
