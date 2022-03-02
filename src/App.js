import React from 'react';

import { Box, Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Form from './component/Form/Form';
import Navbar from './component/Navbar/Navbar';
import Home from './component/Home/Home';
import Auth from './component/Auth/Auth';
import PostIndividual from './component/PostIndividual/PostIndividual';

import dotenv from 'dotenv';
dotenv.config();

const App = () => {
  //http://localhost:4000, add this also as proxy
  const user = JSON.parse(localStorage.getItem('profile'));
  return (
    <BrowserRouter>
      <Navbar />
      <Container fullwidth style={{ padding: '40px 160px' }}>
        {/* rect-router-dom 6 does not support Switch , use Routes */}
        <Routes>
          <Route path='/' exact element={<Navigate replace to='/posts' />} />
          <Route path='/posts' exact element={<Home />} />
          <Route path='/posts/search' exact element={<Home />} />
          <Route path='/posts/:id' exact element={<PostIndividual />} />
          <Route path='/create' exact element={<Form />} />
          <Route
            path='/auth'
            exact
            element={user ? <Navigate to='/posts' /> : <Auth />}
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
