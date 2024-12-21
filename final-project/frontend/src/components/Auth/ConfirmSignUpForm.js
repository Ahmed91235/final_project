import React from 'react';

function ConfirmSignUpForm({ confirmationCode, setConfirmationCode, handleConfirmSignUp }) {
  return (
    <div className="form-group">
      <label>Confirmation Code</label>
      <input
        placeholder="Enter confirmation code"
        value={confirmationCode}
        onChange={e => setConfirmationCode(e.target.value)}
      />
      <button onClick={handleConfirmSignUp}>Confirm</button>
    </div>
  );
}

export default ConfirmSignUpForm;
