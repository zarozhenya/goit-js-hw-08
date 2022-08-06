import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('.feedback-form input[name="email"'),
  message: document.querySelector('.feedback-form textarea[name="message"'),
};
const LOCALSTORAGE_FORM_KEY = 'feedback-form-state';

const getData = () => {
  return {
    email: refs.email.value,
    message: refs.message.value,
  };
};

const onFormInput = e => {
  const data = getData();
  localStorage.setItem(LOCALSTORAGE_FORM_KEY, JSON.stringify(data));
};

const onFormSubmit = e => {
  e.preventDefault();
  const data = getData();
  e.currentTarget.reset();
  localStorage.removeItem(LOCALSTORAGE_FORM_KEY);
  console.log(data);
};

const populateForm = () => {
  const data = JSON.parse(localStorage.getItem(LOCALSTORAGE_FORM_KEY));
  refs.email.value = data?.email || '';
  refs.message.value = data?.message || '';
};

refs.form.addEventListener('input', throttle(onFormInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

populateForm();
