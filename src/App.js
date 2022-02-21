import React from 'react';

import { Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './component/Navbar/Navbar';
import Home from './component/Home/Home';
import Auth from './component/Auth/Auth';

import dotenv from 'dotenv';
dotenv.config();

const App = () => {
  //http://localhost:4000, add this also as proxy

  return (
    <BrowserRouter>
      <Container maxWidth='lg'>
        <Navbar />
        {/* rect-router-dom 6 does not support Switch , use Routes */}
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/auth' exact element={<Auth />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
