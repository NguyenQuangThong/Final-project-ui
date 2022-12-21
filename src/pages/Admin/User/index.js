import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { faCircleMinus } from '@fortawesome/free-solid-svg-icons';
function User() {
  const [users, setUsers] = useState([]);
  let accountList = [];
  let navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [username, setUserName] = useState('');
  const [fullName, setFullName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [email, setEmail] = useState('');
  const [account, setAccount] = useState([]);
  const [content, setContent] = useState(null);
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    const getAllAccount = async (e) => {
      await axios.get(window.DOMAIN + '/accounts/users').then((response) => setUsers(response.data));
    };
    getAllAccount();
  }, []);

  if (user !== null && user.role === 'Admin') {
    const isChecked = (e, item) => {
      if (e.target.checked) accountList.push(parseInt(e.target.value));
      else accountList = accountList.filter((accountList) => accountList !== parseInt(e.target.value));
      console.log(accountList);
    };

    const handleEdit = (e, item) => {
      e.preventDefault();
      setUserName(item.username);
      setFullName(item.fullName);
      setEmail(item.email);
      setAccount(item);
      setAvatar(window.DOMAIN + '/' + item.avatar);
    };

    const handleUsername = (e) => {
      setUserName(e.target.value);
    };

    const handleFullName = (e) => {
      setFullName(e.target.value);
    };

    const handleNewPassword = (e) => {
      setNewPassword(e.target.value);
    };

    const handleEmail = (e) => {
      setEmail(e.target.value);
    };

    const handleAvatar = (e) => {
      setContent(e.target.files[0]);
    };

    const userUpdate = (e) => {
      e.preventDefault();
      var data = new FormData();
      data.append('fullName', fullName);
      data.append('email', email);
      data.append('avatar', content);
      axios
        .put(window.DOMAIN + '/accounts/' + account.accountId, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          alert('Update user profile successfully!');
          window.location.reload();
        })
        .catch((err) => {
          alert('Wrong credentials');
        });
    };
    const passwordUpdate = async (e, accountId) => {
      e.preventDefault();
      var password = new FormData();
      password.append('password', newPassword);
      await axios
        .put(window.DOMAIN + '/accounts/reset/' + account.accountId, password)
        .then((response) => {
          localStorage.clear();
          alert('Update user password successfully!');
        })
        .catch((err) => {
          alert('Wrong credentials');
        });
    };

    const createNewUser = async (e) => {
      e.preventDefault();
      await axios
        .post(window.DOMAIN + '/signup', {
          username: username,
          password: newPassword,
          fullName: fullName,
          email: email,
        })
        .then((response) => {
          alert('Create new account successfully!');
          window.location.reload();
        })
        .catch((err) => {
          alert('Some errors have been found!');
        });
    };

    const deleteAccount = (e) => {
      e.preventDefault();
      if (accountList.length === 0) alert('Please select account to delete!');
      else {
        axios
          .delete(window.DOMAIN + '/accounts', {
            data: {
              ids: accountList,
            },
          })
          .then((response) => {
            alert('Removing members succesfully!');
            window.location.reload();
          })
          .catch((err) => alert('Removing members failed!'));
      }
    };

    return (
      <>
        <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Create new account
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form class="signin-form" onSubmit={createNewUser} id="formSubmit2">
                  <div class="form-group mb-3">
                    <label class="label" for="name">
                      Username(*)
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Username"
                      value={username}
                      onChange={handleUsername}
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
                      Email
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
                      value={newPassword}
                      onChange={handleNewPassword}
                      required
                    />
                  </div>
                </form>
                <div class="modal-footer">
                  <button type="submit" class="btn btn-primary rounded submit px-3" form="formSubmit2">
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
        <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Reset{' '}
                  <b>
                    <i>{account.username}</i>
                  </b>{' '}
                  password
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form class="signin-form" onSubmit={passwordUpdate} id="formSubmit1">
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
                </form>
                <div class="modal-footer">
                  <button type="submit" class="btn btn-primary rounded submit px-3" form="formSubmit1">
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
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Edit{' '}
                  <b>
                    <i>{account.username}</i>
                  </b>{' '}
                  profile
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form class="signin-form" onSubmit={userUpdate} id="formSubmit">
                  <div className="text-center">
                    <label for="image">
                      <div style={{ backgroundColor: 'darkgray', borderRadius: 20, width: 310 }}>
                        <input
                          type="file"
                          accept="image/png, image/gif, image/jpeg"
                          onChange={handleAvatar}
                          name="image"
                          id="image"
                          style={{ borderRadius: 20 }}
                        />
                      </div>
                      <img
                        src={avatar}
                        class="rounded"
                        alt="avatar"
                        style={{ width: 150, height: 150, margin: 'auto' }}
                      />
                    </label>
                  </div>
                  <div class="form-group mb-3">
                    <label class="label" for="name">
                      Username
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Username"
                      value={username}
                      onChange={handleUsername}
                      required
                    />
                  </div>
                  <div class="form-group mb-3">
                    <label class="label" for="name">
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
                    <label class="label" for="name">
                      Email
                    </label>
                    <input
                      type="email"
                      class="form-control"
                      placeholder="Email"
                      value={email}
                      onChange={handleEmail}
                      required
                    />
                  </div>
                </form>
                <div class="modal-footer">
                  <button
                    type="submit"
                    class="btn btn-primary rounded submit px-3"
                    form="formSubmit"
                    disabled={
                      account.username === username &&
                      account.fullName === fullName &&
                      account.email === email &&
                      content === null
                        ? true
                        : false
                    }
                  >
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
        <div>
          <h1 style={{ textAlign: 'center' }}>Modify users</h1>
          <div style={{ textAlign: 'center' }}>
            <a href="#exampleModal2" data-bs-target="#exampleModal2" data-bs-toggle="modal">
              <FontAwesomeIcon icon={faCirclePlus} style={{ width: 50, height: 50 }}></FontAwesomeIcon>
            </a>
            &nbsp;
            <a onClick={deleteAccount}>
              <FontAwesomeIcon icon={faCircleMinus} style={{ width: 50, height: 50, color: 'red' }}></FontAwesomeIcon>
            </a>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col"></th>
                <th scope="col">Username</th>
                <th scope="col">Full name</th>
                <th scope="col">Email</th>
                <th scope="col">Edit</th>
                <th scope="col">Reset password</th>
              </tr>
            </thead>

            {users.map((item, index) => {
              return (
                <tbody>
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>
                      <input class="form-check-input" type="checkbox" value={item.accountId} onChange={isChecked} />
                    </td>
                    <td>{item.username}</td>
                    <td>{item.fullName}</td>
                    <td>{item.email}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        href="#exampleModal"
                        style={{ textDecoration: 'none' }}
                        data-bs-target="#exampleModal"
                        data-bs-toggle="modal"
                        onClick={(e) => handleEdit(e, item)}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-primary"
                        href="#exampleModal1"
                        style={{ textDecoration: 'none' }}
                        data-bs-target="#exampleModal1"
                        data-bs-toggle="modal"
                        onClick={(e) => handleEdit(e, item)}
                      >
                        Reset password
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </>
    );
  } else navigate('/');
}
export default User;
