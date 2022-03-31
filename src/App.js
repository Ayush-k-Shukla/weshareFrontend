import React, { Suspense, lazy } from 'react';

import { Box, CircularProgress, Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import Form from './component/Form/Form';
// import EditForm from './component/Form/EditForm';
// import Navbar from './component/Navbar/Navbar';
// import Home from './component/Home/Home';
// import Auth from './component/Auth/Auth';
// import PostIndividual from './component/PostIndividual/PostIndividual';
import useMediaQuery from '@mui/material/useMediaQuery';
import dotenv from 'dotenv';
import './index.css';
import Loader from './component/Loader/Loader';
import { Toaster } from 'react-hot-toast';
dotenv.config();
const PostIndividual = lazy(() =>
  import('./component/PostIndividual/PostIndividual')
);
const Home = lazy(() => import('./component/Home/Home'));
const Form = lazy(() => import('./component/Form/Form'));
const Auth = lazy(() => import('./component/Auth/Auth'));
const EditForm = lazy(() => import('./component/Form/EditForm'));
const Navbar = lazy(() => import('./component/Navbar/Navbar'));
const Editor = lazy(() => import('./component/Editor/Editor'));

const App = () => {
  //http://localhost:4000, add this also as proxy
  const user = JSON.parse(localStorage.getItem('profile'));

  const matches = useMediaQuery('(min-width:1200px)');

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        {/* <Suspense fallback={<Loader />}>
          <Navbar />
        </Suspense> */}
        <div>
          <Toaster />
        </div>
        <Navbar />
        <Container>
          {/* rect-router-dom 6 does not support Switch , use Routes */}
          {/* <Suspense fallback={<div>Loading...</div>}> */}
          <Routes>
            <Route path='/posts/:id' exact element={<PostIndividual />} />
            <Route path='/editor' exact element={<Editor />} />
            <Route path='/posts/edit/:id' exact element={<EditForm />} />

            <Route path='/' exact element={<Navigate replace to='/posts' />} />
            <Route path='/posts' exact element={<Home />} />
            <Route path='/posts/search' exact element={<Home />} />

            <Route path='/create' exact element={<Form />} />
            <Route
              path='/auth'
              exact
              element={user ? <Navigate to='/posts' /> : <Auth />}
            />
          </Routes>
          {/* </Suspense> */}
        </Container>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
