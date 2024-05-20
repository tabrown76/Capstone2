import React from "react";

/**
 * HealthOptionCheckbox component that renders a checkbox with a label.
 * The label is capitalized and hyphens are replaced with spaces.
 * 
 * @component
 * @param {Object} props - The props object.
 * @param {string} props.label - The label for the checkbox.
 * @param {boolean} props.checked - The checked state of the checkbox.
 * @param {function} props.onChange - The function to call when the checkbox state changes.
 * @example
 * return (
 *   <HealthOptionCheckbox label="gluten-free" checked={true} onChange={handleChange} />
 * )
 */
function HealthOptionCheckbox({ label, checked, onChange }){

    /**
   * Capitalizes the first letter of a string and replaces hyphens with spaces.
   * 
   * @param {string} str - The string to capitalize.
   * @returns {string} - The capitalized string.
   */
    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, ' ');
    }    

    return (
        <div>
            <input
                type="checkbox"
                id={label}
                name={label}
                checked={checked}
                onChange={onChange}
            />
            <label htmlFor={label}>{capitalize(label)}</label>
        </div>
    )
}

export default HealthOptionCheckbox;