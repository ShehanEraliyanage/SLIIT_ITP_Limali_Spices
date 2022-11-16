import { Link } from 'react-router-dom';
import Navbar from '../components/branch-sidenav';
import '../App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BiSearchAlt } from 'react-icons/bi';
import { TiMessageTyping } from 'react-icons/ti';
import { FaUserCircle } from 'react-icons/fa';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { add } from '../controllers/branch';
import swal from 'sweetalert';

export default function Home() {
    const [number, setNumber] = useState("");
    const [location, setLocation] = useState("");


    function Insert() {
        if(number===''){
            swal({           
                title: "Error!",           
                text: "Branch Code is Empty!",   
                icon: 'error',
                type: 'error', 
                
                                   
            }); 
        }else if(location==''){
            swal({           
                    title: "Error!",
                    icon: 'error',
                    text: "Location is Empty!",   
                    type: 'error', 
                                       
                });        
        }else {
            add({ number: number, location: location }).then((result) => {
                if (result.status) {
                    swal({           
                        title: "Success!",
                        text: "Branch is insereted Successfully",
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
                            text: "Something Went Wrong!",   
                            type: 'error', 
                                                
                        })                                  }
            })
        }
        
    }
    return (
        <div class="main-body">
            <Navbar />
            <div class="sub-body">
                <div class="body">
                    <div class="top-bar">
                        <div class="top-bar-left">
                            <h3>Dashboard</h3>
                            <hr />
                            <h5>Branch Manager</h5>
                        </div>
                        <div class="top-bar-rigth">
                            <Link to="/" class="top-bar-link"><BiSearchAlt size="1.5em" /></Link>
                            <Link to="/" class="top-bar-link"><TiMessageTyping size="1.5em" /></Link>
                            <Link to="/" class="top-bar-link"><FaUserCircle size="1.8em" /></Link>
                            <Link to="/" class="top-bar-link"><RiArrowDropDownLine size="1.8em" /></Link>
                        </div>
                    </div>
                </div>



                <div className="Add Branch">



                    <form id="new" >
                        <div class="from-group">
                        <center><h2 style={{backgroundColor: "transparent"}}>Add Branch</h2></center>

                            <label for="name" s>Branch Code </label>
                            <input type="text" class="form-control" id="BranhCode" placeholder="Branch Code"
                                onChange={(e) => {
                                    setNumber(e.target.value);

                                }} />

                                <label for="name">Location </label>
                                <input type="text" class="form-control" id="Location" placeholder="Location"
                                    onChange={(e) => {
                                        setLocation(e.target.value);

                                    }} />
<div style={{width:"100%",textAlign:"right"}}>
                            <button type="button" class="btn btn-primary" onClick={Insert}>Submit</button>
                        </div>
                            </div>
                            





                       
                    </form>
                </div>

            </div>
        </div>
    )
}