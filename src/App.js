import React from 'react';
import './App.css';
import Navbar from './components/Navbar'

class App extends React.Component {
  render() {
    return (
      <div className="App">
      <Navbar />
        Pill Pal
      </div>
    );
  }
}

export default App;
