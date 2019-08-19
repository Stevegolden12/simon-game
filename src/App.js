import React from 'react';
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
                   ['hsl(240,100%,40%)', 'hsl(240,100%,65%)']],
      buttonInput: [],
      onlyUserInput: false,
    }

    this.setLevel = this.setLevel.bind(this);  
    this.startGame = this.startGame.bind(this);
    this.createAnswer = this.createAnswer.bind(this); 
    this.getButtonInput = this.getButtonInput.bind(this);
 
  }


  /* MUST redo click function to JS click hovers
   * Finish 
   * 
   * */

   /* Going to remove createAnswer if completes everything on start game */
  startGame = () =>{       
    /* 0:red, 1:green, 2:yellow, 3:blue, */
    let answerColor =[];
 

    const fullAnswer = Array.from({ length: this.state.levelFinish[this.state.levelNum - 1] }, () => Math.floor(Math.random() * 4));

    this.setState({
      levelAnswer: fullAnswer
    });
       
   


    let colorChoice;
    let highlightColor;
    let normalColor;



    fullAnswer.map((value, i) => {

      switch (fullAnswer[i]) {
        case 0:
          answerColor[i] = 'red';
          break;
        case 1:
          answerColor[i] = 'green';
          break;
        case 2:
          answerColor[i] = 'yellow';
          break;
        case 3:
          answerColor[i] = 'blue';
          break;
        default:
          console.log("fullAnswer is not working")
          break;
      }
    })  
   
    let hColor = this.state.hoverColor;

    let ind = 0; 
    let answerLocation = 1;
    let pauseGame = false;
    let userAnswer = []
    let tTiming;
    let chkAnswer = [];
    let stringChkAnswer = []
    let answerSuccess = 0;
    let winGame = true;

    let cTesting = setInterval(() => { 
      if (ind < answerLocation) {
        colorChoice = document.getElementsByClassName(answerColor[ind])[0]


        highlightColor = hColor[fullAnswer[ind]][1]
        normalColor = hColor[fullAnswer[ind]][0]

        this.setState({ onlyUserInput: false })
        colorChoice.click()
        this.setState({ onlyUserInput: true })

        colorChoice.style.background = highlightColor;
        setTimeout(() => {
          colorChoice.style.background = normalColor;
        }, 700)
        ind++;
      } else {
        userAnswer = []
        chkAnswer = [] 
        pauseGame = true   
      }


      for (let loop = 0; loop < answerLocation; loop++) {
        chkAnswer.push(fullAnswer[loop])
      }

      stringChkAnswer = JSON.stringify(chkAnswer) 

      
 
 
      
      userAnswer = JSON.stringify(this.state.buttonInput)
      
 
     tTiming = setTimeout(() => {      

       if (userAnswer === stringChkAnswer && pauseGame === true) {
  
         this.setState({
           buttonInput: [], 
         })
   
          ind = 0;
  
         answerLocation++;
         answerSuccess++;
         userAnswer = [];
         chkAnswer = [];
         stringChkAnswer = [];
         pauseGame = false;

         if (answerSuccess === fullAnswer.length) {
           winGame = true;
           alert("YOU WIN!!")
           userAnswer = [];
           chkAnswer = [];
         }
        } else if (this.state.buttonInput !== stringChkAnswer && pauseGame === true) {
          alert("END GAME")
         console.log("false")
         chkAnswer = [];
         stringChkAnswer = [];
         answerSuccess = 0;
         this.setState({
           buttonInput: []
         })
          clearInterval(tTiming)
          clearInterval(cTesting)
        }
      },6000 + answerLocation * 4000)
      if (ind === fullAnswer.length && winGame === true) {
        answerSuccess = 0;
        winGame = false;
        clearInterval(cTesting)
      }
      }, 3000 + answerLocation * 4000);


  }


  getButtonInput(num) {
    let newNum = num;  
    if (this.state.onlyUserInput === true) {
  
      this.setState({
        buttonInput: [...this.state.buttonInput, newNum],
      })
    }
  }

 createAnswer = ()=> {
 
   const fullAnswer = Array.from({ length: this.state.levelFinish[this.state.levelNum - 1] }, () => Math.floor(Math.random() * 4));

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
            <Pad color="red" hoverColor={this.state.hoverColor} buttonClick={this.getButtonInput}/>           
            <Pad color="green" hoverColor={this.state.hoverColor} buttonClick={this.getButtonInput}/>
            <Pad color="yellow" hoverColor={this.state.hoverColor} buttonClick={this.getButtonInput}/>
            <Pad color="blue" hoverColor={this.state.hoverColor} buttonClick={this.getButtonInput}/>
            <div className="display" id="display">
             <div id="simonName">simon</div>        
            <button id="simonLevel" onClick={this.setLevel}>level {this.state.levelNum}</button>
            <br />
            <button id="startButton" onClick={() => this.startGame()}>start</button>
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
    
   
    this.props.buttonClick(arrayIndex)

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
      default:
        console.log("this.props.color is not working")
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
