import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Search as SearchIcon,
  Campaign as CampaignIcon,
  Message as MessageIcon,
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
  ExitToApp as LogoutIcon,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  drawerOpen: boolean;
  toggleDrawer: () => void;
}

const Header: React.FC<HeaderProps> = ({ drawerOpen, toggleDrawer }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
  };

  const handleProfileClick = () => {
    handleMenuClose();
    if (!user) return;
    
    if (user.type === 'brand') {
      navigate(`/brand/profile/${user.id}`);
    } else {
      navigate(`/influencer/profile/${user.id}`);
    }
  };

  const handleDashboardClick = () => {
    handleMenuClose();
    if (user?.type === 'brand') {
      navigate('/brand/dashboard');
    } else {
      navigate('/influencer/dashboard');
    }
  };

  const menuItems = [
    { text: 'Início', icon: <HomeIcon />, path: '/' },
    { text: 'Buscar', icon: <SearchIcon />, path: '/search' },
  ];

  const authenticatedMenuItems = [
    { text: 'Campanhas', icon: <CampaignIcon />, path: '/campaigns' },
    { text: 'Mensagens', icon: <MessageIcon />, path: '/messages' },
    { text: 'Configurações', icon: <SettingsIcon />, path: '/settings' },
    { text: 'Ajuda', icon: <HelpIcon />, path: '/help' },
  ];

  const drawerContent = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text} component={RouterLink} to={item.path}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        {isAuthenticated &&
          authenticatedMenuItems.map((item) => (
            <ListItem button key={item.text} component={RouterLink} to={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            DInfluencer
          </Typography>

          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  color="inherit"
                  component={RouterLink}
                  to={item.path}
                  startIcon={item.icon}
                  sx={{ mx: 1 }}
                >
                  {item.text}
                </Button>
              ))}
              {isAuthenticated &&
                authenticatedMenuItems.map((item) => (
                  <Button
                    key={item.text}
                    color="inherit"
                    component={RouterLink}
                    to={item.path}
                    startIcon={item.icon}
                    sx={{ mx: 1 }}
                  >
                    {item.text}
                  </Button>
                ))}
            </Box>
          )}

          {isAuthenticated ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Avatar
                  alt={user?.name}
                  src={user?.avatar}
                  sx={{ width: 32, height: 32 }}
                >
                  {user?.name?.charAt(0)}
                </Avatar>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleProfileClick}>
                  <ListItemIcon>
                    <PersonIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Perfil</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleDashboardClick}>
                  <ListItemIcon>
                    <DashboardIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Dashboard</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => { handleMenuClose(); navigate('/settings'); }}>
                  <ListItemIcon>
                    <SettingsIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Configurações</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => { handleMenuClose(); navigate('/help'); }}>
                  <ListItemIcon>
                    <HelpIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Ajuda</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Sair</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box>
              <Button color="inherit" component={RouterLink} to="/login">
                Login
              </Button>
              <Button
                variant="contained"
                color="secondary"
                component={RouterLink}
                to="/register"
                sx={{ ml: 1 }}
              >
                Cadastrar
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Header;