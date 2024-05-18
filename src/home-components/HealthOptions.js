import React, { useContext } from "react";
import HealthOptionCheckbox from "./Checkbox";
import { APIContext } from "../contexts/APIContext";
import { healthOptions } from "../helpers/constants";
import "../styles/HealthOptions.css";

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