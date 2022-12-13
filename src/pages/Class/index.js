import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
function Class() {
  let user = JSON.parse(localStorage.getItem('user'));
  const [classes, setClasses] = useState([]);
  const [className, setClassName] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [classId, setClassId] = useState('');
  const [members, setMembers] = useState([]);
  const [roomOwnerId, setRoomOwnerId] = useState('');

  useEffect(() => {
    const getAllClassrooms = async (e) => {
      await axios.get('http://localhost:8080/classrooms').then((response) => setClasses(response.data));
    };
    getAllClassrooms();
  }, []);

  if (user == null) window.location.href = '/login';
  else {
    let token = JSON.parse(localStorage.getItem('token'));
    let accountList = [];

    const handleClassName = (e) => {
      setClassName(e.target.value);
    };

    const getMemberNotInClass = async (e) => {
      await axios
        .get('http://localhost:8080/accounts/members/' + classId)
        .then((response) => setAccounts(response.data));
    };

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const createClassroom = (e) => {
      e.preventDefault();
      axios
        .post(
          'http://localhost:8080/classrooms',
          {
            className: className,
          },
          config,
        )
        .then((response) => {
          alert('Create class successfuly!');
          window.location.href = '/class';
        })
        .catch((err) => {
          alert('Create new class failed!');
        });
    };

    const classDetail = async (e) => {
      e.preventDefault();
      localStorage.setItem('classId', e.target.value);
      await axios.get('http://localhost:8080/classrooms/' + e.target.value).then((response) => {
        localStorage.setItem('classroom', JSON.stringify(response.data));
      });
      console.log(JSON.parse(localStorage.getItem('classroom')));
      window.location.href = '/class/detail';
    };

    const manageClass = async (e) => {
      await axios.get('http://localhost:8080/classrooms/' + classId).then((response) => {
        localStorage.setItem('classroom', JSON.stringify(response.data));
      });
      console.log(JSON.parse(localStorage.getItem('classroom')));
      window.location.href = 'class/manage';
    };

    const addMember = (e) => {
      e.preventDefault();
      if (accountList.length === 0) alert('Please select member to add!');
      else {
        axios
          .post('http://localhost:8080/classrooms/' + e.target.value, {
            accountId: accountList,
          })
          .then((response) => alert('Adding members succesfully!'))
          .catch((err) => alert('Adding members failed!'));
      }
    };

    const addMemberRequest = (e) => {
      e.preventDefault();
      axios
        .post('http://localhost:8080/requests', {
          ownerId: roomOwnerId,
          requesterId: user.accountId,
          memberId: e.target.value[2],
          classroomId: e.target.value[0],
        })
        .then((response) => alert('Your request have been send!'))
        .catch((err) => alert('Some errors have been found!'));
    };

    const isChecked = (e) => {
      if (e.target.checked) accountList.push(parseInt(e.target.value));
      else accountList = accountList.filter((accountList) => accountList !== parseInt(e.target.value));
      console.log(accountList);
    };

    const getAllMembers = (e) => {
      e.preventDefault();
      axios
        .get('http://localhost:8080/classrooms/' + classId)
        .then((response) => setMembers(response.data.roomMembers))
        .catch((err) => setMembers([]));
    };

    const removeMember = (e) => {
      e.preventDefault();
      if (accountList.length === 0) alert('Please select member to remove!');
      else {
        axios
          .delete('http://localhost:8080/classrooms/remove/' + classId, {
            data: {
              accountId: accountList,
            },
          })
          .then((response) => alert('Removing members succesfully!'))
          .catch((err) => alert('Removing members failed!'));
      }
    };

    const leaveThisTeam = (e) => {
      e.preventDefault();
      if (window.confirm('Are you sure you want to leave this team?')) {
        axios
          .delete('http://localhost:8080/classrooms/remove/' + classId, {
            data: {
              accountId: [user.accountId],
            },
          })
          .then((response) => {
            window.location.href = '/class';
          })
          .catch((err) => alert('Some errors was found!'));
      }
    };

    const deleteClass = (e) => {
      e.preventDefault();
      if (window.confirm('Are you sure you want to delete this class?')) {
        axios
          .delete('http://localhost:8080/classrooms/' + classId)
          .then((response) => {
            alert('Delete class successfully!');
            window.location.reload();
          })
          .catch((err) => alert('Delete class failed!'));
      }
    };

    let add = '';
    if (roomOwnerId === user.accountId)
      add = (
        <>
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
          <button onClick={addMember} value={classId}>
            Add
          </button>
        </>
      );
    else
      add = (
        <>
          {accounts.map((item, index) => {
            return (
              <li class="list-group-item">
                <div class="row">
                  <div class="col-sm-8">{item.username}</div>
                  <div class="col-sm-4">
                    <button className="btn btn-primary" onClick={addMemberRequest} value={[classId, item.accountId]}>
                      Add
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </>
      );
    return (
      <>
        {/* Add new members */}
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
                <ul class="list-group list-group-flush">{add}</ul>
              </div>
            </div>
          </div>
        </div>

        {/* Create new class */}
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Create new class
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form class="signin-form" onSubmit={createClassroom}>
                  <div class="form-group mb-3">
                    <label class="label" for="name">
                      Class name
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Class name"
                      value={className}
                      onChange={handleClassName}
                      required
                    />
                  </div>

                  <div class="modal-footer">
                    <button type="submit" class="btn btn-primary rounded submit px-3">
                      Submit
                    </button>
                    <button type="button" class="btn btn-secondary rounded" data-bs-dismiss="modal">
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Remove members */}
        <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Remove member
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <ul class="list-group list-group-flush">
                  {members.map((item, index) => {
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
                  <button onClick={removeMember} value={classId}>
                    Remove
                  </button>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '10px' }} className="container-fluid">
          <h4 style={{ display: 'inline-block' }}>Class:</h4>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            style={{ display: 'inline-block', float: 'right' }}
          >
            Create new class
          </button>
        </div>
        <div class="row container">
          {classes.map((item, index) => {
            let element;
            if (item.roomOwner.accountId === user.accountId)
              element = (
                <div>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#exampleModal2"
                      style={{ textDecoration: 'none' }}
                      data-bs-target="#exampleModal2"
                      data-bs-toggle="modal"
                      onClick={getAllMembers}
                    >
                      Remove member
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#" onClick={deleteClass}>
                      Delete this class
                    </a>
                  </li>
                </div>
              );
            else
              element = (
                <div>
                  <li>
                    <a class="dropdown-item" href="#" onClick={leaveThisTeam}>
                      Leave this team
                    </a>
                  </li>
                </div>
              );
            if (
              item.roomOwner.accountId !== user.accountId &&
              item.roomMembers.some((e) => {
                if (e.accountId === user.accountId) return true;
                return false;
              }) === false
            )
              return false;
            else {
              return (
                <div class="col-sm-3">
                  <br></br>
                  <div class="card">
                    <div class="card-body" style={{ backgroundColor: '#c5d5c5' }}>
                      <h5 class="card-title" style={{ display: 'inline-block' }}>
                        {index + 1}
                      </h5>
                      <div class="dropdown" style={{ float: 'right', display: 'inline-block' }}>
                        <a
                          class=""
                          href="#"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          onClick={() => {
                            setClassId(item.classroomId);
                            setRoomOwnerId(item.roomOwner.accountId);
                          }}
                        >
                          <FontAwesomeIcon icon={faEllipsis} />
                        </a>

                        <ul class="dropdown-menu">
                          <li>
                            <a
                              class="dropdown-item"
                              href="#"
                              onClick={() => {
                                manageClass();
                              }}
                            >
                              Manage team
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              href="#exampleModal1"
                              style={{ textDecoration: 'none' }}
                              data-bs-target="#exampleModal1"
                              data-bs-toggle="modal"
                              onClick={() => {
                                getMemberNotInClass();
                              }}
                            >
                              Add new member
                            </a>
                          </li>
                          {element}
                        </ul>
                      </div>

                      <p class="card-text">
                        <b>Class name:</b> {item.className}
                      </p>
                      <p>
                        <b>Room owner:</b> {item.roomOwner.username}
                      </p>

                      <button class="btn btn-primary" onClick={classDetail} value={item.classroomId}>
                        Go detail
                      </button>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </>
    );
  }
}

export default Class;
