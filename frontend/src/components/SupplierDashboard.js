
import './SupplierDashboard.css';
import './Sdashboard.css';
import spices from './images/spices.png';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import Sidebar from './Sidebar';

import {Route,Switch,BrowserRouter} from 'react-router-dom';
import {Link} from 'react-router-dom';
import Calendar from 'react-calendar';

// Icon
import {BiSearchAlt} from 'react-icons/bi';
import {TiMessageTyping} from 'react-icons/ti';
import {FaUserCircle,FaTruck} from 'react-icons/fa';
import {RiArrowDropDownLine} from 'react-icons/ri';
import {BiHomeAlt,BiClipboard,BiCar,BiCart,BiMessageSquareAdd,BiUserPlus,BiGroup,BiAlignLeft,BiAlignRight,BiCalendarX,BiCalendar,BiConversation} from 'react-icons/bi';




function SupplierDashboard() {

  const [suppliers, setSuppliers] = useState([])

  useEffect(() => {
      Axios.get('http://localhost:8090/supplier/pendingrequests').then(res => {
          
          setSuppliers(res.data);
      })
          .catch(err => {
              console.log(err);
          })

  })

  const [supplierquotatons, setSupplierQuotations] = useState([])

  useEffect(() => {
      Axios.get('http://localhost:8090/supplierquotation/pendingsupplierquotations').then(res => {
          console.log(res);
          setSupplierQuotations(res.data);
      })
          .catch(err => {
              console.log(err);
          })

  });

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
      <div className="Sdashboard">
       <div className='w-container'>
        <div>
          <h2>
            Hello Supplier!
          </h2>
          <div className='homeimg'> <img  src={spices}/></div>
         
        </div>
       </div>

       <div className='c-container'>
       <Calendar/>
       </div>

       <div class="home-up">
                        

                        <div class="count-item ">
                       
                        <h1>{suppliers.length}</h1>
                        <h4>Supplier Requests</h4>
                        </div>

                        <div class="count-item ">
                       
                        <h1>{supplierquotatons.length}</h1>
                        <h4>Supplier Quotations</h4>
                        </div>

                      

                   
                </div>
      
     
      
       </div>
       
     
      
      </div>
      
      
    
    </div>
  );
}

export default SupplierDashboard;
