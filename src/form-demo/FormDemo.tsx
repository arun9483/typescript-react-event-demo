import React from 'react';
import SalaryInput from './SalaryInput';
import EmailInput from './EmailInput';
import './FormDemo.css';

interface FormElements extends HTMLFormControlsCollection {
  salary: HTMLInputElement;
  email: HTMLInputElement;
}

interface DemoFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

const FormDemo: React.FC<{}> = () => {
  const submitHandler = (event: React.FormEvent<DemoFormElement>) => {
    console.log('form submit handler invoked');
    event.preventDefault();
    let isFormValid = true;
    const form = event.currentTarget;
    console.log('form.elements', form.elements);
    if (isFormValid) {
      const salary = form.elements['salary'];
      if (!salary.validity.valid) {
        console.error('invalid salary');
        isFormValid = false;
        // display salary error
      } else {
        console.log('salary is: ', salary.value);
      }
    }

    if (isFormValid) {
      const email = form.elements['email'];
      if (!email.validity.valid) {
        console.error('invalid email');
        isFormValid = false;
        // display salary error
      } else {
        console.log('email id is: ', email.value);
      }
    }

    if (isFormValid) {
      const formData = new FormData(form);
      // form controls key-value pair object
      const fieldValues = Object.fromEntries(formData.entries());
      console.log('fieldValues: ', fieldValues);
      // note fieldValues v=can be sent in POST call as body
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={submitHandler} noValidate>
        <div className="field">
          <SalaryInput />
          <EmailInput />
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default FormDemo;
