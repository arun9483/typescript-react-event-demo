import React from 'react';

import './MyForm.css';

const MyForm: React.FC<{}> = () => {
  return (
    <div className="form-container">
      <form>
        <label htmlFor="choose">
          Would you prefer a banana or cherry? (required)
        </label>
        <input
          id="choose"
          name="i-like"
          pattern="[Bb]anana|[Cc]herry"
          required
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default MyForm;
