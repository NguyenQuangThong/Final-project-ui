import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Home() {
  return (
    <div className="home" style={{ textAlign: 'center' }}>
      <div class="row">
        <div class="col" style={{ textAlign: 'center', marginRight: 150, marginTop: 150 }}>
          {' '}
          <h1 className="" style={{ color: 'white' }}>
            <b>WELCOME</b>
          </h1>
          <h1 className="" style={{ color: 'gray' }}>
            <b>TO</b>
          </h1>
          <h1 className="" style={{ color: 'darkgray' }}>
            <b>E-LEARNING</b>
          </h1>
        </div>
        <div class="col" style={{ marginTop: 90 }}>
          <img
            className="home-image"
            src="https://media.istockphoto.com/photos/elearning-concept-online-classes-picture-id1140691163?k=20&m=1140691163&s=170667a&w=0&h=IxyVORZ27WEBE4wcpFoBhHSIAyjvHLAZBUSC3hcEMBU="
            alt=""
          ></img>
        </div>
      </div>
    </div>
  );
}
export default Home;
