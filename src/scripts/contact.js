import ajax from '@fdaciuk/ajax';

function init() {
  addFormSubmitListener();
}

function addFormSubmitListener(el) {
  const contactForm = document.querySelector('.contact-form');

  if (contactForm) {
    contactForm.onsubmit = (e) => {
      e.preventDefault();

      ajax().post(contactForm.getAttribute('action'), { email: e.target.email.value, message: e.target.message.value, 'form-name': e.target['form-name'].value })
        .then((response, error) => {console.log(response, error)})
    };
  }
}

export default {
  init
}
