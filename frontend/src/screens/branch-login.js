import { Link } from 'react-router-dom';
import Navbar from '../components/branch-sidenav';
import '../App.css';
import '../components/Branch/branch-login.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BiSearchAlt } from 'react-icons/bi';
import { TiMessageTyping } from 'react-icons/ti';
import { FaUserCircle } from 'react-icons/fa';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { login } from '../controllers/branch';
import swal from 'sweetalert';

export default function Home() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    function loginNow() {
        if(email===''){
            swal({           
                title: "Error!",           
                text: "Please Enter Email!",   
                icon: 'error',
                type: 'error', 
                
                                   
            }); 
        }else if(password===''){
            swal({           
                    title: "Error!",
                    icon: 'error',
                    text: "Password is Empty!",   
                    type: 'error', 
                                       
                });        
        }else {
            login({ email: email, password: password,userType:"Branch Manager" }).then((result) => {
                if (result!=false) {
                    swal({           
                        title: "Success!",
                        text: "User Authenticated",
                        icon: 'success',
                        timer: 2000,
                        button: false,
                                            
                    }) 
                       setTimeout(() => {
                        window.location.replace("http://localhost:3000/branch-dash");
                    }, 2000)
                    }else{
                          
                        swal({           
                            title: "Failed!",           
                            text: "Invaid Credintials,Please Try Again!",   
                            type: 'error', 
                                                
                        })                              
                        }
            })
        }        
    }
    return (
        <div class="main-body">
           
            <div class="sub-body bg-login">
              <div className="Add Branch">
                 
                    <form id="new" >
                        <div class="login-wrap">
                            <div class="title">
                            <center><h2>Branch Manager Login</h2></center>
                            </div>
                        <div class="from-group">
                            

<label for="name">Email</label>
<input type="text" class="form-control" id="email" placeholder="Enter Email"ame
    onChange={(e) => {
        setEmail(e.target.value);

    }} />
  </div>  
<div class="from-group">

    <label for="name">Password </label>
    <input type="password" class="form-control" id="password" placeholder="Enter Password"
        onChange={(e) => {
            setPassword(e.target.value);

        }} />

</div>
<div class="from-group">

<div class="btn-wrap">
<button type="button" class="btn btn-primary" onClick={loginNow}>Login</button>

</div>
</div>
                        </div>
                        
                      
                    </form>
                </div>

            </div>
        </div>
    )
}