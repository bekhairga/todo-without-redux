/** @format */

import React from "react";
import Buttons from "../item-filter-buttons";
import "./search-panel.css";
const SearchPanel = ({filter, onFilterChange, onSearchChange}) => {
    return (
        <div className="d-flex search">
            <input type="text" className="form-control search-form" onChange = {e => onSearchChange(e.target.value)}/>
            <Buttons filter={filter} onFilterChange = {onFilterChange}/>
        </div>
    );
};
export default SearchPanel;
