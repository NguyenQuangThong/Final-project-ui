import axios from 'axios';
import React, { useState, useEffect } from 'react';

function ClassDetail() {
  let token = localStorage.getItem('token');
  const [posts, setPosts] = useState([]);
  let className = localStorage.getItem('className');
  useEffect(() => {
    const getAllPosts = async (e) => {
      await axios.get('https://final-project1206.herokuapp.com/posts').then((response) => setPosts(response.data));
    };
    getAllPosts();
  }, []);
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <h1>Welcome to Group_{className}</h1>
        <h4>Try @mentioning the class name or student names to start a conversation.</h4>
      </div>
      {/* {posts.map((item, index) => {
        return ( */}
      <div className="blog-comment">
        <ul class="comments">
          <li class="clearfix">
            <img src="https://bootdey.com/img/Content/user_1.jpg" class="avatar" alt="" />
            <div class="post-comments">
              <p class="meta">
                Dec 18, 2014 <a href="#">JohnDoe</a> says :{' '}
                <i class="pull-right">
                  <a href="#">
                    <small>Reply</small>
                  </a>
                </i>
              </p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a sapien odio, sit amet</p>
            </div>
          </li>
          <ul>
            <li class="clearfix">
              <img
                src="https://vcdn-ngoisao.vnecdn.net/2022/08/05/tuikacm25pv1294-1659683618-165-4624-5789-1659683668_1200x0.jpg"
                class="avatar"
                alt=""
              />
              <div class="post-comments">
                <p class="meta">
                  Dec 18, 2014 <a href="#">JohnDoe</a> says :{' '}
                  <i class="pull-right">
                    <a href="#">
                      <small>Reply</small>
                    </a>
                  </i>
                </p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a sapien odio, sit amet</p>
              </div>
            </li>
          </ul>
        </ul>
        {/* );
      })} */}
      </div>
    </div>
  );
}
export default ClassDetail;
