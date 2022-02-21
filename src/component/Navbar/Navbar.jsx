import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Typography,
  IconButton,
  Toolbar,
  Button,
  Avatar,
  MenuItem,
  Menu,
  Tooltip,
} from '@material-ui/core';
import useStyles from './styles.js';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { useNavigate, useLocation } from 'react-router-dom';
const settings = ['Logout']; //setting array for profile
const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

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
    // const token = user?.token;
    setUser(JSON.parse(localStorage.getItem('profile')));
    console.log(`in : ${JSON.parse(localStorage.getItem('profile'))}`);
  }, [location]);

  //check
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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
          variant='h4'
          align='center'
        >
          WeShare
        </Typography>
        <img className={classes.image} src={logo} alt='icon' height='60' />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  className={classes.Avatar}
                  alt={user.result.name.givenName}
                  src={user.result.imageUrl}
                >
                  {user.result.name.charAt(0)}
                </Avatar>
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: '60px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleLogout}>
                  <Typography textAlign='center'>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
            {/* <Typography className={classes.userName} variant='h6'>
              {user.result.givenName}
            </Typography>
            <Button
              variant='contained'
              className={classes.logout}
              color='secondary'
              onClick={handleLogout}
            >
              Log out
            </Button> */}
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
