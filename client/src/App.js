import React from 'react';
import Header from './components/Header';
import './App.css';


function App({ children }) {
  return (
    <div className="App">
        <Header/>
        {children}
      </div>
    );
}

export default App;
