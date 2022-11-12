import React, { useState } from 'react';

import './Signup.css';

type Gender = 'male' | 'female' | undefined;

const SignUp: React.FC<{}> = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [gender, setGender] = useState<Gender>(undefined);
  const [dob, setDob] = useState<string>(new Date().toISOString());
  const [subscription, setSubscription] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [aboutMe, setAboutMe] = useState<string>('');

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
    const value = event.target.value;
    setFirstName(value);
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
                value={firstName}
                required
                onChange={firstNameChangeHandler}
              />
            </label>{' '}
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
                required
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
              <select
                name="languages"
                required
                onChange={languageChangeHandler}
              >
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
              <input type="tel" name="phone" onChange={phoneChangeHandler} />
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
          <input type="submit" value="Save" />
        </div>
      </form>
      <div className="form-data">
        <div>
          Full name: {firstName} {lastName}
        </div>
        <div>Gender: {gender ? gender : 'nothing selected'}</div>
        <div>Dob: {new Date(dob).toLocaleDateString()}</div>
        <div>Is news letter subscribe: {subscription ? 'Yes' : 'No'}</div>
        <div>Language: {language}</div>
        <div>Phone: {phone}</div>
        <div>
          <p>{aboutMe}</p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
