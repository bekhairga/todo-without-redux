/** @format */

/** @format */

import React from "react";
import AddPanel from "../add-panel";
import AppHeader from "../app-header";
import ItemList from "../item-list";
import "./app.css";
import uuid from "react-uuid";
import SearchPanel from "../search-panel";
import { render } from "@testing-library/react";

class App extends React.Component {
    state = {
        todos: [
            { label: "Learn React", important: false, done: true, id: uuid() },
            { label: "Learn Redux", important: false, done: false, id: uuid() },
            { label: "Improve knowledge", important: true, done: false, id: uuid() }
        ], 
        filteredElements: [
            {label: "All", id: 1, desc : "all",  active: true},
            {label: "Done",id:2, desc : "done", active: false},
            {label: "Left",id:3, desc : "left",active: false},
        ],
        searching: ''
    };

    createTodo = todoLabel => {
        return {
            label: todoLabel,
            done: false,
            important: false,
            id: uuid()
        };
    };
    stateManagement = (elements,itemId, field) => {
        const index = this.state[elements].findIndex(el => el.id === itemId);
        let newField;
        if(field !=='delete' && field !== 'filter'){
            const newElement = this.state[elements][index];
            newElement[field] = !newElement[field];
            newField = [
                ...this.state[elements].slice(0, index),
                newElement,
                ...this.state[elements].slice(index + 1)
            ];
        }
        if(field === 'delete'){
            newField = [
                ...this.state[elements].slice(0, index),
                ...this.state[elements].slice(index + 1)
            ];
        }
        if(field ==='filter'){
            newField = this.state[elements].map(el => el);
            newField.forEach(el => el.active =false);
            newField[index].active = true;
        }
        
        this.setState({ [elements]: newField });
    }


    onItemImportant = itemId => {
        this.stateManagement('todos',itemId, "important");
    };


    onItemDone = itemId => {
        this.stateManagement('todos',itemId, 'done');
    };

    onItemDelete = itemId => {
       this.stateManagement('todos',itemId, 'delete');
    };


    onItemAdded = todo => {
        const newTodo = this.createTodo(todo);
        const newList = [...this.state.todos, newTodo];
        this.setState({ todos: newList });
    };


    onFilterChange = (id) => {
        this.stateManagement('filteredElements', id, 'filter')
    }

    onSearchChange = (val) => {
        this.setState(({searching}) => ({
            searching: val
        }))
    }
    filteringElements = (todos, filteredElements) => {
        const activeFilter = filteredElements.find(el=> el.active === true).desc;
        let itemsToShow;

        if(activeFilter === 'done'){
            itemsToShow = todos.filter(el => el.done === true);
        }
        if(activeFilter === 'left'){
            itemsToShow = todos.filter(el => el.done === false);
        }
        if(activeFilter === 'all'){
            itemsToShow = todos;
        }
        return itemsToShow
    }
    searchingMechanism = (items,searching) => {
        return searching === '' ? items : items.filter(el => el.label.toLowerCase().indexOf(searching.toLowerCase()) > -1);
    }
    render() {
        const { todos, filteredElements, searching} = this.state;
        const itemsToShow = this.filteringElements(todos, filteredElements);
        let done = todos.filter(el => el.done).length;
        let left = todos.length - done;
        return (
            <div className="app">
                <AppHeader done={done} left={left} />
                <SearchPanel filter = {filteredElements} onFilterChange = {this.onFilterChange} onSearchChange = {this.onSearchChange}/>
                <ItemList
                    items={this.searchingMechanism(itemsToShow, searching)}
                    onItemDone={this.onItemDone}
                    onItemImportant={this.onItemImportant}
                    onItemDelete={this.onItemDelete}
                />
                <AddPanel onItemAdded={this.onItemAdded} />
            </div>
        );
    }
}
export default App;
