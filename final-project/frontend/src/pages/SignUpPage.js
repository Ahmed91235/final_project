import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { toast } from 'react-toastify';
import SignUpForm from '../components/Auth/SignUpForm';

function SignUpPage() {
  const [formState, setFormState] = useState({ username: '', password: '', email: '' });
  const navigate = useNavigate();

  const handleSignUp = async () => {
    const { username, password, email } = formState;
    if (!username.trim() || !password.trim() || !email.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      await Auth.signUp({ username, password, attributes: { email } });
      toast.success("Sign up successful! Check your email for the confirmation code.");
      navigate('/confirm', { state: { username } });
    } catch (error) {
      // Handle UsernameExistsException
      if (error.code === 'UsernameExistsException') {
        try {
          // Attempt resend sign up. If user is not confirmed, direct them to confirm.
          await Auth.resendSignUp(username);
          toast.info("This username is already registered but not confirmed. Confirmation code resent!");
          navigate('/confirm', { state: { username } });
        } catch (err) {
          // If resendSignUp fails, assume user is already confirmed. 
          toast.info("This username is already registered and confirmed. Please sign in.");
          navigate('/signin');
        }
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="container">
      <h2>Create an Account</h2>
      <SignUpForm formState={formState} setFormState={setFormState} handleSignUp={handleSignUp} />
      <div style={{textAlign: 'center'}}>
        Already have an account? <a className="link" href="/signin">Sign In</a>
      </div>
    </div>
  );
}

export default SignUpPage;
