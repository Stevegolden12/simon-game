import React, { useState } from 'react';
import $ from 'jquery'; 
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
      stopSound: 1,
      hoverColor: [['hsl(0,100%,35%)', 'hsl(0,100%,65%)'],
                   ['hsl(120,100%,25%)', 'hsl(120,100%,50%)'],
                   ['hsl(60,100%,35%)', 'hsl(60,100%,65%)'],
                   ['hsl(240,100%,40%)','hsl(240,100%,65%)']]
    }

    this.setLevel = this.setLevel.bind(this);  
    this.startGame = this.startGame.bind(this);
    this.createAnswer = this.createAnswer.bind(this); 
 
  }


  /* MUST redo click function to JS click hovers
   * Finish 
   * 
   * */

  /* Going to remove createAnswer if completes everything on start game */
  startGame() {       
    /* 0:red, 1:green, 2:yellow, 3:blue, */
    let answerColor;

    const fullAnswer = Array.from({ length: this.state.levelFinish[this.state.levelNum - 1] }, () => Math.floor(Math.random() * 4));
    console.log(fullAnswer)
    this.setState({
      levelAnswer: fullAnswer
    });
       
    switch (fullAnswer[0]) {
      case 0:
        answerColor = 'red';
        break;
      case 1:
        answerColor = 'green';
        break;
      case 2:
        answerColor = 'yellow';
        break;
      case 3:
        answerColor = 'blue';
        break;
    }
    console.log("answerColor: " + answerColor)
    /*let colorChoice = $('.red');*/

    let colorChoice = document.getElementsByClassName(answerColor)[0]
    console.log(colorChoice)

    let highlightColor = this.state.hoverColor[fullAnswer[0]][1]
    let normalColor = this.state.hoverColor[fullAnswer[0]][0];
      
    colorChoice.click()
    
    colorChoice.style.background = highlightColor;
    setTimeout(function () { colorChoice.style.background = normalColor}, 700);
   
  }
   
  
 createAnswer = ()=> {
 
   const fullAnswer = Array.from({ length: this.state.levelFinish[this.state.levelNum - 1] }, () => Math.floor(Math.random() * 4));
   console.log(fullAnswer)
   this.setState({
       levelAnswer: fullAnswer
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
            <Pad color="red" hoverColor={this.state.hoverColor}/>           
            <Pad color="green" hoverColor={this.state.hoverColor} />
            <Pad color="yellow" hoverColor={this.state.hoverColor} />
            <Pad color="blue" hoverColor={this.state.hoverColor} />
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
      mute: false,
    }

    this.playback = this.playback.bind(this);
    this.mute = this.mute.bind(this);
   }

  playback(arrayIndex, color) {

    this.setState({
      playing: true,
      mute: false
    })
    
    setTimeout(this.mute, 500);

    let colorChoice = document.getElementsByClassName(color)[0]

    let highlightColor = this.props.hoverColor[arrayIndex][1]
    let normalColor = this.props.hoverColor[arrayIndex][0];
  
    colorChoice.style.background = highlightColor;
    setTimeout(function () { colorChoice.style.background = normalColor }, 700);

  }

  mute() {    
    this.setState({
      mute: true
    })
  }

  render() {
    let colors = redButton;
    let arrInd = 0;
   
    switch (this.props.color) {
      case 'blue':
        colors = blueButton;
        arrInd = 3;
        break;
      case 'green':
        colors = greenButton;
        arrInd = 1;
        break;
      case 'red':
        colors = redButton;
        arrInd = 0;
        break;
      case 'yellow':
        colors = yellowButton;
        arrInd = 2;
        break;
    }   


    return (
 
      <div className={`pad ${this.props.color}`} onClick={this.playback.bind(this, arrInd, this.props.color)}>
        <ReactHowler src={`${colors}`}
          playing={this.state.playing}
          mute={this.state.mute}
        />
      </div>
    ) 
  }
}

export default App;
