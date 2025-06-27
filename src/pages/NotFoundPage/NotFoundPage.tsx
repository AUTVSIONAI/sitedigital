import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Container, Typography, Paper } from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';

const NotFoundPage: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Paper 
        elevation={0}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          py: 8,
          px: 3,
          mt: 8,
          mb: 8,
          borderRadius: 2,
          backgroundColor: 'background.paper',
        }}
      >
        <Typography variant="h1" component="h1" sx={{ fontSize: { xs: '6rem', md: '8rem' }, fontWeight: 700, color: 'primary.main', mb: 2 }}>
          404
        </Typography>
        
        <Typography variant="h4" component="h2" gutterBottom>
          Página não encontrada
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 480 }}>
          A página que você está procurando não existe ou foi removida.
          Verifique se o endereço está correto ou retorne à página inicial.
        </Typography>
        
        <Button 
          component={RouterLink} 
          to="/"
          variant="contained" 
          color="primary"
          size="large"
          startIcon={<HomeIcon />}
        >
          Voltar para a Página Inicial
        </Button>
      </Paper>
    </Container>
  );
};

export default NotFoundPage;