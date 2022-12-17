/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { faCircleMinus } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
function ClassManage() {
  let user = JSON.parse(localStorage.getItem('user'));
  let navigate = useNavigate();
  document.title = 'Class manage';

  if (user === null) navigate('/login');
  else {
    let classroom = JSON.parse(localStorage.getItem('classroom'));

    if (classroom === null) navigate('/');

    let className = classroom.className;
    let classroomId = classroom.classroomId;
    const [roomOwner, setRoomOwner] = useState('');
    const [roomMembers, setRoomMembers] = useState([]);
    const [accounts, setAccounts] = useState([]);
    let accountList = [];

    useEffect(() => {
      const getClassroomById = async (e) => {
        await axios.get(window.DOMAIN + '/classrooms/' + classroomId).then((response) => {
          setRoomOwner(response.data.roomOwner);
          setRoomMembers(response.data.roomMembers);
        });
      };
      getClassroomById();
    }, [classroomId]);

    const other = (e) => {
      console.log(e);
      localStorage.setItem('otherId', e);
    };

    const getMemberNotInClass = async (e) => {
      await axios
        .get(window.DOMAIN + '/accounts/members/' + classroomId)
        .then((response) => setAccounts(response.data));
    };

    const addMember = (e) => {
      e.preventDefault();
      if (accountList.length === 0) alert('Please select member to add!');
      else {
        axios
          .post(window.DOMAIN + '/classrooms/' + classroomId, {
            accountId: accountList,
          })
          .then((response) => {
            alert('Adding members succesfully!');
            window.location.reload();
          })
          .catch((err) => alert('Adding members failed!'));
      }
    };

    const removeMember = (e) => {
      e.preventDefault();
      if (accountList.length === 0) alert('Please select member to remove!');
      else {
        axios
          .delete(window.DOMAIN + '/classrooms/remove/' + classroomId, {
            data: {
              accountId: accountList,
            },
          })
          .then((response) => {
            alert('Removing members succesfully!');
            window.location.reload();
          })
          .catch((err) => alert('Removing members failed!'));
      }
    };

    const isChecked = (e) => {
      if (e.target.checked) accountList.push(parseInt(e.target.value));
      else accountList = accountList.filter((accountList) => accountList !== parseInt(e.target.value));
      console.log(accountList);
    };

    return (
      <div>
        <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Add new member
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <ul class="list-group list-group-flush">
                  {accounts.map((item, index) => {
                    return (
                      <li class="list-group-item">
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" value={item.accountId} onChange={isChecked} />
                          <label class="form-check-label" for="flexCheckDefault">
                            {item.username}
                          </label>
                        </div>
                      </li>
                    );
                  })}
                  <button onClick={addMember} value={classroomId} className="btn btn-primary">
                    Add
                  </button>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center' }} className="sticky-top">
          <h1>Welcome to group_{className}</h1>
          <h3>You can modify this team in here.</h3>
          <a onClick={getMemberNotInClass} href="#exampleModal1" data-bs-target="#exampleModal1" data-bs-toggle="modal">
            <FontAwesomeIcon icon={faCirclePlus} style={{ width: 50, height: 50 }}></FontAwesomeIcon>
          </a>
          &nbsp;
          <a onClick={removeMember}>
            <FontAwesomeIcon icon={faCircleMinus} style={{ width: 50, height: 50 }}></FontAwesomeIcon>
          </a>
        </div>
        <br></br>
        <table class="table table-dark table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col"></th>
              <th scope="col">Name</th>
              <th scope="col">Role</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <th scope="row"></th>
              <td>
                <Link
                  to={user.accountId === roomOwner.accountId ? '/profile' : '/other-profile'}
                  style={{ textDecoration: 'none' }}
                  onClick={() => other(roomOwner.accountId)}
                >
                  <img
                    style={{ width: 50, height: 50, borderRadius: 50 }}
                    src={window.DOMAIN + '/' + roomOwner.avatar}
                    alt=""
                  ></img>
                  {roomOwner.username}
                </Link>
              </td>
              <td>Owner</td>
            </tr>
            {roomMembers.map((item, index) => {
              return (
                <tr>
                  <th scope="row">{index + 2}</th>
                  <th scope="row">
                    <input class="form-check-input" type="checkbox" value={item.accountId} onChange={isChecked} />
                  </th>
                  <td>
                    <Link
                      to={item.accountId === user.accountId ? '/profile' : '/other-profile'}
                      style={{ textDecoration: 'none' }}
                      onClick={() => other(item.accountId)}
                    >
                      <img
                        style={{ width: 50, height: 50, borderRadius: 50 }}
                        src={window.DOMAIN + '/' + item.avatar}
                        alt=""
                      ></img>
                      {item.username}
                    </Link>
                  </td>
                  <td>Member</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
export default ClassManage;
