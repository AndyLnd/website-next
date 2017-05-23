import inView from 'in-view';

function init() {
  inView('*[data-bg]')
    .on('enter', loadBackgroundImage);
}

function loadBackgroundImage(el) {
  const imgSrc = el.getAttribute('data-bg');
  const bgImg = new Image();
  bgImg.onload = () => {
    el.style.backgroundImage = `url('${imgSrc}')`;
    el.classList.remove('teaser--placeholder');
  };
  bgImg.src = imgSrc;
}

export default {
  init
}
