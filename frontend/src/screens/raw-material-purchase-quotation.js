import { Link } from 'react-router-dom';
import Navbar from '../components/raw-material-sidenav';
import '../App.css';
import '../raw.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BiSearchAlt } from 'react-icons/bi';
import { TiMessageTyping } from 'react-icons/ti';
import { FaUserCircle } from 'react-icons/fa';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { addPurchaseQuotation,getSuppliers } from '../controllers/raw-material';
import { getAllBranch } from '../controllers/branch';

//SweetAlert Plugin Used to enhance alert Box
import swal from 'sweetalert';
import { Alert } from 'react-bootstrap';



export default function Home() {
    const [name, setname] = useState("");
    const [quantity, setQuantity] = useState("")
    const [unitPrice, setUnitPrice] = useState("")
 


    function sendData() {
        if(name==''){
            swal({           
                    title: "Error!",
                    icon: 'error',
                    text: "Name is Empty!",   
                    type: 'error', 
                                       
                });        
        }else if(unitPrice===''){
               swal({           
                title: "Error!",           
                text: "Unit Price is Empty!",  
                icon: 'error',
                type: 'error', 
                                           
               });  
         }else if(quantity===''){
                swal({           
                    title: "Error!",           
                    text: "Quantity is Empty!", 
                    icon: 'error',
                    type: 'error', 
                                        
                });        
        }else{
            addPurchaseQuotation({ name: name, quantity: quantity,unitPrice:unitPrice,status:"pending",supplier:"pending" }).then((result) => {
            if (result) {
                swal({           
                    title: "Success!",
                    text: "Peruchase Quatation is insereted Successfully",
                    icon: 'success',
                    timer: 2000,
                    button: false,
                                        
                }) 
                setTimeout(() => {
                    window.location.replace("http://localhost:3000/raw-purchase-quotation");
                }, 2000)
                }else{
                        swal({           
                            title: "Error!",           
                            text: "Quatation is Empty!",   
                            type: 'error', 
                                                
                        })    
                            }
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
                            <h5>Inventory Manager</h5>
                        </div>
                        <div class="top-bar-rigth">
                            <Link to="/" class="top-bar-link"><BiSearchAlt size="1.5em" /></Link>
                            <Link to="/" class="top-bar-link"><TiMessageTyping size="1.5em" /></Link>
                            <Link to="/" class="top-bar-link"><FaUserCircle size="1.8em" /></Link>
                            <Link to="/" class="top-bar-link"><RiArrowDropDownLine size="1.8em" /></Link>
                        </div>
                    </div>
                </div>



                <div className="Add Raw Material">



                 
                    <form  >
                    
                        <div class="from-group">
                        <center><h2>Purchase Quatation</h2></center>
                        <br></br>
                        

                                <label for="name">Item Name </label>
                                <input type="text" class="form-control" id="name" placeholder="Name"
                                    onChange={(e) => {
                                        setname(e.target.value);

                                    }} />

                            <label for="name">Quanitity </label>
                            <input type="text" class="form-control" id="qusntity" placeholder="Quantity"
                                onChange={(e) => {
                                    setQuantity(e.target.value);

                                }} />
                            <label for="name">Unit Price </label>
                            <input type="text" class="form-control" id="unitPrice" placeholder="UnitPrice"
                                onChange={(e) => {
                                    setUnitPrice(e.target.value);

                                }} />

                        

                           
                           
                                
                        <div style={{marginTop:"5%"}}>
                        <center> <button type="button" class="btn btn-primary" onClick={sendData}>Submit</button></center>
                        </div>

                        </div>


                    </form>
                </div>

            </div>
        </div>
    )
}