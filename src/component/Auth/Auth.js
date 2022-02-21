import React, { useState } from 'react';
import {
  Avatar,
  Grid,
  Typography,
  Button,
  Paper,
  Container,
  TextField,
  CssBaseline,
} from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import Input from './Input';
import Icon from './Icon';

import { useDispatch } from 'react-redux';

import dotenv from 'dotenv';
dotenv.config();

const Auth = () => {
  console.log(process.env.GOOGLE_AUTH_CLIENT_ID);
  const classes = useStyles();
  const [isSignup, setisSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = () => {};
  const handleChange = () => {};

  const googleSuccess = async (res) => {
    const result = res?.profileObj; //optional chaining
    const token = res?.tokenId;
    console.log(res);
    try {
      dispatch({ type: 'AUTH', payload: { result, token } });
    } catch (e) {}
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
    setShowPassword(!showPassword);
  };

  return (
    <Container component='main' container maxWidth='xs'>
      <Paper className={classes.paper} elevation={3}>
        <CssBaseline />
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>{isSignup ? 'SignUp' : 'SignIN'}</Typography>
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
              ndleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name='confirmPassword'
                label='Confirm password'
                handleChange={handleChange}
              />
            )}
          </Grid>

          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            {isSignup ? 'SignUp' : 'SignIn'}
          </Button>
          <GoogleLogin
            clientId={process.env.GOOGLE_AUTH_CLIENT_ID}
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color='primary'
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant='contained'
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy='single_host_origin'
          />
          <Grid container justify='flex-end'>
            <Grid item>
              <Button onClick={switchMode} variant='body-2'>
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
