import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
// Import your components
import ResourceList from './ResourceList';
import AddResource from './AddResource';
import Navigation from './Navigation';

function App() {

  return (
    <div>
      <nav>
        <Navigation />
      </nav>
      <Routes>
        <Route path="/" element={<ResourceList />} />
        <Route path="/add-resource" element={<AddResource />} />
        {/* Define other routes here */}
      </Routes>

      
    </div>

  );
}

export default App
