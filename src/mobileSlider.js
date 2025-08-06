document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector(".stages--mob__slider");
  const slides = Array.from(slider.querySelectorAll(".stages--mob__slide"));
  const prevBtn = document.querySelector(".stages--mob__arrow--prev");
  const nextBtn = document.querySelector(".stages--mob__arrow--next");
  const paginationContainer = document.querySelector(".stages--mob__pagination");

  let currentIndex = 0;

  slides.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.className = "stages--mob__pagination-dot";
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      goToSlide(i);
    });
    paginationContainer.appendChild(dot);
  });

  const dots = Array.from(paginationContainer.children);

  function update() {
    slides.forEach((slide, i) => slide.classList.toggle("active", i === currentIndex));
    dots.forEach((dot, i) => dot.classList.toggle("active", i === currentIndex));
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === slides.length - 1;
  }

  function goToSlide(index) {
    if (index < 0 || index >= slides.length) return;
    currentIndex = index;
    update();
  }

  prevBtn.addEventListener("click", () => goToSlide(currentIndex - 1));
  nextBtn.addEventListener("click", () => goToSlide(currentIndex + 1));

  update();
});
