/** @format */

import React from "react";
import ItemListElement from "../item-list-element";
const ItemList = ({ items, onItemDone, onItemImportant, onItemDelete }) => {
    const list = items.map(el => {
        return (
            <li className="list-group-item d-flex" key={el.id}>
                <ItemListElement
                    item={el}
                    onItemImportant={onItemImportant}
                    onItemDone={onItemDone}
                    onItemDelete={onItemDelete}
                />
            </li>
        );
    });
    return <ul className="list-group">{list}</ul>;
};

export default ItemList;
