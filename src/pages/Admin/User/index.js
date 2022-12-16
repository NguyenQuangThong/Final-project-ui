import axios from 'axios';
import React, { useState, useEffect } from 'react';
function User() {
  const [users, setUsers] = useState([]);
  let accountList = [];

  useEffect(() => {
    const getAllAccount = async (e) => {
      await axios
        .get(window.DOMAIN + '/accounts')
        .then((response) => setUsers(response.data))
        .catch(() => alert('Some errors have been found!'));
    };
    getAllAccount();
  }, []);

  const isChecked = (e) => {
    if (e.target.checked) accountList.push(parseInt(e.target.value));
    else accountList = accountList.filter((accountList) => accountList !== parseInt(e.target.value));
    console.log(accountList);
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Modify users</h1>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col"></th>
            <th scope="col">Username</th>
            <th scope="col">Full name</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        {users.map((item, index) => {
          return (
            <tbody>
              <tr>
                <th scope="row">{index + 1}</th>
                <td>
                  <input class="form-check-input" type="checkbox" value={item.accountId} onChange={isChecked} />
                </td>
                <td>{item.username}</td>
                <td>{item.fullName}</td>
                <td>{item.email}</td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
}
export default User;
