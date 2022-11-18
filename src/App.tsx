import './app.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './components/about/about';
import Navigation from './components/navigation/navigation';
import Home from './components/home/home';
import React from 'react';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
