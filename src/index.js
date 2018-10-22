import React, { Component } from "react";
import ReactDOM from "react-dom";
import Counter from "./Counter";

import "./styles.css";

const myArr = ["a", "a", "b", "b", "c", "z", "a"];

let test = myArr.reduce((acc, item) => {
  let flag = "";

  acc.find(accItem => {
    if (accItem === item) {
      return (flag = true);
    } else {
      return (flag = false);
    }
  });

  if (flag) {
    return acc;
  } else {
    return [...acc, item];
  }
}, []);

class App extends Component {
  state = {
    counter: 0,
    input: "",
    propose: [],
    secret: "abcd",
    letter: "",
    counterClass: "active"
  };

  handleCounter = () => {
    this.state.counter < 10
      ? this.setState(prevState => ({ counter: prevState.counter + 1 }))
      : this.setState(prevState => ({
          ...prevState,
          counterClass: "stopped",
          counter: "lost"
        }));
  };

  reducePropose = valeur => {
    this.setState(prevState => {
      let flag = false;
      prevState.propose.find(item => {
        if (item === valeur) {
          return (flag = true);
        }
      });
      if (flag === false) {
        return { propose: [...prevState.propose, valeur] };
      }
    });
  };

  handleLetter = e => {
    const valeur = e.target.value;
    this.setState({ letter: "" });
    this.handleCounter();
    this.reducePropose(valeur);
  };

  render() {
    const {
      refus,
      secret,
      propose,
      letter,
      counter,
      counterClass
    } = this.state;

    return (
      <div>
        <div>{secret}</div>
        <div className={counterClass}>{counter}</div>

        <input type="text" onChange={this.handleLetter} value={letter} />

        <div>lettres proposées : {propose.map(item => item)}</div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
