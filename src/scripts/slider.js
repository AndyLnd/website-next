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
      callback: this.onSlideChange,
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
  }

  changeSlide(slideIndex) {
    this.slider.slide(slideIndex, 600);
  }

  onSlideChangeVideo(slideIndex, slide) {
    // first stop all other videos
    const playingSlides = this.container.querySelectorAll('.slide.playing');
    
    [].forEach.call(playingSlides, slide => {
      slide.classList.remove('playing');
      const activeVideo = slide.querySelector('.bg-video');
      activeVideo.pause();
    });

    // load + play video in slide
    const video = slide.querySelector('.bg-video');

    if (video) {
      const sources = video.querySelectorAll('source');

      [].forEach.call(sources, source => {
        source.setAttribute('src', source.getAttribute('data-src'));
      });

      video.oncanplay = evt => {
        video.play();
        slide.classList.add('playing');
      };

      // play next slide if video finished
      video.onended = () => this.handleVideoEnded();

      video.load();
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
        slide.classList.add('playing');
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

window.Slider = Slider;
export default Slider;
