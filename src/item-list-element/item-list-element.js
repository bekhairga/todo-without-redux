/** @format */

import React from "react";
import "./item-list-element.css";
class ItemListElement extends React.Component {
    render() {
        const {
            item: { label, important, done, id },
            onItemImportant,
            onItemDone,
            onItemDelete
        } = this.props;
        let classList = "list-element";
        if (important) {
            classList += " important";
        }
        if (done) {
            classList += " done";
        }
        return (
            <span className="todo-label">
                <span className={classList} onClick={() => onItemDone(id)}>
                    {label}
                </span>

                <button
                    className="btn btn-outline-danger btn-sm float-right btn-todo"
                    onClick={() => onItemDelete(id)}
                >
                    <i className="fa fa-trash-o" aria-hidden="true"></i>
                </button>
                <button
                    className="btn btn-outline-success btn-sm float-right btn-todo"
                    onClick={() => onItemImportant(id)}
                >
                    <i className="fa fa-lock" aria-hidden="true"></i>
                </button>
            </span>
        );
    }
}
export default ItemListElement;
