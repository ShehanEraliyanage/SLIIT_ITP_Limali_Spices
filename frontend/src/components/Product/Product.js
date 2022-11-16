const ProductDelete = (props) => {
    console.log(props.list);
    return (
        <div>
            {props.list.map((item) => (
                <h1>hello</h1>
            ))}
            <h1>Last</h1>
        </div>
    );
};

export default ProductDelete;
