import React from "react";
import { format } from "date-fns";

const CustomTooltip = ({active, payload, label}) => {
    if(active && payload) {
        const date = format(new Date(label), "MMMdd");
        return(
            <div className="pop value">
                <p>{`${date} : ${payload[0].value}`}</p>
            </div>
        );
    }
    return null;
}

export default CustomTooltip;