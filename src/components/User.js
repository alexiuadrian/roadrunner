import React, {useContext, useState, useEffect} from "react";
import { unmountComponentAtNode, render } from "react-dom";
import { useNavigate } from 'react-router-dom';
import EditUser from "./EditUser";
import axios from "axios";
import trash from "../assets/trash.svg";
import edit from "../assets/edit.svg";
import close from "../assets/close.svg";

export default function User(props) {

    const [editMode, setEditMode] = useState(false);
    const [roles, setRoles] = useState(null);
    const [isUserManager, setIsUserManager] = useState(null);
    const [isUser, setIsUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(null);
    
    function formatDate() {
        var d = props.data.created_at.slice(0, 10);

        return d;
    }

    function refreshPage() {
        window.location.reload(false);
    }

    function handleDelete() {
        axios
        .delete("http://localhost:3000/users/" + props.data.id,
        {
            headers: {
                Authorization: `token ${localStorage.getItem('token')}`
            }
        })
        .then((res) => {
        })
        .catch((err) => {
            console.log(err);
        });

        refreshPage();
    }

    useEffect(() => {
        axios
        .get("http://localhost:3000/get_user_roles/" + props.data.id,
        {
            headers: {
                Authorization: `token ${localStorage.getItem('token')}`
            }
        })
        .then((res) => {
            console.log(res.data);
            setRoles(res.data);

            for (let role in roles) {
                console.log(role);
                if(roles[role].name === "admin") {
                    setIsAdmin(true);
                }
    
                if(roles[role].name === "user_manager") {
                    setIsUserManager(true);
                }
    
                if(roles[role].name === "user") {
                    setIsUser(true);
                }
            }
        })
        .catch((err) => {
            console.log(err);
        });   
    }, []);

    return (
        <div>
            <div class="card shadow-lg">
                <div class="card-body">
                    <p class="card-title">
                        Username: {' ' + props.data.username } <br/>
                        Email: {' ' + props.data.email}
                     </p>
                    
                    <h6>{formatDate()}</h6>
                </div>
                <div class="d-flex justify-content-evenly mb-3">
                    <div>
                        <a>
                            <img
                                class="editButton"
                                src={edit}
                                alt="trash button"
                                width="30px"
                                height="30px"
                                onClick={() => {
                                    setEditMode(true);
                                    for (let role in roles) {
                                        console.log(role);
                                        if(roles[role].name === "admin") {
                                            setIsAdmin(true);
                                        }
                            
                                        if(roles[role].name === "user_manager") {
                                            setIsUserManager(true);
                                        }
                            
                                        if(roles[role].name === "user") {
                                            setIsUser(true);
                                        }
                                    }
                                }}
                            />
                        </a>
                    </div>
                    <div>
                        <a>
                            <img
                                class="deleteButton"
                                src={trash}
                                alt="trash button"
                                width="30px"
                                height="30px"
                                onClick={handleDelete}
                            />
                        </a>
                    </div>
                </div>
            </div>
            <div class="mt-4">
                {editMode && <EditUser data={props.data} isUser={isUser} isUserManager={isUserManager} isAdmin={isAdmin} />}
            </div>
        </div>
    );
}