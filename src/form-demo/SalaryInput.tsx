import React, { useState } from 'react';

const SalaryInput: React.FC<{}> = () => {
  const [salary, setSalary] = useState<string>('');
  const [salaryErrorMessage, setSalaryErrorMessage] = useState<string>('');
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
    if (event.target.validity.valid) {
      setIsSalaryError(false);
      setSalaryErrorMessage('');
    }
    setSalary(event.target.value);
  };

  const salaryBlurHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.validity.valid) {
      setIsSalaryError(true);
      setSalaryError(event.target);
    }
  };

  return (
    <div className="field">
      <label htmlFor="salary">
        <span>Please enter your salary:</span>
        <input
          type="number"
          step={1}
          name="salary"
          inputMode="decimal"
          required
          min={1000}
          max={10000}
          value={salary}
          onChange={salaryChangeHandler}
          onBlur={salaryBlurHandler}
        />
      </label>
      {isSalaryError && (
        <span className="error" role="alert" aria-live="polite">
          {salaryErrorMessage}
        </span>
      )}
    </div>
  );
};

export default SalaryInput;
