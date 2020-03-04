/** @format */

import React from "react";
import "./app-header.css";
const AppHeader = ({ done, left }) => {
    return (
        <div className="d-flex todo-header justify-content-between align-items-end">
            <h1 className="todo-title"> Todo List </h1>
            <h2 className="todo-stats">
                Done {done}, left {left}
            </h2>
        </div>
    );
};
export default AppHeader;
