import axios from 'axios';
import React, { useState, useEffect } from 'react';
function Class() {
  let token = localStorage.getItem('token');
  const [classes, setClasses] = useState([]);
  const [className, setClassName] = useState('');

  const handleClassName = (e) => {
    setClassName(e.target.value);
  };

  useEffect(() => {
    const getAllClassrooms = async (e) => {
      await axios
        .get('https://final-project1206.herokuapp.com/classrooms')
        .then((response) => setClasses(response.data));
    };
    getAllClassrooms();
  }, []);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const createClassroom = (e) => {
    e.preventDefault();
    axios
      .post(
        'https://final-project1206.herokuapp.com/classrooms',
        {
          className: className,
        },
        config,
      )
      .then((response) => {
        alert('Create class successfuly!');
        window.location.replace('/');
      })
      .catch((err) => {
        alert('Create new class failed!');
      });
  };

  const classDetail = (e) => {
    e.preventDefault();
    localStorage.setItem('className', e.target.value);
    window.location.replace('/class/detail');
  };

  if (token == null) window.location.replace('login');
  else {
    return (
      <>
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
        <div style={{ marginTop: '10px' }}>
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
            return (
              <div class="col-sm-3">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">{index}</h5>
                    <p class="card-text">{item.className}</p>
                    <button class="btn btn-primary" onClick={classDetail} value={item.className}>
                      Go detail
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }
}
export default Class;
