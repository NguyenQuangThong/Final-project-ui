/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
function File() {
  let user = JSON.parse(localStorage.getItem('user'));
  let navigate = useNavigate();
  if (user === null) navigate('/login');
  else {
    let classroom = JSON.parse(localStorage.getItem('classroom'));

    if (classroom === null) navigate('/');
    const [files, setFiles] = useState([]);
    const [content, setContent] = useState(null);

    useEffect(() => {
      const getFileByClassId = async (e) => {
        await axios.get(window.DOMAIN + '/files').then((response) => {
          setFiles(response.data);
        });
      };
      getFileByClassId();
    }, []);

    const fileHandle = (e) => {
      e.preventDefault();
      setContent(e.target.files[0]);
    };

    const deleteFile = (e) => {
      if (window.confirm('Are you sure you want to delete this file?'))
        axios
          .delete(window.DOMAIN + '/files/delete/' + e)
          .then((response) => {
            alert('File deleted!');
            window.location.reload();
          })
          .catch((err) => alert('Some errors have been found!'));
    };

    const fileUpload = (e) => {
      e.preventDefault();
      var data = new FormData();
      data.append('accountId', user.accountId);
      data.append('classroomId', classroom.classroomId);
      data.append('file', content);
      axios
        .post(window.DOMAIN + '/files', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          alert('Upload file successfully!');
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response);
          alert('Wrong credentials');
        });
    };

    return (
      <div className="container-fluid">
        <div style={{ textAlign: 'center' }} className="container">
          <form
            onSubmit={fileUpload}
            style={{ backgroundColor: 'darkgray', borderRadius: 20, width: 400, textAlign: 'center', margin: 'auto' }}
          >
            <input type="file" onChange={fileHandle} name="file" id="file" required style={{ borderRadius: 20 }} />
            <button type="submit" className="btn btn-primary" style={{ borderRadius: 20 }}>
              Upload
            </button>
          </form>
        </div>
        <br></br>
        <div>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col"></th>
                <th scope="col">Modified</th>
                <th scope="col">Modified by</th>
              </tr>
            </thead>
            {files.map((item, index) => {
              var ts = new Date(item.timestamp);

              return (
                <tbody>
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={window.DOMAIN + '/files/' + item.filePath.substring(13)}
                      >
                        {item.filePath.substring(13)}
                      </a>
                    </td>
                    <td>
                      <div class="dropdown" style={{ float: 'right', display: 'inline-block' }}>
                        <a class="" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                          <FontAwesomeIcon icon={faEllipsis} />
                        </a>

                        <ul class="dropdown-menu">
                          <li>
                            <a
                              class="dropdown-item"
                              onClick={() => {
                                const method = 'GET';
                                const url = window.DOMAIN + '/files/' + item.filePath.substring(13);
                                axios
                                  .request({
                                    url,
                                    method,
                                    responseType: 'blob', //important
                                  })
                                  .then(({ data }) => {
                                    const downloadUrl = window.URL.createObjectURL(new Blob([data]));
                                    const link = document.createElement('a');
                                    link.href = downloadUrl;
                                    link.setAttribute('download', item.filePath.substring(13)); //any other extension
                                    document.body.appendChild(link);
                                    link.click();
                                    link.remove();
                                  });
                              }}
                            >
                              Download
                            </a>
                          </li>
                          <li>
                            <a onClick={() => deleteFile(item.fileId)} className="dropdown-item">
                              Delete
                            </a>
                          </li>
                        </ul>
                      </div>
                    </td>
                    <td>{ts.toString()}</td>
                    <td>{item.account.username}</td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </div>
    );
  }
}
export default File;
