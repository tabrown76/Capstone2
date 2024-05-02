import React, { useContext, useState, useRef, useEffect } from "react";
import { Context } from "./Context";
import { Button } from "reactstrap";
import { cuisineTypeOptions } from './helpers/constants';
import "./styles/SearchBar.css";

const SearchBar = () => {
    const {queryTerm, setQueryTerm, apiCall, user} = useContext(Context);
    const [cuisineType, setCuisineType] = useState('');
    const [recentSearches, setRecentSearches] = useState([]);
    const [showRecentSearches, setShowRecentSearches] = useState(false);
    const containerRef = useRef(null);
    const inputRef = useRef(null);

    const handleFilterChange = (e) => {
        setCuisineType(e.target.value);
    }

    const handleInputChange = (e) => {
        setQueryTerm(e.target.value);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    }

    const handleSubmit = () => {
        apiCall(cuisineType);
        updateRecentSearches(queryTerm);
        setShowRecentSearches(false);
        clearInputFocus();
    }

    const handleRecentSearchClick = (search) => {
        console.log('Recent search clicked:', search);
        setQueryTerm(search);
        setShowRecentSearches(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setShowRecentSearches(false);
            }
        };
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [containerRef]);

    const clearInputFocus = () => {
        inputRef.current.blur();
    }
    
    useEffect(() => {
        if (!user) {
          setCuisineType("");
        }
    }, [user]);
      
    const updateRecentSearches = (searchTerm) => {
        setRecentSearches(prevSearches => {
            const updatedSearches = [...prevSearches];
            if (!updatedSearches.includes(searchTerm)) {
                if (updatedSearches.length >= 5) {
                    updatedSearches.pop();
                }
                updatedSearches.unshift(searchTerm);
            }
            return updatedSearches;
        })
    }

    return (
        <div ref={containerRef} className="search-container">
            {user?.name && <select onChange={handleFilterChange} 
                value={cuisineType} 
                className="filter-dropdown" 
                aria-label="Select Cuisine Type">
                    <option value="">All</option>
                    {cuisineTypeOptions.map((option, index) => <option key={index} value={option}>{option}</option>)}
            </select>}
            <div className="input-container">
                <input
                    ref={inputRef}
                    className={`search-input ${!user?.name ? 'no-user' : ''}`}
                    type="text"
                    placeholder="Search..."
                    value={queryTerm}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setShowRecentSearches(true)}
                />
                {showRecentSearches  && recentSearches.length > 0 && (
                    <ul className="recent-searches">
                        {recentSearches.map((search, index) => (
                            <li key={index} onClick={() => handleRecentSearchClick(search)}>
                                {search}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <Button className="Button" onClick={() => handleSubmit()}>Find Recipe!</Button>  
        </div>
    )
}

export default SearchBar;