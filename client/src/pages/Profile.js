import React from 'react'
import '../components/assets/css/style.css';
import logo from '../components/assets/images/logo.png';

function userProfile() {
    return (
      <div>
        <div class="top-bar">
          <div class="top-bar-left">
            <ul class="menu">
              <li class="menu-text">Fisherman's Hook</li>
            </ul>
          </div>
          <div class="top-bar-right">
            <img src={logo}/>
          </div>
          <div class="callout large primary">
      <div class="row column text-center">
        <h1>Profile Page</h1>
      </div>
    </div>
        </div>
      </div>
    );
}

export default userProfile;

