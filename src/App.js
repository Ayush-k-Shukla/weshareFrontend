import React, { lazy, Suspense } from 'react';

import { Container } from '@material-ui/core';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
// import Form from './component/Form/Form';
// import EditForm from './component/Form/EditForm';
// import Navbar from './component/Navbar/Navbar';
// import Home from './component/Home/Home';
// import Auth from './component/Auth/Auth';
// import PostIndividual from './component/PostIndividual/PostIndividual';
import dotenv from 'dotenv';
import { Toaster } from 'react-hot-toast';
import Loader from './component/Loader/Loader';
import './index.css';
dotenv.config();
const PostIndividual = lazy(() =>
  import('./component/PostIndividual/PostIndividual')
);
const Home = lazy(() => import('./component/Home/Home'));
const Form = lazy(() => import('./component/Form/Form'));
const Auth = lazy(() => import('./component/Auth/Auth'));
const EditForm = lazy(() => import('./component/Form/EditForm'));
const Navbar = lazy(() => import('./component/Navbar/Navbar'));

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <div>
          <Toaster />
        </div>
        <Navbar />
        <Container>
          <Routes>
            <Route path='/posts/:id' exact element={<PostIndividual />} />
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
        </Container>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
