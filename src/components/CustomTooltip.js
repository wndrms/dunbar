import React from "react";

const CustomTooltip = ({active, payload, label}) => {
    if(active) {
        return(
            <div className="pop value">
                <p>{`${label} : ${payload[0].value}`}</p>
            </div>
        );
    }
    return null;
}

export default CustomTooltip;