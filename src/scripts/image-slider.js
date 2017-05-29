import Swipe from 'swipejs';

class ImageSlider {

  constructor(selector) {
    this.container = document.getElementById(selector);

    if (!this.container) {
      return false;
    }

    this.init = this.init.bind(this);
    this.renderSlideControls = this.renderSlideControls.bind(this);
    this.changeSlide = this.changeSlide.bind(this);
    this.getSlideByIndex = this.getSlideByIndex.bind(this);
    this.handleVideoEnded = this.handleVideoEnded.bind(this);

    this.onSlideChange = this.onSlideChange.bind(this);

    this.init();
    this.renderSlideControls();

    const slideIndex = this.slider.getPos();
    const currentSlide = this.getSlideByIndex(slideIndex);

    this.onSlideChange(slideIndex, currentSlide);
  }

  init() {
    this.slider = new Swipe(this.container, {
      draggable: true,
      transitionEnd: this.onSlideChange,
      speed: 1000,
      auto: 3000
    });
  }

  renderSlideControls() {
    const slideCount = this.slider.getNumSlides();
    const controlsContainer = this.container.querySelector('.slider-controls');

    for (let i = 0; i < slideCount; i++) {
      const li = document.createElement('li');

      li.setAttribute('data-index', i);
      li.onclick = () => this.changeSlide(i);

      controlsContainer.appendChild(li);
    }
  }

  changeSlide(slideIndex) {
    this.slider.slide(slideIndex, 600);
  }

  onSlideChange(slideIndex, slide) {
    const activeSlide = this.container.querySelector('.slider-controls li.active');

    if(activeSlide) {
      activeSlide.classList.remove('active');
    }

    this.container.querySelector(`.slider-controls li[data-index="${slideIndex}"]`).classList.add('active');
  }

  handleVideoEnded() {
    this.slider.next();
  }

  getSlideByIndex(slideIndex) {
    return this.container.querySelector(`.slide[data-index="${slideIndex}"]`);
  }

}

window.Slider = ImageSlider;
export default ImageSlider;
