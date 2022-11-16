import classes from './SearchProducts.module.css';
import search1 from '../../image/search.png';
import search2 from '../../image/search2.png';

import {useState, useRef, useEffect} from 'react';

const SearchProduct = (props) => {

    const [isSearching, setIsSerching] = useState(false);
    const [input, setInput] = useState("");

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    const searchBtnHandler = (props) => {
        setIsSerching(true)
    }

    const inputHandler = ( event) => {
        setInput(event.target.value)
        props.onSearch(event.target.value);
    }


    function useOutsideAlerter(ref) {
        useEffect(() => {
          /**
           * Alert if clicked on outside of element
           */
          function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
              props.onReset();
              setIsSerching(false);
            }
          }
          // Bind the event listener
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [ref]);
      }


    return (
        <div>
            { !isSearching ? (
                <div className={classes.productHeadingImage}>
                    <img src={search1} className={classes.productHeadingImageImg} onClick={searchBtnHandler}></img>
                </div>
            ) : (
                <form className={classes.productHeadingSearchBar}  ref={wrapperRef}>
                    <input className={classes.productHeadingSearchInput} type="text" onChange={inputHandler}></input>
                    <img src={search1} className={classes.productHeadingSearchBarImg} />
                </form>
            )}
        </div>
    )
}

export default SearchProduct;