"use strict";
let currentSlide = 1;
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
let seconds = 10000;
function showSlide(slideIndex) {
    currentSlide = slideIndex;
    const slides = document.getElementsByClassName('slide');
    if (slideIndex > slides.length) {
        currentSlide = 1;
    }
    if (slideIndex < 1) {
        currentSlide = slides.length;
    }
    for (var i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    slides[currentSlide - 1].style.display = 'block';
    if (slides.length <= 1) {
        prev.disabled = true;
        next.disabled = true;
    }
    if (slides.length > 1) {
        prev.disabled = false;
        next.disabled = false;
    }
    const messagesBox = document.querySelectorAll(".messages");
    messagesBox.forEach(m => {
        m.scrollTop = -m.scrollHeight;
    });
    clearInterval(interval);
    interval = setInterval(function () {
        nextSlide();
    }, seconds);
}
let interval = setInterval(function () {
    nextSlide();
}, seconds);
function nextSlide() {
    showSlide(currentSlide += 1);
}
function previousSlide() {
    showSlide(currentSlide -= 1);
}
