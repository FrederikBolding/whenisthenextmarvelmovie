import React, { Component } from 'react';
import './App.css';
import Countdown from './Countdown.js';

function Page(props) {
  if (props.state !== null) {
    return (
      <div className="App">
        <header className="App-header" style={{ backgroundImage: `url(http://image.tmdb.org/t/p/original/${props.state.bg})`, backgroundSize: "cover", }}>
          <h1>{props.state.title}</h1>
          <Countdown date={props.state.date}></Countdown>
        </header>
      </div >);
  } else {
    return (
      <div className="App" style={{}}>
        <header className="App-header">
          <h1>Loading</h1>
        </header>
      </div>
    );
  }
}

class App extends Component {

  componentDidMount() {
    var self = this;
    fetch("api/nextmovie", {
    }).then(function (response) {
      return response.json();
    }).then(function(movie){
      self.setState({ title: movie.title, date: movie.release_date, bg: movie.backdrop_path });
    });
  }

  render() {
    return (
      <Page state={this.state}></Page>
    );
  }
}

export default App;
