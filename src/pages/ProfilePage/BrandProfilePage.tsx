import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Avatar,
  Button,
  Divider,
  Chip,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Tab,
  Tabs,
  IconButton,
  useTheme,
  useMediaQuery,
  Link,
  Rating,
} from '@mui/material';
import {
  Instagram as InstagramIcon,
  YouTube as YouTubeIcon,
  Twitter as TwitterIcon,
  Facebook as FacebookIcon,
  Language as LanguageIcon,
  LocationOn as LocationIcon,
  Category as CategoryIcon,
  Business as BusinessIcon,
  Mail as MailIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Star as StarIcon,
  Campaign as CampaignIcon,
  PhotoLibrary as PhotoLibraryIcon,
  People as PeopleIcon,
  AttachMoney as AttachMoneyIcon,
  Timeline as TimelineIcon,
  Public as PublicIcon,
  Store as StoreIcon,
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
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `profile-tab-${index}`,
    'aria-controls': `profile-tabpanel-${index}`,
  };
}

interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  category: string;
}

interface Campaign {
  id: string;
  title: string;
  image: string;
  status: 'active' | 'completed' | 'draft';
  date: string;
  description: string;
  budget: string;
  influencerCount: number;
  campaignType: string;
  goals: string[];
}

interface Influencer {
  id: string;
  name: string;
  avatar: string;
  category: string;
  followers: string;
  engagement: string;
  platforms: string[];
  location: string;
  match?: string;
}

interface Review {
  id: string;
  influencer: {
    id: string;
    name: string;
    avatar: string;
  };
  rating: number;
  comment: string;
  date: string;
}

interface BrandData {
  id: string;
  name: string;
  logo: string;
  coverPhoto: string;
  description: string;
  industry: string;
  location: string;
  founded: string;
  size: string;
  website: string;
  socialLinks: {
    instagram?: string;
    youtube?: string;
    twitter?: string;
    facebook?: string;
    linkedin?: string;
  };
  tags: string[];
  values: string[];
  products: Product[];
  campaigns: Campaign[];
  topInfluencers: Influencer[];
  reviews: Review[];
  campaignTypes: string[];
  budgetRange: string;
}

const BrandProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [tabValue, setTabValue] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [brand, setBrand] = useState<BrandData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API call to fetch brand data
    const fetchBrandData = () => {
      setLoading(true);
      // Simulate API delay
      setTimeout(() => {
        // Mock data for the brand
        const mockBrand: BrandData = {
          id: id || '1',
          name: 'Moda Sustentável',
          logo: 'https://via.placeholder.com/150',
          coverPhoto: 'https://via.placeholder.com/1200x300',
          description: 'Marca de roupas sustentáveis com foco em moda consciente e ética. Trabalhamos com materiais reciclados e processos de produção que respeitam o meio ambiente e as pessoas envolvidas.',
          industry: 'Moda',
          location: 'São Paulo, SP',
          founded: '2018',
          size: '50-100 funcionários',
          website: 'https://modasustentavel.com',
          socialLinks: {
            instagram: 'https://instagram.com/modasustentavel',
            facebook: 'https://facebook.com/modasustentavel',
            twitter: 'https://twitter.com/modasustentavel',
            linkedin: 'https://linkedin.com/company/modasustentavel',
          },
          tags: ['Moda', 'Sustentabilidade', 'Ética', 'Roupas', 'Acessórios'],
          values: ['Sustentabilidade', 'Transparência', 'Ética', 'Inovação', 'Responsabilidade Social'],
          products: [
            {
              id: '1',
              name: 'Coleção Verão 2023',
              image: 'https://via.placeholder.com/300',
              description: 'Roupas leves e sustentáveis para o verão, feitas com tecidos reciclados e tingimento natural.',
              category: 'Roupas',
            },
            {
              id: '2',
              name: 'Acessórios Eco',
              image: 'https://via.placeholder.com/300',
              description: 'Bolsas, cintos e outros acessórios feitos com materiais reciclados e processos sustentáveis.',
              category: 'Acessórios',
            },
            {
              id: '3',
              name: 'Linha Casual',
              image: 'https://via.placeholder.com/300',
              description: 'Roupas casuais para o dia a dia, confortáveis e produzidas com algodão orgânico.',
              category: 'Roupas',
            },
            {
              id: '4',
              name: 'Calçados Sustentáveis',
              image: 'https://via.placeholder.com/300',
              description: 'Tênis e sandálias feitos com materiais reciclados e solados biodegradáveis.',
              category: 'Calçados',
            },
          ],
          campaigns: [
            {
              id: '1',
              title: 'Lançamento Coleção Verão',
              image: 'https://via.placeholder.com/300',
              status: 'active',
              date: '2023-06-01',
              description: 'Campanha para divulgação da nova coleção de verão com peças sustentáveis.',
              budget: 'R$ 3.000 - R$ 5.000',
              influencerCount: 5,
              campaignType: 'Lançamento de Produto',
              goals: ['Aumentar visibilidade da marca', 'Divulgar nova coleção', 'Gerar vendas'],
            },
            {
              id: '2',
              title: 'Conscientização Ambiental',
              image: 'https://via.placeholder.com/300',
              status: 'completed',
              date: '2023-04-15',
              description: 'Campanha educativa sobre moda sustentável e impacto ambiental da indústria da moda.',
              budget: 'R$ 2.000 - R$ 4.000',
              influencerCount: 3,
              campaignType: 'Conteúdo Educativo',
              goals: ['Educar sobre sustentabilidade', 'Aumentar engajamento', 'Fortalecer valores da marca'],
            },
            {
              id: '3',
              title: 'Programa de Embaixadores',
              image: 'https://via.placeholder.com/300',
              status: 'active',
              date: '2023-01-10',
              description: 'Programa de longo prazo com influenciadores que compartilham dos valores da marca.',
              budget: 'R$ 15.000 - R$ 25.000',
              influencerCount: 2,
              campaignType: 'Embaixador da Marca',
              goals: ['Criar relacionamento de longo prazo', 'Aumentar credibilidade', 'Gerar conteúdo autêntico'],
            },
            {
              id: '4',
              title: 'Black Friday Sustentável',
              image: 'https://via.placeholder.com/300',
              status: 'draft',
              date: '2023-11-01',
              description: 'Campanha para Black Friday com foco em consumo consciente e promoções sustentáveis.',
              budget: 'R$ 5.000 - R$ 8.000',
              influencerCount: 0,
              campaignType: 'Promoção Sazonal',
              goals: ['Aumentar vendas', 'Promover consumo consciente', 'Destacar-se da concorrência'],
            },
          ],
          topInfluencers: [
            {
              id: '1',
              name: 'Ana Silva',
              avatar: 'https://via.placeholder.com/150',
              category: 'Moda',
              followers: '1.2M',
              engagement: '4.8%',
              platforms: ['Instagram', 'TikTok', 'YouTube'],
              location: 'São Paulo, SP',
              match: '95%',
            },
            {
              id: '5',
              name: 'Fernanda Lima',
              avatar: 'https://via.placeholder.com/150',
              category: 'Lifestyle',
              followers: '1.5M',
              engagement: '4.2%',
              platforms: ['Instagram', 'YouTube', 'Blog'],
              location: 'Florianópolis, SC',
              match: '87%',
            },
            {
              id: '3',
              name: 'Juliana Costa',
              avatar: 'https://via.placeholder.com/150',
              category: 'Beleza',
              followers: '2.1M',
              engagement: '3.9%',
              platforms: ['Instagram', 'YouTube'],
              location: 'Belo Horizonte, MG',
              match: '82%',
            },
          ],
          reviews: [
            {
              id: '1',
              influencer: {
                id: '1',
                name: 'Ana Silva',
                avatar: 'https://via.placeholder.com/50',
              },
              rating: 5,
              comment: 'Adorei trabalhar com a Moda Sustentável! A equipe é muito profissional e os produtos são de excelente qualidade. Os valores da marca se alinham perfeitamente com o que acredito.',
              date: '2023-06-20',
            },
            {
              id: '2',
              influencer: {
                id: '5',
                name: 'Fernanda Lima',
                avatar: 'https://via.placeholder.com/50',
              },
              rating: 4.5,
              comment: 'Ótima parceria! A marca tem um propósito muito claro e isso facilita a criação de conteúdo autêntico. Meu público adorou conhecer mais sobre moda sustentável.',
              date: '2023-05-05',
            },
            {
              id: '3',
              influencer: {
                id: '3',
                name: 'Juliana Costa',
                avatar: 'https://via.placeholder.com/50',
              },
              rating: 5,
              comment: 'Uma das melhores marcas com as quais já trabalhei. Comunicação clara, briefing detalhado e produtos incríveis. Recomendo muito!',
              date: '2023-03-15',
            },
          ],
          campaignTypes: ['Lançamento de Produto', 'Conteúdo Educativo', 'Embaixador da Marca', 'Promoção Sazonal', 'Review de Produto'],
          budgetRange: 'R$ 2.000 - R$ 25.000',
        };

        setBrand(mockBrand);
        setLoading(false);
      }, 1000);
    };

    fetchBrandData();
  }, [id]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // Here you would also make an API call to save the bookmark status
  };

  if (loading || !brand) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="h5">Carregando perfil...</Typography>
        </Box>
      </Container>
    );
  }

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return <InstagramIcon />;
      case 'youtube':
        return <YouTubeIcon />;
      case 'twitter':
        return <TwitterIcon />;
      case 'facebook':
        return <FacebookIcon />;
      case 'linkedin':
        return <BusinessIcon />;
      default:
        return <LanguageIcon />;
    }
  };

  return (
    <Box>
      {/* Cover Photo */}
      <Box
        sx={{
          height: { xs: '150px', md: '300px' },
          width: '100%',
          position: 'relative',
          backgroundImage: `url(${brand.coverPhoto})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <Container maxWidth="lg">
        {/* Profile Header */}
        <Paper
          elevation={3}
          sx={{
            mt: { xs: -5, md: -8 },
            mb: 4,
            position: 'relative',
            p: { xs: 2, md: 3 },
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={3} sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
              <Avatar
                src={brand.logo}
                alt={brand.name}
                sx={{
                  width: { xs: 120, md: 150 },
                  height: { xs: 120, md: 150 },
                  border: '4px solid white',
                  boxShadow: theme.shadows[3],
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Typography variant="h4" component="h1" gutterBottom>
                  {brand.name}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  <Chip
                    icon={<CategoryIcon />}
                    label={brand.industry}
                    color="primary"
                    variant="outlined"
                  />
                  <Chip
                    icon={<LocationIcon />}
                    label={brand.location}
                    variant="outlined"
                  />
                  <Chip
                    icon={<StoreIcon />}
                    label={brand.founded}
                    variant="outlined"
                  />
                  <Chip
                    icon={<PeopleIcon />}
                    label={brand.size}
                    variant="outlined"
                  />
                </Box>
                <Typography variant="body1" paragraph>
                  {brand.description}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  {Object.entries(brand.socialLinks).map(([platform, url]) => (
                    url && (
                      <IconButton
                        key={platform}
                        component="a"
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        color="primary"
                      >
                        {getSocialIcon(platform)}
                      </IconButton>
                    )
                  ))}
                  {brand.website && (
                    <IconButton
                      component="a"
                      href={brand.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      color="primary"
                    >
                      <LanguageIcon />
                    </IconButton>
                  )}
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={3}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-end' }, gap: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<MailIcon />}
                  component={RouterLink}
                  to={`/messages?user=${brand.id}`}
                  fullWidth={isMobile}
                >
                  Enviar Mensagem
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                  onClick={toggleBookmark}
                  fullWidth={isMobile}
                >
                  {isBookmarked ? 'Salvo' : 'Salvar Perfil'}
                </Button>
                {user?.type === 'influencer' && (
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<CampaignIcon />}
                    component={RouterLink}
                    to={`/campaigns?brand=${brand.id}`}
                    fullWidth={isMobile}
                  >
                    Ver Campanhas
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Tabs */}
        <Box sx={{ width: '100%', mb: 4 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="profile tabs"
              variant={isMobile ? 'scrollable' : 'fullWidth'}
              scrollButtons={isMobile ? 'auto' : false}
            >
              <Tab label="Visão Geral" {...a11yProps(0)} />
              <Tab label="Produtos" {...a11yProps(1)} />
              <Tab label="Campanhas" {...a11yProps(2)} />
              <Tab label="Influenciadores" {...a11yProps(3)} />
              <Tab label="Avaliações" {...a11yProps(4)} />
            </Tabs>
          </Box>

          {/* Overview Tab */}
          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={4}>
              {/* Brand Values */}
              <Grid item xs={12} md={6}>
                <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <StarIcon sx={{ mr: 1 }} /> Valores da Marca
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <Card>
                  <CardContent>
                    <List>
                      {brand.values.map((value, index) => (
                        <ListItem key={index}>
                          <ListItemIcon>
                            <StarIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText primary={value} />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>

              {/* Campaign Types */}
              <Grid item xs={12} md={6}>
                <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <CampaignIcon sx={{ mr: 1 }} /> Tipos de Campanha
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {brand.campaignTypes.map((type, index) => (
                        <Chip key={index} label={type} color="primary" variant="outlined" />
                      ))}
                    </Box>
                    <Box sx={{ mt: 3 }}>
                      <Typography variant="subtitle1" gutterBottom>
                        Faixa de Orçamento:
                      </Typography>
                      <Typography variant="h6" color="primary">
                        {brand.budgetRange}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Tags */}
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <CategoryIcon sx={{ mr: 1 }} /> Tags
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {brand.tags.map((tag, index) => (
                        <Chip
                          key={index}
                          label={tag}
                          color="secondary"
                          variant="outlined"
                          sx={{ fontSize: '1rem', py: 2 }}
                        />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>

          {/* Products Tab */}
          <TabPanel value={tabValue} index={1}>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <StoreIcon sx={{ mr: 1 }} /> Produtos e Coleções
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              {brand.products.map((product) => (
                <Grid item xs={12} sm={6} md={3} key={product.id}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={product.image}
                      alt={product.name}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" gutterBottom>
                        {product.name}
                      </Typography>
                      <Chip
                        size="small"
                        label={product.category}
                        color="primary"
                        variant="outlined"
                        sx={{ mb: 2 }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {product.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabPanel>

          {/* Campaigns Tab */}
          <TabPanel value={tabValue} index={2}>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <CampaignIcon sx={{ mr: 1 }} /> Campanhas
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              {brand.campaigns.map((campaign) => (
                <Grid item xs={12} sm={6} key={campaign.id}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={campaign.image}
                      alt={campaign.title}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6">{campaign.title}</Typography>
                        <Chip
                          label={{
                            active: 'Ativa',
                            completed: 'Concluída',
                            draft: 'Rascunho',
                          }[campaign.status]}
                          color={{
                            active: 'success',
                            completed: 'primary',
                            draft: 'default',
                          }[campaign.status] as 'success' | 'primary' | 'default'}
                          size="small"
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {campaign.description}
                      </Typography>
                      <Divider sx={{ my: 2 }} />
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Tipo
                          </Typography>
                          <Typography variant="body1">{campaign.campaignType}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Orçamento
                          </Typography>
                          <Typography variant="body1">{campaign.budget}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Data
                          </Typography>
                          <Typography variant="body1">{new Date(campaign.date).toLocaleDateString('pt-BR')}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Influenciadores
                          </Typography>
                          <Typography variant="body1">{campaign.influencerCount}</Typography>
                        </Grid>
                      </Grid>
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Objetivos
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                          {campaign.goals.map((goal, index) => (
                            <Chip key={index} label={goal} size="small" />
                          ))}
                        </Box>
                      </Box>
                    </CardContent>
                    {user?.type === 'influencer' && campaign.status === 'active' && (
                      <Box sx={{ p: 2, pt: 0 }}>
                        <Button
                          variant="outlined"
                          color="primary"
                          fullWidth
                          component={RouterLink}
                          to={`/campaigns/${campaign.id}`}
                        >
                          Ver Detalhes
                        </Button>
                      </Box>
                    )}
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabPanel>

          {/* Influencers Tab */}
          <TabPanel value={tabValue} index={3}>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <PeopleIcon sx={{ mr: 1 }} /> Influenciadores Parceiros
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              {brand.topInfluencers.map((influencer) => (
                <Grid item xs={12} sm={6} md={4} key={influencer.id}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar
                          src={influencer.avatar}
                          alt={influencer.name}
                          sx={{ width: 64, height: 64, mr: 2 }}
                        />
                        <Box>
                          <Typography variant="h6">{influencer.name}</Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Chip
                              label={influencer.category}
                              size="small"
                              color="primary"
                              variant="outlined"
                              sx={{ mr: 1 }}
                            />
                            {influencer.match && (
                              <Chip
                                label={`Match ${influencer.match}`}
                                size="small"
                                color="success"
                                sx={{
                                  fontWeight: 'bold',
                                  bgcolor: parseInt(influencer.match) > 90 ? '#4caf50' : '#ff9800',
                                }}
                              />
                            )}
                          </Box>
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
                            Engajamento
                          </Typography>
                          <Typography variant="body1">{influencer.engagement}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body2" color="text.secondary">
                            Plataformas
                          </Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                            {influencer.platforms.map((platform) => (
                              <Chip key={platform} label={platform} size="small" />
                            ))}
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body2" color="text.secondary">
                            Localização
                          </Typography>
                          <Typography variant="body1">{influencer.location}</Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                    <Box sx={{ p: 2, pt: 0 }}>
                      <Button
                        size="small"
                        component={RouterLink}
                        to={`/influencer/profile/${influencer.id}`}
                        fullWidth
                      >
                        Ver Perfil
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabPanel>

          {/* Reviews Tab */}
          <TabPanel value={tabValue} index={4}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center' }}>
                <StarIcon sx={{ mr: 1 }} /> Avaliações
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h4" sx={{ mr: 1 }}>
                  {brand.reviews.reduce((total, review) => total + review.rating, 0) / brand.reviews.length}
                </Typography>
                <Rating
                  value={brand.reviews.reduce((total, review) => total + review.rating, 0) / brand.reviews.length}
                  precision={0.5}
                  readOnly
                />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                  ({brand.reviews.length} avaliações)
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              {brand.reviews.map((review) => (
                <Grid item xs={12} key={review.id}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar
                          src={review.influencer.avatar}
                          alt={review.influencer.name}
                          sx={{ mr: 2 }}
                        />
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="h6">
                            <Link
                              component={RouterLink}
                              to={`/influencer/profile/${review.influencer.id}`}
                              color="inherit"
                              underline="hover"
                            >
                              {review.influencer.name}
                            </Link>
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {new Date(review.date).toLocaleDateString('pt-BR')}
                          </Typography>
                        </Box>
                        <Rating value={review.rating} precision={0.5} readOnly />
                      </Box>
                      <Typography variant="body1">{review.comment}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabPanel>
        </Box>
      </Container>
    </Box>
  );
};

export default BrandProfilePage;