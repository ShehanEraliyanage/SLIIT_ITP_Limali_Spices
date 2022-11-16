import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/DeliveryManagerNavbar';
import { reactBaseURL } from '../config';
import swal from 'sweetalert';
import Select from "react-select";
// Icon
import { BiSearchAlt } from 'react-icons/bi';
import { TiMessageTyping } from 'react-icons/ti';
import { FaUserCircle } from 'react-icons/fa';
import { RiArrowDropDownLine } from 'react-icons/ri';

// Controllers
import { editVehicle, getSelectedVehicle } from '../controllers/vehicle';
import { getAllBranch } from '../controllers/branch';
import { getAllDrivers } from '../controllers/employee';

//
import EditVehicleFormInput from '../components/Vehicle/EditVehicleFormInput';

const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "transparent", width: '200px', border: 'none',  })
};



export default function VehicleUpdate(props) {

    const id = props.match.params.id;

    const vehicleTypeOptions = [
        { value: "Van", label: "Van" },
        { value: "Car", label: "Car" },
        { value: "Bike", label: "Bike" },
        { value: "Truck", label: "Truck" }
    ];

    const vehicleStateOptions = [
        { value: "Avalable", label: "Avalable" },
        { value: "Delivering", label: "Delivering" },
        { value: "In Repair", label: "In Repair" }
    ];


    const [vehicleData, setVehicleData] = useState([]);

    const [number, setVehicleNumber] = useState(vehicleData.number);
    const [load, setMaximumLoad] = useState(vehicleData.load);
   

    const [selectedBranch, setSelectedBranch] = useState({});
    const [selectedType, setSelectedType] = useState({});
    const [selectedState, setSelectedState] = useState({});
    const [selectedDriver, setSelectedDriver] = useState({});

    const [branchList, setBranchList] = useState([]);
    const [driverList, setDriverList] = useState([]);

    useEffect(() => {
        getSelectedVehicle(id).then((result) => {
            setVehicleData(result);
            setSelectedBranch({ label: result.branch, value: result.branch });
            setSelectedType({ label: result.type, value: result.type });
            setSelectedState({ label: result.state, value: result.state });
            setSelectedDriver({ label: result.driver, value: result.driver });
        });

    }, [])


    useEffect(() => {
        getAllBranch().then((result) => {
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

    const nummberSetHandler = (data) => {
        setVehicleNumber(data);
    }
    const loadSetHandler = (data) => {
        setMaximumLoad(data);
    }

    function editMyVehicle(id) {
        swal({
            title: "Are you sure?",
            text: "Once edit vehicle details!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {

                    editVehicle({ _id: id, number: number, type: selectedType.label, branch: selectedBranch.label, driver: selectedDriver.label, load: load, state: selectedState.label }).then((result) => {
                        if (result.status) {
                            swal({
                                title: "Success!",
                                text: "Vehicle Update Successfully",
                                icon: 'success',
                                timer: 2000,
                                button: false,
                            });

                            setTimeout(() => {
                                window.location.replace(reactBaseURL + "/vehicle-list");
                            }, 2050)
                        } else {
                            swal({
                                title: "Error!",
                                text: "Vehicle Update Unsuccessfully",
                                icon: 'error',
                                timer: 2000,
                                button: false
                            });
                        }
                    });

                    swal("Poof! Your imaginary file has been deleted!", {
                        icon: "success",
                        title: "Delete Successfully!",
                    });
                }
            });

    }


    return (
        <div class="main-body">

            <Navbar />
            <div class="sub-body">
                <div class="body">
                    <div class="top-bar">
                        <div class="top-bar-left">
                            <h3>View Vehicle</h3>
                            <hr />
                            <h5>Delivery Manager</h5>
                        </div>

                        <div class="top-bar-rigth">
                            <Link to="/" class="top-bar-link"><BiSearchAlt size="1.5em" /></Link>
                            <Link to="/" class="top-bar-link"><TiMessageTyping size="1.5em" /></Link>
                            <Link to="/" class="top-bar-link"><FaUserCircle size="1.8em" /></Link>
                            <Link to="/" class="top-bar-link"><RiArrowDropDownLine size="1.8em" /></Link>
                        </div>
                    </div>

                    <p class="vehicle-submit-header">{vehicleData.number}  vehicle information</p>


                    <div class="update-contener">
                        <img class="vehicle_add_1" src={require('../image/update.png')} />
                        <div class="update-form">
                            <div class="input_item">
                                <label>Vehicle Number</label>
                                <EditVehicleFormInput value={vehicleData.number} title="number" onSave={nummberSetHandler} />
                            </div>

                            <hr class="vehicle-edit-hr-1" />

                            <div class="input_item">
                                <label>Maximum Load</label>
                                <EditVehicleFormInput value={vehicleData.load} title="load" onSave={loadSetHandler} />
                            </div>

                            <hr class="vehicle-edit-hr-2" />

                            <div class="input_item">
                                <label>Type</label>
                                <Select
                                    styles={colourStyles}
                                    options={vehicleTypeOptions}
                                    hideSelectedOptions={false}
                                    getOptionLabel={(option) => option.label}
                                    getOptionValue={(option) => option.value}
                                    value={selectedType}
                                    onChange={(e) => setSelectedType(e)}
                                />
                            </div>

                            <hr class="vehicle-edit-hr-2"/>

                            <div class="input_item">
                                <label>Branch</label>
                                <Select
                                    styles={colourStyles}
                                    options={branchList}
                                    hideSelectedOptions={false}
                                    getOptionLabel={(option) => option.label}
                                    getOptionValue={(option) => option.value}
                                    value={selectedBranch}
                                    onChange={(e) => setSelectedBranch(e)}
                                />
                            </div>

                            <hr class="vehicle-edit-hr-2" />

                            <div class="input_item">
                                <label>Driver</label>
                                <Select
                                    styles={colourStyles}
                                    options={driverList}
                                    hideSelectedOptions={false}
                                    getOptionLabel={(option) => option.label}
                                    getOptionValue={(option) => option.value}
                                    value={selectedDriver}
                                    onChange={(e) => setSelectedDriver(e)}
                                />
                            </div>

                            <hr class="vehicle-edit-hr-2" />

                            <div class="input_item">
                                <label>State</label>
                                <Select
                                    styles={colourStyles}
                                    options={vehicleStateOptions}
                                    hideSelectedOptions={false}
                                    getOptionLabel={(option) => option.label}
                                    getOptionValue={(option) => option.value}
                                    value={selectedState}
                                    onChange={(e) => setSelectedState(e)}
                                />
                            </div>
                            <hr class="vehicle-edit-hr-2" />
                            <button onClick={() => editMyVehicle(id)}>Update</button>
                        </div>
                    </div>




                </div>
            </div>
        </div>

    )
}