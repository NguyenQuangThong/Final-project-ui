import axios from 'axios';
import React, { useEffect, useState } from 'react';
function ClassManage() {
  let classroom = JSON.parse(localStorage.getItem('classroom'));
  let className = classroom.className;
  let classroomId = classroom.classroomId;
  const [roomOwner, setRoomOwner] = useState('');
  const [roomMembers, setRoomMembers] = useState([]);

  useEffect(() => {
    const getClassroomById = async (e) => {
      await axios.get('https://final-project1206.herokuapp.com/classrooms/' + classroomId).then((response) => {
        setRoomOwner(response.data.roomOwner);
        setRoomMembers(response.data.roomMembers);
      });
    };
    getClassroomById();
  });
  const addMember = (e) => {};
  return (
    <>
      <div>
        <h1>Welcome to group_{className}</h1>
        <table class="table table-dark table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Role</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>
                <a href="#a" style={{ textDecoration: 'none' }}>
                  <img
                    style={{ width: 50, height: 50, borderRadius: 50 }}
                    src={'https://final-project1206.herokuapp.com/' + roomOwner.avatar}
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
                  <td>
                    <a href="#a" style={{ textDecoration: 'none' }}>
                      <img
                        style={{ width: 50, height: 50, borderRadius: 50 }}
                        src={'https://final-project1206.herokuapp.com/' + item.avatar}
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
    </>
  );
}
export default ClassManage;
