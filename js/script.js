const carouselContainer = document.querySelector('.carousel-container');
const slides = document.querySelectorAll('.carousel-slide');

let currentIndex = 0;
let startX = 0;
let isDragging = false;

function showSlide(index) {
    carouselContainer.style.transform = `translateX(${-index * 100}%)`;
}

function nextSlide() {
    currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
    showSlide(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
    showSlide(currentIndex);
}

carouselContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
});

carouselContainer.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const x = e.touches[0].clientX;
    const walk = x - startX;
    carouselContainer.style.transform = `translateX(${-currentIndex * 100 + walk}px)`;
});

carouselContainer.addEventListener('touchend', (e) => {
    isDragging = false;
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;

    if (diff > 50) {
        prevSlide();
    } else if (diff < -50) {
        nextSlide();
    } else {
        showSlide(currentIndex);
    }
});

// Cambia la imagen automáticamente cada 4 segundos
setInterval(nextSlide, 5000);