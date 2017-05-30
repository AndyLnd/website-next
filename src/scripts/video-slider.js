import Swipe from 'swipejs';

class VideoSlider {

  constructor(selector) {
    this.container = document.getElementById(selector);

    if (!this.container) {
      return false;
    }

    this.isMobile = window.innerWidth < 768;

    this.init = this.init.bind(this);
    this.renderSlideControls = this.renderSlideControls.bind(this);
    this.getSlideByIndex = this.getSlideByIndex.bind(this);
    this.onSlideChange = this.onSlideChange.bind(this);

    this.init();
    this.renderSlideControls();

    const slideIndex = this.slider.getPos();
    const currentSlide = this.getSlideByIndex(slideIndex);

    this.onSlideChange(slideIndex, currentSlide);
  }

  init() {
    this.slider = new Swipe(this.container, {
      draggable: false,
      transitionEnd: this.onSlideChange,
      speed: 1000,
      auto: false
    });

    this.initVideos();
  }

  initVideos() {
    const videos = this.container.querySelectorAll('video');

    [].forEach.call(videos, videoEl => {
      videoEl.addEventListener('canplay', () => {
        videoEl.play();

        // this is weird.
        // fixes a safari bug that displays the video on top of the overlay content
        // forces re-paint on video element
        // https://martinwolf.org/blog/2014/06/force-repaint-of-an-element-with-javascript
        videoEl.style.display= 'none';
        videoEl.offsetHeight;
        videoEl.style.display= 'block';
      });

      videoEl.addEventListener('ended', () => {
        this.slider.next();
      });
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

  onSlideChange(index, el) {
    this.unloadAllVideos();

    const sources = el.querySelectorAll('source[data-src]');
    const videoEl = el.querySelector('video');

    [].forEach.call(sources, source => {
      source.setAttribute('src', source.getAttribute('data-src'));
    });

    videoEl.load();
  }

  unloadAllVideos() {
    const allSources = this.container.querySelectorAll('source');
    const allVideos = this.container.querySelectorAll('video');

    [].forEach.call(allSources, source => {
      source.removeAttribute('src');
    });

    [].forEach.call(allVideos, video => {
      video.load();
    });
  }

  getSlideByIndex(slideIndex) {
    return this.container.querySelector(`.slide[data-index="${slideIndex}"]`);
  }
}

export default VideoSlider;
