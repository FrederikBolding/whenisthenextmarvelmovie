import React, { Component } from 'react';
import './App.css';
import Countdown from './Countdown.js';
import MadeWithLove from './MadeWithLove.js'

function Page(props) {
  if (props.state !== null) {
    return (
      <div className="App" style={{ backgroundImage: `url(http://image.tmdb.org/t/p/original/${props.state.bg})`, backgroundSize: "cover", }}>
        <header className="App-header">
          <h1>{props.state.title}</h1>
          <Countdown date={props.state.date}></Countdown>
          <MadeWithLove by="Frederik Bolding" link="https://frederik.bolding.com" />
        </header>
      </div >);
  } else {
    return (
      <div className="App" style={{}}>
        <header className="App-header">
          <h1>Loading</h1>
          <MadeWithLove by="Frederik Bolding" link="https://frederik.bolding.com" />
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
