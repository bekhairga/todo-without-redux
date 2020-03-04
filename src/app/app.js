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

    onItemImportant = itemId => {
        const index = this.state.todos.findIndex(el => el.id === itemId);
        const newElement = this.state.todos[index];
        newElement.important = !newElement.important;
        const newTodos = [
            ...this.state.todos.slice(0, index),
            newElement,
            ...this.state.todos.slice(index + 1)
        ];
        this.setState({ todos: newTodos });
    };
    onItemDone = itemId => {
        const index = this.state.todos.findIndex(el => el.id === itemId);
        const newElement = this.state.todos[index];
        newElement.done = !newElement.done;
        const newTodos = [
            ...this.state.todos.slice(0, index),
            newElement,
            ...this.state.todos.slice(index + 1)
        ];
        this.setState({ todos: newTodos });
    };

    onItemDelete = itemId => {
        const index = this.state.todos.findIndex(el => el.id === itemId);

        const newTodos = [
            ...this.state.todos.slice(0, index),
            ...this.state.todos.slice(index + 1)
        ];
        this.setState({ todos: newTodos });
    };
    createTodo = todoLabel => {
        return {
            label: todoLabel,
            done: false,
            important: false,
            id: uuid()
        };
    };
    onItemAdded = todo => {
        const newTodo = this.createTodo(todo);
        const newList = [...this.state.todos, newTodo];
        this.setState({ todos: newList });
    };
    onFilterChange = (id) => {
        const {filteredElements} = this.state;
        const newElements = filteredElements.map(el => el);
        newElements.forEach(el => el.active =false);
        const idx = filteredElements.findIndex(el => el.id === id);
        newElements[idx].active = true;
        this.setState(({filteredElements})=> {
            return {
                filteredElements: newElements
            }
        })
    }
    onSearchChange = (val) => {
        this.setState(({searching}) => ({
            searching: val
        }))
    }

    render() {
        const { todos, filteredElements, searching} = this.state;
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
       
        
        let done = todos.filter(el => el.done).length;
        let left = todos.length - done;
        return (
            <div className="app">
                <AppHeader done={done} left={left} />
                <SearchPanel filter = {filteredElements} onFilterChange = {this.onFilterChange} onSearchChange = {this.onSearchChange}/>
                <ItemList
                    items={searching === '' ? itemsToShow :
                    itemsToShow
                    .filter(el => el.label.toLowerCase().indexOf(searching.toLowerCase()) > -1)}
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
