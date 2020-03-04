/** @format */

import React from "react";
import Buttons from "../item-filter-buttons";
import "./search-panel.css";
const SearchPanel = () => {
    return (
        <div className="d-flex search">
            <input type="text" className="form-control search-form" />
            <Buttons />
        </div>
    );
};
export default SearchPanel;
