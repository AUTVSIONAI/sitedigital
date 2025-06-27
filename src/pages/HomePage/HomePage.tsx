import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Search as SearchIcon,
  Handshake as HandshakeIcon,
  Analytics as AnalyticsIcon,
  Message as MessageIcon,
  Campaign as CampaignIcon,
  Payments as PaymentsIcon,
} from '@mui/icons-material';

const HomePage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const features = [
    {
      title: 'Encontre parcerias ideais',
      description: 'Conecte-se com marcas ou influenciadores que combinam com seu nicho e valores.',
      icon: <SearchIcon fontSize="large" color="primary" />,
    },
    {
      title: 'Colaborações simplificadas',
      description: 'Gerencie todo o processo de colaboração em um só lugar, do primeiro contato até a conclusão.',
      icon: <HandshakeIcon fontSize="large" color="primary" />,
    },
    {
      title: 'Análise de desempenho',
      description: 'Acompanhe métricas e resultados de campanhas para otimizar suas parcerias.',
      icon: <AnalyticsIcon fontSize="large" color="primary" />,
    },
    {
      title: 'Comunicação direta',
      description: 'Chat integrado para facilitar a comunicação entre marcas e influenciadores.',
      icon: <MessageIcon fontSize="large" color="primary" />,
    },
    {
      title: 'Gestão de campanhas',
      description: 'Ferramentas para criar, gerenciar e acompanhar campanhas de marketing de influência.',
      icon: <CampaignIcon fontSize="large" color="primary" />,
    },
    {
      title: 'Pagamentos seguros',
      description: 'Sistema integrado para pagamentos seguros e transparentes entre marcas e influenciadores.',
      icon: <PaymentsIcon fontSize="large" color="primary" />,
    },
  ];

  const testimonials = [
    {
      name: 'Ana Silva',
      role: 'Influenciadora de Moda',
      image: 'https://via.placeholder.com/150',
      text: 'O DInfluencer transformou minha carreira como influenciadora. Consegui parcerias com marcas que realmente combinam com meu estilo e valores.',
    },
    {
      name: 'Carlos Mendes',
      role: 'Gerente de Marketing, Marca XYZ',
      image: 'https://via.placeholder.com/150',
      text: 'Encontrar os influenciadores certos para nossas campanhas nunca foi tão fácil. A plataforma nos economiza tempo e recursos, com resultados muito melhores.',
    },
    {
      name: 'Juliana Costa',
      role: 'Criadora de Conteúdo',
      image: 'https://via.placeholder.com/150',
      text: 'As ferramentas de análise me ajudam a entender melhor meu desempenho e a melhorar minhas colaborações com as marcas.',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
          borderRadius: 2,
          mb: 6,
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                component="h1"
                variant="h2"
                color="primary"
                gutterBottom
                fontWeight="bold"
              >
                Conectando Marcas e Influenciadores
              </Typography>
              <Typography variant="h5" color="text.secondary" paragraph>
                A plataforma que simplifica a conexão entre marcas e influenciadores digitais,
                criando parcerias autênticas e resultados extraordinários.
              </Typography>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                sx={{ mt: 4 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  component={RouterLink}
                  to="/register"
                >
                  Comece Agora
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  component={RouterLink}
                  to="/how-it-works"
                >
                  Como Funciona
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://via.placeholder.com/600x400"
                alt="Influencer Marketing"
                sx={{
                  width: '100%',
                  borderRadius: 2,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Typography
          component="h2"
          variant="h3"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Recursos Poderosos
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          paragraph
          sx={{ mb: 6 }}
        >
          Tudo o que você precisa para criar parcerias de sucesso
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 12px 20px rgba(0,0,0,0.1)',
                  },
                }}
                elevation={2}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center', py: 4 }}>
                  <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                  <Typography gutterBottom variant="h5" component="h3">
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* How It Works Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            component="h2"
            variant="h3"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Como Funciona
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            paragraph
            sx={{ mb: 6 }}
          >
            Três passos simples para começar
          </Typography>

          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={4}>
              <Box textAlign="center">
                <Typography
                  variant="h1"
                  color="primary"
                  sx={{ fontWeight: 'bold', mb: 2 }}
                >
                  1
                </Typography>
                <Typography variant="h5" gutterBottom>
                  Crie seu perfil
                </Typography>
                <Typography color="text.secondary">
                  Cadastre-se como marca ou influenciador e crie um perfil detalhado
                  destacando seu nicho, valores e objetivos.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box textAlign="center">
                <Typography
                  variant="h1"
                  color="primary"
                  sx={{ fontWeight: 'bold', mb: 2 }}
                >
                  2
                </Typography>
                <Typography variant="h5" gutterBottom>
                  Encontre parcerias
                </Typography>
                <Typography color="text.secondary">
                  Use nosso sistema de busca avançada para encontrar marcas ou
                  influenciadores que combinam com seu perfil e objetivos.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box textAlign="center">
                <Typography
                  variant="h1"
                  color="primary"
                  sx={{ fontWeight: 'bold', mb: 2 }}
                >
                  3
                </Typography>
                <Typography variant="h5" gutterBottom>
                  Colabore e cresça
                </Typography>
                <Typography color="text.secondary">
                  Inicie conversas, negocie termos, gerencie campanhas e acompanhe
                  resultados, tudo em uma única plataforma.
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Box textAlign="center" sx={{ mt: 6 }}>
            <Button
              variant="contained"
              size="large"
              component={RouterLink}
              to="/register"
            >
              Comece Agora
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Typography
          component="h2"
          variant="h3"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Depoimentos
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          paragraph
          sx={{ mb: 6 }}
        >
          O que nossos usuários dizem
        </Typography>

        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item key={index} xs={12} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  p: 2,
                }}
                elevation={2}
              >
                <CardContent>
                  <Typography variant="body1" paragraph sx={{ fontStyle: 'italic' }}>
                    "{testimonial.text}"
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CardMedia
                      component="img"
                      sx={{ width: 60, height: 60, borderRadius: '50%', mr: 2 }}
                      image={testimonial.image}
                      alt={testimonial.name}
                    />
                    <Box>
                      <Typography variant="subtitle1" component="div">
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.role}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          borderRadius: 2,
          mt: 6,
          mb: 6,
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" align="center" gutterBottom>
            Pronto para transformar suas colaborações?
          </Typography>
          <Typography variant="h6" align="center" paragraph>
            Junte-se a milhares de marcas e influenciadores que já estão criando
            parcerias de sucesso na nossa plataforma.
          </Typography>
          <Box textAlign="center" sx={{ mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              color="secondary"
              component={RouterLink}
              to="/register"
              sx={{ px: 4, py: 1.5 }}
            >
              Cadastre-se Gratuitamente
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;