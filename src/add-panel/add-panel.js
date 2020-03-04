/** @format */

import React from "react";
import "./add-panel.css";

class AddPanel extends React.Component {
    state = {
        label: ""
    };
    setValue = value => {
        console.log(value);
        this.setState({ label: value });
    };
    makeDefault = val => {
        this.setState({
            label: ""
        });
    };

    render() {
        const { label } = this.state;
        const { onItemAdded } = this.props;
        return (
            <form className="form-group d-flex add-panel">
                <input
                    type="text"
                    className="form-control input-control"
                    onChange={e => {
                        this.setValue(e.target.value);
                    }}
                    value={label}
                />
                <button
                    className="btn btn-primary btn-add"
                    onClick={e => {
                        e.preventDefault();
                        onItemAdded(label);
                        this.makeDefault();
                    }}
                >
                    Add
                </button>
            </form>
        );
    }
}
export default AddPanel;
