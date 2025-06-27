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
  Group as GroupIcon,
  Favorite as FavoriteIcon,
  Mail as MailIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Star as StarIcon,
  BarChart as BarChartIcon,
  PhotoLibrary as PhotoLibraryIcon,
  Videocam as VideocamIcon,
  Campaign as CampaignIcon,
  Timeline as TimelineIcon,
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

interface Post {
  id: string;
  type: 'image' | 'video';
  thumbnail: string;
  title: string;
  platform: string;
  engagement: string;
  date: string;
}

interface Campaign {
  id: string;
  title: string;
  brand: {
    id: string;
    name: string;
    logo: string;
  };
  status: 'active' | 'completed' | 'pending';
  date: string;
  description: string;
}

interface Review {
  id: string;
  brand: {
    id: string;
    name: string;
    logo: string;
  };
  rating: number;
  comment: string;
  date: string;
}

interface InfluencerData {
  id: string;
  name: string;
  avatar: string;
  coverPhoto: string;
  bio: string;
  category: string;
  location: string;
  followers: {
    instagram: string;
    youtube: string;
    tiktok: string;
    twitter: string;
  };
  engagement: string;
  languages: string[];
  tags: string[];
  socialLinks: {
    instagram?: string;
    youtube?: string;
    tiktok?: string;
    twitter?: string;
    facebook?: string;
    website?: string;
  };
  audienceData: {
    ageGroups: { label: string; value: number }[];
    genderDistribution: { label: string; value: number }[];
    topLocations: { label: string; value: number }[];
    interests: { label: string; value: number }[];
  };
  posts: Post[];
  campaigns: Campaign[];
  reviews: Review[];
  rates: {
    postType: string;
    price: string;
  }[];
}

const InfluencerProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [tabValue, setTabValue] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [influencer, setInfluencer] = useState<InfluencerData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API call to fetch influencer data
    const fetchInfluencerData = () => {
      setLoading(true);
      // Simulate API delay
      setTimeout(() => {
        // Mock data for the influencer
        const mockInfluencer: InfluencerData = {
          id: id || '1',
          name: 'Ana Silva',
          avatar: 'https://via.placeholder.com/150',
          coverPhoto: 'https://via.placeholder.com/1200x300',
          bio: 'Criadora de conteúdo de moda e lifestyle. Compartilho dicas de estilo, tendências e meu dia a dia. Trabalho com marcas que se alinham com meus valores e estilo pessoal.',
          category: 'Moda',
          location: 'São Paulo, SP',
          followers: {
            instagram: '1.2M',
            youtube: '850K',
            tiktok: '2.1M',
            twitter: '500K',
          },
          engagement: '4.8%',
          languages: ['Português', 'Inglês', 'Espanhol'],
          tags: ['Moda', 'Beleza', 'Lifestyle', 'Viagem', 'Sustentabilidade'],
          socialLinks: {
            instagram: 'https://instagram.com/anasilva',
            youtube: 'https://youtube.com/anasilva',
            tiktok: 'https://tiktok.com/@anasilva',
            twitter: 'https://twitter.com/anasilva',
            facebook: 'https://facebook.com/anasilva',
            website: 'https://anasilva.com',
          },
          audienceData: {
            ageGroups: [
              { label: '18-24', value: 35 },
              { label: '25-34', value: 40 },
              { label: '35-44', value: 15 },
              { label: '45+', value: 10 },
            ],
            genderDistribution: [
              { label: 'Feminino', value: 75 },
              { label: 'Masculino', value: 23 },
              { label: 'Outro', value: 2 },
            ],
            topLocations: [
              { label: 'São Paulo', value: 45 },
              { label: 'Rio de Janeiro', value: 20 },
              { label: 'Belo Horizonte', value: 10 },
              { label: 'Curitiba', value: 8 },
              { label: 'Outros', value: 17 },
            ],
            interests: [
              { label: 'Moda', value: 85 },
              { label: 'Beleza', value: 70 },
              { label: 'Viagem', value: 65 },
              { label: 'Gastronomia', value: 45 },
              { label: 'Fitness', value: 40 },
            ],
          },
          posts: [
            {
              id: '1',
              type: 'image',
              thumbnail: 'https://via.placeholder.com/300',
              title: 'Tendências de verão 2023',
              platform: 'Instagram',
              engagement: '15.2K',
              date: '2023-06-15',
            },
            {
              id: '2',
              type: 'video',
              thumbnail: 'https://via.placeholder.com/300',
              title: 'Dicas de maquiagem para o dia a dia',
              platform: 'YouTube',
              engagement: '45.8K',
              date: '2023-05-22',
            },
            {
              id: '3',
              type: 'image',
              thumbnail: 'https://via.placeholder.com/300',
              title: 'Parceria com marca de roupas sustentáveis',
              platform: 'Instagram',
              engagement: '12.5K',
              date: '2023-04-10',
            },
            {
              id: '4',
              type: 'video',
              thumbnail: 'https://via.placeholder.com/300',
              title: 'Tour pelo meu guarda-roupa',
              platform: 'TikTok',
              engagement: '120K',
              date: '2023-03-05',
            },
            {
              id: '5',
              type: 'image',
              thumbnail: 'https://via.placeholder.com/300',
              title: 'Look do dia: evento de moda',
              platform: 'Instagram',
              engagement: '18.3K',
              date: '2023-02-20',
            },
            {
              id: '6',
              type: 'video',
              thumbnail: 'https://via.placeholder.com/300',
              title: 'Rotina matinal de skincare',
              platform: 'YouTube',
              engagement: '32.7K',
              date: '2023-01-15',
            },
          ],
          campaigns: [
            {
              id: '1',
              title: 'Lançamento Coleção Verão',
              brand: {
                id: '1',
                name: 'Moda Sustentável',
                logo: 'https://via.placeholder.com/50',
              },
              status: 'active',
              date: '2023-06-01',
              description: 'Campanha para divulgação da nova coleção de verão com peças sustentáveis.',
            },
            {
              id: '2',
              title: 'Review de Produtos de Beleza',
              brand: {
                id: '3',
                name: 'Beleza Natural',
                logo: 'https://via.placeholder.com/50',
              },
              status: 'completed',
              date: '2023-04-15',
              description: 'Review honesto de produtos de beleza naturais e veganos.',
            },
            {
              id: '3',
              title: 'Embaixadora da Marca',
              brand: {
                id: '5',
                name: 'Viagens Incríveis',
                logo: 'https://via.placeholder.com/50',
              },
              status: 'completed',
              date: '2023-02-10',
              description: 'Parceria de longo prazo como embaixadora da agência de viagens.',
            },
          ],
          reviews: [
            {
              id: '1',
              brand: {
                id: '1',
                name: 'Moda Sustentável',
                logo: 'https://via.placeholder.com/50',
              },
              rating: 5,
              comment: 'Excelente trabalho! Ana entregou conteúdo de alta qualidade e dentro do prazo. A campanha teve um alcance muito além do esperado.',
              date: '2023-06-20',
            },
            {
              id: '2',
              brand: {
                id: '3',
                name: 'Beleza Natural',
                logo: 'https://via.placeholder.com/50',
              },
              rating: 4.5,
              comment: 'Ótima parceria! Ana é muito profissional e criativa. Os conteúdos tiveram boa recepção do público.',
              date: '2023-05-05',
            },
            {
              id: '3',
              brand: {
                id: '5',
                name: 'Viagens Incríveis',
                logo: 'https://via.placeholder.com/50',
              },
              rating: 5,
              comment: 'Parceria incrível! Ana é extremamente comprometida e entrega conteúdos autênticos que engajam seu público.',
              date: '2023-03-15',
            },
          ],
          rates: [
            {
              postType: 'Post no Feed (Instagram)',
              price: 'R$ 3.000 - R$ 5.000',
            },
            {
              postType: 'Stories (Instagram)',
              price: 'R$ 1.500 - R$ 2.500',
            },
            {
              postType: 'Reels/TikTok',
              price: 'R$ 4.000 - R$ 6.000',
            },
            {
              postType: 'Vídeo no YouTube',
              price: 'R$ 8.000 - R$ 12.000',
            },
            {
              postType: 'Embaixador(a) da Marca (mensal)',
              price: 'R$ 15.000 - R$ 25.000',
            },
          ],
        };

        setInfluencer(mockInfluencer);
        setLoading(false);
      }, 1000);
    };

    fetchInfluencerData();
  }, [id]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // Here you would also make an API call to save the bookmark status
  };

  if (loading || !influencer) {
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
          backgroundImage: `url(${influencer.coverPhoto})`,
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
                src={influencer.avatar}
                alt={influencer.name}
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
                  {influencer.name}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  <Chip
                    icon={<CategoryIcon />}
                    label={influencer.category}
                    color="primary"
                    variant="outlined"
                  />
                  <Chip
                    icon={<LocationIcon />}
                    label={influencer.location}
                    variant="outlined"
                  />
                  <Chip
                    icon={<GroupIcon />}
                    label={`${Object.values(influencer.followers).reduce(
                      (total, followers) => total + parseInt(followers.replace(/[^0-9]/g, '')),
                      0
                    )} seguidores`}
                    variant="outlined"
                  />
                  <Chip
                    icon={<FavoriteIcon />}
                    label={`${influencer.engagement} engajamento`}
                    variant="outlined"
                  />
                </Box>
                <Typography variant="body1" paragraph>
                  {influencer.bio}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  {Object.entries(influencer.socialLinks).map(([platform, url]) => (
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
                  to={`/messages?user=${influencer.id}`}
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
                {user?.type === 'brand' && (
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<CampaignIcon />}
                    component={RouterLink}
                    to={`/campaigns/create?influencer=${influencer.id}`}
                    fullWidth={isMobile}
                  >
                    Propor Campanha
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
              <Tab label="Conteúdos" {...a11yProps(1)} />
              <Tab label="Campanhas" {...a11yProps(2)} />
              <Tab label="Avaliações" {...a11yProps(3)} />
              <Tab label="Taxas" {...a11yProps(4)} />
            </Tabs>
          </Box>

          {/* Overview Tab */}
          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={4}>
              {/* Audience Demographics */}
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <BarChartIcon sx={{ mr: 1 }} /> Demografia da Audiência
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <Grid container spacing={3}>
                  {/* Age Groups */}
                  <Grid item xs={12} md={6} lg={3}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>Faixa Etária</Typography>
                        <List dense>
                          {influencer.audienceData.ageGroups.map((item) => (
                            <ListItem key={item.label}>
                              <ListItemText
                                primary={item.label}
                                secondary={
                                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                                    <Box
                                      sx={{
                                        width: `${item.value}%`,
                                        height: 8,
                                        bgcolor: 'primary.main',
                                        borderRadius: 1,
                                        mr: 1,
                                      }}
                                    />
                                    <Typography variant="body2">{item.value}%</Typography>
                                  </Box>
                                }
                              />
                            </ListItem>
                          ))}
                        </List>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Gender Distribution */}
                  <Grid item xs={12} md={6} lg={3}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>Gênero</Typography>
                        <List dense>
                          {influencer.audienceData.genderDistribution.map((item) => (
                            <ListItem key={item.label}>
                              <ListItemText
                                primary={item.label}
                                secondary={
                                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                                    <Box
                                      sx={{
                                        width: `${item.value}%`,
                                        height: 8,
                                        bgcolor: 'secondary.main',
                                        borderRadius: 1,
                                        mr: 1,
                                      }}
                                    />
                                    <Typography variant="body2">{item.value}%</Typography>
                                  </Box>
                                }
                              />
                            </ListItem>
                          ))}
                        </List>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Top Locations */}
                  <Grid item xs={12} md={6} lg={3}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>Localização</Typography>
                        <List dense>
                          {influencer.audienceData.topLocations.map((item) => (
                            <ListItem key={item.label}>
                              <ListItemText
                                primary={item.label}
                                secondary={
                                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                                    <Box
                                      sx={{
                                        width: `${item.value}%`,
                                        height: 8,
                                        bgcolor: 'info.main',
                                        borderRadius: 1,
                                        mr: 1,
                                      }}
                                    />
                                    <Typography variant="body2">{item.value}%</Typography>
                                  </Box>
                                }
                              />
                            </ListItem>
                          ))}
                        </List>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Interests */}
                  <Grid item xs={12} md={6} lg={3}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>Interesses</Typography>
                        <List dense>
                          {influencer.audienceData.interests.map((item) => (
                            <ListItem key={item.label}>
                              <ListItemText
                                primary={item.label}
                                secondary={
                                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                                    <Box
                                      sx={{
                                        width: `${item.value}%`,
                                        height: 8,
                                        bgcolor: 'success.main',
                                        borderRadius: 1,
                                        mr: 1,
                                      }}
                                    />
                                    <Typography variant="body2">{item.value}%</Typography>
                                  </Box>
                                }
                              />
                            </ListItem>
                          ))}
                        </List>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>

              {/* Followers by Platform */}
              <Grid item xs={12} md={6}>
                <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <GroupIcon sx={{ mr: 1 }} /> Seguidores por Plataforma
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <Card>
                  <CardContent>
                    <List>
                      {Object.entries(influencer.followers).map(([platform, count]) => (
                        <ListItem key={platform}>
                          <ListItemIcon>{getSocialIcon(platform)}</ListItemIcon>
                          <ListItemText
                            primary={platform.charAt(0).toUpperCase() + platform.slice(1)}
                            secondary={count}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>

              {/* Additional Info */}
              <Grid item xs={12} md={6}>
                <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <LanguageIcon sx={{ mr: 1 }} /> Informações Adicionais
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <Card>
                  <CardContent>
                    <List>
                      <ListItem>
                        <ListItemText
                          primary="Idiomas"
                          secondary={
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                              {influencer.languages.map((language) => (
                                <Chip key={language} label={language} size="small" />
                              ))}
                            </Box>
                          }
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Tags"
                          secondary={
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                              {influencer.tags.map((tag) => (
                                <Chip key={tag} label={tag} size="small" color="primary" variant="outlined" />
                              ))}
                            </Box>
                          }
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Taxa de Engajamento"
                          secondary={influencer.engagement}
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>

          {/* Content Tab */}
          <TabPanel value={tabValue} index={1}>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <PhotoLibraryIcon sx={{ mr: 1 }} /> Conteúdos Recentes
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              {influencer.posts.map((post) => (
                <Grid item xs={12} sm={6} md={4} key={post.id}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={post.thumbnail}
                      alt={post.title}
                      sx={{ position: 'relative' }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        bgcolor: 'rgba(0,0,0,0.6)',
                        color: 'white',
                        p: 0.5,
                        px: 1,
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      {post.type === 'video' ? <VideocamIcon fontSize="small" sx={{ mr: 0.5 }} /> : <PhotoLibraryIcon fontSize="small" sx={{ mr: 0.5 }} />}
                      <Typography variant="caption">{post.type}</Typography>
                    </Box>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" gutterBottom>
                        {post.title}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Chip
                          size="small"
                          label={post.platform}
                          color="primary"
                          variant="outlined"
                        />
                        <Typography variant="body2" color="text.secondary">
                          {new Date(post.date).toLocaleDateString('pt-BR')}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <FavoriteIcon color="error" fontSize="small" sx={{ mr: 0.5 }} />
                        <Typography variant="body2">{post.engagement} engajamentos</Typography>
                      </Box>
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
              {influencer.campaigns.map((campaign) => (
                <Grid item xs={12} key={campaign.id}>
                  <Card>
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={8}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Avatar
                              src={campaign.brand.logo}
                              alt={campaign.brand.name}
                              sx={{ mr: 2 }}
                            />
                            <Box>
                              <Typography variant="h6">{campaign.title}</Typography>
                              <Typography variant="body2" color="text.secondary">
                                {campaign.brand.name} • {new Date(campaign.date).toLocaleDateString('pt-BR')}
                              </Typography>
                            </Box>
                          </Box>
                          <Typography variant="body1" paragraph>
                            {campaign.description}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'flex-start', sm: 'flex-end' }, justifyContent: 'space-between' }}>
                          <Chip
                            label={{
                              active: 'Ativa',
                              completed: 'Concluída',
                              pending: 'Pendente',
                            }[campaign.status]}
                            color={{
                              active: 'success',
                              completed: 'primary',
                              pending: 'warning',
                            }[campaign.status] as 'success' | 'primary' | 'warning'}
                            sx={{ mb: 2 }}
                          />
                          <Button
                            variant="outlined"
                            size="small"
                            component={RouterLink}
                            to={`/campaigns/${campaign.id}`}
                          >
                            Ver Detalhes
                          </Button>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabPanel>

          {/* Reviews Tab */}
          <TabPanel value={tabValue} index={3}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center' }}>
                <StarIcon sx={{ mr: 1 }} /> Avaliações
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h4" sx={{ mr: 1 }}>
                  {influencer.reviews.reduce((total, review) => total + review.rating, 0) / influencer.reviews.length}
                </Typography>
                <Rating
                  value={influencer.reviews.reduce((total, review) => total + review.rating, 0) / influencer.reviews.length}
                  precision={0.5}
                  readOnly
                />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                  ({influencer.reviews.length} avaliações)
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              {influencer.reviews.map((review) => (
                <Grid item xs={12} key={review.id}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar
                          src={review.brand.logo}
                          alt={review.brand.name}
                          sx={{ mr: 2 }}
                        />
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="h6">
                            <Link
                              component={RouterLink}
                              to={`/brand/profile/${review.brand.id}`}
                              color="inherit"
                              underline="hover"
                            >
                              {review.brand.name}
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

          {/* Rates Tab */}
          <TabPanel value={tabValue} index={4}>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <TimelineIcon sx={{ mr: 1 }} /> Taxas e Valores
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Card>
              <CardContent>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Os valores abaixo são estimativas e podem variar de acordo com o escopo do projeto, duração e exclusividade.
                  Entre em contato para discutir detalhes específicos e obter um orçamento personalizado.
                </Typography>

                <List>
                  {influencer.rates.map((rate, index) => (
                    <React.Fragment key={index}>
                      <ListItem>
                        <ListItemText
                          primary={rate.postType}
                          secondary={rate.price}
                          primaryTypographyProps={{ fontWeight: 'bold' }}
                          secondaryTypographyProps={{ color: 'primary', fontWeight: 'medium' }}
                        />
                      </ListItem>
                      {index < influencer.rates.length - 1 && <Divider component="li" />}
                    </React.Fragment>
                  ))}
                </List>

                <Box sx={{ mt: 3, textAlign: 'center' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<MailIcon />}
                    component={RouterLink}
                    to={`/messages?user=${influencer.id}`}
                  >
                    Solicitar Orçamento
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </TabPanel>
        </Box>
      </Container>
    </Box>
  );
};

export default InfluencerProfilePage;