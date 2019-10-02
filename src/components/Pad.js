import React from 'react';
import ReactHowler from 'react-howler'
import blueButton from '../sounds/blue_button.wav'
import greenButton from '../sounds/green_button.wav'
import redButton from '../sounds/red_button.wav'
import yellowButton from '../sounds/yellow_button.wav'

class Pad extends React.Component {
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

export default Pad