
import React from 'react';
import './Sidebar.css';
import logo from './images/logo.png';
import support from './images/support.png';
import {Link} from 'react-router-dom';
import {BiHomeAlt,BiClipboard,BiCar,BiCart,BiMessageSquareAdd,BiUserPlus,BiGroup,BiAlignLeft,BiAlignRight,BiCalendarX,BiCalendar,BiConversation} from 'react-icons/bi';

function Sidebar() {
  return (
    <div className='Sidebar'>

      <div className='Logo'>
      <img src={logo}/>
      </div>

    <div className='Menulist'>
    <ul>
      <li><Link to="/SupplierDashboard"><BiHomeAlt style={{marginRight: 10}} size="1.5em"/>Supplier Dashboard</Link></li>
      <li><Link to="/SupplierRequests"><BiUserPlus style={{marginRight: 10}} size="1.5em"/>Supplier Requests</Link></li>
      <li><Link to="/ViewSuppliers"><BiGroup style={{marginRight: 10}} size="1.5em"/>Supplier List</Link></li>
      <li><Link to="/SupplierQuotations"><BiAlignLeft style={{marginRight: 10}} size="1.5em"/>Supplier Quotations</Link></li> 
      <li><Link to="/PurchaseQuotations"><BiAlignRight style={{marginRight: 10}} size="1.5em"/>Purchase Quotations</Link></li>
      <li><Link to="/SupplierSalesHistory"><BiCalendarX style={{marginRight: 10}} size="1.5em"/>Sales History</Link></li>
      <li><Link to="/SupplierReports"><BiCalendar style={{marginRight: 10}} size="1.5em"/>Reports</Link></li>
      <li><a href="/SupplierInquiry"><BiConversation style={{marginRight: 10}} size="1.5em"/>Inquiries</a></li>
     
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

export default Sidebar;
