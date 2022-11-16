import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/LayoutCustomerOrder"
import axios from "axios";
import { useReactToPrint } from 'react-to-print';
export default function CustomerOrderReport() {

    const [order, setOrder] = useState([]);
    const [customer, setCustomer] = useState([]);
    const [selectedOrders, setSelectedorders] = useState([]);
    const [searchInput, setSearchInput]  = useState("");

    useEffect(() => {
        axios.get("http://localhost:8090/order/").then(res => {
            if (res.data) {
                setOrder(res.data)
                setSelectedorders(res.data);
            }
        });
        axios.get("http://localhost:8090/realCustomer/").then(res => {
            if (res.data) {
                setCustomer(res.data)
                
            }
        });
    }, [])

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const searchHandler = () => {
        setSelectedorders(order.filter((order) => order.item.toLowerCase().includes(searchInput.toLowerCase())))
    }


    return (

        <Layout>


            <div className="container" class="p-3 mb-2 bg-secondary text-white" ref={componentRef}>

                <h1><center><strong>Customer Order Report</strong></center></h1>
                <div class="from-group2">
                        <input type="text"  class="form-control"placeholder="Filter By Item " onChange={(e) => setSearchInput(e.target.value)}></input>
                      <center> <button class="employee-btn" onClick={searchHandler} >Filter</button></center> 
                    </div>
                <table className="table table-striped styled-table">
                    <thead class="thead-dark">
                        <tr class="text-danger">
                            <th scope="col">Index</th>
                            <th scope="col">Customer Name</th>
                            <th scope="col">Item</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Order Date</th>

                        </tr>
                    </thead>
                    <tbody>



                        {selectedOrders.map((Order, index) => (


                            <tr>
                                <td scope="row">{index + 1}</td>
                                {customer.map((Customer) => {
                                    if (Order.customer_id == Customer._id) {
                                        return (
                                            <td>{Customer.name}</td>)
                                    }
                                })}




                                <td>{Order.item}</td>
                                <td>{Order.quantity}</td>
                                <td>{Order.order_date}</td>


                            </tr>

                        ))}



                    </tbody>



                </table>

                <center><button class="employee-btn" type="button"  onClick={handlePrint}>Print</button></center>

            </div>
        </Layout>

    )


}



