import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      countries: [],
      message: ""
    };
  }
  componentDidMount() {
    const flagApi = "https://restcountries.eu/rest/v2/all";
    fetch(flagApi)
      .then(data => data.json())
      .then(data => this.setState({ countries: data }));
  }
  render() {
    let { countries } = this.state;
    let arr = [];
    let flag;
    if (countries[0] && countries.length > 0) {
      for (let i = 0; i < 4; i++) {
        arr.push(countries[Math.round(Math.random() * 250)]);
      }
      let random = Math.round(Math.random() * 4);
      flag = <img id={arr[random].name} src={arr[random].flag} width="500px" />;
    }

    let views = arr.map(country => (
      <button
        class="button"
        onClick={e => {
          if (e.target.textContent === flag.props.id) {
            this.setState({ message: "Nice..." });
          } else {
            this.setState({
              message: "Dumb... the correct answer was " + flag.props.id
            });
          }
        }}
      >
        {country.name}
      </button>
    ));

    return (
      <div className="App">
        <h1>{this.state.message}</h1>
        <div>{views}</div>
        {flag}
      </div>
    );
  }
}

export default App;
