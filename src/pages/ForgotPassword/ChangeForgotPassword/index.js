import axios from 'axios';
import React, { useState } from 'react';
import conf from '~/pages/Meeting/conf';
function ChangeForgotPassword() {
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const handleCode = (e) => {
    setCode(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) alert('Password does not match!');
    else {
      await axios
        .put(window.URL + '/accounts/password/' + localStorage.getItem('userId'), {
          oldPassword: code,
          newPassword: password,
        })
        .then((response) => {
          localStorage.clear();
          alert('Change password successfully! Please use the recent password to sign in your account!');
          window.location.href = '/login';
        })
        .catch((err) => alert('Your verify code is invalid!'));
    }
  };
  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Reset your password</h2>
      <form class="signin-form container justify-content-center" onSubmit={handleSubmit} style={{ width: '30%' }}>
        <div class="form-group mb-3">
          <label class="label" for="fullname">
            Verify code
          </label>
          <input
            type="text"
            class="form-control"
            placeholder="Verify code"
            value={code}
            onChange={handleCode}
            required
          />
        </div>
        <div class="form-group mb-3">
          <label class="label" for="fullname">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            placeholder="Password"
            value={password}
            onChange={handlePassword}
            required
          />
        </div>
        <div class="form-group mb-3">
          <label class="label" for="fullname">
            Confirm password
          </label>
          <input
            type="password"
            class="form-control"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={handleConfirmPassword}
            required
          />
        </div>

        <div class="form-group">
          <button type="submit" class="form-control btn btn-primary rounded submit px-3">
            OK
          </button>
        </div>
      </form>
    </div>
  );
}
export default ChangeForgotPassword;
