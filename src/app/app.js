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
            { label: "Learn React", important: false, done: false, id: uuid() },
            { label: "Learn React", important: true, done: false, id: uuid() }
        ]
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
        console.log(newElement);
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

    render() {
        const { todos } = this.state;
        let done = todos.filter(el => el.done).length;
        let left = todos.length - done;
        return (
            <div className="app">
                <AppHeader done={done} left={left} />
                <SearchPanel />
                <ItemList
                    items={todos}
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
