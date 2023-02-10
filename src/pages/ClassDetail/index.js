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
    const [childPostId, setChildPostId] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [fatherComment, setFatherComment] = useState('');
    const [reply, setReply] = useState('');
    const [postId, setPostId] = useState('');
    let modifier = '';
    let childPosts = [];
    let classroom = JSON.parse(localStorage.getItem('classroom'));

    if (classroom === null) navigate('/login');

    let className = classroom.className;

    useEffect(() => {
      axios.get(window.DOMAIN + '/posts/of/' + classroom.classroomId).then((response) => setPosts(response.data));
    }, [posts]);

    const other = (e) => {
      localStorage.setItem('otherId', e);
    };

    const getChildPostId = (id) => {
      setChildPostId(id);
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

    const deletePost = (e) => {
      if (window.confirm('Do you want to delete this comment?'))
        axios
          .delete(window.DOMAIN + '/posts/' + e)
          .then()
          .catch(() => alert('Some errors have been found!'));
    };

    const deleteChildPost = (e) => {
      if (window.confirm('Do you want to delete this comment?'))
        axios
          .delete(window.DOMAIN + '/child-posts/' + e)
          .then()
          .catch(() => alert('Some errors have been found!'));
    };

    const createReply = async (e) => {
      e.preventDefault();
      await axios
        .post(window.DOMAIN + '/child-posts', {
          content: reply,
          accountId: user.accountId,
          postId: postId,
        })
        .then()
        .catch((err) => alert('Some errors have been found!'));
    };

    const editPost = async (e) => {
      e.preventDefault();
      await axios
        .put(window.DOMAIN + '/posts/' + postId, {
          content: reply,
        })
        .then(() => {})
        .catch(() => alert('Some errors have been found!'));
    };

    const editChildPost = async (e) => {
      e.preventDefault();
      await axios
        .put(window.DOMAIN + '/child-posts/' + childPostId, {
          content: reply,
        })
        .then()
        .catch(() => alert('Some errors have been found!'));
    };

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const modify = (id, item) => {
      if (id === user.accountId) {
        let modal = '';
        if (item.childPostId !== undefined) modal = '#exampleModal2';
        else modal = '#exampleModal1';
        modifier = (
          <>
            &nbsp;
            <a
              style={{ textDecoration: 'none' }}
              href={modal}
              data-bs-target={modal}
              data-bs-toggle="modal"
              onClick={() => {
                getPostId(item.postId);
                getFatherName(item.account.username);
                getFatherComment(item.content);
                setReply(item.content);
                if (item.childPostId !== undefined) getChildPostId(item.childPostId);
              }}
            >
              <small>Edit</small>
            </a>
            &nbsp;
            <a
              style={{ textDecoration: 'none' }}
              href="javascript:;"
              onClick={() => {
                if (item.childPostId !== undefined) deleteChildPost(item.childPostId);
                else deletePost(item.postId);
              }}
            >
              <small>Delete</small>
            </a>
          </>
        );
      } else modifier = '';
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
                    <button type="submit" class="btn btn-primary rounded submit px-3" data-bs-dismiss="modal">
                      Post
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

        <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Edit your comment
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form class="signin-form" onSubmit={editPost}>
                  <div class="form-group mb-3">
                    <label class="label" for="name">
                      Edit your comment
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
                    <button type="submit" class="btn btn-primary rounded submit px-3" data-bs-dismiss="modal">
                      Post
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

        <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Edit your comment
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form class="signin-form" onSubmit={editChildPost}>
                  <div class="form-group mb-3">
                    <label class="label" for="name">
                      Edit your comment
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
                    <button type="submit" class="btn btn-primary rounded submit px-3" data-bs-dismiss="modal">
                      Post
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
            modify(item.account.accountId, item);

            return (
              <div className="blog-comment">
                <ul class="comments">
                  <li class="clearfix">
                    <img src={window.DOMAIN + '/' + item.account.avatar} class="avatar" alt="" />
                    <div class="post-comments">
                      <p className="meta">
                        {new Date(item.timestamp).toString()}{' '}
                        <Link
                          to={user.accountId === item.account.accountId ? '/profile' : '/other-profile'}
                          onClick={() => other(item.account.accountId)}
                        >
                          {item.account.username}
                        </Link>
                        &nbsp; says :
                        <div style={{ float: 'right' }}>
                          <i class="pull-right">
                            <a
                              style={{ textDecoration: 'none' }}
                              href="#exampleModal"
                              data-bs-target="#exampleModal"
                              data-bs-toggle="modal"
                              onClick={() => {
                                getPostId(item.postId);
                                getFatherName(item.account.username);
                                getFatherComment(item.content);
                                setReply('');
                              }}
                            >
                              <small>Reply</small>
                            </a>
                            {/* &nbsp;
                            <a
                              style={{ textDecoration: 'none' }}
                              href="#exampleModal1"
                              data-bs-target="#exampleModal1"
                              data-bs-toggle="modal"
                              onClick={() => {
                                getPostId(item.postId);
                                getFatherName(item.account.username);
                                getFatherComment(item.content);
                                setReply(item.content);
                              }}
                            >
                              <small>Edit</small>
                            </a>
                            &nbsp;
                            <a
                              style={{ textDecoration: 'none' }}
                              href="javascript:;"
                              onClick={() => {
                                deletePost(item.postId);
                              }}
                            >
                              <small>Delete</small>
                            </a> */}
                            {modifier}
                          </i>
                        </div>
                      </p>
                      <p>{item.content}</p>
                    </div>
                  </li>
                  {childPosts.map((item, index) => {
                    modify(item.account.accountId, item);
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
                                </Link>
                                &nbsp; says : &nbsp;
                                <div style={{ float: 'right' }}>
                                  <i class="pull-right">
                                    <a
                                      style={{ textDecoration: 'none' }}
                                      href="#exampleModal"
                                      data-bs-target="#exampleModal"
                                      data-bs-toggle="modal"
                                      onClick={() => {
                                        getPostId(item.postId);
                                        getFatherName(item.account.username);
                                        getFatherComment(item.content);
                                        setReply('');
                                      }}
                                    >
                                      <small>Reply</small>
                                    </a>
                                    {/* &nbsp;
                                    <a
                                      style={{ textDecoration: 'none' }}
                                      href="#exampleModal2"
                                      data-bs-target="#exampleModal2"
                                      data-bs-toggle="modal"
                                      onClick={() => {
                                        getPostId(item.postId);
                                        getFatherName(item.account.username);
                                        getFatherComment(item.content);
                                        getChildPostId(item.childPostId);
                                        setReply(item.content);
                                      }}
                                    >
                                      <small>Edit</small>
                                    </a>
                                    &nbsp;
                                    <a
                                      style={{ textDecoration: 'none' }}
                                      href="javascript:;"
                                      onClick={() => {
                                        deleteChildPost(item.childPostId);
                                      }}
                                    >
                                      <small>Delete</small>
                                    </a> */}
                                    {modifier}
                                  </i>
                                </div>
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
