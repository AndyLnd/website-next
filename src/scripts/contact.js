import ajax from '@fdaciuk/ajax';

function init() {
  addFormSubmitListener();
  addCloseAlertListener();
}

function addFormSubmitListener(el) {
  const contactForm = document.querySelector('.contact-form');

  if (contactForm) {
    contactForm.onsubmit = (e) => {
      e.preventDefault();

      ajax().post(contactForm.getAttribute('action'), { email: e.target.email.value, message: e.target.message.value, 'form-name': e.target['form-name'].value })
        .then(onSuccess)
        .catch(onError(responseError))
    };
  }
}

function onSuccess() {
  const contactForm = document.querySelector('.contact-form');
  contactForm.reset();

  const alertEl = document.querySelector('.alert');
  const alertElContent = document.querySelector('.alert--content');

  alertEl.className += " alert__success";
  alertElContent.innerHTML = "Thank you! We will reply as soon as possible.";

}

function onError(error) {
  console.log(error);
  const alertEl = document.querySelector('.alert');
  const alertElContent = document.querySelector('.alert--content');

  alertEl.className += " alert__error";
  alertElContent.innerHTML = "Ups something went wrong!";
}

function addCloseAlertListener() {
  const closeButton = document.querySelector('.alert--close-button');
  const alertEl = document.querySelector('.alert');

  if (closeButton) {
    closeButton.onclick = () => {
      alertEl.className = "alert";
    }
  }
}


export default {
  init
}
