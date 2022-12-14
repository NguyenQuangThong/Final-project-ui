/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ClassDetail() {
  let user = JSON.parse(localStorage.getItem('user'));
  let navigate = useNavigate();
  document.title = 'Class detail';

  if (user === null) navigate('/login');
  else {
    const token = localStorage.getItem('token');
    const [posts, setPosts] = useState([]);
    const [fatherId, setFatherId] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [fatherComment, setFatherComment] = useState('');
    const [reply, setReply] = useState('');
    const [postId, setPostId] = useState('');
    let childPosts = [];
    let classroom = JSON.parse(localStorage.getItem('classroom'));

    if (classroom === null) navigate('/login');

    let className = classroom.className;

    useEffect(() => {
      const getPostOfClass = async (e) => {
        await axios
          .get(window.DOMAIN + '/posts/of/' + classroom.classroomId)
          .then((response) => setPosts(response.data));
      };
      getPostOfClass();
    }, [classroom.classroomId]);

    const other = (e) => {
      localStorage.setItem('otherId', e);
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
      await axios
        .post(window.DOMAIN + '/child-posts', {
          content: reply,
          accountId: user.accountId,
          postId: postId,
        })
        .then((response) => window.location.reload())
        .catch((err) => alert('Some errors have been found!'));
    };

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
                  Reply to <b>{fatherName}</b>: "{fatherComment}"
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
            childPosts = item.childPosts;

            return (
              <div className="blog-comment">
                <ul class="comments">
                  <li class="clearfix">
                    <img src={window.DOMAIN + '/' + item.account.avatar} class="avatar" alt="" />
                    <div class="post-comments">
                      <p class="meta">
                        {new Date(item.timestamp).toString()}{' '}
                        <Link
                          to={user.accountId === item.account.accountId ? '/profile' : '/other-profile'}
                          onClick={() => other(item.account.accountId)}
                        >
                          {item.account.username}{' '}
                        </Link>
                        says :
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
                            <small style={{ float: 'right' }}>Reply</small>
                          </a>
                        </i>
                      </p>

                      <p>{item.content}</p>
                    </div>
                  </li>
                  {childPosts.map((item, index) => {
                    if (item !== null) {
                      return (
                        <ul>
                          <li class="clearfix">
                            <img src={window.DOMAIN + '/' + item.account.avatar} class="avatar" alt="" />
                            <div class="post-comments">
                              <p class="meta">
                                {new Date(item.timestamp).toString()}{' '}
                                <Link
                                  to={user.accountId === item.account.accountId ? '/profile' : '/other-profile'}
                                  onClick={() => other(item.account.accountId)}
                                >
                                  {item.account.username}
                                </Link>{' '}
                                says :{' '}
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
                                    <small style={{ float: 'right' }}>Reply</small>
                                  </a>
                                </i>
                              </p>
                              <p>{item.content}</p>
                            </div>
                          </li>
                        </ul>
                      );
                    }
                    return false;
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
