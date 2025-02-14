
const createCarousel = (carouselElement, time = 5000) => {
    const slides = carouselElement.querySelector(".carousel-slides");
    const carouselSlides = carouselElement.querySelectorAll('.carousel-slide');
    const nextButton = carouselElement.querySelector('.carousel-next-btn');
    const prevButton = carouselElement.querySelector('.carousel-prev-btn');
    const dotsContainer = carouselElement.querySelector('.carousel-dots');
    const dotElements = dotsContainer.querySelectorAll('.dot');
    let index = 0;
    let timer = null
    const goToSlide = (slideIndex) => {
    if(slideIndex < 0) {
        slideIndex = carouselSlides.length - 1;
    } else if(slideIndex >= carouselSlides.length) {
        slideIndex = 0;
    }
    index = slideIndex;
    slides.style.transform = `translateX(${-index * 100}%)`;
}

    const nextSlide = () => {
        index++;
        goToSlide(index);
        updateDots()
    }

    const prevSlide = () => {
        index--;
        goToSlide(index);
        updateDots()
    }

    
    const startTimer = () => {
        timer = setInterval(nextSlide, time);
    }
    
    const clearTimer = () => {
        clearInterval(timer);
        startTimer()
    }
    
    nextButton.addEventListener('click', () => {
        nextSlide();
        clearTimer();
    });
    
    prevButton.addEventListener('click', () => {
        prevSlide();
        clearTimer();
    });
    
    const updateDots = () => {
        dotElements.forEach(dot => {
            if(dot.dataset.index != index) dot.classList.remove('active');
            if(dot.dataset.index == index) dot.classList.add('active');
            
        });
        

    }
    dotElements.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            goToSlide(i);
            updateDots();
            clearTimer();
        });
    });
    startTimer();


}
 export default createCarousel
 document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".carousel-container").forEach((carousel) => {
      createCarousel(carousel, 10000);
    });
  });