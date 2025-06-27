import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  Tab,
  Tabs,
  LinearProgress,
  IconButton,
  useTheme,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  Campaign as CampaignIcon,
  Message as MessageIcon,
  Add as AddIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `dashboard-tab-${index}`,
    'aria-controls': `dashboard-tabpanel-${index}`,
  };
}

const BrandDashboard: React.FC = () => {
  const { user } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Mock data for the dashboard
  const campaignStats = [
    { title: 'Campanhas Ativas', value: 5, color: theme.palette.primary.main },
    { title: 'Influenciadores Contratados', value: 12, color: theme.palette.secondary.main },
    { title: 'Alcance Total', value: '1.2M', color: theme.palette.success.main },
    { title: 'ROI Médio', value: '320%', color: theme.palette.warning.main },
  ];

  const recentCampaigns = [
    {
      id: '1',
      title: 'Lançamento Verão 2023',
      status: 'active',
      influencers: 4,
      engagement: '8.5%',
      reach: '450K',
      progress: 65,
    },
    {
      id: '2',
      title: 'Promoção Black Friday',
      status: 'planning',
      influencers: 8,
      engagement: '-',
      reach: '-',
      progress: 30,
    },
    {
      id: '3',
      title: 'Campanha Dia das Mães',
      status: 'completed',
      influencers: 6,
      engagement: '12.3%',
      reach: '780K',
      progress: 100,
    },
  ];

  const topInfluencers = [
    {
      id: '1',
      name: 'Ana Silva',
      avatar: 'https://via.placeholder.com/40',
      category: 'Moda',
      followers: '1.2M',
      engagement: '4.8%',
    },
    {
      id: '2',
      name: 'Carlos Mendes',
      avatar: 'https://via.placeholder.com/40',
      category: 'Lifestyle',
      followers: '850K',
      engagement: '5.2%',
    },
    {
      id: '3',
      name: 'Juliana Costa',
      avatar: 'https://via.placeholder.com/40',
      category: 'Beleza',
      followers: '2.1M',
      engagement: '3.9%',
    },
    {
      id: '4',
      name: 'Roberto Alves',
      avatar: 'https://via.placeholder.com/40',
      category: 'Fitness',
      followers: '950K',
      engagement: '6.1%',
    },
  ];

  const recentMessages = [
    {
      id: '1',
      sender: 'Ana Silva',
      avatar: 'https://via.placeholder.com/40',
      message: 'Adorei a proposta para a campanha de verão!',
      time: '2h atrás',
      unread: true,
    },
    {
      id: '2',
      sender: 'Carlos Mendes',
      avatar: 'https://via.placeholder.com/40',
      message: 'Podemos discutir os detalhes da colaboração?',
      time: '5h atrás',
      unread: true,
    },
    {
      id: '3',
      sender: 'Juliana Costa',
      avatar: 'https://via.placeholder.com/40',
      message: 'Enviei as métricas da última campanha',
      time: '1d atrás',
      unread: false,
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard da Marca
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Bem-vindo(a) de volta, {user?.name}! Aqui está o resumo das suas campanhas e atividades.
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {campaignStats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderTop: `4px solid ${stat.color}`,
                height: '100%',
              }}
            >
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                {stat.value}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {stat.title}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Tabs */}
      <Paper elevation={2} sx={{ mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="dashboard tabs"
            variant="fullWidth"
          >
            <Tab
              icon={<CampaignIcon />}
              label="Campanhas"
              {...a11yProps(0)}
              sx={{ py: 2 }}
            />
            <Tab
              icon={<PeopleIcon />}
              label="Influenciadores"
              {...a11yProps(1)}
              sx={{ py: 2 }}
            />
            <Tab
              icon={<MessageIcon />}
              label="Mensagens"
              {...a11yProps(2)}
              sx={{ py: 2 }}
            />
            <Tab
              icon={<TrendingUpIcon />}
              label="Analytics"
              {...a11yProps(3)}
              sx={{ py: 2 }}
            />
          </Tabs>
        </Box>

        {/* Campaigns Tab */}
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h6">Suas Campanhas</Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              component={RouterLink}
              to="/campaign/new"
            >
              Nova Campanha
            </Button>
          </Box>

          <Grid container spacing={3}>
            {recentCampaigns.map((campaign) => (
              <Grid item xs={12} md={4} key={campaign.id}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="h6" component="div">
                        {campaign.title}
                      </Typography>
                      <IconButton size="small">
                        <MoreVertIcon />
                      </IconButton>
                    </Box>

                    <Chip
                      label={
                        campaign.status === 'active'
                          ? 'Ativa'
                          : campaign.status === 'planning'
                          ? 'Planejamento'
                          : 'Concluída'
                      }
                      color={
                        campaign.status === 'active'
                          ? 'success'
                          : campaign.status === 'planning'
                          ? 'primary'
                          : 'default'
                      }
                      size="small"
                      sx={{ mb: 2 }}
                    />

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Progresso da Campanha
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={campaign.progress}
                        sx={{ height: 8, borderRadius: 5, mb: 1 }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {campaign.progress}% Completo
                      </Typography>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <Typography variant="body2" color="text.secondary">
                          Influenciadores
                        </Typography>
                        <Typography variant="body1">{campaign.influencers}</Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="body2" color="text.secondary">
                          Engajamento
                        </Typography>
                        <Typography variant="body1">{campaign.engagement}</Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="body2" color="text.secondary">
                          Alcance
                        </Typography>
                        <Typography variant="body1">{campaign.reach}</Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      component={RouterLink}
                      to={`/campaign/${campaign.id}`}
                    >
                      Ver Detalhes
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/* Influencers Tab */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h6">Influenciadores Recomendados</Typography>
            <Button
              variant="contained"
              component={RouterLink}
              to="/search"
            >
              Buscar Influenciadores
            </Button>
          </Box>

          <Grid container spacing={3}>
            {topInfluencers.map((influencer) => (
              <Grid item xs={12} sm={6} key={influencer.id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar
                        src={influencer.avatar}
                        alt={influencer.name}
                        sx={{ width: 56, height: 56, mr: 2 }}
                      />
                      <Box>
                        <Typography variant="h6">{influencer.name}</Typography>
                        <Chip
                          label={influencer.category}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      </Box>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Seguidores
                        </Typography>
                        <Typography variant="body1">{influencer.followers}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Taxa de Engajamento
                        </Typography>
                        <Typography variant="body1">{influencer.engagement}</Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      component={RouterLink}
                      to={`/influencer/profile/${influencer.id}`}
                    >
                      Ver Perfil
                    </Button>
                    <Button
                      size="small"
                      component={RouterLink}
                      to={`/messages?user=${influencer.id}`}
                    >
                      Enviar Mensagem
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/* Messages Tab */}
        <TabPanel value={tabValue} index={2}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h6">Mensagens Recentes</Typography>
            <Button
              variant="contained"
              component={RouterLink}
              to="/messages"
            >
              Ver Todas as Mensagens
            </Button>
          </Box>

          <Paper elevation={1}>
            <List sx={{ width: '100%' }}>
              {recentMessages.map((message, index) => (
                <React.Fragment key={message.id}>
                  <ListItem
                    alignItems="flex-start"
                    secondaryAction={
                      <IconButton edge="end" aria-label="more">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    sx={{
                      bgcolor: message.unread ? 'rgba(63, 81, 181, 0.08)' : 'transparent',
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar alt={message.sender} src={message.avatar} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography
                            component="span"
                            variant="body1"
                            sx={{ fontWeight: message.unread ? 'bold' : 'normal' }}
                          >
                            {message.sender}
                          </Typography>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.secondary"
                          >
                            {message.time}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {message.message}
                        </Typography>
                      }
                    />
                  </ListItem>
                  {index < recentMessages.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </TabPanel>

        {/* Analytics Tab */}
        <TabPanel value={tabValue} index={3}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Análise de Desempenho
          </Typography>
          <Paper elevation={1} sx={{ p: 3 }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Dados de análise detalhados estarão disponíveis em breve.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Estamos trabalhando para fornecer métricas avançadas e insights para suas campanhas.
            </Typography>
          </Paper>
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default BrandDashboard;