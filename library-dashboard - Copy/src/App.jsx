import React from 'react';
import { Grid } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './Pages/Home';
import Authors from './Pages/Author';
import Books from './Pages/Book';
import './App.css'

const App = () => {
  return (
    <div className="app">
         <ul className="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
      <Grid container spacing={2}>
        {/* Sidebar - takes up 4 units on large screens */}
        <Grid style={{backgroundColor: '#0093E9',borderRadius: '25px',boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',color: '#fff'}}item xs={12} lg={2}>
          <Sidebar />
        </Grid>
        {/* Content - takes up 8 units on large screens */}
        <Grid item xs={12} lg={10}>
          <div className="content">
       
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/authors" element={<Authors />} />
              <Route path="/books" element={<Books />} />
            </Routes>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
