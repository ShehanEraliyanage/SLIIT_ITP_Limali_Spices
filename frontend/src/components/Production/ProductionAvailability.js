import classes from "./ProductionAvailability.module.css";

import {useState, useEffect} from 'react';

const Productionavailability = (props) => {

    const value = props.value;
    // console.log(value);
    // const [classname, setClassname] = useState("")
    // const [text , setText] = useState("");

    // if (value == 0) {
    //     setClassname("outOfStocks");
    //     setText("Out Of Stocks");
    // } else if (value < 10) {
    //     setClassname("stocksRunningLow");
    //     setText("Stocks Running Low");
    // } else {
    //     setClassname("available");
    //     setText("Available");;
    // }

    let classname = "";
    let text = "";
    if (value == 0) {
        classname = classes.outOfStocks;
        text = "Out Of Stocks"
    } else if (value < 10) {
        classname = classes.stocksRunningLow;
        text = "Stocks running low"
    } else {
        classname = classes.available;
        text = "Available";
    }

    return (
        <td className={classname}>{text}</td>
    )
}

export default Productionavailability;