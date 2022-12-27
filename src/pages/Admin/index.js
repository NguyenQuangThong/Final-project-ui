import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faSchool } from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const [users, setUsers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [files, setFiles] = useState([]);
  let navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const getAllAccount = async (e) => {
      await axios.get(window.DOMAIN + '/accounts/users').then((response) => setUsers(response.data));
    };
    getAllAccount();
  }, []);

  useEffect(() => {
    const getAllClassroom = async (e) => {
      await axios.get(window.DOMAIN + '/classrooms').then((response) => setClasses(response.data));
    };
    getAllClassroom();
  }, []);

  useEffect(() => {
    const getAllFile = async (e) => {
      await axios.get(window.DOMAIN + '/files').then((response) => setFiles(response.data));
    };
    getAllFile();
  }, []);

  if (user !== null && user.role === 'Admin') {
    let a = [
      { Icon: faUsers, Name: 'Users', Total: users.length, Url: '/admin/user' },
      { Icon: faSchool, Name: 'Classes', Total: classes.length, Url: '/admin/class' },
      { Icon: faFile, Name: 'Files', Total: files.length, Url: '/admin/file' },
    ];

    const totalFileSize = () => {
      var totalSize = 0;
      files.map((item, index) => {
        totalSize += item.size;
      });
      return Math.round(totalSize * 100.0) / 100.0;
    };

    return (
      <div>
        <div class="row container" style={{ textAlign: 'center', margin: 'auto', marginTop: 80 }}>
          {a.map((item, index) => {
            let fileTotal;
            var size = totalFileSize();
            if (item.Name === 'Files')
              fileTotal = (
                <>
                  <br></br>
                  <b>Total file size: {size} MB</b>
                </>
              );
            else
              fileTotal = (
                <>
                  <br></br>
                  <b>
                    <br></br>
                  </b>
                </>
              );
            return (
              <div class="col-sm-4">
                <div class="card">
                  <div class="card-body" style={{ backgroundColor: '#c5d5c5' }}>
                    {/* <div class="dropdown" style={{ float: 'right', display: 'inline-block' }}></div> */}
                    <FontAwesomeIcon icon={item.Icon} style={{ width: 60, height: 60 }}></FontAwesomeIcon>
                    <p class="card-text">
                      <b>{item.Name}</b>
                    </p>
                    <p>
                      <b>Total: {item.Total}</b>
                      {fileTotal}
                    </p>
                    <button
                      class="btn btn-primary"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(item.Url);
                      }}
                    >
                      Go detail
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else navigate('/');
}
export default Admin;
