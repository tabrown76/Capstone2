import React, { useContext } from "react";
import { Context } from "../Context";
import { Button } from "reactstrap";
import "../styles/SearchBar.css";

const SearchBar = () => {
    const {queryTerm, setQueryTerm, apiCall} = useContext(Context);


    const handleInputChange = (e) => {
        setQueryTerm(e.target.value);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            apiCall();
        }
    }

    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Search..."
                value={queryTerm}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
            />
            <Button className="Button" onClick={apiCall}>Find Recipe!</Button>  
        </div>
    )
}

export default SearchBar;