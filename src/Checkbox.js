import React from "react";


function HealthOptionCheckbox({ label, checked, onChange }){

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