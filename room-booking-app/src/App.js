// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookingPage from './components/BookingPage';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<BookingPage />} /> {/* Default route */}
          {/* Add more routes here as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
