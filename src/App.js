import React, { useState } from 'react';

import './App.css';

function App() {
  
  const [buttonNum] = useState([1,2,3,4]);

  return (
    <div className="App">
      <h1>Simon Game</h1>
      <div id="simonWrapper">
      <section className="simon">
          <div className="pad red" ></div>
          <div className="pad green" ></div>
          <div className="pad yellow" ></div>
          <div className="pad blue" ></div>
          <div className="display" id="display"></div>
        </section>
      </div>
    </div>
  );
}

export default App;
