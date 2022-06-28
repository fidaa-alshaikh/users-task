import React, { useState, useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import { Navigate, NavLink } from 'react-router-dom';
import styles from '../assets/css/style.module.css';
import Stack from '@mui/material/Stack';

import AuthContext from '../contexts/AuthProvider.js';

const pages = [{ name: 'Home', link: '/' }, { name: 'Users', link: '/all-users' }];

const NavBar = (props) => {
  const { loginCallback } = props;
  const { auth } = useContext(AuthContext);
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  return (
    <AppBar position="static" className={styles.navbar}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"

            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Fidaa Web
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page, key) => (
                <MenuItem key={key} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <NavLink className={styles.link} to={page.link} > {page.name} </NavLink>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Fidaa Web
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, key) => (
              <MenuItem
                key={key}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <NavLink className={styles.navLink} to={page.link} > {page.name} </NavLink>
              </MenuItem>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {auth ?
                <Stack direction="row" spacing={2}>
                  <MenuItem >
                    <Typography textAlign="center"  >
                      <NavLink className={styles.navLink} to='/my-profile' > My Profile </NavLink>
                    </Typography>
                  </MenuItem>

                  <MenuItem>
                    <Typography textAlign="center" onClick={() => {
                      localStorage.removeItem("jwtToken");
                      loginCallback();
                      // to="/login"
                    }}>Logout</Typography>
                  </MenuItem>
                </Stack>
              :
              <MenuItem >
                <Typography textAlign="center" >
                  <NavLink className={styles.navLink} to="/login">Login</NavLink>
                </Typography>
              </MenuItem >

            }

          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
