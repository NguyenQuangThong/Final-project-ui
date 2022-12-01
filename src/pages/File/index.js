import axios from 'axios';
import React, { useEffect, useState } from 'react';
function File() {
  const [files, setFiles] = useState([]);
  useEffect(() => {
    const getFileByClassId = async (e) => {
      await axios.get('https://final-project1206.herokuapp.com/files').then((response) => {
        setFiles(response.data);
      });
    };
    getFileByClassId();
  });

  return (
    <>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Modified</th>
            <th scope="col">Modified by</th>
          </tr>
        </thead>
        {files.map((item, index) => {
          return (
            <tbody>
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{files.filePath}</td>
                <td>{Date(files.timestamp)}</td>
                <td>{files.accountId}</td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </>
  );
}
export default File;
