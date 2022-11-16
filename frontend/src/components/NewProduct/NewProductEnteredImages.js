import classes from "./NewProductForm.module.css";

import thumbnail from '../../image/thumbnail.png';
import deleteImage from '../../image/bin.png';

const NewProductEnteredImages = (props) => {

    const deleteHandler = () => {
        props.onDelete(props.image);
    }

    if (!props.image.name) {
        props.image.name = "New Image " + (Math.floor(Math.random() * 100) + 1).toString();
    }

    return (
        <div className={classes.imageUploadedImagesRow}>
            <div className={classes.imageUploadedImagesPreview}>
                <img src={thumbnail} className={classes.imageUploadedImagesPreviewImage}></img>
            </div>
            <div className={classes.imageUploadedImagesName}>
                <p className={classes.imageUploadedImagesNameText}>{props.image.name}</p>
            </div>
            <div className={classes.imageUploadedImagesDelete}>
                <button onClick={deleteHandler}>
                <img src={deleteImage} className={classes.imageUploadedImagesDeleteImage}></img>
                </button>
            </div>
        </div>
    )
};

export default NewProductEnteredImages;