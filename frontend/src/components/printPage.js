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






function PrintPage() {
    const [suppliersreports, setSuppliers] = useState([])

    useEffect(() => {
        Axios.get('http://localhost:8090/supplierquotation/printactivequotations').then(res => {
            
            setSuppliers(res.data);
        })
            .catch(err => {
                console.log(err);
            })

    })

   const repotGen=()=>{

        window.print();

   }


    

    
 

   
   


   
    return (
        <div className="SupplierDashboard">
          
     
     
      <div className="SupplierRequests"> 
     
      
     


            <center><h2>Supplier Reports</h2></center>
           
           
            <table class="table table-striped styled-table ">
                <thead class="thead-dark" >
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                        <th scope="col">Supplier ID</th>
                        <th scope="col">Status</th>
                      
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
                            

                        </tr>
                        
                        )
                        
                    }

                </tbody>
            </table>
            <center>
            <button class="btn btn-success "onClick={repotGen}>Print Report</button>
            </center>
            
            </div>
       


        </div>



    );
}

export default PrintPage;
