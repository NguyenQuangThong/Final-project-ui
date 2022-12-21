/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Request() {
  let user = JSON.parse(localStorage.getItem('user'));
  let navigate = useNavigate();
  document.title = 'Request manage';

  if (user === null) navigate('/login');
  else {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
      const getRequestByRoomOwnerId = async (e) => {
        await axios
          .get(window.DOMAIN + '/requests/room-owner/' + user.accountId)
          .then((response) => setRequests(response.data))
          .catch((err) => alert('Some errors have been found!'));
      };
      getRequestByRoomOwnerId();
    }, [user.accountId]);

    let table = '';
    if (requests.length === 0) table = <h3 style={{ textAlign: 'center' }}>You have no requests.</h3>;
    else
      table = (
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Requester</th>
            <th scope="col">Member</th>
            <th scope="col">Want to join</th>
            <th scope="col">Accept</th>
            <th scope="col">Deny</th>
          </tr>
        </thead>
      );

    const accept = (e) => {
      e.preventDefault();
      axios
        .post(window.DOMAIN + '/classrooms/' + e.target.value[0], {
          accountId: [e.target.value[2]],
        })
        .then((response) => {
          axios
            .delete(window.DOMAIN + '/requests/' + e.target.value[4])
            .then(() => {
              alert('Request has been accepted!');
              window.location.reload();
            })
            .catch((err) => alert('Some errors have been found!'));
        });
    };

    const deny = (e) => {
      axios
        .delete(window.DOMAIN + '/requests/' + e.target.value)
        .then(() => {
          alert('Request has been denied!');
          window.location.reload();
        })
        .catch((err) => alert('Some errors have been found!'));
    };

    const other = (e) => {
      localStorage.setItem('otherId', e);
    };

    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>You can modify the request from here.</h1>
        <br></br>
        <table class="table">
          {table}
          {requests.map((item, index) => {
            return (
              <tbody>
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      to="/other-profile"
                      style={{ textDecoration: 'none' }}
                      onClick={() => other(item.requester.accountId)}
                    >
                      <img
                        src={window.DOMAIN + '/' + item.requester.avatar}
                        class="rounded"
                        alt="avatar"
                        style={{ width: 50, height: 50 }}
                      />
                      {item.requester.username}
                    </Link>
                  </td>

                  <td>
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      to="/other-profile"
                      style={{ textDecoration: 'none' }}
                      onClick={() => other(item.member.accountId)}
                    >
                      <img
                        src={window.DOMAIN + '/' + item.member.avatar}
                        class="rounded"
                        alt="avatar"
                        style={{ width: 50, height: 50 }}
                      />
                      {item.member.username}
                    </Link>
                  </td>
                  <td>{item.classroom.className}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={accept}
                      value={[item.classroom.classroomId, item.member.accountId, item.requestId]}
                    >
                      Accept
                    </button>
                  </td>
                  <td>
                    <button className="btn btn-danger" onClick={deny} value={item.requestId}>
                      Deny
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    );
  }
}

export default Request;
