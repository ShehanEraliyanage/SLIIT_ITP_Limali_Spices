import {useState, useEffect} from 'react';

const EditCustomerForm = (props) => {

    // console.log(props.value);
    const name = props.value;

    const [input, setInput] = useState(name)
    // console.log(input);

    const inputChangeHandler = (event) => {
        setInput(event.target.value);
        
        props.onSave(event.target.value);
    }

    useEffect(() => { 
        setInput(props.value);
        // props.onSave(input);
    }, [props.value] )


    return (
        <div className="from-group">

            <label htmlFor="name">{props.title} </label>
            <input type="text" className="form-control" id={props.title} value={input} onChange={inputChangeHandler} />
        </div>
    )
}

export default EditCustomerForm;