import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faSchool } from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Admin() {
  const [users, setUsers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [files, setFiles] = useState([]);

  console.log(window.PATHR + '/class');

  useEffect(() => {
    const getAllAccount = async (e) => {
      await axios
        .get(window.DOMAIN + '/accounts')
        .then((response) => setUsers(response.data))
        .catch(() => alert('Some errors have been found!'));
    };
    getAllAccount();
  }, []);

  useEffect(() => {
    const getAllAccount = async (e) => {
      await axios
        .get(window.DOMAIN + '/classrooms')
        .then((response) => setClasses(response.data))
        .catch(() => alert('Some errors have been found!'));
    };
    getAllAccount();
  }, []);

  useEffect(() => {
    const getAllAccount = async (e) => {
      await axios
        .get(window.DOMAIN + '/files')
        .then((response) => setFiles(response.data))
        .catch(() => alert('Some errors have been found!'));
    };
    getAllAccount();
  }, []);

  let a = [
    { Icon: faUsers, Name: 'Users', Total: users.length, Url: '/admin/users' },
    { Icon: faSchool, Name: 'Classes', Total: classes.length, Url: '/admin/classes' },
    { Icon: faFile, Name: 'Files', Total: files.length, Url: '/admin/files' },
  ];

  return (
    <div>
      <div class="row container" style={{ textAlign: 'center', margin: 'auto', marginTop: 80 }}>
        {a.map((item, index) => {
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
                  </p>
                  <button
                    class="btn btn-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = item.Url;
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

      <div className="container" style={{ margin: 'auto', marginTop: 80 }}>
        <table id="q-graph">
          <caption>Quarterly Results</caption>
          <thead>
            <tr>
              <th></th>
              <th class="sent">Invoiced</th>
              <th class="paid">Collected</th>
            </tr>
          </thead>
          <tbody>
            <tr class="qtr" id="q1">
              <th scope="row">Q1</th>
              <td class="sent bar" style={{ height: '111px' }}>
                <p>$18,450.00</p>
              </td>
              <td class="paid bar" style={{ height: '99px' }}>
                <p>$16,500.00</p>
              </td>
            </tr>
            <tr class="qtr" id="q2">
              <th scope="row">Q2</th>
              <td class="sent bar" style={{ height: '206px' }}>
                <p>$34,340.72</p>
              </td>
              <td class="paid bar" style={{ height: '194px' }}>
                <p>$32,340.72</p>
              </td>
            </tr>
            <tr class="qtr" id="q3">
              <th scope="row">Q3</th>
              <td class="sent bar" style={{ height: '259px' }}>
                <p>$43,145.52</p>
              </td>
              <td class="paid bar" style={{ height: '193px' }}>
                <p>$32,225.52</p>
              </td>
            </tr>
            <tr class="qtr" id="q4">
              <th scope="row">Q4</th>
              <td class="sent bar" style={{ height: '110px' }}>
                <p>$18,415.96</p>
              </td>
              <td class="paid bar" style={{ height: '195px' }}>
                <p>$32,425.00</p>
              </td>
            </tr>
          </tbody>
        </table>

        <div id="ticks">
          <div class="tick" style={{ height: '59px' }}>
            <p>$50,000</p>
          </div>
          <div class="tick" style={{ height: '59px' }}>
            <p>$40,000</p>
          </div>
          <div class="tick" style={{ height: '59px' }}>
            <p>$30,000</p>
          </div>
          <div class="tick" style={{ height: '59px' }}>
            <p>$20,000</p>
          </div>
          <div class="tick" style={{ height: '59px' }}>
            <p>$10,000</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Admin;
