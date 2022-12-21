import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Files() {
  const [files, setFiles] = useState([]);
  let navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const getAllFile = async (e) => {
      await axios.get(window.DOMAIN + '/files').then((response) => setFiles(response.data));
    };
    getAllFile();
  }, []);

  if (user !== null && user.role === 'Admin') {
    const deleteFile = async (e) => {
      if (window.confirm('Are you sure you want to delete this file?'))
        await axios
          .delete('https://finalproject-production-a91d.up.railway.app/files/delete/' + e.target.value)
          .then(() => {
            alert('Delete file successfully!');
            window.location.reload();
          });
    };

    return (
      <>
        <h1 style={{ textAlign: 'center' }}>Modify files</h1>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">File</th>
              <th scope="col">Created by</th>
              <th scope="col">Belong to</th>
              <th scope="col">Created at</th>
              <th scope="col">Size</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          {files.map((item, index) => {
            return (
              <tbody>
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <a
                      href={window.DOMAIN + '/files/' + item.filePath.substring(13)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.filePath.substring(13)}
                    </a>
                  </td>
                  <td>{item.account.username}</td>
                  <td>{item.classroom.className}</td>
                  <td>{item.timestamp}</td>
                  <td>{item.size} MB</td>
                  <td>
                    <button className="btn btn-danger" onClick={deleteFile} value={item.fileId}>
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
export default Files;
