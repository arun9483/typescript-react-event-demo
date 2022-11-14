import React from 'react';

import './MyForm.css';

const MyForm: React.FC<{}> = () => {
  const inputListener = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const email = event.target as HTMLInputElement;
    if (email.validity.typeMismatch) {
      email.setCustomValidity('I am expecting an e-mail address!');
      email.reportValidity();
    } else if (email.validity.valueMissing) {
      email.setCustomValidity(
        'email id is required field, please enter email address'
      );
      email.reportValidity();
    } else {
      email.setCustomValidity('');
    }
  };

  return (
    <div className="form-container">
      <form>
        <div className="field">
          <label htmlFor="mail">
            I would like you to provide me with an e-mail address:
          </label>
          <input
            type="email"
            id="mail"
            name="mail"
            onInput={inputListener}
            required
          />
        </div>
        <div className="field">
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default MyForm;
