function init() {
  addSowButtonListener();
}

function addSowButtonListener() {
  const button = document.querySelector('.awards__button');

    if (button) {
      button.onclick = (e) => {
        console.log("yo");
        e.preventDefault();

        button.classList.toggle('.active');

        const awards = document.querySelectorAll('.award--hidden');
        const buttonActive = button.classList.contains('.active');

        [].forEach.call(awards, award => {
          buttonActive ? award.classList.remove('hide') : award.classList.add('hide');
        })

        button.innerHTML = buttonActive ? 'show less' : 'show more';
    }
  }
}

export default {
  init
}
