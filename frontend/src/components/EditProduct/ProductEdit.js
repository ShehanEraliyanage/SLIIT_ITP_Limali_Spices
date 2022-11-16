import classes from './ProductEdit.module.css';

import react, {useState, useEffect} from 'react';

const ProductEdit = (props) => {

    const [input, setInput] = useState(props.value);

    const inputChangeHandler = (event) => {
        // props.onChange(event.target.value);
        setInput(event.target.value);
        props.OnEditProduct(event.target.value);
    }

    return(
        <div className={classes.productInfoRow}>
            <div className={classes.productInfoKey}>
                <p className={classes.para}>{props.title}</p>
            </div>
            <div className={classes.productInfoValue}>
                <div className={classes.productInfoInput}>
                    <input type="text" value={input} className={classes.productInput} onChange={inputChangeHandler} />
                </div>
            </div>
        </div>
    )
}

export default ProductEdit;