import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import Navbar from '../components/DeliveryManagerNavbar';
import swal from 'sweetalert';
import Select from 'react-select' 

// Icon
import {BiSearchAlt} from 'react-icons/bi';
import {TiMessageTyping} from 'react-icons/ti';
import {FaUserCircle} from 'react-icons/fa';
import {RiArrowDropDownLine} from 'react-icons/ri';

// Controllers
import { addVehicle } from '../controllers/vehicle';
import { getAllBranch } from '../controllers/branch';
import { getAllDrivers } from '../controllers/employee';


const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "#eee" ,  width: '220px',border: 'none', })
  };

export default function Vehicle() {

    const vehicleTypeOptions = [
        { value: "Van", label: "Van" },
        { value: "Car", label: "Car" },
        { value: "Bike", label: "Bike" },
        { value: "Truck", label: "Truck" }
    ];

    
    const [number, setVehicleNumber] = useState('');
    const [load, setMaximumLoad] = useState('');
    const [type, setVehicleType] = useState([]);

    const [selectedBranchList, setSelectedBranchList] = useState([]);
    const [branchList, setBranchList] = useState([]);
    const [selectedDriver, setSelectedDriver] = useState([]);
    const [driverList, setDriverList] = useState([]);

   
    useEffect(() => {
        getAllBranch().then((result) => {
            console.log(result);
            var list = result.map((data) => {
                return { value: data._id, label: data.location };
            })
            setBranchList(list);
        });
    }, [])

    useEffect(() => {
        getAllDrivers().then((result) => {
            var list = result.map((data) => {
                return { value: data._id, label: data.name };
            })
            setDriverList(list);
        });

    }, [])

   
    function addVehicles() {
        if(number==='' && load==='' && type==='' && selectedBranchList==='' && selectedDriver===''){
            swal("All filde are empty..");
        }else if(number===''){
            swal("Vehicle number filde are empty");
        }else if(load===''){
            swal("Maximum load filde are empty");
        }else if(type===''){
            swal("Vehicle type filde are empty");
        }else if(selectedBranchList===''){
            swal("branch filde are empty");
        }else if(selectedDriver===''){
            swal("driver filde are empty");
        }else if(number==='' || load==='' || type==='' || selectedBranchList==='' || selectedDriver===''){
            swal("filde are empty");
        }else{
            addVehicle({ number: number, type: type.label, branch: selectedBranchList.label, driver: selectedDriver.label, load: load, state: 'Avalable' }).then((result) => {
                if (result.status) {
                   swal({
                        title: "Success!",
                        text: "New Vehicle Add Successfully",
                        icon: 'success',
                        timer: 2000,
                        button: false,
                      });

                        setTimeout(() => {
                            window.location.reload(true);
                        }, 2050)
                } else {
                    swal({
                        title: "Error!",
                        text: "New Vehicle Add Unsuccessfully",
                        icon: 'error',
                        timer: 2000,
                        button: false
                      });
                }
            });
        }

        
        
    }
    return (
        <div class="main-body">
            
        <Navbar/>
        <div class="sub-body">
        <div class="body">
            <div class="top-bar">
                <div class="top-bar-left">
                    <h3>Add Vehicle</h3>
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

            <p class="vehicle-submit-header">Please submit the following form to add a new vehicle to the system</p>

       
                <div class="form-contener">
                    <div class="form-up">
                        <div class="form-up-left">
                            <div class="form-item">
                                <p>Vehicle Type</p> 
                                <Select styles={colourStyles} options={vehicleTypeOptions}  onChange={setVehicleType} />
                            </div>
                            <div class="form-item">
                                <p>Vehicle Number</p> 
                                <input type="text"  value={number} placeholder="Type here" onChange={(e) => setVehicleNumber(e.target.value)} />
                            </div>
                            <div class="form-item">
                                <p>Maximum Load</p> 
                                <input type="text"   value={load} placeholder="Type here" onChange={(e) => setMaximumLoad(e.target.value)} />
                            </div>
                        </div>
                        <div class="form-up-rigth">
                            <div class="form-item">
                                <p>Branch</p> 
                                <Select styles={colourStyles} options={branchList}  onChange={setSelectedBranchList} />
                            </div>
                            <div class="form-item">
                                <p>Driver</p> 
                                <Select styles={colourStyles} options={driverList}  onChange={setSelectedDriver} />
                            </div>
                        </div>
                    </div>
                    <div class="form-down">
                    <img class="vehicle_add_1" src={ require('../image/vehicle_add_1.png') } />
                    <button id="addVehicle"  onClick={() => addVehicles()}>Submit</button>
                    <img class="vehicle_add_2" src={ require('../image/vehicle_add_2.png') } />
                    </div>
                </div>
            



            </div>
        </div>
    </div>

    
    )
    
}


