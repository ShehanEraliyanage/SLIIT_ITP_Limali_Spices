import { Link } from 'react-router-dom';
import Navbar from '../components/raw-material-sidenav';
import '../App.css';
import '../raw.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BiSearchAlt } from 'react-icons/bi';
import { TiArrowLeftThick, TiMessageTyping } from 'react-icons/ti';
import { FaUserCircle } from 'react-icons/fa';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { addPurchaseQuotation,getSuppliers,getItemNames,getReportByStockAndSupplier,getReportByItem,getStockReport } from '../controllers/raw-material';
import { getAllBranch } from '../controllers/branch';
import $ from 'jquery';
import jsPDF from 'jspdf'
import 'jspdf-autotable'



//SweetAlert Plugin Used to enhance alert Box
import swal from 'sweetalert';
import { Alert } from 'react-bootstrap';
import logo from '../image/logo.jpeg'




export default function Home() {

    const [supplier, setSupplier] = useState("")
    const [name, setItemName ]= useState("")

    const [reportData, setReportData ]= useState([])
    const [reportData2, setReport2Data ]= useState([])
    const [reportData3, setReport3Data ]= useState([])


    const [supplierAll, setSupplierAll] = useState([]);
    const [Item, setitemAll] = useState([]);



    useEffect(() => {

        getSuppliers().then((result) => {
            setSupplierAll(result);
        });
        getItemNames().then((result) => {
            setitemAll(result);
        });
    }, [])
//Function Used to Show and Hide Relevent Input Fields 
//When Generating the relevent Report
    function showhide(e){
    var report=$("#item_COMBO").val();
    if(report==0){
        $("#item").hide();
        $("#supplier").hide();


    }else if(report==1){
        $("#item").show();
        $("#supplier").hide();

    }else if(report==2){
        $("#item").show();
        $("#supplier").show();


    }
}
  
    function sendData() {


        var report=$("#item_COMBO").val();

      if(report=='0'){

        getStockReport().then((result) => {
            setReport3Data(result);

            if(result.Quantity!=0){
                swal({           
                    title: "Success!",
                    text: "The Full Stock Count Report , Generated!",
                    icon: 'success',
                    timer: 2000,
                    button: false,
                                        
                }) 

                $("#ReportSection3").removeClass("hidden");
                
                $("#ReportSection").addClass("hidden");
                $("#ReportSection2").addClass("hidden");
                setTimeout(() => {

                   
                }, 2000)
            }

            });
      } else if(report=='1'){
            getReportByItem({ item: name}).then((result) => {
            setReport2Data(result);
            if(result.Quantity!=0){
                swal({           
                    title: "Success!",
                    text: "The Full Stock Count for Specific Item Report ,Generated!",
                    icon: 'success',
                    timer: 2000,
                    button: false,
                                        
                }) 
                $("#ReportSection").addClass("hidden");
                $("#ReportSection3").addClass("hidden");
                $("#ReportSection2").removeClass("hidden");
                setTimeout(() => {
                  


                }, 2000)
            }


            });   

       } else if(report=='2'){

            getReportByStockAndSupplier({ item: name,supplier:supplier}).then((result) => {
            setReportData(result);
            if(result.Quantity!=0){
                swal({           
                    title: "Success!",
                    text: "The Full Stock Count for Specific Seller and Item Report, Generated!",
                    icon: 'success',
                    timer: 2000,
                    button: false,
                                        
                }) 
                $("#ReportSection").removeClass("hidden");
                $("#ReportSection3").addClass("hidden");
                $("#ReportSection2").addClass("hidden");
                setTimeout(() => {
                 


                }, 2000)
            }

            });   
              
        }else{
            swal({           
                title: "Error!",           
                text: "Quatation is Empty!",   
                type: 'error', 
                                    
            })   
    }
    }

    //Item Wise
    function downloadReport1() {
        var data1,data2,data3;

        
        reportData2.map(data =>
            {
                data1=data.Quantity
                data2=data.TotalPrice
                data3=data.item


            
            })
        const doc = new jsPDF()
        doc.addImage(logo, 'JPEG', 73, 10, 60, 40)
        doc.setFontSize('12')
        doc.setFont('Helvertica', 'bold')
        doc.text("Full Stock Count Report", 14, 70)
             //
        doc.setFontSize('12')
        doc.setFont('Helvertica','bold')
        doc.text("Item Name", 14, 80)
        doc.setFontSize('10')
        doc.setFont('Helvertica','Normal')
        doc.text(":  "+data3, 45, 80)
   
        //

        doc.setFontSize('12')
        doc.setFont('Helvertica','bold')
        doc.text("Total Quantity", 14, 85)
        doc.setFontSize('12')
        doc.setFont('Helvertica','Normal')
        doc.text(":  "+data1, 45, 85)
        //
        doc.setFontSize('12')
        doc.setFont('Helvertica','bold')
        doc.text("Total Price", 14, 90)
        doc.setFontSize('10')
        doc.setFont('Helvertica','Normal')
        doc.text(":  "+data2, 45, 90)
        //
       
        doc.setFontSize('12')
        doc.setFont('Helvertica','bold')
        doc.text("Time Period Of The Report ", 14, 95)
        doc.setFontSize('10')
        doc.setFont('Helvertica','Normal')
        doc.text(":  "+"2022/05/01-2022/05/31", 65, 95)
        //
      
       
        doc.save('table.pdf')
    }
    //Item,Supplier
    function downloadReport2() {
        var data1,data2,data3,data4;

        
        reportData.map(data =>
            {
                data1=data.Quantity
                data2=data.TotalPrice
                data3=data.Item
                data4=data.SupplierName

            
            })
        const doc = new jsPDF()
        doc.addImage(logo, 'JPEG', 73, 10, 60, 40)
        doc.setFontSize('12')
        doc.setFont('Helvertica', 'bold')
        doc.text("Full Stock Count Report", 14, 70)
        //
        doc.setFontSize('10')
        doc.setFont('Helvertica','bold')
        doc.text("Supplier Name", 14, 80)
        doc.setFontSize('10')
        doc.setFont('Helvertica','Normal')
        doc.text(":  "+data4, 45, 80)
         //
         doc.setFontSize('10')
         doc.setFont('Helvertica','bold')
         doc.text("Item Name", 14, 85)
         doc.setFontSize('10')
         doc.setFont('Helvertica','Normal')
         doc.text(":  "+data3, 45, 85)
        //
        doc.setFontSize('10')
        doc.setFont('Helvertica','bold')
        doc.text("Total Quantity", 14, 90)
        doc.setFontSize('10')
        doc.setFont('Helvertica','Normal')
        doc.text(":  "+data1, 45, 90)
        //
        doc.setFontSize('10')
        doc.setFont('Helvertica','bold')
        doc.text("Total Price", 14, 95)
        doc.setFontSize('10')
        doc.setFont('Helvertica','Normal')
        doc.text(":  "+data2, 45, 95)
        //
        doc.setFontSize('10')
        doc.setFont('Helvertica','bold')
        doc.text("Report Start Date ", 14, 100)
        doc.setFontSize('10')
        doc.setFont('Helvertica','Normal')
        doc.text(":  "+"2022/05/01", 45, 100)
        //
        doc.setFontSize('10')
        doc.setFont('Helvertica','bold')
        doc.text("Report End Date ", 14, 105)
        doc.setFontSize('10')
        doc.setFont('Helvertica','Normal')
        doc.text(":  "+"2022/05/30", 45, 105)
        //
       
        doc.save('table.pdf')
    }
    //Full count
    function downloadReport3() {
        var data1,data2;

        
        reportData3.map(data =>
            {
                data1=data.Quantity
                data2=data.TotalPrice

            
            })
        const doc = new jsPDF()
        doc.addImage(logo, 'JPEG', 73, 10, 60, 40)
        doc.setFontSize('12')
        doc.setFont('Helvertica', 'bold')
        doc.text("Full Stock Count Report", 14, 70)
        //
        doc.setFontSize('10')
        doc.setFont('Helvertica','bold')
        doc.text("Total Quantity", 14, 80)
        doc.setFontSize('10')
        doc.setFont('Helvertica','Normal')
        doc.text(":  "+data1, 45, 80)
        //
        doc.setFontSize('10')
        doc.setFont('Helvertica','bold')
        doc.text("Total Price", 14, 85)
        doc.setFontSize('10')
        doc.setFont('Helvertica','Normal')
        doc.text(":  "+data2, 45, 85)
        //
        doc.setFontSize('10')
        doc.setFont('Helvertica','bold')
        doc.text("Report Start Date ", 14, 90)
        doc.setFontSize('10')
        doc.setFont('Helvertica','Normal')
        doc.text(":  "+"2022/05/01", 45, 90)
        //
        doc.setFontSize('10')
        doc.setFont('Helvertica','bold')
        doc.text("Report End Date ", 14, 95)
        doc.setFontSize('10')
        doc.setFont('Helvertica','Normal')
        doc.text(":  "+"2022/05/30", 45, 95)
        //
       
        doc.save('table.pdf')
    }
    return (
        <div class="main-body">
            <Navbar />
            <div class="sub-body">
                <div class="body">
                    <div class="top-bar">
                        <div class="top-bar-left">
                            <h3>Dashboard</h3>
                            <hr />
                            <h5>Inventory Manager</h5>
                        </div>
                        <div class="top-bar-rigth">
                            <Link to="/" class="top-bar-link"><BiSearchAlt size="1.5em" /></Link>
                            <Link to="/" class="top-bar-link"><TiMessageTyping size="1.5em" /></Link>
                            <Link to="/" class="top-bar-link"><FaUserCircle size="1.8em" /></Link>
                            <Link to="/" class="top-bar-link"><RiArrowDropDownLine size="1.8em" /></Link>
                        </div>
                    </div>
                </div>



                <div className="Add Raw Material">



                 
                    <form  >
                    
                        <div class="from-group">
                        <center><h2>Generate Report</h2></center>
                        <br></br>

                        <label for="name">Select Report </label>
                                <select name="item" id="item_COMBO" style={{width:"100%",backgroundSize: "15px"}} onChange={
                                    (e) => 
                                   showhide(e)
                                    
                                    } required>
                            <option value="" disabled selected>Select Report</option>

                                            <option value="0" >Full Stock Count </option>
                                            <option value="1" >Report For Item </option>
                                            <option value="2" >Item Supplier Report </option>


  
                                    
                           </select>
                                    <div id="item">
                                    <label for="name">Item Name </label>

                                    <select name="item" id="item" style={{width:"100%",backgroundSize: "15px"}} onChange={(e) => setItemName(e.target.value)} required>
                                      <option value="" disabled selected>Select The Item</option>

                                                {Item.map((item) => {
                                                            return (
                                                                <option value={item.name} >{item.name}</option>
                    
                                                            )
                                                        })}  
                                      
                                         </select>
                                    </div>
                                    <div id="supplier">

                                

                                        <label for="name" style={{width:"100%"}}>Supplier</label>

                                            <select name="supplier"  style={{width:"100%",backgroundSize: "15px"}} onChange={(e) => setSupplier(e.target.value)} required>
                                            <option value="" disabled selected>Select Supplier</option>

                                            {supplierAll.map((supplier) => {
                                                        return (
                                                            <option value={supplier._id} >{supplier.name}</option>

                                                        )
                                                    })}  
                                                    
                                            </select>


                                            </div> 
                            

{/* item supplier wise report */}

                           <div id="ReportSection" class="hidden">
                           <label for="name">Name Of The Item</label>
                             {reportData.map((data) => {
                                        return (
                                            <input  type="text" readOnly class="form-control" value={data.Item} ></input>
  
                                        )
                                    })} 
                            <label for="name">Purchased Quantity </label>
                             {reportData.map((data) => {
                                        return (
                                            <input  type="text" readOnly class="form-control" value={data.Quantity} ></input>
  
                                        )
                                    })} 
                                    <label for="name">Total Price of All The Stock Available</label>
                             {reportData.map((data) => {
                                        return (
                                            <input  type="text" readOnly class="form-control" value={"Rs."+data.TotalPrice} ></input>
  
                                        )
                                    })} 
                                     <button type="button" class="btn btn-danger" onClick={downloadReport2}>Download</button>
                           </div>
{/* Item Wise Report */}
                           <div id="ReportSection2" class="hidden">
                         
                            <label for="name">Purchased Quantity </label>
                             {reportData2.map((data) => {
                                        return (
                                            <input  type="text" readOnly class="form-control" value={data.Quantity} ></input>
  
                                        )
                                    })} 
                                    <label for="name">Total Price of All The Stock Available</label>
                             {reportData2.map((data) => {
                                        return (
                                            <input  type="text" readOnly class="form-control" value={"Rs."+data.TotalPrice} ></input>
  
                                        )
                                    })} 
                          <button type="button" class="btn btn-danger" onClick={downloadReport1}>Download</button>

                           </div>
{/* Full Stock count */}
                           <div id="ReportSection3" class="hidden">
                          
                            <label for="name">Purchased Stock Quantity </label>
                             {reportData3.map((data) => {
                                        return (
                                            <input  type="text" readOnly class="form-control" value={data.Quantity} ></input>
  
                                        )
                                    })} 
                                    <label for="name">Total Price of All The Stock Available</label>
                             {reportData3.map((data) => {
                                        return (
                                            <input  type="text" readOnly class="form-control" value={"Rs."+data.TotalPrice} ></input>
  
                                        )
                                    })} 
                       <button type="button" class="btn btn-danger" onClick={downloadReport3}>Download</button>

                                    
                           </div>
                          
                                
                        <div style={{marginTop:"5%"}}>
                        <center> <button type="button" class="btn btn-primary" onClick={sendData}>Generate</button></center>
                        </div>

                        </div>


                    </form>
                </div>

            </div>
        </div>
    )
}