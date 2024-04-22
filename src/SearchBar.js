import React, { useContext, useState } from "react";
import { Context } from "./Context";
import { Button } from "reactstrap";
import { cuisineTypeOptions } from './helpers/constants';
import "./styles/SearchBar.css";

const SearchBar = () => {
    const {queryTerm, setQueryTerm, apiCall, user} = useContext(Context);
    const [cuisineType, setCuisineType] = useState('');
    const [recentSearches, setRecentSearches] = useState([]);
    const [showRecentSearches, setShowRecentSearches] = useState(false);

    const handleFilterChange = (e) => {
        setCuisineType(e.target.value);
    }

    const handleInputChange = (e) => {
        setQueryTerm(e.target.value);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            apiCall(cuisineType);
            updateRecentSearches(queryTerm);
            setShowRecentSearches(false);
        }
    }

    const handleRecentSearchClick = (search) => {
        console.log('Recent search clicked:', search);
        setQueryTerm(search);
        setShowRecentSearches(false);
    };
    

    const updateRecentSearches = (searchTerm) => {
        setRecentSearches(prevSearches => {
            const updatedSearches = [...prevSearches];
            if (!updatedSearches.includes(searchTerm)) {
                if (updatedSearches.length >= 5) {
                    updatedSearches.shift();
                }
                updatedSearches.push(searchTerm);
            }
            return updatedSearches;
        })
    }

    return (
        <div className="search-container">
            {user?.name && <select onChange={handleFilterChange} 
                value={cuisineType} 
                className="filter-dropdown" 
                aria-label="Select Cuisine Type">
                    <option value="">All</option>
                    {cuisineTypeOptions.map((option, index) => <option key={index} value={option}>{option}</option>)}
            </select>}
            <div className="input-container">
                <input
                    className={`search-input ${!user?.name ? 'no-user' : ''}`}
                    type="text"
                    placeholder="Search..."
                    value={queryTerm}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setShowRecentSearches(true)}
                />
                {showRecentSearches && (
                    <ul className="recent-searches">
                        {recentSearches.map((search, index) => (
                            <li key={index} onClick={() => handleRecentSearchClick(search)}>
                                {search}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <Button className="Button" onClick={() => apiCall(cuisineType)}>Find Recipe!</Button>  
        </div>
    )
}

export default SearchBar;