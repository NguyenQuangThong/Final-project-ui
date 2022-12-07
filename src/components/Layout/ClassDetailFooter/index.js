import axios from 'axios';
import React, { useState, useEffect } from 'react';

function ClassDetailFooter() {
  let user = JSON.parse(localStorage.getItem('user'));
  let classroom = JSON.parse(localStorage.getItem('classroom'));
  const [comment, setComment] = useState('');
  const userId = user.accountId;
  const classId = classroom.classroomId;

  const commentHandle = (e) => {
    setComment(e.target.value);
  };

  const newPost = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8080/posts', {
      content: comment,
      accountId: userId,
      classroomId: classId,
    });
  };

  return (
    <div
      class="container-fluid justify-content-center fixed-bottom d-flex justify-content-center"
      style={{ width: '100%', backgroundColor: '#f8f9fd' }}
    >
      <div class="col-md-8 col-lg-6">
        <div class="card shadow-0 border" style={{ backgroundColor: '#f0f2f5' }}>
          <div class="card-body p-4">
            <form onSubmit={newPost}>
              <div class="form-outline mb-4">
                <input
                  type="text"
                  id="addANote"
                  class="form-control"
                  placeholder="Type comment..."
                  required
                  onChange={commentHandle}
                />
              </div>
              <div style={{ textAlign: 'center' }}>
                <button className="btn btn-secondary" type="submit">
                  Post comment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ClassDetailFooter;
