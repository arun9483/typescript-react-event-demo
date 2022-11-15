import React, { useEffect } from 'react';

import './MyForm.css';

const MyForm: React.FC<{}> = () => {
  useEffect(() => {
    const form = document.querySelector('form') as HTMLFormElement;
    const email = document.getElementById('mail') as HTMLInputElement;
    const error = email.nextElementSibling as HTMLSpanElement;

    // As per the HTML Specification
    const emailRegExp =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    // Now we can rebuild our validation constraint
    // Because we do not rely on CSS pseudo-class, we have to
    // explicitly set the valid/invalid class on our email field
    const onLoadHandler = (event: Event) => {
      // Here, we test if the field is empty (remember, the field is not required)
      // If it is not, we check if its content is a well-formed e-mail address.
      const isValid = email.value.length === 0 || emailRegExp.test(email.value);
      email.className = isValid ? 'valid' : 'invalid';
    };

    // This defines what happens when the user types in the field
    const InputHandler = (event: Event) => {
      const isValid = email.value.length === 0 || emailRegExp.test(email.value);
      if (isValid) {
        email.className = 'valid';
        error.textContent = '';
        error.className = 'error';
      } else {
        email.className = 'invalid';
      }
    };

    // This defines what happens when the user tries to submit the data
    const submitHandler = (event: Event) => {
      event.preventDefault();

      const isValid = email.value.length === 0 || emailRegExp.test(email.value);
      if (!isValid) {
        email.className = 'invalid';
        error.textContent = 'I expect an e-mail, darling!';
        error.className = 'error active';
      } else {
        email.className = 'valid';
        error.textContent = '';
        error.className = 'error';
      }
    };

    window.addEventListener('load', onLoadHandler);
    email.addEventListener('input', InputHandler);
    form.addEventListener('submit', submitHandler);

    return () => {
      email.removeEventListener('input', InputHandler);
      form.removeEventListener('submit', submitHandler);
      window.removeEventListener('load', onLoadHandler);
    };
  }, []);

  return (
    <div className="form-container">
      <form noValidate>
        <div className="field">
          <label htmlFor="mail">
            <span>Please enter an email address:</span>
            <input type="text" id="mail" name="mail" />
            <span className="error" aria-live="polite"></span>
          </label>
        </div>
        <div className="field">
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default MyForm;
