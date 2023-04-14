import React from 'react';
import logo from './logo-white.png';
import './App.css';
// import saltLogo from './stories/assets/saltLogo.svg';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="bg-orange-200 font-bold p-4">React + Tailwind</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <h1 className="text-orange-500 underline font-bold p-4">Vite + React + Tailwind</h1>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
