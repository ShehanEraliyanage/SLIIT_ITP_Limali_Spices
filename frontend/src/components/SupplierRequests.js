import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './SupplierRequests.css';
import './SupplierDashboard.css';
import Sidebar from '../components/Sidebar';
import {Link} from 'react-router-dom';
import Suppliermodal from './models/suppliermodal2'

// Icon
import {BiSearchAlt} from 'react-icons/bi';
import {TiMessageTyping} from 'react-icons/ti';
import {FaUserCircle,FaTruck} from 'react-icons/fa';
import {RiArrowDropDownLine} from 'react-icons/ri';






function SupplierRequests() {
    const [suppliers, setSuppliers] = useState([])

    useEffect(() => {
        Axios.get('http://localhost:8090/supplier/pendingrequests').then(res => {
            
            setSuppliers(res.data);
        })
            .catch(err => {
                console.log(err);
            })

    })

    const x = 1;
 
    const onDelete = (id, e) => {
        e.preventDefault();
        Axios.delete(`http://localhost:8090/supplier/delete/${id}`)
            .then(res => 
            alert("Supplier Deleted Succussfully")
            ).catch(err => console.log(err))
    
    };

    const setSActive=(id)=>{
       
        Axios.put(`http://localhost:8090/supplier/setactivesuppierq/${id}`).then((res)=>{
        alert("Request Accepted").catch(err=>{
           alert("Error")
        });
        });

        
   
   
   };

   const setSDecline=(id)=>{
       
    Axios.put(`http://localhost:8090/supplier/setdeclinesuppierq/${id}`).then((res)=>{
    alert("Request Declined").catch(err=>{
       alert("Error")
    });
    });

    


};
 

   
   


   
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
     
      
     


            <center><h2>Supplier Requests</h2></center>
            
            <br />

            <table class="table table-striped styled-table ">
                <thead class="thead-dark" >
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Location</th>
                        <th scope="col">Contact</th>
                        <th scope="col"><center>Actions</center></th>
                    </tr>
                </thead>
                <tbody>

                    {
                        suppliers.map(supplier => <tr key={supplier._id}>
                           
                            <th scope="row">{supplier.name}</th>
                            

                            <td>{supplier.email}</td>
                            <td>{supplier.address}</td>
                            <td>{supplier.contactno}</td>
                            <td className='action-buttons'>
                            <button onClick={()=>setSActive(supplier._id)} type="button" class="btn btn-success me-2">Accept</button>
                            <button onClick={()=> setSDecline(supplier._id)} type="button" class="btn btn-danger me-2">Decline</button>
                            <Suppliermodal sid={supplier._id} sname={supplier.name} saddress={supplier.address} semail={supplier.email} snic={supplier.nic} scontact={supplier.contactno} spassword={supplier.password} />
                                {/* <button type="button" class="btn btn-warning button3 me-2">View</button> */}
                            </td>

                        </tr>
                        
                        )
                        
                    }

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

export default SupplierRequests;
