import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/raw-material-sidenav';
import '../App.css';
import '../raw.css';

import { BiSearchAlt } from 'react-icons/bi';
import { TiMessageTyping } from 'react-icons/ti';
import { FaUserCircle } from 'react-icons/fa';
import { RiArrowDropDownLine } from 'react-icons/ri';
import $ from 'jquery';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"


import {getPurchaseQuotation,getSupplierName } from '../controllers/raw-material';


export default function Manage() {

    const [purchase_quotation, setPurchaseQuotation] = useState([]);

    //Get Purchase Quotation Data
   
    useEffect(() => {
            getPurchaseQuotation().then((result) => {
                console.log(result)
                setPurchaseQuotation(result);

                $('#example').DataTable();

        });
        

    }, [])

  
    
    
    
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
                        <div>

                         
                        </div>
                        <div class="top-bar-rigth">
                            <Link to="/" class="top-bar-link"><BiSearchAlt size="1.5em" /></Link>
                            <Link to="/" class="top-bar-link"><TiMessageTyping size="1.5em" /></Link>
                            <Link to="/" class="top-bar-link"><FaUserCircle size="1.8em" /></Link>
                            <Link to="/" class="top-bar-link"><RiArrowDropDownLine size="1.8em" /></Link>
                        </div>
                    </div>

                    <center><h2 class="title-big">Manage Purchase Quotaions</h2></center>
                    <div style={{marginBottom: "10px",width:"100%" ,textAlign: "end",padding:"10px",backgroundColor:"#da5f38"}} >
                    <Link to="/raw-add-quotation" class="btn btn-danger ">
                           Add New Purchase Quotation
                       </Link>
                    </div>
                    <table  id="example" className="table table-striped styled-table">
                                <thead class="thead-dark">
                                    <tr>
                                        <th scope="col">Item Name</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">unit Price</th>
                                        <th scope="col">Supplier</th>
                                        <th scope="col">Status</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {purchase_quotation.map((purchaseQuotation) => {
                                        return (

                                            <tr>

                                                <td> {purchaseQuotation.item} </td>
                                                <td> {purchaseQuotation.quantity} </td>
                                                <td> {purchaseQuotation.price} </td>

                                                <td> {purchaseQuotation.supplier_id}</td>
                                   

                                                <td className='action-buttons'>
                                               
                                                {(() => {

                                                if (purchaseQuotation.status != "pending") {

                                                return (

                                                <button class="btn btn-warning" >Confirmed</button>
                                                )

                                                } else{

                                                return (

                                                <button type="button"  class="btn btn-danger button3 me-2">Pending</button>

                                                )

                                                } 
                                                })()}  


                                                                                    </td>
                                                                                </tr>
                                                                            )
                                                                        })}
                                </tbody>
                            </table>
                </div>
            </div>
        </div>
    )
}