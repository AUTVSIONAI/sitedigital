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
  Business as BusinessIcon,
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

const InfluencerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Mock data for the dashboard
  const profileStats = [
    { title: 'Campanhas Ativas', value: 3, color: theme.palette.primary.main },
    { title: 'Propostas Recebidas', value: 8, color: theme.palette.secondary.main },
    { title: 'Alcance Total', value: '450K', color: theme.palette.success.main },
    { title: 'Taxa de Engajamento', value: '4.8%', color: theme.palette.warning.main },
  ];

  const activeCampaigns = [
    {
      id: '1',
      title: 'Lançamento Verão 2023',
      brand: 'Moda Verão',
      brandLogo: 'https://via.placeholder.com/40',
      status: 'active',
      payment: 'R$ 3.500',
      deadline: '15/12/2023',
      progress: 65,
    },
    {
      id: '2',
      title: 'Promoção Black Friday',
      brand: 'Tech Store',
      brandLogo: 'https://via.placeholder.com/40',
      status: 'pending',
      payment: 'R$ 2.800',
      deadline: '20/11/2023',
      progress: 0,
    },
    {
      id: '3',
      title: 'Campanha Dia das Mães',
      brand: 'Beleza Natural',
      brandLogo: 'https://via.placeholder.com/40',
      status: 'completed',
      payment: 'R$ 4.200',
      deadline: '01/05/2023',
      progress: 100,
    },
  ];

  const brandOpportunities = [
    {
      id: '1',
      name: 'Moda Sustentável',
      logo: 'https://via.placeholder.com/40',
      category: 'Moda',
      campaignType: 'Lançamento de Produto',
      budget: 'R$ 3.000 - R$ 5.000',
      match: '95%',
    },
    {
      id: '2',
      name: 'Tech Gadgets',
      logo: 'https://via.placeholder.com/40',
      category: 'Tecnologia',
      campaignType: 'Review de Produto',
      budget: 'R$ 2.500 - R$ 4.000',
      match: '87%',
    },
    {
      id: '3',
      name: 'Saúde Natural',
      logo: 'https://via.placeholder.com/40',
      category: 'Saúde e Bem-estar',
      campaignType: 'Conteúdo Educativo',
      budget: 'R$ 1.800 - R$ 3.500',
      match: '82%',
    },
    {
      id: '4',
      name: 'Viagens Incríveis',
      logo: 'https://via.placeholder.com/40',
      category: 'Turismo',
      campaignType: 'Parceria de Longo Prazo',
      budget: 'R$ 4.000 - R$ 8.000',
      match: '78%',
    },
  ];

  const recentMessages = [
    {
      id: '1',
      sender: 'Moda Verão',
      avatar: 'https://via.placeholder.com/40',
      message: 'Gostaríamos de discutir os detalhes da próxima fase da campanha.',
      time: '1h atrás',
      unread: true,
    },
    {
      id: '2',
      sender: 'Tech Store',
      avatar: 'https://via.placeholder.com/40',
      message: 'Sua proposta para a campanha Black Friday foi aprovada!',
      time: '3h atrás',
      unread: true,
    },
    {
      id: '3',
      sender: 'Saúde Natural',
      avatar: 'https://via.placeholder.com/40',
      message: 'Temos interesse em trabalhar com você em nossa próxima campanha.',
      time: '1d atrás',
      unread: false,
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard do Influenciador
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Bem-vindo(a) de volta, {user?.name}! Aqui está o resumo das suas campanhas e oportunidades.
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {profileStats.map((stat, index) => (
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
              icon={<BusinessIcon />}
              label="Oportunidades"
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
              to="/search"
            >
              Buscar Novas Oportunidades
            </Button>
          </Box>

          <Grid container spacing={3}>
            {activeCampaigns.map((campaign) => (
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

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar
                        src={campaign.brandLogo}
                        alt={campaign.brand}
                        sx={{ width: 24, height: 24, mr: 1 }}
                      />
                      <Typography variant="body2">{campaign.brand}</Typography>
                    </Box>

                    <Chip
                      label={
                        campaign.status === 'active'
                          ? 'Ativa'
                          : campaign.status === 'pending'
                          ? 'Pendente'
                          : 'Concluída'
                      }
                      color={
                        campaign.status === 'active'
                          ? 'success'
                          : campaign.status === 'pending'
                          ? 'warning'
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
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Pagamento
                        </Typography>
                        <Typography variant="body1">{campaign.payment}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Prazo
                        </Typography>
                        <Typography variant="body1">{campaign.deadline}</Typography>
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

        {/* Opportunities Tab */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h6">Oportunidades Recomendadas</Typography>
            <Button
              variant="contained"
              component={RouterLink}
              to="/search"
            >
              Ver Todas as Oportunidades
            </Button>
          </Box>

          <Grid container spacing={3}>
            {brandOpportunities.map((brand) => (
              <Grid item xs={12} sm={6} key={brand.id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar
                        src={brand.logo}
                        alt={brand.name}
                        sx={{ width: 56, height: 56, mr: 2 }}
                      />
                      <Box>
                        <Typography variant="h6">{brand.name}</Typography>
                        <Chip
                          label={brand.category}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      </Box>
                      <Box sx={{ ml: 'auto' }}>
                        <Chip
                          label={`Match ${brand.match}`}
                          color="success"
                          sx={{
                            fontWeight: 'bold',
                            bgcolor: parseInt(brand.match) > 90 ? '#4caf50' : '#ff9800',
                          }}
                        />
                      </Box>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Tipo de Campanha
                        </Typography>
                        <Typography variant="body1">{brand.campaignType}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Orçamento
                        </Typography>
                        <Typography variant="body1">{brand.budget}</Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      component={RouterLink}
                      to={`/brand/profile/${brand.id}`}
                    >
                      Ver Perfil
                    </Button>
                    <Button
                      size="small"
                      component={RouterLink}
                      to={`/messages?user=${brand.id}`}
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
              Estamos trabalhando para fornecer métricas avançadas e insights para seu perfil e campanhas.
            </Typography>
          </Paper>
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default InfluencerDashboard;