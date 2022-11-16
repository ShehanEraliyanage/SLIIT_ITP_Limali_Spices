import classes from './ProductEditSubmit.module.css'

const ProductEditSubmit = (props) => {

    const cancelButtonHandler = () => {
        props.onCancel()
    }

    const editButtonHandler = () => {
        props.onUpdate(props.id, props.price, props.quantity, props.remarks, props.availability);
    }

    return (
        <div className={classes.productEditRow}>
            <button className={classes.productCancelButton} onClick={cancelButtonHandler}>Cancel</button>
            <button className={classes.productEditButton} onClick={editButtonHandler}>Edit</button>
        </div>
    )
}

export default ProductEditSubmit;