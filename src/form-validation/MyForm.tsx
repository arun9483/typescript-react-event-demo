import React from 'react';

import './MyForm.css';

const MyForm: React.FC<{}> = () => {
  return (
    <div className="form-container">
      <form>
        <div className="field">
          <fieldset>
            <legend>
              Do you have a driver's license?
              <span aria-label="required">*</span>
            </legend>

            <input type="radio" required name="driver" id="r1" value="yes" />
            <label htmlFor="r1">Yes</label>
            <input type="radio" required name="driver" id="r2" value="no" />
            <label htmlFor="r2">No</label>
          </fieldset>
        </div>
        <div className="field">
          <label htmlFor="n1">How old are you?</label>

          <input
            type="number"
            min="12"
            max="120"
            step="1"
            id="n1"
            name="age"
            pattern="\d+"
          />
        </div>
        <div className="field">
          <label htmlFor="t1">
            What's your favorite fruit?<span aria-label="required">*</span>
          </label>
          <input
            type="text"
            id="t1"
            name="fruit"
            list="l1"
            required
            pattern="[Bb]anana|[Cc]herry|[Aa]pple|[Ss]trawberry|[Ll]emon|[Oo]range"
          />
          <datalist id="l1">
            <option>Banana</option>
            <option>Cherry</option>
            <option>Apple</option>
            <option>Strawberry</option>
            <option>Lemon</option>
            <option>Orange</option>
          </datalist>
        </div>
        <div className="field">
          <label htmlFor="t2">What's your e-mail address?</label>
          <input type="email" id="t2" name="email" />
        </div>
        <div className="field">
          <label htmlFor="t3">Leave a short message</label>
          <textarea id="t3" name="msg" maxLength={140} rows={5}></textarea>
        </div>
        <div className="field">
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default MyForm;
