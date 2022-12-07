import axios from 'axios';
import React, { useState } from 'react';
const Login = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleUserName = (e) => {
    setUserName(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8080/login', {
        username: username,
        password: password,
      })
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.data.accountResponse));
        localStorage.setItem('token', JSON.stringify(response.data.token));
        alert('Login success');
        window.location.replace('/class');
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
        alert('Wrong credentials');
      });
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
                    <h3 class="mb-4">Sign In</h3>
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
                      Username
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
                    <label class="label" for="password">
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
                  <div class="form-group">
                    <button type="submit" class="form-control btn btn-primary rounded submit px-3">
                      Sign In
                    </button>
                  </div>
                  <div class="form-group d-md-flex">
                    <div class="w-50 text-left">
                      <label class="checkbox-wrap checkbox-primary mb-0">
                        Remember Me
                        <input type="checkbox" checked />
                        <span class="checkmark"></span>
                      </label>
                    </div>
                    <div class="w-50 text-md-right">
                      <a href="#">Forgot Password</a>
                    </div>
                  </div>
                </form>
                <p class="text-center">
                  Not a member?{' '}
                  <a data-toggle="tab" href="/signup">
                    Sign Up
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Login;
