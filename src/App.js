import React, { useState } from 'react';
import ReactHowler from 'react-howler'
import blueButton from './sounds/blue_button.wav'
import greenButton from './sounds/green_button.wav'
import redButton from './sounds/red_button.wav'
import yellowButton from './sounds/yellow_button.wav'
import './App.css'

class App extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      levelNum: 1,
      levelFinish: [8, 14, 20, 31],
      levelAnswer: [],
      stopSound: 1
    }

    this.setLevel = this.setLevel.bind(this);  
    this.startGame = this.startGame.bind(this);
    this.createAnswer = this.createAnswer.bind(this); 
 
  }


  

  startGame() {       
   
    console.log(this.state.levelAnswer) 

  }
   

 createAnswer() {
    console.log("levelNum: " + this.state.levelNum)    

   this.setState({
      levelAnswer: Array.from({ length: this.state.levelFinish[this.state.levelNum - 1] }, () => Math.floor(Math.random() * 4))
   });
   
  }



  setLevel() {


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
            <Pad color="red" />
            <Pad color="green" />
            <Pad color="yellow" />
            <Pad color="blue" />
            <div className="display" id="display">
             <div id="simonName">simon</div>        
            <button id="simonLevel" onClick={this.setLevel}>level {this.state.levelNum}</button>
            <br />
            <button id="startButton" onClick={this.startGame}>start</button>
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
      playing: false,
      volume: 0.0
    }
    this.playback = this.playback.bind(this);
   
  }

  playback() {

    this.setState({
      playing: true,
      volume: 1.0
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
      <div className={`pad ${this.props.color}`} onClick={this.playback}>
        <ReactHowler src={`${colors}`}
          playing={this.state.playing}
          volume={this.state.volume}
        />
      </div>
    )
  }
}

export default App;
