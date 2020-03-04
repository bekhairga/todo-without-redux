/** @format */

import React from "react";
import "./item-filter-buttons.css";
const Buttons = ({filter, onFilterChange}) => {
    let classNames;
    const buttons = filter.map(el => {
        if(el.active){
            classNames = 'btn btn-primary';
        }
        else{
            classNames = 'btn btn-outline-secondary';
        }
        return (
            <button className={classNames} 
                onClick = {() => onFilterChange(el.id)} 
                key={el.desc}>
                {el.label}
            </button>
        )
    })

    return (
        <div className="d-flex">
            {buttons}
        </div>
    );
};
export default Buttons;
