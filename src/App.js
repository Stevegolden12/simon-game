import React, { useState } from 'react';
import ReactHowler from 'react-howler'
import blueButton from './sounds/blue_button.wav'
import greenButton from './sounds/green_button.wav'
import redButton from './sounds/red_button.wav'
import yellowButton from './sounds/yellow_button.wav'
import './App.css'

class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      levelNum: 1,
      levelFinish: [8, 14, 20, 31],
      levelAnswer: []
    }

    this.setLevel = this.setLevel.bind(this);
    this.playSound = this.playSound.bind(this);
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

  playSound() {
    console.log("RED BUTTON")

  }

  render() {
    const centerStyle = { margin: 'auto' };


    return (
      <div className="App">       
        <h1>Simon Game</h1>
        <div id="simonWrapper">
          <section className="simon" style={centerStyle}>
            <Pad color="red" />
            <Pad color="green" />
            <Pad color="yellow" />
            <Pad color="blue" />
            <div className="display" id="display">
              <div id="simonName">simon</div>
              <button id="simonLevel" onClick={this.playSound}>level {this.state.levelNum}</button>
              <div id="startButton">start</div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}


class Pad extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      isClicked: false
    }
    this.chkClick = this.chkClick.bind(this);
  }

  chkClick() {
    this.setState({
      isClicked: true
    })

  }

 

  render() {
    let colors = redButton;

    switch (this.props.color) {
      case 'blue':
        colors = blueButton;
        break;
      case 'green':
        colors = greenButton;
        break;
      case 'red':
        colors = redButton;
        break;
      case 'yellow':
        colors = yellowButton;
        break;
    }   

    return (
      <div className={`pad ${this.props.color}`} onClick={this.chkClick}>
        {this.state.isClicked === true && <ReactHowler src={`${colors}`} playing={true} />}
      </div>
    )
  }
}

export default App;
