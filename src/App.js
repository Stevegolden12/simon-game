import React, { useState } from 'react';

import './App.css'

class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      levelNum: 1,
    }
    this.setLevel = this.setLevel.bind(this);
  }



  setLevel(){
    if (this.state.levelNum === 4) {
      this.setState({
        levelNum: 1,
      })
    } else {
      this.setState({
        levelNum: this.state.levelNum + 1,
      })
    }
  }

  render() {
    const centerStyle = { margin: 'auto' };
    return (
      <div className="App">
        <h1>Simon Game</h1>
        <div id="simonWrapper">
          <section className="simon" style={centerStyle}>
            <div className="pad red" ></div>
            <div className="pad green" ></div>
            <div className="pad yellow" ></div>
            <div className="pad blue" ></div>
            <div className="display" id="display">
              <div id="simonName">simon</div>
              <button id="simonLevel" onClick={this.setLevel}>level {this.state.levelNum}</button>
              <div id="startButton">start</div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}



export default App;
