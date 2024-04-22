import React from "react";


function HealthOptionCheckbox({ label, checked, onChange }){

    return (
        <div>
            <input
                type="checkbox"
                id={label}
                name={label}
                checked={checked}
                onChange={onChange}
            />
            <label htmlFor={label}>{label.replace('-', ' ')}</label>
        </div>
    )
}

export default HealthOptionCheckbox;