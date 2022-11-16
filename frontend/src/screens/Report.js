import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/DeliveryManagerNavbar';
import '../App.css';
import 'react-calendar/dist/Calendar.css';
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import Select from 'react-select'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import swal from 'sweetalert';

import { BiSearchAlt } from 'react-icons/bi';
import { TiMessageTyping } from 'react-icons/ti';
import { FaUserCircle, } from 'react-icons/fa';
import { RiArrowDropDownLine } from 'react-icons/ri';

import logo from '../image/logo.jpeg'

// Controllers
import { getAllVehicles } from '../controllers/vehicle';
import { vehicleDeliveryReport } from '../controllers/order';


const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: '#e8e7e7', width: '280px', border: 'none', height: '40px' })
};
const marginStyles = {
    control: (styles) => ({ ...styles, backgroundColor: '#e8e7e7', width: '280px', border: 'none', marginLeft: '70px', height: '40px' })
};

export default function Report() {

    let orderCount = 0;
    let quantityCount = 0;

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());


    const [selectedVehicleList, setSelectedVehicleList] = useState([]);
    const [vehicleList, setVehicleList] = useState([]);

    const [reportList, setReportList] = useState([]);
    const [head, setHead] = useState("");

    const newStartDate = startDate.toString().slice(11, 15) + "-" + startDate.toISOString().slice(5, 7) + "-" + startDate.toString().slice(8, 10);
    const newEndDate = endDate.toString().slice(11, 15) + "-" + endDate.toISOString().slice(5, 7) + "-" + endDate.toString().slice(8, 10);


    useEffect(() => {
        getAllVehicles().then((result) => {
            console.log(result);
            var list = result.map((data) => {
                return { value: data.number, label: data.number };
            })
            setVehicleList(list);
        });
    }, [])


 

    function vehicleReport() {
        if (selectedVehicleList.length === 0 && newStartDate.toString().length>10 && newEndDate.toString().length>10) {
            swal("All filde are empty..");
        }else if(selectedVehicleList.length === 0){
            swal("Vehicle not selected");
        }else if(newStartDate.toString().length>10){
            swal("Start date not selected"); 
        }else if(newEndDate.toString().length>10){
            swal("End date not selected");       
        } else {
            vehicleDeliveryReport({ startDate: newStartDate, endDate: newEndDate, vehicle: selectedVehicleList.label }).then((result) => {
                setReportList(result.details);
                setHead(result.status);
            });
        }
      
    }

    function downloadPDF() {
        const doc = new jsPDF()
        doc.addImage(logo, 'JPEG', 73, 10, 60, 40)
        doc.setFontSize('12')
        doc.setFont('Helvertica', 'bold')
        doc.text(selectedVehicleList.label + "  " + "Vehicle Delivery Report", 14, 70)
        //
        doc.setFontSize('10')
        doc.setFont('Helvertica','bold')
        doc.text("Total Orders", 14, 80)
        doc.setFontSize('10')
        doc.setFont('Helvertica','Normal')
        doc.text(":  "+orderCount.toString(), 45, 80)
        //
        doc.setFontSize('10')
        doc.setFont('Helvertica','bold')
        doc.text("Total Quantity", 14, 85)
        doc.setFontSize('10')
        doc.setFont('Helvertica','Normal')
        doc.text(":  "+quantityCount.toString(), 45, 85)
        //
        doc.setFontSize('10')
        doc.setFont('Helvertica','bold')
        doc.text("Report Start Date ", 14, 90)
        doc.setFontSize('10')
        doc.setFont('Helvertica','Normal')
        doc.text(":  "+newStartDate.toString(), 45, 90)
        //
        doc.setFontSize('10')
        doc.setFont('Helvertica','bold')
        doc.text("Report End Date ", 14, 95)
        doc.setFontSize('10')
        doc.setFont('Helvertica','Normal')
        doc.text(":  "+newEndDate.toString(), 45, 95)
        //
        doc.autoTable({
            theme: "grid",
            head: [['Order ID', 'Item', 'Quantity', 'Order Date', 'Delivery Date', 'Customer ID']],
            body: reportList.map(col => [[col._id], [col.item], [col.quantity], [col.order_date], [col.delivery_date], [col.customer_id]]),
            margin: { top: 100 }
        })
        doc.save('table.pdf')
    }


    return (
        <div class="main-body">

            <Navbar />
            <div class="sub-body">
                <div class="body">
                    <div class="top-bar">
                        <div class="top-bar-left">
                            <h3>Report</h3>
                            <hr />
                            <h5>Delivery Manager</h5>
                        </div>

                        <div class="top-bar-rigth">
                            <Link to="/" class="top-bar-link"><BiSearchAlt size="1.5em" /></Link>
                            <Link to="/" class="top-bar-link"><TiMessageTyping size="1.5em" /></Link>
                            <Link to="/" class="top-bar-link"><FaUserCircle size="1.8em" /></Link>
                            <Link to="/" class="top-bar-link"><RiArrowDropDownLine size="1.8em" /></Link>
                        </div>
                    </div>


                    <div class="order_search_containar">
                        <h4>Vehicle Delivery Report</h4>

                        <div class="order_input">
                            <div class="DatePickerComponent">
                                <DatePickerComponent placeholder='Select Date'  format='yyyy-MM-dd' selected={startDate} onChange={(e) => setStartDate(e.target.value)} />
                            </div>
                            <div class="DatePickerComponent">
                                <DatePickerComponent placeholder='End Date' format='yyyy-MM-dd' selected={endDate} onChange={(e) => setEndDate(e.target.value)} />
                            </div>
                            <Select styles={colourStyles} options={vehicleList} onChange={setSelectedVehicleList} placeholder="Select Vehicle" />
                            <button onClick={() => vehicleReport()} ><BiSearchAlt color='#ffffff' size="1.5em" /></button>
                        </div>
                    </div>


                    <div>
                        {head === true ? (
                            <button class="report-pdf-btn" onClick={() => downloadPDF()} >Download PDF</button>
                        ) : (
                            <p></p>
                        )}
                    </div>


                    <div class="order_table">
                        <table>

                            {head === true ? (
                                <thead>
                                    <tr>
                                        <th >Order ID</th>
                                        <th >Item</th>
                                        <th >Quantity</th>
                                        <th >Order Date</th>
                                        <th >Delivery Date</th>
                                        <th >Customer ID</th>
                                    </tr>
                                </thead>
                            ) : (
                                <p></p>
                            )}


                            <tbody>
                                {reportList.map((value, index) => {
                                    return <tr style={{ textAlign: 'center' }} key={index}>
                                        <td >{value._id}</td>
                                        <td >{value.item}</td>
                                        <td >{value.quantity}</td>
                                        <td >{value.order_date}</td>
                                        <td >{value.delivery_date}</td>
                                        <td >{value.customer_id}</td>
                                        <div class="report-count">  { orderCount = orderCount + 1}</div>
                                      <div class="report-count">  { quantityCount = quantityCount + value.quantity}</div>
                                    </tr>
                                    
                                })}
                            </tbody>


                        </table>

                    </div>




                </div>
            </div>
        </div>
    )
}