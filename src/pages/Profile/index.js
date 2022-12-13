/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
function Profile() {
  let user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  function isTokenExpired(token) {
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }

  if (user === null) window.location.href = '/login';
  else {
    if (isTokenExpired(token)) {
      alert('Your session have been expired!');
      localStorage.clear();
      window.location.href = '/';
    }
    let username = user.username;
    let userId = user.accountId;
    const [content, setContent] = useState(null);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [fullName, setFullName] = useState(user.fullName);
    const [email, setEmail] = useState(user.email);

    const handleOldPassword = (e) => {
      setOldPassword(e.target.value);
    };
    const handleNewPassword = (e) => {
      setNewPassword(e.target.value);
    };
    const handleConfirmNewPassword = (e) => {
      setConfirmNewPassword(e.target.value);
    };

    const getAccount = async (e) => {
      await axios.get('http://localhost:8080/accounts/' + userId).then((response) => {
        localStorage.setItem('user', JSON.stringify(response.data));
      });
    };

    let avatar = 'http://localhost:8080/' + user.avatar;

    const handleFullName = (e) => {
      setFullName(e.target.value);
    };

    const handleEmail = (e) => {
      setEmail(e.target.value);
    };

    const handleAvatar = (e) => {
      setContent(e.target.files[0]);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      var data = new FormData();
      data.append('fullName', fullName);
      data.append('email', email);
      data.append('avatar', content);
      axios
        .put('http://localhost:8080/accounts/' + userId, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          getAccount();
          alert('Update profile successfully!');
          window.location.href = '/profile';
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response);
          alert('Wrong credentials');
        });
    };
    const passwordUpdate = (e) => {
      e.preventDefault();
      if (newPassword !== confirmNewPassword) alert('Password does not match!');
      else {
        axios
          .put('http://localhost:8080/accounts/password/' + userId, {
            oldPassword,
            newPassword,
          })
          .then((response) => {
            alert('Update profile successfully! Please sign in with your new password!');
            localStorage.clear();
            window.location.href = '/login';
          })
          .catch((err) => {
            console.log(err);
            console.log(err.response);
            alert('Wrong credentials');
          });
      }
    };

    return (
      <>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Change your password
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form class="signin-form" onSubmit={passwordUpdate} id="formSubmit">
                  <div class="form-group mb-3">
                    <label class="label" for="name">
                      Old password
                    </label>
                    <input
                      type="password"
                      class="form-control"
                      placeholder="Old password"
                      value={oldPassword}
                      onChange={handleOldPassword}
                      required
                    />
                  </div>
                  <div class="form-group mb-3">
                    <label class="label" for="name">
                      New password
                    </label>
                    <input
                      type="password"
                      class="form-control"
                      placeholder="New password"
                      value={newPassword}
                      onChange={handleNewPassword}
                      required
                    />
                  </div>
                  <div class="form-group mb-3">
                    <label class="label" for="name">
                      Confirm new password
                    </label>
                    <input
                      type="password"
                      class="form-control"
                      placeholder="Confirm new password"
                      value={confirmNewPassword}
                      onChange={handleConfirmNewPassword}
                      required
                    />
                  </div>
                </form>
                <div class="modal-footer">
                  <button type="submit" class="btn btn-primary rounded submit px-3" form="formSubmit">
                    Submit
                  </button>
                  <button type="button" class="btn btn-secondary rounded" data-bs-dismiss="modal">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
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
                        <h3 class="mb-4">Profile</h3>
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
                    <div class="text-center">
                      {/* <img src={avatar} class="rounded" alt="avatar" style={{ width: 150, height: 150 }} /> */}
                      <label for="image">
                        <input
                          type="file"
                          accept="image/png, image/gif, image/jpeg"
                          onChange={handleAvatar}
                          name="image"
                          id="image"
                        />
                        <img src={avatar} class="rounded" alt="avatar" style={{ width: 150, height: 150 }} />
                      </label>
                      <h4>{username}</h4>
                    </div>

                    <form class="signin-form" onSubmit={handleSubmit}>
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
                          Email
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Full name"
                          value={email}
                          onChange={handleEmail}
                          required
                        />
                      </div>

                      <div class="form-group">
                        <button
                          type="submit"
                          class="form-control btn btn-primary rounded submit px-3"
                          disabled={user.fullName === fullName && user.email === email ? true : false}
                        >
                          OK
                        </button>
                      </div>
                      <br></br>

                      <div style={{ textAlign: 'center' }}>
                        <a
                          href="#exampleModal"
                          style={{ textDecoration: 'none' }}
                          data-bs-target="#exampleModal"
                          data-bs-toggle="modal"
                        >
                          Change password
                        </a>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}
export default Profile;
