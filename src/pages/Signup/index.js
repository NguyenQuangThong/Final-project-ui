import axios from 'axios';
import React, { useState } from 'react';

function Signup() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const handleUserName = (e) => {
    setUserName(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleFullName = (e) => {
    setFullName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Password and confirm password does not match!');
    } else {
      axios
        .post('http://localhost:8080/signup', {
          username: username,
          password: password,
          fullName: fullName,
          email: email,
        })
        .then((response) => {
          alert('Sign up success');
          window.location.replace('/');
        })
        .catch((err) => {
          alert('Username has already taken!');
        });
    }
  };
  return (
    <section class="ftco-section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-12 col-lg-10">
            <div class="wrap d-md-flex">
              <div
                class="img"
                style={{
                  backgroundImage: `url("https://media.istockphoto.com/photos/elearning-concept-online-classes-picture-id1140691163?k=20&m=1140691163&s=170667a&w=0&h=IxyVORZ27WEBE4wcpFoBhHSIAyjvHLAZBUSC3hcEMBU=")`,
                }}
              ></div>
              <div class="login-wrap p-4 p-md-5">
                <div class="d-flex">
                  <div class="w-100">
                    <h3 class="mb-4">Sign Up</h3>
                  </div>
                  <div class="w-100">
                    <p class="social-media d-flex justify-content-end">
                      <a href="#" class="social-icon d-flex align-items-center justify-content-center">
                        <span class="fa fa-facebook"></span>
                      </a>
                      <a href="#" class="social-icon d-flex align-items-center justify-content-center">
                        <span class="fa fa-twitter"></span>
                      </a>
                    </p>
                  </div>
                </div>
                <form class="signin-form" onSubmit={handleSubmit}>
                  <div class="form-group mb-3">
                    <label class="label" for="name">
                      Username(*)
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Username"
                      value={username}
                      onChange={handleUserName}
                      required
                    />
                  </div>
                  <div class="form-group mb-3">
                    <label class="label" for="fullname">
                      Full name
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Full name"
                      value={fullName}
                      onChange={handleFullName}
                    />
                  </div>
                  <div class="form-group mb-3">
                    <label class="label" for="fullname">
                      Email(*)
                    </label>
                    <input type="email" class="form-control" placeholder="Email" value={email} onChange={handleEmail} />
                  </div>
                  <div class="form-group mb-3">
                    <label class="label" for="password">
                      Password(*)
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
                    <label class="label" for="password">
                      Confirm password(*)
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
                      Sign Up
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
