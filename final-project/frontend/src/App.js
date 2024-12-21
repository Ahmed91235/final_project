import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';

// Pages
import SignUpPage from './pages/SignUpPage';
import ConfirmSignUpPage from './pages/ConfirmSignUpPage';
import SignInPage from './pages/SignInPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      setUser(currentUser);
    } catch (error) {
      setUser(null);
    }
  }

  return (
    <>
      <header>My Task Manager</header>
      <Router>
        <ToastContainer />
        <Routes>
          {/* If user is logged in, redirect from sign in/up/confirm to dashboard */}
          <Route path="/signup" element={!user ? <SignUpPage /> : <Navigate to="/dashboard" />} />
          <Route path="/confirm" element={!user ? <ConfirmSignUpPage /> : <Navigate to="/dashboard" />} />
          <Route path="/signin" element={!user ? <SignInPage onSignIn={checkUser} /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={user ? <DashboardPage user={user} onSignOut={() => { setUser(null); }} /> : <Navigate to="/signin" />} />
          <Route path="*" element={<Navigate to={user ? "/dashboard" : "/signup"} />} />
        </Routes>
      </Router>
      <div className="footer-space"></div>
      <footer>© 2024 My Task Manager</footer>
    </>
  );
}

export default App;
