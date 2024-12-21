import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { toast } from 'react-toastify';
import SignInForm from '../components/Auth/SignInForm';

function SignInPage({ onSignIn }) {
  const [formState, setFormState] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSignIn = async () => {
    const { username, password } = formState;
    if (!username.trim() || !password.trim()) {
      toast.error("Please enter both username and password");
      return;
    }
    try {
      await Auth.signIn(username, password);
      toast.success("Signed in successfully!");
      if (onSignIn) onSignIn();
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container">
      <h2>Sign In</h2>
      <SignInForm setFormState={setFormState} handleSignIn={handleSignIn} />
      <div style={{textAlign: 'center'}}>
        Don't have an account? <a className="link" href="/signup">Sign Up</a><br/>
        Need to confirm your account? <a className="link" href="/confirm">Confirm here</a>
      </div>
    </div>
  );
}

export default SignInPage;
