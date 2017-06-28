import Swipe from 'swipejs';

class Slider {

  constructor(selector, autoplay) {
    this.container = document.getElementById(selector);

    if (!this.container) {
      return false;
    }

    this.isMobile = window.innerWidth < 768;

    this.init = this.init.bind(this);
    this.renderSlideControls = this.renderSlideControls.bind(this);
    this.changeSlide = this.changeSlide.bind(this);
    this.onSlideChangeVideo = this.onSlideChangeVideo.bind(this);
    this.onSlideChangeGif = this.onSlideChangeGif.bind(this);
    this.getSlideByIndex = this.getSlideByIndex.bind(this);
    this.handleVideoEnded = this.handleVideoEnded.bind(this);

    this.onSlideChange = this.isMobile ? this.onSlideChangeGif : this.onSlideChangeVideo;

    this.init(autoplay);
    this.renderSlideControls();

    const slideIndex = this.slider.getPos();
    const currentSlide = this.getSlideByIndex(slideIndex);

    this.onSlideChange(slideIndex, currentSlide);
  }

  init(autoplay) {
    this.slider = new Swipe(this.container, {
      draggable: true,
      transitionEnd: this.onSlideChange,
      speed: 1000,
      auto: autoplay ? 3000 : false
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

    const prevButton = this.container.querySelector('#prev');
    const nextButton = this.container.querySelector('#next');

    prevButton.onclick = () => this.slider.prev();
    nextButton.onclick = () =>this.slider.next();
  }

  changeSlide(slideIndex) {
    this.slider.slide(slideIndex, 600);
  }

  onSlideChangeVideo(slideIndex, slide) {
    const video = slide.querySelector('.bg-video');

    if (video) {
      // first stop all other videos
      const playingSlides = this.container.querySelectorAll('.slide');

      [].forEach.call(playingSlides, slide => {
        const activeVideo = slide.querySelector('.bg-video');
        activeVideo.currentTime = 0;

        activeVideo.pause();

        [].forEach.call(activeVideo.querySelectorAll('source'), source => {
          source.removeAttribute('src');
        });

        activeVideo.load();
      });

      // load + play video in slide
      const sources = video.querySelectorAll('source');

      [].forEach.call(sources, source => {
        source.setAttribute('src', source.getAttribute('data-src'));
      });

      video.oncanplay = evt => {
        video.play();
      };

      // play next slide if video finished
      video.onended = () => this.handleVideoEnded();

      // video.load();
    }

    const activeSlide = this.container.querySelector('.slider-controls li.active');

    if(activeSlide) {
      activeSlide.classList.remove('active');
    }

    this.container.querySelector(`.slider-controls li[data-index="${slideIndex}"]`).classList.add('active');
  }

  handleVideoEnded() {
    this.slider.next();
  }

  onSlideChangeGif(slideIndex, slide) {
    const gif = slide.querySelector('.bg-gif');

    if(gif){
      const gifSrc = gif.getAttribute('data-src');
      const gifLoader = new Image();
      gifLoader.onload = () => {
        gif.setAttribute('src', gifSrc);
      };

      gifLoader.src = gifSrc;
    }

    const activeSlide = this.container.querySelector('.slider-controls li.active');

    if(activeSlide) {
      activeSlide.classList.remove('active');
    }

    this.container.querySelector(`.slider-controls li[data-index="${slideIndex}"]`).classList.add('active');
  }

  getSlideByIndex(slideIndex) {
    return this.container.querySelector(`.slide[data-index="${slideIndex}"]`);
  }
}

export default Slider;
