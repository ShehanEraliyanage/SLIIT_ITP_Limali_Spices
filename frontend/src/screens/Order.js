import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/DeliveryManagerNavbar';
import '../App.css';
import Select from 'react-select'
import swal from 'sweetalert';
import { reactBaseURL } from '../config';

import { BiSearchAlt } from 'react-icons/bi';
import { TiMessageTyping } from 'react-icons/ti';
import { FaUserCircle, } from 'react-icons/fa';
import { RiArrowDropDownLine } from 'react-icons/ri';

// Controllers
import { getBranchConfirmPendingOrders, getBranchConfirmProcessingOrders, getBranchConfirmDeliveredOrders, addVehicleToOrder, confirmDelivered } from '../controllers/order';
import { getAllavalable } from '../controllers/vehicle';

const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: 'transparent', width: '280px', border: 'none', })
};

export default function Order() {

    const [orderList, setOrderList] = useState([]);

    const [vehicleList, setVehicleList] = useState([]);
    const [vehicle, setVehicle] = useState([]);

    useEffect(() => {
        getBranchConfirmPendingOrders().then((result) => {
            setOrderList(result);
        });
    }, [])

    useEffect(() => {
        getAllavalable().then((result) => {
            var list = result.map((data) => {
                return { value: data.number, label: data.type + " " + data.number + " " + data.branch + " branch" };
            })
            setVehicleList(list);
        });

    }, [])

    function addDelivered(id) {
        swal({
            title: "Are you sure?",
            text: "Confirm Delivered!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    confirmDelivered({ _id: id, status: "delivered" }).then((result) => {
                        if (result.status) {
                            swal({
                                title: "Success!",
                                text: "Delivered Successfully",
                                icon: 'success',
                                timer: 2000,
                            });
                        } else {
                            swal({
                                title: "Error!",
                                text: "Delivered Unsuccessfully",
                                icon: 'error',
                                timer: 2000,
                                button: false,
                            });
                        }
                    });

                    swal("Poof! Your imaginary file has been deleted!", {
                        icon: "success",
                        title: "Vehicle Added Successfully!",
                    });
                }
                setTimeout(() => {
                    window.location.replace(reactBaseURL + "/order");
                }, 2050)
            });
    }

    function addDelivery(id) {
        if (vehicle.length === 0) {
            swal(" Vehicle not selected..");
        } else {
            swal({
                title: "Are you sure?",
                text: "Add vehicle to Order!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        addVehicleToOrder({ _id: id, status: "processing", vehicle: vehicle.value }).then((result) => {
                            if (result.status) {
                                swal({
                                    title: "Success!",
                                    text: "Vehicle Add Successfully",
                                    icon: 'success',
                                    timer: 2000,
                                });


                            } else {
                                swal({
                                    title: "Error!",
                                    text: "Vehicle Add Unsuccessfully",
                                    icon: 'error',
                                    timer: 2000,
                                    button: false,
                                });
                            }
                        });

                        swal("Poof! Your imaginary file has been deleted!", {
                            icon: "success",
                            title: "Vehicle Added Successfully!",
                        });
                    }
                    setTimeout(() => {
                        window.location.replace(reactBaseURL + "/order");
                    }, 2050)
                });
        }
    }

    function pending() {
        getBranchConfirmPendingOrders().then((result) => {
            setOrderList(result);
        });
    }

    function processing() {
        getBranchConfirmProcessingOrders().then((result) => {
            setOrderList(result);
        });
    }

    function delivered() {
        getBranchConfirmDeliveredOrders().then((result) => {
            setOrderList(result);
        });
    }



    return (
        <div class="main-body">

            <Navbar />
            <div class="sub-body">
                <div class="body">
                    <div class="top-bar">
                        <div class="top-bar-left">
                            <h3>Order</h3>
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



                    <div class="list-status">
                        <Link onClick={() => pending()} class="top-bar-link"><h6>Pending</h6></Link>
                        <Link onClick={() => processing()} class="top-bar-link"><h6>Processing</h6></Link>
                        <Link onClick={() => delivered()} class="top-bar-link"><h6>Delivered</h6></Link>
                    </div>



                    <div class="order_table">
                        <table>
                            <thead>
                                <tr>
                                    <th >Order ID</th>
                                    <th >Order Date</th>
                                    <th >Branch</th>
                                    <th >Item</th>
                                    <th >Quantity</th>
                                    <th >Status</th>
                                    <th >Vehicle</th>
                                    <th >Action</th>
                                </tr>
                            </thead>



                            <tbody>
                                {orderList.map((value, index) => {
                                    return <tr style={{ textAlign: 'center' }} key={index}>
                                        <td >{value._id}</td>
                                        <td >{value.order_date}</td>
                                        <td >{value.branch}</td>
                                        <td >{value.item}</td>
                                        <td >{value.quantity}</td>
                                        <td >{value.status}</td>

                                        {value.status === "pending" ? (
                                            <td > <Select styles={colourStyles} options={vehicleList} onChange={setVehicle} /></td>
                                        ) : (
                                            <td >{value.vehicle}</td>
                                        )}



                                        {value.status === "pending" ? (
                                            <td ><button class="order-add-delivery-btn" onClick={() => addDelivery(value._id)}>Add Delivery</button></td>
                                        ) : value.status === "processing" ? (
                                            <td ><button class="order-add-delivered-btn" onClick={() => addDelivered(value._id)}>Confirm Delivered</button></td>
                                        ) : (
                                            <td>{value.delivery_date} <br />Delivered success </td>
                                        )}
                                    </tr>
                                })}
                            </tbody>


                        </table>

                    </div>




                </div>
            </div>
        </div>
    )
}