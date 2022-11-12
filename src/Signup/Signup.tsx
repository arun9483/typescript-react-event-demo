import React, { useState } from 'react';
import classNames from 'classnames';

import './Signup.css';

type Gender = 'male' | 'female' | undefined;

const SignUp: React.FC<{}> = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [isErrorInFirstName, setIsErrorInFirstName] = useState<boolean>(false);
  const [firstNameErrorMessage, setFirstNameErrorMessage] =
    useState<string>('');
  const [showFirstNameErrorMessage, setShowFirstNameErrorMessage] =
    useState<boolean>(false);

  const [lastName, setLastName] = useState<string>('');
  const [gender, setGender] = useState<Gender>(undefined);
  const [dob, setDob] = useState<string>(new Date().toISOString());
  const [subscription, setSubscription] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [aboutMe, setAboutMe] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [salary, setSalary] = useState<string>(''); // note this will hold only valid value that is number
  const [isErrorInSalary, setIsErrorInSalary] = useState<boolean>(false);
  const [salaryErrorMessage, setSalaryErrorMessage] = useState<string>('');
  const [showSalaryErrorMessage, setShowSalaryErrorMessage] =
    useState<boolean>(false);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('form submitted');
    console.log('form: ', event);
    const formData = new FormData(event.currentTarget);

    for (const pair of formData.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }
  };

  // note we can use one of React.ChangeEvent<HTMLInputElement> and React.FormEvent<HTMLInputElement>
  const firstNameChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (isErrorInFirstName) {
      if (event.target.validity.valid) {
        setIsErrorInFirstName(false);
        setShowFirstNameErrorMessage(false);
      } else {
        if (event.target.validity.valueMissing) {
          setFirstNameErrorMessage('first name is mandatory field');
          //Note other invalid test cases can also be added in another else-if block same as done for patternMismatch
        } else if (event.target.validity.tooShort) {
          setFirstNameErrorMessage(
            'first name should have at-least 2 characters'
          );
        } else {
          setFirstNameErrorMessage('enter correct first name');
        }
      }
    }
    const value = event.target.value;
    setFirstName(value);
  };

  const firstNameBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    if (!isErrorInFirstName) {
      if (!event.target.validity.valid) {
        setIsErrorInFirstName(true);
        setShowFirstNameErrorMessage(true);
        event.target.focus();
      }
    }

    if (isErrorInFirstName) {
      setShowFirstNameErrorMessage(false);
    }

    if (!event.target.validity.valid) {
      if (event.target.validity.valueMissing) {
        setFirstNameErrorMessage('first name is mandatory field');
        //Note other invalid test cases can also be added in another else-if block same as done for patternMismatch
      } else if (event.target.validity.tooShort) {
        setFirstNameErrorMessage(
          'first name should have at-least 2 characters'
        );
      } else {
        setFirstNameErrorMessage('enter correct first name');
      }
    }
  };

  const firstNameFocusHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    if (isErrorInFirstName) {
      setShowFirstNameErrorMessage(true);
    }
  };

  const lastNameChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setLastName(value);
  };

  const genderChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as Gender;
    setGender(value);
  };

  const dobChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = new Date(event.target.value).toISOString();
    setDob(value);
  };

  const subscriptionChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.checked;
    setSubscription(value);
  };

  const languageChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setLanguage(value);
  };

  const phoneChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPhone(value);
  };

  const aboutMeChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    setAboutMe(value);
  };

  const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmail(value);
  };

  const salaryChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isErrorInSalary) {
      if (event.target.validity.valid) {
        setIsErrorInSalary(false);
        setShowSalaryErrorMessage(false);
      } else {
        if (event.target.validity.valueMissing) {
          setSalaryErrorMessage('salary is mandatory field');
        } else if (event.target.validity.patternMismatch) {
          setSalaryErrorMessage('only numbers are allowed in salary field');
        } else {
          setSalaryErrorMessage('enter correct salary');
        }
      }
    }
    const value = event.target.value;
    setSalary(value);
  };

  const salaryBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    if (!isErrorInSalary) {
      if (!event.target.validity.valid) {
        setIsErrorInSalary(true);
        setShowSalaryErrorMessage(true);
        event.target.focus();
      }
    }

    if (isErrorInSalary) {
      setShowSalaryErrorMessage(false);
    }

    if (!event.target.validity.valid) {
      if (event.target.validity.valueMissing) {
        setSalaryErrorMessage('salary is mandatory field');
        //Note other invalid test cases can also be added in another else-if block same as done for patternMismatch
      } else if (event.target.validity.patternMismatch) {
        setSalaryErrorMessage('only numbers are allowed in salary field');
      } else {
        setSalaryErrorMessage('enter correct salary');
      }
    }
  };

  const salaryFocusHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    if (isErrorInSalary) {
      setShowSalaryErrorMessage(true);
    }
  };

  return (
    <section className="sign-up-container">
      <h2>Fill registration form</h2>
      <form name="register" onSubmit={submitHandler}>
        <div className="field-container">
          <fieldset>
            <legend>Name</legend>
            <label>
              <span>First Name </span>
              <input
                type="text"
                name="firstName"
                minLength={2}
                value={firstName}
                required
                onChange={firstNameChangeHandler}
                onBlur={firstNameBlurHandler}
                onFocus={firstNameFocusHandler}
                className={classNames(isErrorInFirstName ? 'error' : '')}
              />
              <span className="validity"></span>
            </label>{' '}
            {showFirstNameErrorMessage && (
              <span role="alert" className="salary-error-message">
                {firstNameErrorMessage}
              </span>
            )}
            <label>
              <span>Last Name </span>
              <input
                type="text"
                name="lastName"
                value={lastName}
                onChange={lastNameChangeHandler}
              />
            </label>
          </fieldset>
        </div>
        <div className="field-container">
          <fieldset>
            <legend>Gender</legend>
            <label>
              <span>Male </span>
              <input
                type="radio"
                name="gender"
                value="male"
                onChange={genderChangeHandler}
              />
            </label>
            <label>
              <span>Female </span>
              <input
                type="radio"
                name="gender"
                value="female"
                onChange={genderChangeHandler}
              />
            </label>
          </fieldset>
        </div>
        <div className="field-container">
          <fieldset>
            <legend>DOB</legend>
            <label>
              <span>dob </span>
              <input
                type="date"
                name="dob"
                value={dob.slice(0, 10)}
                onChange={dobChangeHandler}
              />
            </label>
          </fieldset>
        </div>
        <div className="field-container">
          <fieldset>
            <legend>subscription</legend>
            <label>
              <span>subscribe news letter</span>
              <input
                type="checkbox"
                name="subscription"
                onChange={subscriptionChangeHandler}
              />
            </label>
          </fieldset>
        </div>
        <div className="field-container">
          <fieldset>
            <legend>Languages</legend>
            <label>
              <span>Language selector</span>
              <select name="languages" onChange={languageChangeHandler}>
                <option value="" disabled>
                  Select Language(s)
                </option>
                <option value="hindi">Hindi</option>
                <option value="english">English</option>
                <option value="punjabi">Punjabi</option>
                <option value="tamil">Tamil</option>
              </select>
            </label>
          </fieldset>
        </div>
        <div className="field-container">
          <fieldset>
            <legend>Phone number</legend>
            <label>
              <span>mobile</span>
              <input
                type="text"
                name="phone"
                onChange={phoneChangeHandler}
                inputMode="decimal"
                pattern="^[6-9]\d{9}$"
                required
              />
            </label>
          </fieldset>
        </div>
        <div className="field-container">
          <fieldset>
            <legend>About</legend>
            <label>
              <span>About Me</span>
              <textarea
                className="about-me-text-area"
                name="aboutMe"
                onChange={aboutMeChangeHandler}
              />
            </label>
          </fieldset>
        </div>
        <div className="field-container">
          <fieldset>
            <legend>Email</legend>
            <label>
              <span>email</span>
              <input
                type="email"
                name="email"
                value={email}
                onChange={emailChangeHandler}
                required
              />
            </label>
          </fieldset>
        </div>
        <div className="field-container">
          <fieldset>
            <legend>Salary</legend>
            <label>
              <span>salary</span>
              <input
                type="text" // it should be number type but user should not be annoyed that's why text type is chosen
                inputMode="decimal"
                name="salary"
                value={salary}
                pattern="[1-9][0-9]*"
                onChange={salaryChangeHandler}
                onBlur={salaryBlurHandler}
                onFocus={salaryFocusHandler}
                required
                className={classNames(isErrorInSalary ? 'error' : '')}
              />
            </label>
            {showSalaryErrorMessage && (
              <span role="alert" className="salary-error-message">
                {salaryErrorMessage}
              </span>
            )}
          </fieldset>
        </div>
        <div className="field-container">
          <input type="submit" value="Save" />
        </div>
      </form>
    </section>
  );
};

export default SignUp;
