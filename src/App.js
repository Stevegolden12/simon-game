import React, { useState } from 'react';

import './App.css';

function App() {
  
  const [buttonNum] = useState([1,2,3,4]);
  const centerStyle = {margin: 'auto'};
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
            <div id="simonLevel">level</div>
            <div id="startButton">start</div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
