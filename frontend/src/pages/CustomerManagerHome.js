import Layout from "../components/LayoutCustomerOrder";
import '../components/Sdashboard.css'
import React, { useState, useEffect } from 'react';
import spices from '../components/images/sp2.png'
import {Link} from 'react-router-dom';
import Calendar from 'react-calendar';



export default function EmployeeHome() {

    return(
    <Layout>
    <div className="CustomerMHome">
        <br></br>
        <center><h1 >Hello Customer Manager!</h1></center>
        <br></br>
              
          <div className="Sdashboard">
          <div className='homeimg'> <img  src={spices}/></div>
      </div>
      <div className='Sdashboard'>
       <Calendar/>
       </div>
       </div>
    </Layout>

    )
}