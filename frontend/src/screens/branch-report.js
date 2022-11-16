import { Link } from 'react-router-dom';
import Navbar from '../components/branch-sidenav';
import '../App.css';
import '../components/Branch/branch-login.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BiSearchAlt } from 'react-icons/bi';
import { TiMessageTyping } from 'react-icons/ti';
import { FaUserCircle } from 'react-icons/fa';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { generateReport } from '../controllers/branch';
import swal from 'sweetalert';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import logo from '../image/logo.jpeg'


export default function Home() {
    const [report, setReport] = useState([]);

    useEffect(() => {

        generateReport().then((result) => {
            setReport(result);
            console.log(result)
        });
    }, [])

    function printNow() {

        var approved,rejected,Pending,totalQuantity,totalValue;

        report.map((data) => {
            approved=data.ActiveCount
            Pending=data.PendingCount
            rejected=data.RejectCount
            totalQuantity=data.Quantity
            totalValue=data.TotalPrice

        })

            const doc = new jsPDF()
            doc.addImage(logo, 'JPEG', 73, 10, 60, 40)
            doc.setFontSize('12')
            doc.setFont('Helvertica', 'bold')
            doc.text("Branch Summary Report", 14, 70)
            //
            doc.setFontSize('10')
            doc.setFont('Helvertica','bold')
            doc.text("Total Total No Of Aprroved Employees", 14, 80)
            doc.setFontSize('10')
            doc.setFont('Helvertica','Normal')
            doc.text(":  "+approved, 75, 80)
            //
            doc.setFontSize('10')
            doc.setFont('Helvertica','bold')
            doc.text("Total Total No Of Rejected Employees", 14, 85)
            doc.setFontSize('10')
            doc.setFont('Helvertica','Normal')
            doc.text(":  "+rejected, 75, 85)
            //
            doc.setFontSize('10')
            doc.setFont('Helvertica','bold')
            doc.text("Total Total No Of Pending Employees", 14, 90)
            doc.setFontSize('10')
            doc.setFont('Helvertica','Normal')
            doc.text(":  "+Pending, 75, 90)
            
                //
            doc.setFontSize('10')
            doc.setFont('Helvertica','bold')
            doc.text("Total Quantity", 14, 95)
            doc.setFontSize('10')
            doc.setFont('Helvertica','Normal')
            doc.text(":  "+totalQuantity, 45, 95)
            //
            doc.setFontSize('10')
            doc.setFont('Helvertica','bold')
            doc.text("Total Price", 14, 100)
            doc.setFontSize('10')
            doc.setFont('Helvertica','Normal')
            doc.text(":  "+totalValue, 45, 100)
            //
            
            doc.save('table.pdf')
               
      
          
        }        
    
    return (
        <div class="main-body">
           
            <div class="sub-body bg-login">
              <div className="Add Branch">
                 
                    <form id="new" >
                        <div class="login-wrap">
                        <div class="title">
                            <center><h2>Branch Report</h2></center>
                            </div>
                        <div class="from-group" style={{padding: "0px !important"}}>
                        

                            <label style={{fontSize: "100%"}}for="name">Total No Of Aprroved Employees</label>
                            {report.map((data) => {
                                        return (
                                            <input type="text" value={data.ActiveCount}class="form-control" id="email" readOnly placeholder=""ame />
  
                                        )
                                    })} 
                            </div>  
                            <div class="from-group" style={{padding: "0px !important"}}>
                        

                            <label style={{fontSize: "100%"}} for="name">Total No Of Pending Employees</label>
                            {report.map((data) => {
                                        return (
                                            <input type="text" value={data.PendingCount}class="form-control" id="email" readOnly placeholder=""ame />
  
                                        )
                                    })} 
                            </div> 

                            <div class="from-group" style={{padding: "0px !important"}}>

                            <label style={{fontSize: "100%"}} for="name">Total No Of Rejected Employees</label>
                            {report.map((data) => {
                                        return (
                                            <input type="text" value={data.RejectCount}class="form-control" id="email" readOnly placeholder=""ame />
  
                                        )
                                    })} 
                            </div>   


                      <div class="from-group" style={{padding: "0px !important"}}>
                                

                        <label for="name" style={{fontSize: "100%"}}>Total Stock Available at The Branch</label>
                        {report.map((data) => {
                                        return (
                                            <input type="text" value={data.Quantity+" Items"}class="form-control" id="email" readOnly placeholder=""ame />
  
                                        )
                                    })} 
                        </div>  
                        <div class="from-group"  style={{padding: "0 !important"}}>
                        

                        <label style={{fontSize: "100%"}} for="name">Total Value of the Cost of The Branch</label>
                        {report.map((data) => {
                                        return (
                                            <input type="text" value={data.TotalPrice+".00"}class="form-control" id="email" readOnly placeholder=""ame />
  
                                        )
                                    })} 
                        </div>  
<div class="from-group">

<div class="btn-wrap">
<button type="button" style={{width:"100%",margin:"0"}}class="btn btn-primary" onClick={printNow}>Print Report</button>

</div>
</div>
                        </div>
                        
                      
                    </form>
                </div>

            </div>
        </div>
    )
}