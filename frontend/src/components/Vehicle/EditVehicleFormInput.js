import {useState, useEffect} from 'react';

const EditVehicleForm = (props) => {

    const name = props.value;

    const [input, setInput] = useState(name)

    const inputChangeHandler = (event) => {
        setInput(event.target.value);
        props.onSave(input);
    }

    useEffect(() => { 
        setInput(props.value);
    }, [props.value] )


    return (
        <div className="input_item">
            <input type="text"   value={input} onChange={inputChangeHandler} />
        </div>
    )
}

export default EditVehicleForm;