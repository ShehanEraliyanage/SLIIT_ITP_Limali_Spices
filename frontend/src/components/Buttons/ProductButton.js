import classes from './ProductButton.module.css';

const Button = props => {
    return (
      <button type={props.type} className={classes.buttons} onClick={props.onClick}>
        {props.children}
      </button>
    );
  };
  
  export default Button;