import React, { useState, useEffect } from 'react';
import filter from '../assets/filter.svg';
import file from '../assets/file.svg';
import jwt_decode from "jwt-decode";
import users from "../assets/users.svg";
import newuser from "../assets/newuser.svg";

export default function SecondNavbar(props) {

    const [isAdmin, setIsAdmin] = useState(jwt_decode(localStorage.getItem('token')).is_admin);
    const [isUserManager, setIsUserManager] = useState(jwt_decode(localStorage.getItem('token')).is_user_manager);

    const renderUsersButton = () => {
        if (isAdmin || isUserManager) {
          return <li class="nav-item m-2">
          <a class="nav-link" href="users">
            <img
                class="runButton"
                src={users}
                alt="users button"
                width='30px'
                height='30px'
            />
                </a>
            </li>
        }
    }

    const renderNewUserButton = () => {
        if (isAdmin || isUserManager) {
          return <li class="nav-item m-2">
          <a class="nav-link" href="adduser">
              <img
            class="runButton"
            src={newuser}
            alt="users button"
            width='30px'
            height='30px'
          />
            </a>
        </li>
        }
    }

    return (
        <header>
            <ul class="nav justify-content-center">
                <li class="nav-item m-2">
                    <a class="nav-link" aria-current="page" href="filter">
                        <img
                            class="runButton"
                            src={filter}
                            alt="filter button"
                            width='30px'
                            height='30px'
                        />
                    </a>
                </li>
                <li class="nav-item m-2">
                    <a class="nav-link" href="report">
                        <img
                            class="plusButton"
                            src={file}
                            alt="file button"
                            width='30px'
                            height='30px'
                        />
                    </a>
                </li>
                
                {renderUsersButton()}

                {renderNewUserButton()}


            </ul>
        </header>
    );
}