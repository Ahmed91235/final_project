import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { toast } from 'react-toastify';
import ConfirmSignUpForm from '../components/Auth/ConfirmSignUpForm';

function ConfirmSignUpPage() {
  const [confirmationCode, setConfirmationCode] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state?.username || '';

  useEffect(() => {
    // If no username passed in, redirect to signup
    if (!username) {
      navigate('/signup');
    }
  }, [username, navigate]);

  const handleConfirmSignUp = async () => {
    try {
      await Auth.confirmSignUp(username, confirmationCode);
      toast.success("Email confirmed! You can now sign in.");
      navigate('/signin');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container">
      <h2>Confirm Your Account</h2>
      <ConfirmSignUpForm
        confirmationCode={confirmationCode}
        setConfirmationCode={setConfirmationCode}
        handleConfirmSignUp={handleConfirmSignUp}
      />
    </div>
  );
}

export default ConfirmSignUpPage;
