import inView from 'in-view';

function init() {
  inView('*[data-bg]')
    .on('enter', loadBackgroundImage);
}

function loadBackgroundImage(el) {
  const imgSrc = el.getAttribute('data-bg');
  el.style.backgroundImage = `url('${imgSrc}')`;
}

export default {
  init
}