import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useAuth } from '../../contexts/AuthContext';

const Layout: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
      <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
        <Outlet />
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout;