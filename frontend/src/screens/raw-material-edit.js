import { Link } from 'react-router-dom';
import Navbar from '../components/raw-material-sidenav';
import '../App.css';
import'../raw.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BiSearchAlt } from 'react-icons/bi';
import { TiMessageTyping } from 'react-icons/ti';
import { FaUserCircle } from 'react-icons/fa';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { editRawMaterial, getSelectedRawMaterial } from '../controllers/raw-material';
import swal from 'sweetalert';
import $ from 'jquery';



export default function Home(props) {

    const [name, setname] = useState("");
    const [itemCode, setItemCode] = useState("");
   
    const [rawMaterialData, setRawMaterialData] = useState([]);
    
    const id = props.match.params.id;

    useEffect(() => {
        getSelectedRawMaterial(id).then((result) => {
            setRawMaterialData(result);
        });
    }, [])
    
    function updateData(id) {
        var quantity1=$("#quantity").val();

            editRawMaterial({  _id:id,name: rawMaterialData.name, itemCode: rawMaterialData.itemCode, quantity: quantity1,unitPrice:rawMaterialData.unitPrice }).then((result) => {
            if (result.status) {
                swal({           
                    title: "Success!",
                    text: "Raw Material is Updated Successfully",
                    icon: 'success',
                    timer: 2000,
                    button: false,
                                        
                }) 
                setTimeout(() => {
                    window.location.replace("http://localhost:3000/raw-material-manage");
                }, 2000)
                }
        })
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



                    <form>
                        <div class="from-group">

                        <center><h2>Edit Raw Material</h2></center>
                            <label for="name">Item Code </label>
                            <input type="text" class="form-control" id="itemCode" value={itemCode} readOnly placeholder={rawMaterialData.itemCode}
                                onChange={(e) => {
                                    setItemCode(e.target.value);

                                }} />
                         

                                <label for="name">Name </label>
                                <input type="text" class="form-control" readOnly id="name" value={name} placeholder={rawMaterialData.name} 
                                    onChange={(e) => {
                                        setname(e.target.value);

                                    }} />

                            <label for="name">Unit Price </label>
                            <input type="text" class="form-control" id="unitPrice" readOnly  placeholder={rawMaterialData.unitPrice}  />

                            <label for="name">Quanitity </label>
                            <input type="text" class="form-control" id="quantity"  placeholder={rawMaterialData.quantity}/>

                     
                       


                        <div>
                            <center><button type="button" class="btn btn-primary" onClick={() => updateData(id)}>Submit</button></center>
                        </div>
                        </div>
                    </form>
                </div>

            </div>
        </div>
   
    )
}