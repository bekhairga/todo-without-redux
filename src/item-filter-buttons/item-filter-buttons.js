/** @format */

import React from "react";
import "./item-filter-buttons.css";
const Buttons = () => {
    return (
        <div className="d-flex">
            <button className="btn btn-outline-secondary">All</button>
            <button className="btn btn-outline-secondary">Done</button>
            <button className="btn btn-outline-secondary">Left</button>
        </div>
    );
};
export default Buttons;
