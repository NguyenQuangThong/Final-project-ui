import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Classes() {
  const [classrooms, setClassrooms] = useState([]);
  let navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const getAllClassroom = async (e) => {
      await axios.get(window.DOMAIN + '/classrooms').then((response) => setClassrooms(response.data));
    };
    getAllClassroom();
  }, []);

  if (user !== null && user.role === 'Admin') {
    const deleteClassroom = async (e) => {
      if (window.confirm('Are you sure you want to delete this class?'))
        await axios
          .delete('https://finalproject-production-a91d.up.railway.app/classrooms/' + e.target.value)
          .then(() => {
            alert('Delete class successfully!');
            window.location.reload();
          });
    };

    return (
      <>
        <h1 style={{ textAlign: 'center' }}>Modify classes</h1>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Class</th>
              <th scope="col">Class owner</th>
              <th scope="col">Member</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          {classrooms.map((item, index) => {
            return (
              <tbody>
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{item.className}</td>
                  <td>{item.roomOwner.username}</td>
                  <td>{item.roomMembers.length}</td>
                  <td>
                    <button className="btn btn-danger" onClick={deleteClassroom} value={item.classroomId}>
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </>
    );
  } else navigate('/');
}
export default Classes;
