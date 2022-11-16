import classes from './ProductDetails.module.css';

import react, {useState} from 'react';

import editImage from '../../image/edit.png';

const ProductDetails = (props) => {

    const [edit, setEdit] = useState(false);

    const editHandler = () => {
        setEdit(true);
        props.onEdit();
    }

    return(
        <div className={classes.productInfoRow}>
            <div className={classes.productInfoKey}>
                <p className={classes.para}>{props.title}</p>
            </div>
            <div className={classes.productInfoValue}>
                <p className={classes.para}>{props.value}</p>
            </div>
            {props.edit && (
                <div className={classes.productInfoValueEdit}>
                    <img src={editImage} className={classes.productInfoValueEditImage} onClick={editHandler} />
                </div>
            )}
        </div>
    )
}

export default ProductDetails