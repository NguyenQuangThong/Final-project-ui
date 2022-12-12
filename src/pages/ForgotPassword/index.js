import axios from 'axios';
import React, { useState } from 'react';
import { spinner } from 'react-loader-spinner';
function ForgotPassword() {
  const [email, setEmail] = useState('');
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    var sender = new FormData();
    sender.append('email', email);
    await axios
      .post('http://localhost:8080/accounts/forgot-password', sender)
      .then((response) => {
        if (response.data != null) {
          localStorage.setItem('userId', response.data);
          alert('Please check your email for the code!');
          window.location.href = '/forgot-password/change';
        } else alert('Cannot find your email! Please try again!');
      })
      .catch((err) => {
        alert('Cannot find your email! Please try again!');
      });
  };
  return (
    <spinner>
      <form class="signin-form container justify-content-center" onSubmit={handleSubmit} style={{ width: '30%' }}>
        <h5 style={{ textAlign: 'center' }}>We will send the verify code to your email you entered.</h5>
        <div class="form-group mb-3">
          <label class="label" for="name">
            Your email
          </label>
          <input type="email" class="form-control" placeholder="Email" value={email} onChange={handleEmail} required />
        </div>
        <div class="form-group">
          <button type="submit" class="form-control btn btn-primary rounded submit px-3">
            Send code
          </button>
        </div>
      </form>
    </spinner>
  );
}
export default ForgotPassword;
