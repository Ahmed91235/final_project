import React from 'react';

function SignInForm({ setFormState, handleSignIn }) {
  return (
    <div className="form-group">
      <label>Username</label>
      <input
        placeholder="Username"
        onChange={e => setFormState(form => ({...form, username: e.target.value}))}
      />

      <label>Password</label>
      <input
        placeholder="Password"
        type="password"
        onChange={e => setFormState(form => ({...form, password: e.target.value}))}
      />

      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
}

export default SignInForm;
