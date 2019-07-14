import React, { useState } from 'react';
import ReactHowler from 'react-howler'
import blueButton from './sounds/blue_button.wav'
import './App.css'

class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      levelNum: 1,
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
        <ReactHowler src="./sounds/blue_button.wav" playing={true} />
        <h1>Simon Game</h1>
        <div id="simonWrapper">
          <section className="simon" style={centerStyle}>
           <Pad color="red"/>
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


{ /* Have to change to class and add isClick function to trigger the HowlerWrapper*/}
function Pad(props) {  
  console.log(props.color)
  let [isClicked] = useState(false)


  return (
    <div className="pad red" onClick={isClicked=true}></div>
    
    )
}

export default App;
