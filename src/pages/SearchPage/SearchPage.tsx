import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  IconButton,
  Tab,
  Tabs,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Clear as ClearIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
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
      id={`search-tabpanel-${index}`}
      aria-labelledby={`search-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `search-tab-${index}`,
    'aria-controls': `search-tabpanel-${index}`,
  };
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
  bio: string;
  match?: string;
}

interface Brand {
  id: string;
  name: string;
  logo: string;
  industry: string;
  campaignTypes: string[];
  budget: string;
  location: string;
  description: string;
  match?: string;
}

const SearchPage: React.FC = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [tabValue, setTabValue] = useState(user?.type === 'brand' ? 0 : 1);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(!isMobile);
  const [filters, setFilters] = useState({
    categories: [] as string[],
    platforms: [] as string[],
    followersRange: [0, 1000000] as [number, number],
    engagementMin: 0,
    location: '',
    industries: [] as string[],
    campaignTypes: [] as string[],
    budgetRange: [0, 10000] as [number, number],
  });

  // Mock data for influencers
  const influencers: Influencer[] = [
    {
      id: '1',
      name: 'Ana Silva',
      avatar: 'https://via.placeholder.com/150',
      category: 'Moda',
      followers: '1.2M',
      engagement: '4.8%',
      platforms: ['Instagram', 'TikTok', 'YouTube'],
      location: 'São Paulo, SP',
      bio: 'Criadora de conteúdo de moda e lifestyle. Compartilho dicas de estilo, tendências e meu dia a dia.',
      match: '95%',
    },
    {
      id: '2',
      name: 'Carlos Mendes',
      avatar: 'https://via.placeholder.com/150',
      category: 'Tecnologia',
      followers: '850K',
      engagement: '5.2%',
      platforms: ['YouTube', 'Instagram', 'Twitter'],
      location: 'Rio de Janeiro, RJ',
      bio: 'Apaixonado por tecnologia e inovação. Reviews de produtos, tutoriais e novidades do mundo tech.',
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
      bio: 'Maquiadora profissional e criadora de conteúdo. Tutoriais, reviews de produtos e dicas de beleza.',
      match: '82%',
    },
    {
      id: '4',
      name: 'Roberto Alves',
      avatar: 'https://via.placeholder.com/150',
      category: 'Fitness',
      followers: '950K',
      engagement: '6.1%',
      platforms: ['Instagram', 'TikTok'],
      location: 'Curitiba, PR',
      bio: 'Personal trainer e nutricionista. Compartilho treinos, receitas saudáveis e dicas de bem-estar.',
      match: '78%',
    },
    {
      id: '5',
      name: 'Fernanda Lima',
      avatar: 'https://via.placeholder.com/150',
      category: 'Viagem',
      followers: '1.5M',
      engagement: '4.2%',
      platforms: ['Instagram', 'YouTube', 'Blog'],
      location: 'Florianópolis, SC',
      bio: 'Viajante em tempo integral. Compartilho destinos, dicas de viagem e experiências pelo mundo.',
      match: '73%',
    },
    {
      id: '6',
      name: 'Lucas Oliveira',
      avatar: 'https://via.placeholder.com/150',
      category: 'Gastronomia',
      followers: '780K',
      engagement: '5.7%',
      platforms: ['Instagram', 'TikTok', 'YouTube'],
      location: 'Salvador, BA',
      bio: 'Chef e entusiasta da gastronomia. Receitas, reviews de restaurantes e dicas culinárias.',
      match: '68%',
    },
  ];

  // Mock data for brands
  const brands: Brand[] = [
    {
      id: '1',
      name: 'Moda Sustentável',
      logo: 'https://via.placeholder.com/150',
      industry: 'Moda',
      campaignTypes: ['Lançamento de Produto', 'Conteúdo Patrocinado'],
      budget: 'R$ 3.000 - R$ 5.000',
      location: 'São Paulo, SP',
      description: 'Marca de roupas sustentáveis com foco em moda consciente e ética.',
      match: '95%',
    },
    {
      id: '2',
      name: 'Tech Gadgets',
      logo: 'https://via.placeholder.com/150',
      industry: 'Tecnologia',
      campaignTypes: ['Review de Produto', 'Unboxing'],
      budget: 'R$ 2.500 - R$ 4.000',
      location: 'Rio de Janeiro, RJ',
      description: 'Empresa de gadgets tecnológicos inovadores para o dia a dia.',
      match: '87%',
    },
    {
      id: '3',
      name: 'Beleza Natural',
      logo: 'https://via.placeholder.com/150',
      industry: 'Beleza',
      campaignTypes: ['Conteúdo Educativo', 'Embaixador da Marca'],
      budget: 'R$ 1.800 - R$ 3.500',
      location: 'Belo Horizonte, MG',
      description: 'Produtos de beleza naturais e veganos, sem testes em animais.',
      match: '82%',
    },
    {
      id: '4',
      name: 'Fitness Pro',
      logo: 'https://via.placeholder.com/150',
      industry: 'Fitness',
      campaignTypes: ['Demonstração de Produto', 'Parceria de Longo Prazo'],
      budget: 'R$ 2.000 - R$ 6.000',
      location: 'Curitiba, PR',
      description: 'Equipamentos e suplementos para fitness e vida saudável.',
      match: '78%',
    },
    {
      id: '5',
      name: 'Viagens Incríveis',
      logo: 'https://via.placeholder.com/150',
      industry: 'Turismo',
      campaignTypes: ['Parceria de Destino', 'Conteúdo de Viagem'],
      budget: 'R$ 4.000 - R$ 8.000',
      location: 'Florianópolis, SC',
      description: 'Agência de viagens especializada em experiências únicas e personalizadas.',
      match: '73%',
    },
    {
      id: '6',
      name: 'Sabores Gourmet',
      logo: 'https://via.placeholder.com/150',
      industry: 'Alimentação',
      campaignTypes: ['Receitas Patrocinadas', 'Eventos'],
      budget: 'R$ 1.500 - R$ 3.000',
      location: 'Salvador, BA',
      description: 'Produtos gourmet e ingredientes especiais para culinária de alta qualidade.',
      match: '68%',
    },
  ];

  const [filteredInfluencers, setFilteredInfluencers] = useState<Influencer[]>(influencers);
  const [filteredBrands, setFilteredBrands] = useState<Brand[]>(brands);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (filterName: string, value: any) => {
    setFilters({
      ...filters,
      [filterName]: value,
    });
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      platforms: [],
      followersRange: [0, 1000000],
      engagementMin: 0,
      location: '',
      industries: [],
      campaignTypes: [],
      budgetRange: [0, 10000],
    });
    setSearchQuery('');
  };

  const applyFilters = () => {
    // Filter influencers based on search query and filters
    const newFilteredInfluencers = influencers.filter((influencer) => {
      // Search query filter
      if (
        searchQuery &&
        !influencer.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !influencer.category.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !influencer.bio.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Category filter
      if (
        filters.categories.length > 0 &&
        !filters.categories.includes(influencer.category)
      ) {
        return false;
      }

      // Platform filter
      if (
        filters.platforms.length > 0 &&
        !influencer.platforms.some((platform) => filters.platforms.includes(platform))
      ) {
        return false;
      }

      // Location filter
      if (
        filters.location &&
        !influencer.location.toLowerCase().includes(filters.location.toLowerCase())
      ) {
        return false;
      }

      return true;
    });

    // Filter brands based on search query and filters
    const newFilteredBrands = brands.filter((brand) => {
      // Search query filter
      if (
        searchQuery &&
        !brand.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !brand.industry.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !brand.description.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Industry filter
      if (
        filters.industries.length > 0 &&
        !filters.industries.includes(brand.industry)
      ) {
        return false;
      }

      // Campaign type filter
      if (
        filters.campaignTypes.length > 0 &&
        !brand.campaignTypes.some((type) => filters.campaignTypes.includes(type))
      ) {
        return false;
      }

      // Location filter
      if (
        filters.location &&
        !brand.location.toLowerCase().includes(filters.location.toLowerCase())
      ) {
        return false;
      }

      return true;
    });

    setFilteredInfluencers(newFilteredInfluencers);
    setFilteredBrands(newFilteredBrands);
  };

  // Apply filters when search query or filters change
  useEffect(() => {
    applyFilters();
  }, [searchQuery, filters]);

  const categories = ['Moda', 'Tecnologia', 'Beleza', 'Fitness', 'Viagem', 'Gastronomia', 'Lifestyle', 'Gaming'];
  const platforms = ['Instagram', 'TikTok', 'YouTube', 'Twitter', 'Blog', 'Facebook', 'LinkedIn'];
  const industries = ['Moda', 'Tecnologia', 'Beleza', 'Fitness', 'Turismo', 'Alimentação', 'Saúde', 'Educação'];
  const campaignTypes = [
    'Lançamento de Produto',
    'Conteúdo Patrocinado',
    'Review de Produto',
    'Unboxing',
    'Embaixador da Marca',
    'Parceria de Longo Prazo',
    'Eventos',
    'Conteúdo Educativo',
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Buscar {tabValue === 0 ? 'Influenciadores' : 'Marcas'}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Encontre {tabValue === 0 ? 'influenciadores' : 'marcas'} que combinam com seu perfil e objetivos.
        </Typography>
      </Box>

      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        aria-label="search tabs"
        sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}
      >
        <Tab label="Buscar Influenciadores" {...a11yProps(0)} />
        <Tab label="Buscar Marcas" {...a11yProps(1)} />
      </Tabs>

      <Grid container spacing={3}>
        {/* Search and Filter Controls */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  placeholder={`Buscar ${tabValue === 0 ? 'influenciadores' : 'marcas'}...`}
                  value={searchQuery}
                  onChange={handleSearchChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                    endAdornment: searchQuery && (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setSearchQuery('')} edge="end">
                          <ClearIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    startIcon={<FilterListIcon />}
                    onClick={toggleFilters}
                    sx={{ mr: 1 }}
                  >
                    {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<ClearIcon />}
                    onClick={clearFilters}
                  >
                    Limpar Filtros
                  </Button>
                </Box>
              </Grid>
            </Grid>

            {/* Filters */}
            {showFilters && (
              <Box sx={{ mt: 3 }}>
                <Divider sx={{ mb: 3 }} />
                <TabPanel value={tabValue} index={0}>
                  {/* Influencer Filters */}
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                      <FormControl fullWidth>
                        <InputLabel id="category-label">Categorias</InputLabel>
                        <Select
                          labelId="category-label"
                          multiple
                          value={filters.categories}
                          onChange={(e) => handleFilterChange('categories', e.target.value)}
                          renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {selected.map((value) => (
                                <Chip key={value} label={value} size="small" />
                              ))}
                            </Box>
                          )}
                        >
                          {categories.map((category) => (
                            <MenuItem key={category} value={category}>
                              {category}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControl fullWidth>
                        <InputLabel id="platform-label">Plataformas</InputLabel>
                        <Select
                          labelId="platform-label"
                          multiple
                          value={filters.platforms}
                          onChange={(e) => handleFilterChange('platforms', e.target.value)}
                          renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {selected.map((value) => (
                                <Chip key={value} label={value} size="small" />
                              ))}
                            </Box>
                          )}
                        >
                          {platforms.map((platform) => (
                            <MenuItem key={platform} value={platform}>
                              {platform}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        label="Localização"
                        value={filters.location}
                        onChange={(e) => handleFilterChange('location', e.target.value)}
                        placeholder="Cidade, Estado"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography gutterBottom>Taxa de Engajamento Mínima</Typography>
                      <Slider
                        value={filters.engagementMin}
                        onChange={(e, newValue) => handleFilterChange('engagementMin', newValue)}
                        valueLabelDisplay="auto"
                        valueLabelFormat={(value) => `${value}%`}
                        step={0.5}
                        marks
                        min={0}
                        max={10}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography gutterBottom>Número de Seguidores</Typography>
                      <Slider
                        value={filters.followersRange}
                        onChange={(e, newValue) => handleFilterChange('followersRange', newValue)}
                        valueLabelDisplay="auto"
                        valueLabelFormat={(value) => value >= 1000000 ? `${value / 1000000}M` : `${value / 1000}K`}
                        step={50000}
                        marks={[
                          { value: 0, label: '0' },
                          { value: 500000, label: '500K' },
                          { value: 1000000, label: '1M' },
                        ]}
                        min={0}
                        max={1000000}
                      />
                    </Grid>
                  </Grid>
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                  {/* Brand Filters */}
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                      <FormControl fullWidth>
                        <InputLabel id="industry-label">Indústrias</InputLabel>
                        <Select
                          labelId="industry-label"
                          multiple
                          value={filters.industries}
                          onChange={(e) => handleFilterChange('industries', e.target.value)}
                          renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {selected.map((value) => (
                                <Chip key={value} label={value} size="small" />
                              ))}
                            </Box>
                          )}
                        >
                          {industries.map((industry) => (
                            <MenuItem key={industry} value={industry}>
                              {industry}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControl fullWidth>
                        <InputLabel id="campaign-type-label">Tipos de Campanha</InputLabel>
                        <Select
                          labelId="campaign-type-label"
                          multiple
                          value={filters.campaignTypes}
                          onChange={(e) => handleFilterChange('campaignTypes', e.target.value)}
                          renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {selected.map((value) => (
                                <Chip key={value} label={value} size="small" />
                              ))}
                            </Box>
                          )}
                        >
                          {campaignTypes.map((type) => (
                            <MenuItem key={type} value={type}>
                              {type}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        label="Localização"
                        value={filters.location}
                        onChange={(e) => handleFilterChange('location', e.target.value)}
                        placeholder="Cidade, Estado"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography gutterBottom>Faixa de Orçamento (R$)</Typography>
                      <Slider
                        value={filters.budgetRange}
                        onChange={(e, newValue) => handleFilterChange('budgetRange', newValue)}
                        valueLabelDisplay="auto"
                        valueLabelFormat={(value) => `R$ ${value}`}
                        step={500}
                        marks={[
                          { value: 0, label: 'R$ 0' },
                          { value: 5000, label: 'R$ 5.000' },
                          { value: 10000, label: 'R$ 10.000+' },
                        ]}
                        min={0}
                        max={10000}
                      />
                    </Grid>
                  </Grid>
                </TabPanel>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Search Results */}
        <Grid item xs={12}>
          <TabPanel value={tabValue} index={0}>
            {/* Influencer Results */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                {filteredInfluencers.length} Influenciadores Encontrados
              </Typography>
              <Divider />
            </Box>

            <Grid container spacing={3}>
              {filteredInfluencers.map((influencer) => (
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

                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {influencer.bio}
                      </Typography>

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

          <TabPanel value={tabValue} index={1}>
            {/* Brand Results */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                {filteredBrands.length} Marcas Encontradas
              </Typography>
              <Divider />
            </Box>

            <Grid container spacing={3}>
              {filteredBrands.map((brand) => (
                <Grid item xs={12} sm={6} md={4} key={brand.id}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar
                          src={brand.logo}
                          alt={brand.name}
                          sx={{ width: 64, height: 64, mr: 2 }}
                        />
                        <Box>
                          <Typography variant="h6">{brand.name}</Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Chip
                              label={brand.industry}
                              size="small"
                              color="primary"
                              variant="outlined"
                              sx={{ mr: 1 }}
                            />
                            {brand.match && (
                              <Chip
                                label={`Match ${brand.match}`}
                                size="small"
                                color="success"
                                sx={{
                                  fontWeight: 'bold',
                                  bgcolor: parseInt(brand.match) > 90 ? '#4caf50' : '#ff9800',
                                }}
                              />
                            )}
                          </Box>
                        </Box>
                      </Box>

                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {brand.description}
                      </Typography>

                      <Divider sx={{ my: 2 }} />

                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography variant="body2" color="text.secondary">
                            Tipos de Campanha
                          </Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                            {brand.campaignTypes.map((type) => (
                              <Chip key={type} label={type} size="small" />
                            ))}
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Orçamento
                          </Typography>
                          <Typography variant="body1">{brand.budget}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Localização
                          </Typography>
                          <Typography variant="body1">{brand.location}</Typography>
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
        </Grid>
      </Grid>
    </Container>
  );
};

export default SearchPage;