import ajax from '@fdaciuk/ajax';

function init() {
  addFormSubmitListener();
}

function addFormSubmitListener(el) {
  // const contactForm = document.querySelector('.contact-form');

  // if (contactForm) {
  //   contactForm.onsubmit = (e) => {
  //     e.preventDefault();

  //     console.log(contactForm.getAttribute('action'));
  //     ajax().post(contactForm.getAttribute('action'), { email: e.target.email.value, message: e.target.email.message})
  //       .then((response, error) => {console.log(response, error)})
  //   };
  // }
}

export default {
  init
}
