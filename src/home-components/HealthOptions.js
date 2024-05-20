import React, { useContext } from "react";
import HealthOptionCheckbox from "./Checkbox";
import { APIContext } from "../contexts/APIContext";
import { healthOptions } from "../helpers/constants";
import "../styles/HealthOptions.css";

/**
 * HealthOptions component that renders a list of health option checkboxes.
 * 
 * @component
 * @example
 * return (
 *   <HealthOptions />
 * )
 */
function HealthOptions(){
    const { handleCheckboxChange, selectedOptions } = useContext(APIContext);

    return(
        <div className="health-options">
            {healthOptions.map(option => (
                <HealthOptionCheckbox
                    key={option}
                    label={option}
                    onChange={e => handleCheckboxChange(option, e.target.checked)}
                    checked={selectedOptions.includes(option)}
                />
            ))}
        </div>
    )
}

export default HealthOptions;