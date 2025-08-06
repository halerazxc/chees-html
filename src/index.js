const track = document.querySelector(".slider-track");
const cards = document.querySelectorAll(".slider-card");
const prevBtns = document.querySelectorAll(".slider-prev");
const nextBtns = document.querySelectorAll(".slider-next");
const currentEls = document.querySelectorAll(".slider-current");
const totalEls = document.querySelectorAll(".slider-total");


let index = 0;
let interval;


const getSlidesPerView = () => (window.innerWidth <= 1024 ? 1 : 3);

const getGap = () => (window.innerWidth <= 1024 ? 30 : 57);

const updateSlider = () => {
  const cardWidth = cards[0].getBoundingClientRect().width;
  const slidesPerView = getSlidesPerView();
  const maxIndex = cards.length - slidesPerView;
  const gap = getGap();

  if (index > maxIndex) index = 0;
  if (index < 0) index = maxIndex;

  const offset = index * (cardWidth + gap);
  track.style.transform = `translateX(-${offset}px)`;

  // Счётчик текущих карточек
currentEls.forEach(el => el.textContent = index + slidesPerView);
totalEls.forEach(el => el.textContent = cards.length);

};

const nextSlide = () => {
  const slidesPerView = getSlidesPerView();
  const maxIndex = cards.length - slidesPerView;
  index = index + 1 > maxIndex ? 0 : index + 1;
  updateSlider();
};

const prevSlide = () => {
  const slidesPerView = getSlidesPerView();
  const maxIndex = cards.length - slidesPerView;
  index = index - 1 < 0 ? maxIndex : index - 1;
  updateSlider();
};

const resetInterval = () => {
  clearInterval(interval);
  interval = setInterval(nextSlide, 4000);
};

window.addEventListener("resize", () => {
  const slidesPerView = getSlidesPerView();
  const maxIndex = cards.length - slidesPerView;
  if (index > maxIndex) index = maxIndex;
  updateSlider();
});

nextBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    nextSlide();
    resetInterval();
  })
);

prevBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    prevSlide();
    resetInterval();
  })
);

window.addEventListener("load", () => {
  updateSlider();
  interval = setInterval(nextSlide, 4000);
});


