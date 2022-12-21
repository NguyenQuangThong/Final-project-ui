/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function OtherProfile() {
  let user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  let navigate = useNavigate();
  document.title = 'Profile page';

  function isTokenExpired(token) {
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }

  if (user === null) navigate('/login');
  else {
    if (isTokenExpired(token)) {
      alert('Your session have been expired!');
      localStorage.clear();
      navigate('/');
    }

    const [other, setOther] = useState('');

    let id = localStorage.getItem('otherId');

    useEffect(() => {
      const getOtherAccount = async (e) => {
        await axios
          .get(window.DOMAIN + '/accounts/' + id)
          .then((response) => setOther(response.data))
          .catch((err) => alert('Some errors have been found!'));
      };
      getOtherAccount();
    }, [id]);

    let avatar = window.DOMAIN + '/' + other.avatar;

    return (
      <>
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
                    </div>
                    <div class="text-center">
                      {/* <img src={avatar} class="rounded" alt="avatar" style={{ width: 150, height: 150 }} /> */}
                      <label for="image">
                        <img src={avatar} class="rounded" alt="avatar" style={{ width: 150, height: 150 }} />
                      </label>
                      <h4>{other.username}</h4>
                    </div>

                    <div class="form-group mb-3">
                      <label class="label" for="fullname">
                        Full name: {other.fullName}
                      </label>
                    </div>
                    <div class="form-group mb-3">
                      <label class="label" for="fullname">
                        Email: {other.email}
                      </label>
                    </div>
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
export default OtherProfile;
