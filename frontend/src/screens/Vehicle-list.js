import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import Navbar from '../components/DeliveryManagerNavbar';
import swal from 'sweetalert';


// Icon
import {BiSearchAlt} from 'react-icons/bi';
import {TiMessageTyping} from 'react-icons/ti';
import {FaUserCircle} from 'react-icons/fa';
import {RiArrowDropDownLine} from 'react-icons/ri';

// Controllers
import { deleteVehicles, getAllVehicles, getAlldelivering, getAllavalable, getAllinRepair } from '../controllers/vehicle';


export default function VehicleList() {

    const [vehicleList, setVehicleList] = useState([]);
    

    useEffect(() => {
        getAllVehicles().then((result) => {
            setVehicleList(result);
        });
    }, [])

    function deleteMyVehicle(id) {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {

                deleteVehicles(id).then((result) => {
                    var vehicle = vehicleList.filter((e) => e._id !== result._id);
                    setVehicleList(vehicle);
                });  

              swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
                title: "Delete Successfully!",
                buttons: false,
                timer: 2000,
              });
            }
          });
    }

    function allState(){
        getAllVehicles().then((result) => {
            setVehicleList(result);
        });
    }

    function deliveringState(){
        getAlldelivering().then((result) => {
            setVehicleList(result);
        });
    }

    function avalableState(){
        getAllavalable().then((result) => {
            setVehicleList(result);
        });
    }

    function inRepairState(){
        getAllinRepair().then((result) => {
            setVehicleList(result);
        });
    }


    return (
        <div class="main-body">
            
        <Navbar/>
        <div class="sub-body">
        <div class="body">
            <div class="top-bar">
                <div class="top-bar-left">
                    <h3>Vehicle List</h3>
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

            <div class="list-status"> 
                <Link onClick={() => allState()} class="top-bar-link"><h6>All</h6></Link>
                <Link onClick={() => deliveringState()} class="top-bar-link"><h6>Delivering</h6></Link>
                <Link onClick={() => avalableState()} class="top-bar-link"><h6>Avalable</h6></Link>
                <Link onClick={() => inRepairState()} class="top-bar-link"><h6>In Repair</h6></Link>
            </div>
       
             

                           {vehicleList.map((value, index) => {
                            return<div class="list" key={index}>

                                <div class="list-td">
                                    <h6>vehicle number</h6>
                                    <p>{value.number}</p>
                                </div>
                                <div class="list-td">
                                    <h6>vehicle type</h6>
                                    <p>{value.type}</p>
                                </div>
                                <div class="list-td">
                                    <h6>branch</h6>
                                    <p>{value.branch}</p>
                                </div>
                                <div class="list-td">
                                    <h6>driver</h6>
                                    <p>{value.driver}</p>
                                </div>
                                <div class="list-td">
                                    <h6>maximum load</h6>
                                    <p>{value.load}</p>
                                </div>
                                <div class="list-td">
                                    <h6>state</h6>
                                    <p>{value.state}</p>
                                </div>

                                <div class="list-action">
                                <button class="list-action-delete" onClick={() => deleteMyVehicle(value._id)}>Delete</button>
                                <Link to={"/vehicle-edit/"+value._id} class="top-bar-link"><button class="list-action-edit">Edit</button></Link>
                                </div>

                            </div>
                            })}



            </div>
        </div>
    </div>
    )
}