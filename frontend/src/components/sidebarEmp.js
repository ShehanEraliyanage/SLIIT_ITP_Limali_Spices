
import React from 'react';
import './Sidebar.css';
import logo from './images/logo.png';
import support from './images/support.png';
import {Link} from 'react-router-dom';

function SidebarEmp() {
  return (
    <div className='Sidebar'>

      <div className='Logo'>
      <img src={logo}/>
      </div>

    <div className='Menulist'>
    <ul>
      <li><a href="">Dashboard</a></li>
      <li><Link to="/AddEmployee">Add Employee</Link></li>
      <li><a href="/ViewEmployee">View Employee</a></li>
      <li><Link to="">Manage Leaves</Link></li> 
      <li><a href="">Salary Details</a></li>
      <li><a href="">Reports</a></li>
      {/* <li><a href="/ViewOrder">Ordersview</a></li> */}
   
     
    </ul>
    
    </div>

    <div className="contact-support">

<img src={support}/>

<h3 className='supporth3'>Support 24/7</h3>
<h5 className='supporth5'>Contact us anytime</h5>
<button>Contact</button>

    
</div>
    
    </div>
  );
}

export default SidebarEmp;
