import Layout from "../components/Layout";
import classes from "./ProductionReports.module.css";
import Select from "react-select";
import {useRef, useState, useEffect} from 'react';
import {useReactToPrint} from 'react-to-print';

import AddProduction from "../components/Production/AddProduction";
import AddSales from "../components/Production/AddSales";
import ProductionAvailability from "../components/Production/ProductionAvailability";
import {getMonthlyProduction, getNumberOfProducts, getToalProductionOfMonth, getToalSalesOfMonth} from '../controllers/product'

import production from "../image/cubes.png";
import sales from "../image/money.png";

const ProductionReports = (props) => {

    const options = [
        { value: '0', label: 'January' },
        { value: '1', label: 'February' },
        { value: '2', label: 'March' },
        { value: '3', label: 'April' },
        { value: '4', label: 'May' },
        { value: '5', label: 'June' },
        { value: '6', label: 'July' },
        { value: '7', label: 'August' },
        { value: '8', label: 'September' },
        { value: '9', label: 'October' },
        { value: '10', label: 'November' },
        { value: '11', label: 'December' },
    ];

    const [selectedMonth, setSelectedMonth] = useState(new Date(Date.now()).getMonth());
    const [productList, setProductList] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalProduction, setTotalProduction] = useState(0);
    const [totalSales, setTotalSales] = useState(0);

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const addProductionHandler = (props) => {
        const modal = document.getElementById("AddProductionModal");
        modal.style.display = "block";
    }

    const addSalesHandler = (props) => {
        const modal = document.getElementById("AddSalesModal");
        modal.style.display = "block";
    }

    useEffect(() => {
        // console.log(selectedMonth);
        getMonthlyProduction(selectedMonth).then((data) => {
            setProductList(data);
        });
        getNumberOfProducts().then((data) => {
            setTotalProducts(data);
        });
        getToalProductionOfMonth(selectedMonth).then((data) => {
            setTotalProduction(data);
        })
        getToalSalesOfMonth(selectedMonth).then((data) => {
            setTotalSales(data)
        })
    }, [selectedMonth])

    return (
        <Layout>
            <AddProduction />
            <AddSales />
            <div className={classes.productionReportsPage}>
                <div className={classes.productionReportsAddData}>
                <div className={classes.productionReportsAdd}>
                    <button className={classes.productionReportsAddSalesbtn} onClick={addSalesHandler}>
                        <p className={classes.productionReportsAddText}>Add daily Sales</p>
                        <img className={classes.productionReportsAddicon} src={production} />

                    </button>
                </div>
                <div className={classes.productionReportsAdd}>
                    <button className={classes.productionReportsAddProductionbtn} onClick={addProductionHandler}>
                        <p className={classes.productionReportsAddText}>Add daily Production</p>
                        <img className={classes.productionReportsAddicon} src={sales} />
                    </button>
                </div>
                </div>
                <div ref={componentRef}>
                    <div className={classes.productionReportsDetails}>
                        <div className={classes.productionReportStats + " " + classes.productionReportStatsRight}>
                            <p className={classes.productionReportStatsHeading}>Number of products available</p>
                            <p className={classes.productionReportStatsNumber}>{totalProducts}</p>
                            <p className={classes.productionReportStatsMonth}>{options[selectedMonth].label}</p>
                        </div>
                        <div className={classes.productionReportStats + " " + classes.productionReportStatsMiddle}>
                            <p className={classes.productionReportStatsHeading}>Total production</p>
                            <p className={classes.productionReportStatsNumber}>{`${totalProduction} KG`}</p>
                            <p className={classes.productionReportStatsMonth}>{options[selectedMonth].label}</p>
                        </div>
                        <div className={classes.productionReportStats + " " + classes.productionReportStatsLeft}>
                            <p className={classes.productionReportStatsHeading}>Total sales</p>
                            <p className={classes.productionReportStatsNumber}>{`${totalSales} KG`}</p>
                            <p className={classes.productionReportStatsMonth}>{options[selectedMonth].label}</p>
                        </div>
                    </div>

                    <div className={classes.productionReportReportSec}>
                        <div className={classes.productionReportReportSecHeading}>
                            <Select className={classes.productionReportReportSecHeadingSelect} 
                                options={options}
                                value={options[selectedMonth]}
                                onChange={(e) => setSelectedMonth(e.value)}>
                            </Select>
                            <button className={classes.productionReportReportSecHeadingPrint}  onClick={handlePrint}>
                                <p className={classes.productionReportReportSecHeadingPrintP}>Print Monthly Report</p>
                            </button>
                        </div>
                        <div className={classes.productionReportReportSecTable}>
                            <table className={classes.productionReportTable}>
                                <tr className={classes.productionReportTableHeadingRow}>
                                    <div className={classes.productionReportTableName}>
                                        <th>Name</th>
                                    </div>
                                    <div  className={classes.productionReportTableProduction}>
                                        <th>Production</th>
                                    </div>
                                    <div  className={classes.productionReportTableSales}>
                                    <th>Sales</th>
                                    </div>
                                    <div className={classes.productionReportTableStocks}>
                                        <th>In Stocks</th>
                                    </div>
                                    <div  className={classes.productionReportTableAvailability}>
                                        <th>Availability</th>
                                    </div>  
                                </tr>

                                {productList.map((product) => (
                                <tr className={classes.productionReportTableRow}>
                                    <div className={classes.productionReportTableName}>
                                        <td>{product.productName}</td>
                                    </div>
                                    <div  className={classes.productionReportTableProduction}>
                                        <td>{`${product.production} KG`}</td>
                                    </div>
                                    <div  className={classes.productionReportTableSales}>
                                        <td>{`${product.sold} KG`}</td>
                                    </div>
                                    <div className={classes.productionReportTableStocks}>
                                        <td>{`${product.production - product.sold} KG`}</td>
                                    </div>
                                    <div  className={classes.productionReportTableAvailability}>
                                        <ProductionAvailability value={product.production - product.sold}/>
                                    </div> 
                                    
                                </tr>
                                ))}
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    );
};

export default ProductionReports;
