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
import { addRawMaterial,getSuppliers,getRawMaterialById } from '../controllers/raw-material';
import { getAllBranch } from '../controllers/branch';
import $ from 'jquery';


//SweetAlert Plugin Used to enhance alert Box
import swal from 'sweetalert';
import { Alert } from 'react-bootstrap';



export default function Home() {
    // const [name, setname] = useState("");
    const [itemCode, setItemCode] = useState("");
    const [quantity, setQuantity] = useState("")
    const [unitPrice, setUnitPrice] = useState("")
    const [branch, setBranch] = useState("")
    const [supplier, setSupplier] = useState("")
    const [branchAll, setBranchAll] = useState([]);
    const [supplierAll, setSupplierAll] = useState([]);
    let name;

    $(document).ready(function () {
            //Show Name Field For New Name If clicked New Item Radio box
          $("#new").attr('checked',true);


         $("#new").click(function () {
            $("#new-item").show();
            $("#new").attr('checked',true);
            $("#existing").attr('checked',false);


        });
        
        $("#existing").click(function () {
            $("#new-item").hide();
            $("#new").attr('checked',false);
            $("#existing").attr('checked',true);


        });
    });
    
//
    useEffect(() => {
        //Call relevant function in the controller 
        //to load the dataset in the first render
        getAllBranch().then((result) => {
            setBranchAll(result);
        });
        getSuppliers().then((result) => {
            setSupplierAll(result);
        });
       
       
    }, [])


    function add(){
        addRawMaterial({ name: name, itemCode: itemCode, quantity: quantity,unitPrice:unitPrice,branch:branch,supplier:supplier }).then((result) => {

            if (result.status) {
                swal({           
                    title: "Success!",
                    text: "Raw Material is insereted Successfully",
                    icon: 'success',
                    timer: 2000,
                    button: false,
                                        
                }) 
                setTimeout(() => {
                    window.location.replace("http://localhost:3000/raw-material-manage");
                }, 2000)
                }else{
                        swal({           
                            title: "Error!",           
                            text: "Raw Material can not be added!",   
                            type: 'error', 
                                                
                        })    
                 }
        })
    }

    function sendData() {
       
        if(itemCode===''){
            swal({           
                title: "Error!",           
                text: "Item Code is Empty!",   
                icon: 'error',
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
        } else if($('#existing').is(':checked') ){
            getRawMaterialById({code:itemCode}).then((result) => {
            //If name field is not found From Tne Database
                if(result.name=== undefined||result.name==''){
                    swal({           
                        title: "Error!",           
                        text: "Item Code is Invalid!", 
                        icon: 'error',
                        type: 'error', 
                                            
                    });
                }else{
                  //If the item name is founded from the database
                     name=result.name

                    add()
                }
            });
                    
                 
        }else if($('#new').is(':checked') ){
            getRawMaterialById({code:itemCode}).then((result) => {

            //If name field is not found From Tne Database
                if(result.name=== undefined||result.name==''){
                    
                  name=($("#name").val())

                  add()
                    
                }else{
                    swal({           
                        title: "Error!",           
                        text: "Item Code is Already Existing!", 
                        icon: 'error',
                        type: 'error', 
                                            
                    });
                }
            });
                       
              
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
                        <center><h2>Add Raw Material</h2></center>
                        <br></br>
                        
                        <label for="name"><input type="radio"  name="same" value="New Item" id="new" />
                        New Item   
                        </label>
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        <label for="name"><input type="radio" value="Existing Item"  name="same" id="existing"/>
                        Existing   
                        </label>
                            <br/>
                            <br/>


                       <label for="name">Item Code </label>
                            <input type="text" class="form-control" id="itemCode" placeholder="item Code"
                             onChange={(e) => {
                                setItemCode(e.target.value);  }} 
                            />
                        
                        <div id="new-item">

                        <label for="name">Name(For New Items Only) </label>
                            <input type="text" class="form-control" id="name" placeholder="Name"
                               />
                      </div>
                

                        <label for="name">Unit Price </label>
                        <input type="text" class="form-control" id="unitPrice" placeholder="UnitPrice"
                            onChange={(e) => {
                                setUnitPrice(e.target.value);

                            }} />

                                

                        <label for="name">Quanitity </label>
                        <input type="text" class="form-control" id="qusntity" placeholder="Quantity"
                            onChange={(e) => {
                                setQuantity(e.target.value);

                            }} />
                        <label for="name" style={{width:"100%"}}>Branch</label>

                        <select name="branch" style={{width:"100%",backgroundSize: "15px"}}  onChange={(e) => setBranch(e.target.value)} required>
                        <option value="" disabled selected>Select branch</option>

                        {branchAll.map((branches) => {
                                    return (
                                        <option value={branches.location} >{branches.location}</option>

                                    )
                                })}  
                                
                            </select>
                            <label for="name" style={{width:"100%"}}>Supplier</label>

                        <select name="supplier" style={{width:"100%",backgroundSize: "15px"}} onChange={(e) =>  setSupplier(e.target.value)} required>
                        <option value="" disabled selected>Select Supplier</option>

                        {supplierAll.map((supplier) => {
                                    return (
                                        <option value={supplier._id} >{supplier.name}</option>

                                    )
                                })}  
                                
                            </select>
                                        
                                <div>
                                <center> <button type="button" class="btn btn-primary" onClick={sendData}>Submit</button></center>
                                </div>

                                </div>


                            </form>
                        </div>

                    </div>
                </div>
    )
}