import classes from "./AddProduction.module.css";

import {useState, useEffect} from 'react';
import Select from 'react-select';
import axios from 'axios';
import swal from 'sweetalert';

import addIcon from '../../image/addIcon.png';
import removeIcon from '../../image/remove.png';

import {getAllProductsNames} from '../../controllers/product'

const AddProduction = (props) => {

    let count = 1;

    const [numProducts, setNumProducts] = useState([{name: count, value: 0}]);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        getAllProductsNames().then((result) => {
            setOptions(result)
        });
    }, [])

    const addProductHandler = (props) => {
        count++;
        setNumProducts([...numProducts, {name: count, value: 0, productName: ""}]);
    }

    const addNumHandler = (e, index) => {
        numProducts[e].value = index.target.value;
        console.log(numProducts);
    }

    const addNameHandler = (e, index) => {
        numProducts[e].name = index.value;
        options.map((option) => {
            if(option.value == index.value) {
                numProducts[e].productName = option.label;
            }
        })
        console.log(numProducts);
    }

    const itemRemoveHandler = (e, index) => {
        setNumProducts(numProducts.filter(function(value, index, arr){ 
            return index != e;
        }))
        // console.log(numProducts);
    }

    const cancelbtnHandler = () => {
        setNumProducts([{name: count, value: 0}])
        const modal = document.getElementById("AddProductionModal");
        modal.style.display = "none";
    }

    const submitbtnHandler = () => {
        axios.post("http://localhost:8090/product/dailyProduction", numProducts).then((response) => {
            swal({
                title: "Success!",
                text: "Daily production submitted successfully",
                icon: 'success',
                timer: 2000,
                button: false,
              })
            window.location.reload(true);
        }).catch((error) => {
            console.log('error: ');
            console.log(error);
            swal({
                title: "Error!",
                text: "Couldn't add the daily production. Please try again",
                icon: 'error',
                timer: 2000,
                button: false
            });
            window.location.reload(true);
        })
        

    }

    return (
        <div className={classes.AddProductionModal} id="AddProductionModal">
            <div className={classes.AddProductionModalContent}>
                <h3 className={classes.AddProductionModalContentH3}>Add Daily Production</h3>
                <div className={classes.AddProductionModalContentAddPro}>
                    <button className={classes.AddProductionModalContentAddProbtn} onClick={addProductHandler}>
                        <img src={addIcon} className={classes.AddProductionModalContentAddProbtnIcon}></img>
                        Add Product
                    </button>
                </div>
                <div className={classes.AddProductionModalContentAllPRoducts}>
                    {numProducts.map((product, index) => (
                    <div className={classes.AddProductionModalContentPRoducts} id={"product" + index}>
                        <Select className={classes.AddProductionModalContentSelect} 
                            options={options} id={"select" + index} 
                            onChange={addNameHandler.bind(this, index)}>
                        </Select>
                        <div className={classes.AddProductionModalContentNum}>
                            <input type="text" className={classes.AddProductionModalContentInput} 
                                id={index} onChange={addNumHandler.bind(this, index)}>
                            </input>
                            <p className={classes.AddProductionModalContentKg}>KG</p>
                        </div>
                        <div className={classes.AddProductionModalContentRemove}>
                            <img src={removeIcon} className={classes.AddProductionModalContentRemoveIcon} onClick={itemRemoveHandler.bind(this, index)}/>
                        </div>
                    </div>
                    ))}
                </div>
                <div className={classes.AddProductionModalContentButtons}>
                    <div className={classes.AddProductionModalContentCancel}>
                        <button className={classes.AddProductionModalContentCancelbtn} onClick={cancelbtnHandler.bind(this)}>Cancel</button>
                    </div>
                    <div className={classes.AddProductionModalContentSubmit}>
                        <button className={classes.AddProductionModalContentSubmitbtn} onClick={submitbtnHandler.bind(this)}>Submit</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AddProduction;