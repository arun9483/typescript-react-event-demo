import React from 'react';

import './MyForm.css';

const MyForm: React.FC<{}> = () => {
  return (
    <div className="form-container">
      <form>
        <div className="field">
          <label htmlFor="choose">Would you prefer a banana or a cherry?</label>
          <input
            type="text"
            id="choose"
            name="i-like"
            required
            minLength={6}
            maxLength={6}
          />
        </div>
        <div className="field">
          <label htmlFor="number">How many would you like?</label>
          <input
            type="number"
            id="number"
            name="amount"
            defaultValue="1"
            min="1"
            max="10"
            step="0.01"
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
