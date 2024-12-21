import React from 'react';

function SignUpForm({ formState, setFormState, handleSignUp }) {
  return (
    <div className="form-group">
      <label>Username</label>
      <input
        placeholder="Username"
        value={formState.username}
        onChange={e => setFormState({...formState, username: e.target.value})}
      />

      <label>Email</label>
      <input
        placeholder="Email"
        value={formState.email}
        onChange={e => setFormState({...formState, email: e.target.value})}
      />

      <label>Password</label>
      <input
        placeholder="Password"
        type="password"
        value={formState.password}
        onChange={e => setFormState({...formState, password: e.target.value})}
      />

      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
}

export default SignUpForm;
