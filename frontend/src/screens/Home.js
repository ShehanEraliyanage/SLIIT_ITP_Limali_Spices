import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import Navbar from '../components/DeliveryManagerNavbar';
import  '../App.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// Icon
import {BiSearchAlt} from 'react-icons/bi';
import {TiMessageTyping} from 'react-icons/ti';
import {FaUserCircle,FaTruck} from 'react-icons/fa';
import {RiArrowDropDownLine} from 'react-icons/ri';
import {MdCarRepair,MdLocalCarWash} from 'react-icons/md'
import {AiFillCar} from 'react-icons/ai'

// Controllers
import { getAllVehiclesCount, getAlldeliveringCount, getAllavalableCount, getAllinRepairCount } from '../controllers/vehicle';

export default function Home() {

   const [allVehiclesCount, setAllVehiclesCount] = useState('');
   const [alldeliveringCount, setAlldeliveringCount] = useState('');
   const [allavalableCount, setAllavalableCount] = useState('');
   const [allinRepairCountt, setAllinRepairCount] = useState('');

    getAllVehiclesCount().then((result)=>{
        setAllVehiclesCount(result);
    });
    getAlldeliveringCount().then((result)=>{
        setAlldeliveringCount(result);
    });
    getAllavalableCount().then((result)=>{
        setAllavalableCount(result);
    });
    getAllinRepairCount().then((result)=>{
        setAllinRepairCount(result);
    });
    
    return (
        <div class="main-body">
            
            <Navbar/>
            <div class="sub-body">
            <div class="body">
                <div class="top-bar">
                    <div class="top-bar-left">
                        <h3>Dashboard</h3>
                        <hr/>
                        <h5>Delivery Manager</h5>
                    </div>

                    <div class="top-bar-rigth">
                    <Link to="/" class="top-bar-link"><BiSearchAlt size="1.5em"/></Link> 
                    <Link to="/" class="top-bar-link"><TiMessageTyping size="1.5em"/></Link> 
                    <Link to="/" class="top-bar-link"><FaUserCircle size="1.8em"/></Link> 
                    <Link to="/" class="top-bar-link"><RiArrowDropDownLine size="1.8em"/></Link> 
                    </div>
                </div>
        

                
                    <div class="home-up">
                        

                            <div class="count-item">
                            <AiFillCar  color="#7e7d7d" size="10em"/>
                            <h1>{allVehiclesCount}</h1>
                            <h4>All Vehicle</h4>
                            </div>

                            <div class="count-item">
                            <MdLocalCarWash color="#7e7d7d" size="10em"/>
                            <h1>{allavalableCount}</h1>
                            <h4>Avalable</h4>
                            </div>

                            <div class="count-item">
                            <FaTruck  color="#7e7d7d" size="10em"/>
                            <h1>{alldeliveringCount}</h1>
                            <h4>Delivering</h4>
                            </div>

                            <div class="count-item">
                            <MdCarRepair  color="#7e7d7d" size="10em"/>
                            <h1>{allinRepairCountt}</h1>
                            <h4>In Repair</h4>
                            </div>

                       
                    </div>
                    
                    <div class="home-down">
                    <img class="vehicle_add_1" src={ require('../image/vehicle_add_1.png') } />
                    <img class="vehicle_add_1" src={ require('../image/customer.png') } />
                    <div class="Calendar">
                    <Calendar/>
                    </div>
                    </div>

               
    
                </div>
            </div>
        </div>
    )
}