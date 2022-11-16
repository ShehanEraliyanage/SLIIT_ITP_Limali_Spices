import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './SupplierRequests.css';
import './SupplierDashboard.css';
import Sidebar from '../components/Sidebar';
import {Link} from 'react-router-dom';
import swal from 'sweetalert';

// Icon
import {BiSearchAlt} from 'react-icons/bi';
import {TiMessageTyping} from 'react-icons/ti';
import {FaUserCircle,FaTruck} from 'react-icons/fa';
import {RiArrowDropDownLine} from 'react-icons/ri';






function SupplierSalesHistory() {
    const [suppliersreports, setSuppliers] = useState([])

    useEffect(() => {
        Axios.get('http://localhost:8090/purchasequotation/gethistory').then(res => {
            
            setSuppliers(res.data);
        })
            .catch(err => {
                console.log(err);
            })

    })

    const onDelete = (id, e) => {
        e.preventDefault();
        Axios.delete(`http://localhost:8090/supplierquotation/delete/${id}`)
            .then(res => 
                swal({
                    title: "Success!",
                    text: "Inquiry Deleted Successfully",
                    icon: 'success',
                    timer: 2000,
                    button: false,
                  })


            ).catch(err => console.log(err))
    
    };

    
    const setDelete=(id)=>{
       
        Axios.put(`http://localhost:8090/purchasequotation/setdelete/${id}`).then((res)=>{
        alert("Purchase Quotation Deleted By Supplier Manager").catch(err=>{
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
     
      
     


            <center><h2>Supplier Sales History</h2></center>
           
            <table class="table table-striped styled-table ">
                <thead class="thead-dark" >
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                        <th scope="col">Supplier ID</th>
                        <th scope="col">Status</th>
                        <th scope="col"><center>Actions</center></th>
                    </tr>
                </thead>
                <tbody>

                    {
                        suppliersreports.map(supplierquotaton => <tr key={suppliersreports._id}>
                           
                            <th scope="row">{supplierquotaton.item}</th>
                            

                            <td>{supplierquotaton.quantity}</td>
                            <td>{supplierquotaton.price}</td>
                            <td>{supplierquotaton.supplier_id}</td>
                            <td>{supplierquotaton.status}</td>
                            <td className='action-buttons'>
                            {/* <button onClick={()=>setSActive(supplier._id)} type="button" class="btn btn-success me-2">Accept</button>
                                <a href="" onClick={(e) => { onDelete(supplier._id, e) }} class="btn btn-danger me-2">Delete</a>
                            
                            
                            <button type="button" class="btn btn-warning button3 me-2">View</button> */}
                            <center>
                           <button type="button" onClick={() => { setDelete(supplierquotaton._id) }} class="btn btn-danger ">Delete</button>
                           </center>
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

export default SupplierSalesHistory;
