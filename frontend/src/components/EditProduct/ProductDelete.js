import classes from './ProductDelete.module.css'

const ProductDelete = (props) => {

    const deleteButtonHandler = () => {
        props.onDeleteProduct(props.id);
    }

    return (
        <div className={classes.productEditRow}>
            <button className={classes.productDeleteButton} onClick={deleteButtonHandler}>Delete</button>
        </div>
    )
}

export default ProductDelete;
