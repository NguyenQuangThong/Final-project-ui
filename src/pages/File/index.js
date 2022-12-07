import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
function File() {
  let user = JSON.parse(localStorage.getItem('user'));
  let classroom = JSON.parse(localStorage.getItem('classroom'));
  const [files, setFiles] = useState([]);
  const [content, setContent] = useState(null);

  useEffect(() => {
    const getFileByClassId = async (e) => {
      await axios.get('http://localhost:8080/files').then((response) => {
        setFiles(response.data);
      });
    };
    getFileByClassId();
  }, []);

  const fileHandle = (e) => {
    e.preventDefault();
    setContent(e.target.files[0]);
  };

  const fileUpload = (e) => {
    e.preventDefault();
    var data = new FormData();
    data.append('accountId', user.accountId);
    data.append('classroomId', classroom.classroomId);
    data.append('file', content);
    axios
      .post('http://localhost:8080/files', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        alert('Upload file successfully!');
        window.location.href = '/class/file';
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
        alert('Wrong credentials');
      });
  };

  return (
    <>
      <form onSubmit={fileUpload}>
        <input type="file" onChange={fileHandle} name="file" id="file" required />
        <button type="submit">OK</button>
      </form>
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
                    href={'http://localhost:8080/files/' + item.filePath.substring(13)}
                  >
                    {item.filePath.substring(13)}
                  </a>
                </td>
                <td>
                  <div class="dropdown" style={{ float: 'right', display: 'inline-block' }}>
                    <a class="" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <FontAwesomeIcon icon={faEllipsis} />
                    </a>

                    <ul class="dropdown-menu">
                      <li>
                        <a
                          class="dropdown-item"
                          href="#a"
                          onClick={() => {
                            const method = 'GET';
                            const url = 'http://localhost:8080/files/' + item.filePath.substring(13);
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
                        <a
                          className="dropdown-item"
                          href="#exampleModal1"
                          style={{ textDecoration: 'none' }}
                          data-bs-target="#exampleModal1"
                          data-bs-toggle="modal"
                        >
                          Delete
                        </a>
                      </li>
                    </ul>
                  </div>
                </td>
                <td>{ts.toUTCString()}</td>
                <td>{item.account.username}</td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </>
  );
}
export default File;
