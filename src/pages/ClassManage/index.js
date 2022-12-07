import axios from 'axios';
import React, { useEffect, useState } from 'react';
function ClassManage() {
  let classroom = JSON.parse(localStorage.getItem('classroom'));
  let className = classroom.className;
  let classroomId = classroom.classroomId;
  const [roomOwner, setRoomOwner] = useState('');
  const [roomMembers, setRoomMembers] = useState([]);
  const [accounts, setAccounts] = useState([]);
  let accountList = [];

  useEffect(() => {
    const getClassroomById = async (e) => {
      await axios.get('http://localhost:8080/classrooms/' + classroomId).then((response) => {
        setRoomOwner(response.data.roomOwner);
        setRoomMembers(response.data.roomMembers);
      });
    };
    getClassroomById();
  }, [classroomId]);

  const getMemberNotInClass = async (e) => {
    await axios
      .get('http://localhost:8080/accounts/members/' + classroomId)
      .then((response) => setAccounts(response.data));
  };

  const addMember = (e) => {
    e.preventDefault();
    if (accountList.length === 0) alert('Please select member to add!');
    else {
      axios
        .post('http://localhost:8080/classrooms/' + classroomId, {
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
        .delete('http://localhost:8080/classrooms/remove/' + classroomId, {
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
                <button onClick={addMember} value={classroomId}>
                  Add
                </button>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <h1>Welcome to group_{className}</h1>
      <button
        className="btn btn-primary"
        onClick={getMemberNotInClass}
        href="#exampleModal1"
        data-bs-target="#exampleModal1"
        data-bs-toggle="modal"
      >
        Add member
      </button>
      <button className="btn btn-danger" onClick={removeMember}>
        Remove
      </button>
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
              <a href="#a" style={{ textDecoration: 'none' }}>
                <img
                  style={{ width: 50, height: 50, borderRadius: 50 }}
                  src={'http://localhost:8080/' + roomOwner.avatar}
                  alt=""
                ></img>
                {roomOwner.username}
              </a>
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
                  <a href="#a" style={{ textDecoration: 'none' }}>
                    <img
                      style={{ width: 50, height: 50, borderRadius: 50 }}
                      src={'http://localhost:8080/' + item.avatar}
                      alt=""
                    ></img>
                    {item.username}
                  </a>
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
export default ClassManage;
