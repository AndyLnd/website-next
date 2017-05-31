import axios from 'axios';
import queryString from 'query-string';

function init() {
  addFormSubmitListener();
  addCloseAlertListener();
}

function addFormSubmitListener(el) {
  const contactForm = document.querySelector('.contact-form');

  if (contactForm) {
    contactForm.onsubmit = (e) => {
      e.preventDefault();

      const query = {
        email: e.target.email.value,
        message: e.target.message.value,
        'form-name': e.target['form-name'] ? e.target['form-name'].value : 'webkid-contact'
      };

      const formQuery = queryString.stringify(query);

      axios.post(`https://webkid.io?${formQuery}`)
      .then(onSuccess)
      .catch(onError);
    };
  }
}

function onSuccess() {
  const contactForm = document.querySelector('.contact-form');
  contactForm.reset();

  const alertEl = document.querySelector('.alert');
  const alertElContent = document.querySelector('.alert--content');

  alertEl.classList.remove('alert__error');
  alertEl.classList.add('active');
  alertEl.classList.add('alert__success');
  alertElContent.innerHTML = 'Thank you! We will reply as soon as possible.';
}

function onError(error) {
  const alertEl = document.querySelector('.alert');
  const alertElContent = document.querySelector('.alert--content');

  alertEl.classList.remove('alert__success');
  alertEl.classList.add('active');
  alertEl.classList.add('alert__error');
  alertElContent.innerHTML = 'Oops, something went wrong. Please contact us at <a href="mailto:info@webkid.io">info@webkid.io</a>.';
}

function addCloseAlertListener() {
  const closeButton = document.querySelector('.alert--close-button');
  const alertEl = document.querySelector('.alert');

  if (closeButton) {
    closeButton.onclick = () => {
      alertEl.classList.remove('active');
    }
  }
}


export default {
  init
}
