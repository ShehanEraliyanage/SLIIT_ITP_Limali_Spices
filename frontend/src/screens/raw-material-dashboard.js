
import React from 'react';
import {Link} from 'react-router-dom';
import Navbar from '../components/raw-material-sidenav';
import  '../App.css';

import {BiSearchAlt} from 'react-icons/bi';
import {TiMessageTyping} from 'react-icons/ti';
import {FaUserCircle} from 'react-icons/fa';
import {RiArrowDropDownLine} from 'react-icons/ri';

export default function Home() {
    return (
        <div class="main-body">
            <Navbar/>
            <div class="sub-body">
                <div class="body">
                    <div class="top-bar">
                        <div class="top-bar-left">
                            <h3>Dashboard</h3>
                            <hr/>
                            <h5>Inventory Manager</h5>
                        </div>
                        <div class="top-bar-rigth">
                            <Link to="/" class="top-bar-link"><BiSearchAlt size="1.5em"/></Link> 
                            <Link to="/" class="top-bar-link"><TiMessageTyping size="1.5em"/></Link> 
                            <Link to="/" class="top-bar-link"><FaUserCircle size="1.8em"/></Link> 
                            <Link to="/" class="top-bar-link"><RiArrowDropDownLine size="1.8em"/></Link> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}