import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Resume from './components/Resume';
import './App.css';

function App() {
  const [result, setResult] = useState(0);

  return (
    <BrowserRouter>
      <div className="App">
        <h1>Resume Builder with AI</h1>
        <Routes>
          <Route path="/" element={<Home setResult={setResult} />} />
          <Route path="/resume" element={<Resume result={result} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
