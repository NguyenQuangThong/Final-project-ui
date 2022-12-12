/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function ClassDetail() {
  let user = JSON.parse(localStorage.getItem('user'));
  if (user === null) window.location.href = '/login';
  else {
    const token = localStorage.getItem('token');
    const [posts, setPosts] = useState([]);
    const [avatar, setAvatar] = useState('');
    const [fatherId, setFatherId] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [fatherComment, setFatherComment] = useState('');
    const [reply, setReply] = useState('');
    const [postId, setPostId] = useState('');
    let childPosts = [];
    let classroom = JSON.parse(localStorage.getItem('classroom'));

    if (classroom === null) window.location.href = '/';

    let className = classroom.className;

    const getAvatar = (id) => {
      axios.get('http://localhost:8080/accounts/' + id).then((response) => setAvatar(response.data.avatar));
    };

    const getFatherId = (id) => {
      setFatherId(id);
    };

    const getPostId = (id) => {
      setPostId(id);
    };

    const getFatherName = (name) => {
      setFatherName(name);
    };

    const getFatherComment = (comment) => {
      setFatherComment(comment);
    };

    const replyHandle = (e) => {
      setReply(e.target.value);
    };

    const createReply = async (e) => {
      e.preventDefault();
      console.log(reply);
      await axios
        .post('http://localhost:8080/child-posts', {
          content: reply,
          accountId: user.accountId,
          postId: postId,
        })
        .then((response) => alert('Reply success!'))
        .catch((err) => alert('Reply failed!'));
    };

    useEffect(() => {
      const getPostOfClass = async (e) => {
        await axios
          .get('http://localhost:8080/posts/of/' + classroom.classroomId)
          .then((response) => setPosts(response.data));
      };
      getPostOfClass();
    }, []);

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    return (
      <div>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Reply to {fatherName}: "{fatherComment}"
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form class="signin-form" onSubmit={createReply}>
                  <div class="form-group mb-3">
                    <label class="label" for="name">
                      Your comment
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Type your comment..."
                      value={reply}
                      onChange={replyHandle}
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

        <div>
          <div style={{ textAlign: 'center' }}>
            <h1>Welcome to Group_{className}</h1>
            <h4>Post your comment to start a conversation.</h4>
          </div>
          {posts.map((item, index) => {
            var ts = new Date(item.timestamp);
            childPosts = item.childPosts;
            getAvatar(item.account.accountId);
            return (
              <div className="blog-comment">
                <ul class="comments">
                  <li class="clearfix">
                    <img src={'http://localhost:8080/' + avatar} class="avatar" alt="" />
                    <div class="post-comments">
                      <p class="meta">
                        {ts.toUTCString()}
                        <a href="#">{item.account.username}</a> says :
                        <i class="pull-right">
                          <a
                            href="#exampleModal"
                            data-bs-target="#exampleModal"
                            data-bs-toggle="modal"
                            onClick={() => {
                              getFatherId(item.account.accountId);
                              getPostId(item.postId);
                              getFatherName(item.account.username);
                              getFatherComment(item.content);
                            }}
                          >
                            <small>Reply</small>
                          </a>
                        </i>
                      </p>

                      <p>{item.content}</p>
                    </div>
                  </li>
                  {childPosts.map((item, index) => {
                    getAvatar(item.account.accountId);
                    if (item !== null) {
                      return (
                        <ul>
                          <li class="clearfix">
                            <img src={'http://localhost:8080/' + avatar} class="avatar" alt="" />
                            <div class="post-comments">
                              <p class="meta">
                                {Date(item.timestamp)} <a href="#">{item.account.username}</a> says :{' '}
                                <i class="pull-right">
                                  <a href="#">
                                    <small>Reply</small>
                                  </a>
                                </i>
                              </p>
                              <p>{item.content}</p>
                            </div>
                          </li>
                        </ul>
                      );
                    }
                    return;
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default ClassDetail;
