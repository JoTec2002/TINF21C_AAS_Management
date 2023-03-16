import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const DEFAULT_INPUT_TEXT = "";

class MyInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: DEFAULT_INPUT_TEXT,
        };
    }

    changeText(e) {
        let text = e.target.value;

        this.setState({
            text,
        });

       
        swal.setActionValue(text);
    }

    render() {
        return (
            <input
                value={this.state.text}
                onChange={this.changeText.bind(this)}
            />
        )
    }
}


let wrapper = document.createElement('div');
ReactDOM.render(<MyInput />, wrapper);
let el = wrapper.firstChild;

swal({
    text: "Email Addrese",
    content: el,
    buttons: {
        confirm: {
            value: DEFAULT_INPUT_TEXT,
        },
    },
})
    .then((value) => {
        swal(`You typed: ${value}`);
    });