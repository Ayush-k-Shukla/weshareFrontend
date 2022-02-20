import React, { useState } from 'react';
import {
  Avatar,
  Grid,
  Typography,
  Button,
  Paper,
  Container,
  TextField,
} from '@material-ui/core';
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import Input from './Input';

const Auth = () => {
  const classes = useStyles();
  const isSignup = false;

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {};
  const handleChange = () => {};
  const handleShowPassword = () => {
    //cross check
    setShowPassword(!showPassword);
  };

  return (
    <Container component='main' maxwidth='xs'>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>{isSignup ? 'SignUp' : 'SignIN'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container>
            {isSignup && (
              <>
                <Input
                  name='firstName'
                  label='first Name'
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
              label='email address'
              handleChange={handleChange}
              type='email'
            />
            <Input
              name='password'
              label='password'
              handleChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name='confirmPassword'
                label='repeat password'
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
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
