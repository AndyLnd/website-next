import Swipe from 'swipejs';

class Slider {

  constructor() {
    this.container = document.getElementById('slider');

    if (!this.container) {
      return false;
    }

    this.slider = new Swipe(this.container, {
      startSlide: 0,
      draggable: true,
      transitionEnd: this.onSwipeChange
    });

    this.renderSlideControls = this.renderSlideControls.bind(this);
    this.changeSlide = this.changeSlide.bind(this);

    this.renderSlideControls();
  }

  renderSlideControls() {
    const slideCount = this.slider.getNumSlides();
    const controlsContainer = this.container.querySelector('.slider-controls');

    for (let i = 0; i < slideCount; i++) {
      const li = document.createElement('li');
      li.onclick = () => this.changeSlide(i);

      controlsContainer.appendChild(li);
    }
  }

  changeSlide(slideIndex) {
    this.slider.slide(slideIndex, 600);
  }

  onSwipeChange() {
    // load + play video in slide
  }
}

export default Slider;