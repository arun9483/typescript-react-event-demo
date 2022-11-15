import React, { useEffect } from 'react';

import './MyForm.css';

const MyForm: React.FC<{}> = () => {
  useEffect(() => {
    // There are many ways to pick a DOM node; here we get the form itself and the email
    // input box, as well as the span element into which we will place the error message.
    const form = document.querySelector('form') as HTMLFormElement;
    const email = document.getElementById('mail') as HTMLInputElement;
    const emailError = document.querySelector(
      '#mail + span.error'
    ) as HTMLSpanElement;

    const InputHandler = (event: Event) => {
      // Each time the user types something, we check if the
      // form fields are valid.

      if (email.validity.valid) {
        // In case there is an error message visible, if the field
        // is valid, we remove the error message.
        emailError.textContent = ''; // Reset the content of the message
        emailError.className = 'error'; // Reset the visual state of the message
      } else {
        // If there is still an error, show the correct error
        showError();
      }
    };

    const submitHandler = (event: Event) => {
      // if the email field is valid, we let the form submit
      if (!email.validity.valid) {
        // If it isn't, we display an appropriate error message
        showError();
        // Then we prevent the form from being sent by canceling the event
        event.preventDefault();
      }
    };

    email.addEventListener('input', InputHandler);

    form.addEventListener('submit', submitHandler);

    function showError() {
      if (email.validity.valueMissing) {
        // If the field is empty,
        // display the following error message.
        emailError.textContent = 'You need to enter an e-mail address.';
      } else if (email.validity.typeMismatch) {
        // If the field doesn't contain an email address,
        // display the following error message.
        emailError.textContent = 'Entered value needs to be an e-mail address.';
      } else if (email.validity.tooShort) {
        // If the data is too short,
        // display the following error message.
        emailError.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
      }

      // Set the styling appropriately
      emailError.className = 'error active';
    }

    return () => {
      email.removeEventListener('input', InputHandler);
      form.removeEventListener('submit', submitHandler);
    };
  }, []);

  return (
    <div className="form-container">
      <form noValidate>
        <div className="field">
          <label htmlFor="mail">
            <span>Please enter an email address:</span>
            <input type="email" id="mail" name="mail" required minLength={8} />
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
