import React, { useState } from 'react';
import './FormDemo.css';

interface FormElements extends HTMLFormControlsCollection {
  salary: HTMLInputElement;
}

interface DemoFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

const FormDemo: React.FC<{}> = () => {
  const [salary, setSalary] = useState<string>('');
  const [salaryErrorMessage, setSalaryErrorMessage] = useState<string>('');
  const [showSalaryErrorMessage, setShowSalaryErrorMessage] =
    useState<boolean>(false);
  const [isSalaryError, setIsSalaryError] = useState<boolean>(false);

  const setSalaryError = (
    inputElement: HTMLInputElement,
    serverSentError?: string
  ) => {
    if (!inputElement.validity.valid) {
      if (inputElement.validity.valueMissing) {
        setSalaryErrorMessage('Salary is mandatory filed');
      } else if (inputElement.validity.rangeUnderflow) {
        setSalaryErrorMessage('Salary should be at-least 1000');
      } else if (inputElement.validity.rangeOverflow) {
        setSalaryErrorMessage('Salary should not be more than 10000000');
      } else if (inputElement.validity.badInput) {
        setSalaryErrorMessage('Only numbers are allowed in Salary');
      }
    } else {
      if (serverSentError) {
        setSalaryErrorMessage(serverSentError);
      }
    }
  };
  const salaryChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isSalaryError) {
      if (event.target.validity.valid) {
        setIsSalaryError(false);
        setShowSalaryErrorMessage(false);
        setSalaryErrorMessage('');
      }
    }
    setSalary(event.target.value);
  };

  const salaryBlurHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isSalaryError) {
      setShowSalaryErrorMessage(false);
    } else {
      if (!event.target.validity.valid) {
        setIsSalaryError(true);
        //set here message here
        setSalaryError(event.target);
        setShowSalaryErrorMessage(true);
        event.target.focus();
      }
    }
  };

  const salaryFocusHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isSalaryError) {
      setShowSalaryErrorMessage(true);
    }
  };

  const submitHandler = (event: React.FormEvent<DemoFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const salary = form.elements.salary;
    if (!salary.validity.valid) {
      setIsSalaryError(true);
      //set here message here
      setSalaryError(salary);
      setShowSalaryErrorMessage(true);
      salary.focus();
    } else {
      console.log('salary is: ', salary.value);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={submitHandler} noValidate>
        <div className="field">
          <label htmlFor="salary">
            <span>Please enter your salary:</span>
            <input
              type="number"
              step={1}
              id="salary"
              name="salary"
              inputMode="decimal"
              required
              min={1000}
              max={10000}
              value={salary}
              onChange={salaryChangeHandler}
              onFocus={salaryFocusHandler}
              onBlur={salaryBlurHandler}
            />
          </label>
          {showSalaryErrorMessage && (
            <span className="error" role="alert" aria-live="polite">
              {salaryErrorMessage}
            </span>
          )}
        </div>
        <div className="field">
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default FormDemo;
