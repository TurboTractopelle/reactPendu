import React, { Component } from "react";
import ReactDOM from "react-dom";
import Counter from "./Counter";

import "./styles.css";

const magie = "sciences";

class App extends Component {
  initSecret = () =>
    Object.entries(magie).reduce((acc, item) => {
      return [...acc, item[1]];
    }, []);

  secretVisible = () => {
    let longueur = magie.length;
    return Array(longueur + 1)
      .join("*")
      .split("");
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
      secretVisible,
      propose,
      letter,
      counter,
      counterClass
    } = this.state;

    //console.log(secretVisible);

    return (
      <div>
        <div>secret : {secretVisible.map(item => item)}</div>
        <div className={counterClass}>essais : {counter}</div>

        <input type="text" onChange={this.handleLetter} value={letter} />

        <div>lettres proposées : {propose.map(item => item)}</div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
