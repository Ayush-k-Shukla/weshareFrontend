import {
  AppBar,
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import LoginIcon from '@mui/icons-material/Login';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import useStyles from './styles.js';

import jwtDecode from 'jwt-decode';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
    toast.success('User logged out Successfully!', {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
        fontFamily: 'revert',
      },
    });
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;
    //check for token expired or not
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      }
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar className={classes.appBar} position='static' fullWidth>
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to='/'
          className={classes.heading}
          variant='h4'
          align='center'
          style={{ color: '#33eaff' }}
        >
          WeShare
        </Typography>
        <img className={classes.image} src={logo} alt='icon' height='60' />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu}>
                {/* <Avatar
                  googleId='111026565936228186204'
                  size='50'
                  round={true}
                /> */}
                <Avatar
                  className={classes.Avatar}
                  alt={user?.result?.name}
                  // src={user.result}
                >
                  {user?.result?.name.charAt(0)}
                </Avatar>
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: '60px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              // anchorOrigin={{
              //   vertical: 'bottom',
              //   horizontal: 'right',
              // }}
              // transformOrigin={{
              //   vertical: 'top',
              //   horizontal: 'right',
              // }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              // style={{ backgroundColor: '#191b3b' }}
            >
              <MenuItem key='Logout' onClick={handleLogout}>
                <Typography textAlign='center'>Logout</Typography>
              </MenuItem>
              <MenuItem key='create' onClick={() => navigate('/create')}>
                <Typography textAlign='center'>CreatePost</Typography>
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <Button
            variant='contained'
            style={{ backgroundColor: '#6d63fe' }}
            color='primary'
            component={Link}
            to='/auth'
            endIcon={<LoginIcon color='success' />}
          >
            SignIn
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
