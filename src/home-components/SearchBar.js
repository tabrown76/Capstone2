import React, { useContext, useState, useRef, useEffect } from "react";
import { Context } from "../contexts/Context";
import { APIContext } from "../contexts/APIContext";
import { Button } from "reactstrap";
import { cuisineTypeOptions } from '../helpers/constants';
import "../styles/SearchBar.css";

/**
 * SearchBar component that provides a search input for querying recipes.
 * It includes options for filtering by cuisine type and displays recent searches.
 * 
 * @component
 * @example
 * return (
 *   <SearchBar />
 * )
 */
const SearchBar = () => {
    const {user} = useContext(Context);
    const {queryTerm, setQueryTerm, apiCall} = useContext(APIContext);
    const [cuisineType, setCuisineType] = useState('');
    const [recentSearches, setRecentSearches] = useState([]);
    const [showRecentSearches, setShowRecentSearches] = useState(false);
    const containerRef = useRef(null);
    const inputRef = useRef(null);

    /**
   * Handles changes to the cuisine type filter.
   * 
   * @param {Object} e - The event object.
   */
    const handleFilterChange = (e) => {
        setCuisineType(e.target.value);
    }

    /**
   * Handles changes to the search input field.
   * 
   * @param {Object} e - The event object.
   */
    const handleInputChange = (e) => {
        setQueryTerm(e.target.value);
    }

    /**
   * Handles keydown events for the search input field.
   * Initiates search on "Enter" key press.
   * 
   * @param {Object} e - The event object.
   */
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    }

    /**
   * Handles search submission.
   * Initiates an API call and updates recent searches.
   */
    const handleSubmit = () => {
        apiCall(cuisineType);
        updateRecentSearches(queryTerm);
        setShowRecentSearches(false);
        clearInputFocus();
    }

    /**
   * Handles clicks on recent search items.
   * 
   * @param {string} search - The search term clicked.
   */
    const handleRecentSearchClick = (search) => {
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

    /**
   * Clears the focus from the input field.
   */
    const clearInputFocus = () => {
        inputRef.current.blur();
    }
    
    useEffect(() => {
        if (!user) {
          setCuisineType("");
        }
    }, [user]);
    
    /**
   * Updates the list of recent searches.
   * 
   * @param {string} searchTerm - The search term to update.
   */
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
            {user?.firstName && <select onChange={handleFilterChange} 
                value={cuisineType} 
                className="filter-dropdown" 
                aria-label="Select Cuisine Type">
                    <option value="">All</option>
                    {cuisineTypeOptions.map((option, index) => <option key={index} value={option}>{option}</option>)}
            </select>}
            <div className="input-container">
                <input
                    ref={inputRef}
                    className={`search-input ${!user?.firstName ? 'no-user' : ''}`}
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