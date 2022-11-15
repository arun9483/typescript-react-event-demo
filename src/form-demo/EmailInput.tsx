import React, { useState } from 'react';

const EmailInput: React.FC<{}> = () => {
  const [email, setEmail] = useState<string>('');
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
  const [isEmailError, setIsEmailError] = useState<boolean>(false);

  const setEmailError = (
    inputElement: HTMLInputElement,
    serverSentError?: string
  ) => {
    if (!inputElement.validity.valid) {
      if (inputElement.validity.valueMissing) {
        setEmailErrorMessage('Email is mandatory filed');
      } else if (inputElement.validity.typeMismatch) {
        setEmailErrorMessage('Please enter valid Email address');
      } else {
        //
      }
    } else {
      if (serverSentError) {
        setEmailErrorMessage(serverSentError);
      }
    }
  };
  const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.validity.valid) {
      setIsEmailError(false);
      setEmailErrorMessage('');
    }
    setEmail(event.target.value);
  };

  const emailBlurHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.validity.valid) {
      setIsEmailError(true);
      setEmailError(event.target);
    }
  };

  return (
    <div className="field">
      <label htmlFor="email">
        <span>Please enter your email:</span>
        <input
          type="email"
          name="email"
          required
          value={email}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
      </label>
      {isEmailError && (
        <span className="error" role="alert" aria-live="polite">
          {emailErrorMessage}
        </span>
      )}
    </div>
  );
};

export default EmailInput;
