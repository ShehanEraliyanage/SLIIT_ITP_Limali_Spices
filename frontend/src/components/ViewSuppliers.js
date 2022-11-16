import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './ViewSupplier.css';
import './SupplierDashboard.css';
import Sidebar from '../components/Sidebar';
import {Link } from 'react-router-dom';
import { Redirect } from 'react-router'
import Suppliermodal from './models/suppliermodal'

// Icon
import {BiSearchAlt} from 'react-icons/bi';
import {TiMessageTyping} from 'react-icons/ti';
import {FaUserCircle,FaTruck} from 'react-icons/fa';
import {RiArrowDropDownLine} from 'react-icons/ri';
import {MdCarRepair,MdLocalCarWash} from 'react-icons/md'
import {AiFillCar} from 'react-icons/ai'





const ViewSuppliers = (props) => {

    // const [id,setId] = useState("");

    const [suppliers, setSuppliers] = useState([])
    const [selectedSuppliers, setSelectedSuppliers] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [fireRedirect, setFireRedirect] = useState(false);




    useEffect(() => {
        Axios.get('http://localhost:8090/supplier/activesuppliers/').then(res => {
            
            setSuppliers(res.data)

        })
            .catch(err => {
                console.log(err);
            })

    })



    const searchHandler = () => {
      
        if(searchInput ==""){
            alert("Please Enter Supplier Name");

        }else{

        setFireRedirect(true);
        }
      
       
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
      <div className="ViewSuppliers"> 
     
      
     


            <center><h2>Suppliers List</h2></center>
            <div className='row'>
                <div className='col-md-4 ml-2'>
                <div class="input-group">
  <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" 
  onChange={(e) => setSearchInput(e.target.value)} required="true"/>
  <button type="button" class="btn btn-outline-warning search" onClick={searchHandler}>Search</button>
</div>
                </div>
                <div className='col-md-8'></div>

            </div>

            <div className='card-container'>

            {
                        suppliers.map(supplier =>
                            <div class="card" >
                            <img class="card-img-top" src={ require('./images/supplierblack.png') } />
                            <div class="card-body">
                              <h5 class="card-title">{supplier.name}</h5>
                              <p class="card-text">{supplier.address}<br/>{supplier.email}</p>
                              
                             <Suppliermodal sid={supplier._id} sname={supplier.name} saddress={supplier.address} semail={supplier.email} snic={supplier.nic} scontact={supplier.contactno} spassword={supplier.password} />
                              {/* <button type="button" class="btn btn-primary">View</button> */}
                            </div>
                          </div>

                        )}
           



            </div>

          
            
            </div>
        </div>

        {fireRedirect && <Redirect to={`/SearchSuppliers/${searchInput}`} push={true} />}
        </div>



    );
};
export default ViewSuppliers;
