import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SupplierRequests.css';
import './SupplierDashboard.css';
import Sidebar from '../components/Sidebar';
import {Link} from 'react-router-dom';
import SupplierQuotationModal from './models/SupplierQuotationModal';

// Icon
import {BiSearchAlt} from 'react-icons/bi';
import {TiMessageTyping} from 'react-icons/ti';
import {FaUserCircle,FaTruck} from 'react-icons/fa';
import {RiArrowDropDownLine} from 'react-icons/ri';
import {MdCarRepair,MdLocalCarWash} from 'react-icons/md'
import {AiFillCar} from 'react-icons/ai'



function SupplierQuotations() {
    const [supplierquotatons, setSupplierQuotations] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8090/supplierquotation/pendingsupplierquotations').then(res => {
            console.log(res);
            setSupplierQuotations(res.data);
        })
            .catch(err => {
                console.log(err);
            })

    });

    // const onDelete=(id)=>{
     
    //     axios
    //         .delete(`http://localhost:8090/supplierquotation/delete/${id}`)
    //         .then((res)=>{alert("Emloyee deleted worked")})
    //         .catch(error=>{console.log(error)});
    //      };
    const onDelete = (id, e) => {
        e.preventDefault();
        axios.delete(`http://localhost:8090/supplierquotation/delete/${id}`)
            .then(res => 
            alert("Supplier Quotation Succussfully")
            ).catch(err => console.log(err))
    
    };


    const setActive=(id)=>{
       
         axios.put(`http://localhost:8090/supplierquotation/setactivesuppierq/${id}`).then((res)=>{
         alert("Quotation Accepted").catch(err=>{
            alert("Error")
         });
         });

         
    
    
    };

    const setDecline=(id)=>{
       
        axios.put(`http://localhost:8090/supplierquotation/setdeclinesuppierq/${id}`).then((res)=>{
        alert("Quotation Declined").catch(err=>{
           alert("Error")
        });
        });
 
   
   };

    
   let Count=1;
   



    
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

            <center><h2>Supplier Quotations</h2></center>
            {/* <div className='row'>
                <div className='col-md-4'>
                    <div class="input-group ml-2">
                        <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                        <button type="button" class="btn btn-outline-warning search">Search</button>
                    </div>
                </div>
                <div className='col-md-8'></div>

            </div>
            <br /> */}

            <table class="table table-striped styled-table ">
                <thead class="thead-dark" >
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Item</th>
                        <th scope="col">Price(1Kg)</th>
                        <th scope="col">Quantity(Kg)</th>
                        <th scope="col">Supplier ID</th>
                        <th scope="col"><center>Actions</center></th>
                    </tr>
                </thead>
                <tbody>

                    {
                        supplierquotatons.map(supplierquotaton => <tr key={supplierquotaton._id}>

                            <th scope="row">{Count++}</th>

                            <td>{supplierquotaton.item}</td>
                            <td>{supplierquotaton.price}</td>
                            <td>{supplierquotaton.quantity}</td>
                            <td>{supplierquotaton.supplier_id}</td>
                            <td className='action-buttons'>
                                <button onClick={()=>setActive(supplierquotaton._id)} type="button" class="btn btn-success me-2">Accept</button>
                                <button onClick={()=>setDecline(supplierquotaton._id)} type="button" class="btn btn-danger me-2">Decline</button>
                                
                                {/* <button type="button" class="btn btn-info button3 me-2">View</button> */}
                                <SupplierQuotationModal qid={supplierquotaton._id} qitem={supplierquotaton.item} qprice={supplierquotaton.price} qquantity={supplierquotaton.quantity}/>
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

export default SupplierQuotations;
