import {useState, useEffect} from 'react';


const EditEmployeeForm = (props) => {


    const name = props.value;

    const [input, setInput] = useState(name)


    const inputChangeHandler = (event) => {
        setInput(event.target.value);

        props.onSave(event.target.value); 
    }

    useEffect(() => { 
        setInput(props.value);

    }, [props.value] )


    return (
        <div className="from-group">

            <label htmlFor="name">{props.title} </label>
            <input type="text" className="form-control" id={props.title} value={input} onChange={inputChangeHandler} />
        </div>
    )
}

export default EditEmployeeForm;