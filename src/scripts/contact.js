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
        .then((response, xhr) => {
          contactForm.reset();

          const alertEl = document.querySelector('.alert');
          alertEl.className += " alert__success";

          setTimeout(() => {alertEl.className = "alert";}, 3500);
        })
        .catch((responseError, xhr) => {
          console.log(responseError);
        })
    };
  }
}

export default {
  init
}
