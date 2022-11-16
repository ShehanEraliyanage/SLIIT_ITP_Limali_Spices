import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SupplierRequests.css';
import './SupplierDashboard.css';
import Sidebar from '../components/Sidebar';
import {Link} from 'react-router-dom';
import swal from 'sweetalert';

import { useHistory } from "react-router-dom";

// Icon
import {BiSearchAlt} from 'react-icons/bi';
import {TiMessageTyping} from 'react-icons/ti';
import {FaUserCircle,FaTruck} from 'react-icons/fa';
import {RiArrowDropDownLine} from 'react-icons/ri';






export default function ViewInquiry(){
    const [inquiries,viewinquiry] =useState([]);

    useEffect(()=> {   
    function getinquiry(){
        axios.get("http://localhost:8090/SupplierInquiry/").then((res)=>{
            viewinquiry(res.data);
        }).catch((err)=>{
alert(err.messsage);
        })
    }
    getinquiry();
    },[])
    const x = 1;
 
    const onDelete=(id)=>{
     
        axios.delete(`http://localhost:8090/SupplierInquiry/delete/${id}`).then((res)=>{
            
         });
         swal({
            title: "Success!",
            text: "Inquiry Deleted Successfully",
            icon: 'success',
            timer: 2000,
            button: false,
          });

    };

    const history = useHistory();

 
    const routeChange = (id) =>{ 
        console.log(id)
      let path = "..//UpdateEmployee/" + id ; 
      history.push(path);
    }


    
 

   
   


   
    return (
        <div className="SupplierDashboard">
            <div className="Left">
      <Sidebar/>
      </div>
      <div className="Right">
      <div class="top-bar">
                        <div class="top-bar-left">
                            <h3>Dashboard</h3>
                            <hr/>
                            <h5>Supplier Manager</h5>
                        </div>
                        <div class="top-bar-rigth">
                            <Link to="/" class="top-bar-link"><BiSearchAlt size="1.5em"/></Link> 
                            <Link to="/" class="top-bar-link"><TiMessageTyping size="1.5em"/></Link> 
                            <Link to="/" class="top-bar-link"><FaUserCircle size="1.8em"/></Link> 
                            <Link to="/" class="top-bar-link"><RiArrowDropDownLine size="1.8em"/></Link> 
                        </div>
                    </div>
      <div className="SupplierRequests"> 
     
      
     


            <center><h2>inquiries</h2></center>
            <div className='row'>
                <div className='col-md-4 ml-2'>
                <div class="input-group">
  <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
  <button type="button" class="btn btn-outline-warning search">Search</button>
</div>
                </div>
                <div className='col-md-8'></div>

            </div>
            <br />

            <table class="table table-striped styled-table ">
                <thead class="thead-dark" >
                    <tr>
                    <th scope="col">Title</th>
        <th scope="col">Description</th>
        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>

                {inquiries.map((Inquiry)=>{   
                              return(
                              <tr>
                                 
                  <td>{Inquiry.title}</td>
                  <td> {Inquiry.description} </td>

                 
                  <td className='action-buttons'>
                                        <button type="button" onClick={routeChange.bind(this, Inquiry._id)} class="btn btn-warning button3 me-2">Update</button>

                                        
                                        <button type="button"a href="" onClick={()=>onDelete(Inquiry._id)} class="btn btn-danger me-2">Delete</button>
                                     
                                    </td>
                  </tr>
                          )})}
                </tbody>
            </table>
            <div className="row">
                <div className='col-sm-4'></div>
                <div className='col-sm-2'>
                    {/* <div className='pagination-me'> */}
                    <nav aria-label="...">
                        <ul class="pagination">
                            <li class="page-item disabled">
                                <span class="page-link">Previous</span>
                            </li>
                            <li class="page-item"><a class="page-link" href="#">1</a></li>
                            <li class="page-item active">
                                <span class="page-link">
                                    2

                                </span>
                            </li>
                            <li class="page-item"><a class="page-link" href="#">3</a></li>
                            <li class="page-item">
                                <a class="page-link" href="#">Next</a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className='col-sm-4'></div>
            </div>
            </div>
        </div>


        </div>



    );
}


