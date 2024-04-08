//ref: https://www.geeksforgeeks.org/how-to-create-a-navigation-bar-with-material-ui/

import { useNavigate } from 'react-router-dom';

import logo from '../../Components/Images/logo_transparent.png';

import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@mui/material/useMediaQuery';

import { List, ListItem, ListItemText, Collapse } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import './Styles/Styles.css';
import { signout } from '../../../Controllers/Redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import AddListingModal from '../Modals/AddListingModal';
// Using Inline Styling
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  AppBarStyle: {
    background: '#E6E6E8',
    boxShadow: 'none',
    justifyContent: 'space-between', // This will align items to the edges
  },

  navButtons: {
    display: 'flex', // Use flexbox for the button container
    // Align items vertically
    justifyContent: 'space-between',
    '& > *': {
      marginLeft: theme.spacing(3), // Add spacing between buttons
    },
    marginLeft: 'auto',
    marginRight: '3rem',
  },

  logoContainer: {
    display: 'flex',
  },
}));

// Exporting Default Navbar to the App.js File
const Header = () => {
  const classes = useStyles();
  const small = useMediaQuery('(max-width:600px)');
  const full = useMediaQuery('(min-width:600px)');
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    dispatch(signout());
    navigate('/signin');
  };

  return (
    <div>
      <AppBar position="static" className={classes.AppBarStyle}>
        <Toolbar variant="regular">
          {small && (
            <>
              <List>
                <ListItem button>
                  <Button onClick={handleClick}>
                    <MenuIcon />
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </Button>
                  <Typography
                    variant="h6"
                    onClick={() => {
                      console.log('logo clicked');
                      setOpen(false);
                    }}
                    style={{ color: 'black' }}
                  >
                    Scotia Rentals
                  </Typography>
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem button>
                      <ListItemText
                        primary="Add Listing"
                        style={{ color: 'black', fontWeight: 800 }}
                        onClick={handleModalOpen}
                      />
                    </ListItem>
                    <ListItem button>
                      <ListItemText
                        primary="My Listings"
                        style={{ color: 'black', fontWeight: 800 }}
                      />
                    </ListItem>
                    <ListItem button>
                      <ListItemText
                        primary="Logout"
                        style={{ color: 'black', fontWeight: 800 }}
                      />
                    </ListItem>
                  </List>
                </Collapse>
              </List>
            </>
          )}

          {full && (
            <>
              <div className={classes.logoContainer}>
                <img
                  src={logo}
                  alt="logo"
                  style={{ height: '135px', width: '200px' }}
                />
              </div>
              <div className={classes.navButtons}>
                <Button
                  style={{ color: 'black', fontWeight: 800 }}
                  onClick={() => navigate('/listings')}
                >
                  Listings
                </Button>

                <Button
                  style={{ color: 'black', fontWeight: 800 }}
                  onClick={() => navigate('/favorites')}
                >
                  Favorites
                </Button>

                <AddListingModal
                  open={modalOpen}
                  handleClose={handleModalClose}
                />
                <Button
                  style={{ color: 'black', fontWeight: 800 }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
