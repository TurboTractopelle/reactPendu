import React, { Component } from "react";
import ReactDOM from "react-dom";
import Counter from "./Counter";

import "./styles.css";

class App extends Component {
  state = {
    counter: 0,
    input: "",
    propose: [],
    secret: "abcd",
    letter: "",
    active: true
  };

  handleCounter = () => {
    this.state.counter < 4
      ? this.setState(prevState => ({ counter: prevState.counter + 1 }))
      : this.handleFini();
  };

  handleFini = () => {
    this.setState({ active: false });
  };

  handleLetter = e => {
    const valeur = e.target.value;
    this.setState({ letter: "" });
    this.handleCounter();
    this.setState(prevState => ({ propose: [...prevState.propose, valeur] }));
    console.log(this.state.propose);
  };

  //handleFini =()=>console.log("FINI")

  render() {
    const { refus, secret, propose, letter, counter } = this.state;

    return (
      <div>
        <div>{secret}</div>
        <div>{counter}</div>

        <input type="text" onChange={this.handleLetter} value={letter} />

        <div>refus : {propose.map(item => item)}</div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
