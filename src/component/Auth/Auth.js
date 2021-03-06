import React, { useState } from 'react';
import {
  Avatar,
  Grid,
  Typography,
  Button,
  Paper,
  Container,
  CssBaseline,
} from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import Input from './Input';
import Icon from './Icon';

import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { signIn, signUp } from '../../actions/auth';

import dotenv from 'dotenv';
dotenv.config();

const Auth = () => {
  const initialFormState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const classes = useStyles();
  const [isSignup, setisSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setformData] = useState(initialFormState);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setformData(formData);
    if (isSignup) {
      dispatch(signUp(formData, navigate));
      // console.log(formData);
    } else {
      dispatch(signIn(formData, navigate));
    }
  };
  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const googleSuccess = async (res) => {
    const result = await res?.profileObj; //optional chaining
    const token = await res?.tokenId;
    console.log(`google suc :${result} ${token}`);
    try {
      dispatch({ type: 'AUTH', data: { result, token } });
    } catch (e) {
      console.log(e);
    }
    //put navigate in last so after data fetch from local then redirection happen
    navigate('/');
  };
  const googleFailure = (err) => {
    console.log(`Sign In though google is unsuccesful. Try after some time !`);
    console.log(err);
  };

  const switchMode = () => {
    setisSignup((previsSignup) => !previsSignup);
    setShowPassword(false);
  };
  const handleShowPassword = () => {
    setShowPassword((e) => !e);
  };

  return (
    <Container component='main' container maxWidth='xs'>
      <Paper className={classes.paper} elevation={3}>
        {/* <CssBaseline /> */}
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5' style={{ color: '#f0f1f0 !important' }}>
          {isSignup ? 'SignUP' : 'SignIN'}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} half={true}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name='firstName'
                  label='First Name'
                  handleChange={handleChange}
                  half
                />
                <Input
                  name='lastName'
                  label='Last Name'
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name='email'
              label='Email'
              handleChange={handleChange}
              type='email'
            />
            <Input
              name='password'
              label='Password'
              handleChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              ha
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name='confirmPassword'
                label='Confirm password'
                handleChange={handleChange}
                type='password'
              />
            )}
          </Grid>

          <Button
            type='submit'
            fullWidth
            variant='contained'
            style={{
              backgroundColor: '#3f51b5',
              color: 'yellowgreen',
              fontWeight: 600,
            }}
            className={classes.submit}
          >
            {isSignup ? 'SignUp' : 'SignIn'}
          </Button>
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                // color='secondary'
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant='contained'
                style={{ backgroundColor: '#3f51b5', color: 'yellowgreen' }}
              >
                <Typography style={{ fontWeight: 600 }}>
                  Google Sign In
                </Typography>
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy='single_host_origin'
          />
          <Grid container justify='flex-end'>
            <Grid item>
              <Button onClick={switchMode} color='primary'>
                {isSignup
                  ? 'Already have an account? Sign In'
                  : `Don't have an account?Sign Up`}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
