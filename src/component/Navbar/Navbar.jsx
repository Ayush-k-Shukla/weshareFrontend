import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Button, Avatar } from '@material-ui/core';
import useStyles from './styles.js';
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  console.log(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  //err on  navigate
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <AppBar
      className={classes.appBar}
      position='static'
      fullWidth
      color='inherit'
    >
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to='/'
          className={classes.heading}
          variant='h2'
          align='center'
        >
          WeShare
        </Typography>
        <img className={classes.image} src={logo} alt='icon' height='60' />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.Avatar}
              alt={user.result.name.givenName}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant='h6'>
              {user.result.givenName}
            </Typography>
            <Button
              variant='contained'
              className={classes.logout}
              color='secondary'
              onClick={handleLogout}
            >
              Log out
            </Button>
          </div>
        ) : (
          <Button
            variant='contained'
            color='primary'
            to='/auth'
            component={Link}
          >
            SignIn
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
