import React, { Component } from "react";
import ReactDOM from "react-dom";
import Counter from "./Counter";

import "./styles.css";

class App extends Component {
  initSecret = () =>
    Object.entries("abcda").reduce((acc, item) => {
      return [...acc, item[1]];
    }, []);

  secretVisible = () => {
    let longueur = "abcda".length;
    return ["*", "*", "*", "*"];
  };

  state = {
    counter: 0,
    input: "",
    propose: [],
    secret: this.initSecret(),
    secretVisible: this.secretVisible(),
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

  handleResolve = valeur => {
    let sortie = [];
    this.state.secret.find((item, i) => {
      if (item === valeur) {
        sortie = [...sortie, i];
      }
    });

    sortie.length > 0 &&
      sortie.map(item => {
        this.setState(prevState => {
          const secretVisible = [].concat(prevState.secretVisible);
          secretVisible[item] = prevState.secret[item];
          const state = { ...prevState, secretVisible };
          return state;
        });
      });
  };

  handleLetter = e => {
    const valeur = e.target.value;
    this.handleCounter();
    this.reducePropose(valeur);
    this.handleResolve(valeur);
  };

  render() {
    const {
      refus,
      secret,
      secretVisible,
      propose,
      letter,
      counter,
      counterClass
    } = this.state;

    //console.log(secretVisible);

    return (
      <div>
        <div>secret: {secret}</div>
        <div>secretVisible: {secretVisible.map(item => item)}</div>
        <div className={counterClass}>{counter}</div>

        <input type="text" onChange={this.handleLetter} value={letter} />

        <div>lettres proposées : {propose.map(item => item)}</div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
