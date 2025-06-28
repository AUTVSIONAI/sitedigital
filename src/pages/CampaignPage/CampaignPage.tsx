import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Chip,
  Divider,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  Tabs,
  Tab,
  Paper,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stepper,
  Step,
  StepLabel,
  FormControlLabel,
  Checkbox,
  Slider,
  InputAdornment,
  useTheme,
  useMediaQuery,
  Tooltip,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  FilterList as FilterListIcon,
  Search as SearchIcon,
  AttachMoney as MoneyIcon,
  People as PeopleIcon,
  Visibility as VisibilityIcon,
  CalendarToday as CalendarIcon,
  LocationOn as LocationIcon,
  Category as CategoryIcon,
  Instagram as InstagramIcon,
  YouTube as YouTubeIcon,
  Twitter as TwitterIcon,
  Facebook as FacebookIcon,
  LinkedIn as LinkedInIcon,
  Close as CloseIcon,
  PhotoCamera as CameraIcon,
  CloudUpload as UploadIcon,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import TikTokIcon from '../../components/icons/TikTokIcon';

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
      id={`campaign-tabpanel-${index}`}
      aria-labelledby={`campaign-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `campaign-tab-${index}`,
    'aria-controls': `campaign-tabpanel-${index}`,
  };
}

interface Campaign {
  id: string;
  title: string;
  brand: {
    id: string;
    name: string;
    logo: string;
  };
  description: string;
  budget: number;
  category: string;
  platforms: string[];
  requirements: string;
  startDate: string;
  endDate: string;
  status: 'draft' | 'active' | 'completed' | 'cancelled';
  location: string;
  applicants: number;
  image: string;
  influencerCount: number;
  viewCount: number;
}

interface Influencer {
  id: string;
  name: string;
  avatar: string;
  category: string;
  followers: number;
  engagement: number;
  platforms: string[];
  location: string;
  bio: string;
  rate: number;
  status: 'applied' | 'invited' | 'accepted' | 'rejected';
}

const CampaignPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [platformFilter, setPlatformFilter] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [budgetRange, setBudgetRange] = useState<number[]>([0, 50000]);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [openCampaignDetailsDialog, setOpenCampaignDetailsDialog] = useState(false);
  const [openInfluencersDialog, setOpenInfluencersDialog] = useState(false);
  const [appliedCampaignIds, setAppliedCampaignIds] = useState<Set<string>>(new Set());

  // Initial mock data for campaigns
  const initialMockCampaigns: Campaign[] = [
    {
      id: '1',
      title: 'Lançamento Coleção Verão',
      brand: {
        id: '1',
        name: 'Moda Sustentável',
        logo: 'https://via.placeholder.com/150',
      },
      description: 'Campanha para divulgação da nova coleção de roupas sustentáveis para o verão.',
      budget: 15000,
      category: 'Moda',
      platforms: ['Instagram', 'TikTok'],
      requirements: 'Influenciadores com foco em moda sustentável e estilo de vida.',
      startDate: '2023-11-01',
      endDate: '2023-12-15',
      status: 'active',
      location: 'Brasil',
      applicants: 24,
      image: 'https://via.placeholder.com/800x400',
      influencerCount: 5,
      viewCount: 1250,
    },
    {
      id: '2',
      title: 'Review de Smartphones',
      brand: {
        id: '2',
        name: 'Tech Gadgets',
        logo: 'https://via.placeholder.com/150',
      },
      description: 'Campanha para review do nosso novo smartphone com tecnologia de ponta.',
      budget: 25000,
      category: 'Tecnologia',
      platforms: ['YouTube', 'Instagram'],
      requirements: 'Criadores de conteúdo tech com experiência em reviews de smartphones.',
      startDate: '2023-10-15',
      endDate: '2023-11-30',
      status: 'active',
      location: 'Brasil',
      applicants: 18,
      image: 'https://via.placeholder.com/800x400',
      influencerCount: 3,
      viewCount: 980,
    },
    {
      id: '3',
      title: 'Campanha Produtos Naturais',
      brand: {
        id: '3',
        name: 'Beleza Natural',
        logo: 'https://via.placeholder.com/150',
      },
      description: 'Divulgação da nossa linha de produtos de beleza 100% naturais e veganos.',
      budget: 10000,
      category: 'Beleza',
      platforms: ['Instagram', 'TikTok', 'YouTube'],
      requirements: 'Influenciadores com foco em beleza natural, vegana e sustentável.',
      startDate: '2023-09-01',
      endDate: '2023-10-15',
      status: 'completed',
      location: 'Brasil',
      applicants: 32,
      image: 'https://via.placeholder.com/800x400',
      influencerCount: 8,
      viewCount: 2100,
    },
    {
      id: '4',
      title: 'Campanha Fitness Verão',
      brand: {
        id: '4',
        name: 'Suplementos Pro',
        logo: 'https://via.placeholder.com/150',
      },
      description: 'Campanha para divulgação da nossa linha de suplementos para o verão.',
      budget: 20000,
      category: 'Fitness',
      platforms: ['Instagram', 'YouTube'],
      requirements: 'Atletas e influenciadores fitness com foco em nutrição e treino.',
      startDate: '2023-10-01',
      endDate: '2023-12-31',
      status: 'active',
      location: 'Brasil',
      applicants: 15,
      image: 'https://via.placeholder.com/800x400',
      influencerCount: 4,
      viewCount: 850,
    },
    {
      id: '5',
      title: 'Lançamento App de Finanças',
      brand: {
        id: '5',
        name: 'FinTech Solutions',
        logo: 'https://via.placeholder.com/150',
      },
      description: 'Campanha para divulgação do nosso novo aplicativo de gestão financeira pessoal.',
      budget: 30000,
      category: 'Finanças',
      platforms: ['Instagram', 'YouTube', 'LinkedIn'],
      requirements: 'Influenciadores com foco em finanças pessoais e educação financeira.',
      startDate: '2023-11-15',
      endDate: '2024-01-15',
      status: 'draft',
      location: 'Brasil',
      applicants: 0,
      image: 'https://via.placeholder.com/800x400',
      influencerCount: 0,
      viewCount: 0,
    },
  ];

  const [campaigns, setCampaigns] = useState<Campaign[]>(initialMockCampaigns);
  // Mock data for influencers
  const initialMockInfluencers: Influencer[] = [
    {
      id: '1',
      name: 'Ana Silva',
      avatar: 'https://via.placeholder.com/150',
      category: 'Moda',
      followers: 250000,
      engagement: 3.5,
      platforms: ['Instagram', 'TikTok'],
      location: 'São Paulo, Brasil',
      bio: 'Criadora de conteúdo de moda sustentável e estilo de vida.',
      rate: 2500,
      status: 'applied',
    },
    {
      id: '2',
      name: 'Carlos Mendes',
      avatar: 'https://via.placeholder.com/150',
      category: 'Tecnologia',
      followers: 500000,
      engagement: 4.2,
      platforms: ['YouTube', 'Instagram'],
      location: 'Rio de Janeiro, Brasil',
      bio: 'Especialista em reviews de tecnologia e gadgets.',
      rate: 3500,
      status: 'invited',
    },
    {
      id: '3',
      name: 'Fernanda Lima',
      avatar: 'https://via.placeholder.com/150',
      category: 'Beleza',
      followers: 180000,
      engagement: 5.1,
      platforms: ['Instagram', 'YouTube'],
      location: 'Belo Horizonte, Brasil',
      bio: 'Maquiadora profissional e criadora de conteúdo sobre beleza natural.',
      rate: 2000,
      status: 'accepted',
    },
    {
      id: '4',
      name: 'Pedro Alves',
      avatar: 'https://via.placeholder.com/150',
      category: 'Fitness',
      followers: 320000,
      engagement: 4.8,
      platforms: ['Instagram', 'YouTube'],
      location: 'Curitiba, Brasil',
      bio: 'Personal trainer e especialista em nutrição esportiva.',
      rate: 2800,
      status: 'applied',
    },
    {
      id: '5',
      name: 'Juliana Costa',
      avatar: 'https://via.placeholder.com/150',
      category: 'Finanças',
      followers: 150000,
      engagement: 3.9,
      platforms: ['Instagram', 'LinkedIn', 'YouTube'],
      location: 'Brasília, Brasil',
      bio: 'Educadora financeira e consultora de investimentos.',
      rate: 3000,
      status: 'rejected',
    },
  ];

  const [influencers, setInfluencers] = useState<Influencer[]>(initialMockInfluencers);

  // New campaign form state
  const [newCampaign, setNewCampaign] = useState({
    title: '',
    description: '',
    budget: 0,
    category: '',
    platforms: ['Instagram', 'YouTube'] as string[],
    requirements: '',
    startDate: '',
    endDate: '',
    location: '',
    image: 'https://via.placeholder.com/800x400',
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryFilterChange = (event: SelectChangeEvent<string>) => {
    setCategoryFilter(event.target.value);
  };

  const handlePlatformFilterChange = (event: SelectChangeEvent<string[]>) => {
    setPlatformFilter(event.target.value as string[]);
  };

  const handleStatusFilterChange = (event: SelectChangeEvent<string>) => {
    setStatusFilter(event.target.value);
  };

  const handleBudgetRangeChange = (event: Event, newValue: number | number[]) => {
    setBudgetRange(newValue as number[]);
  };

  const handleCreateDialogOpen = () => {
    setOpenCreateDialog(true);
  };

  const handleCreateDialogClose = () => {
    setOpenCreateDialog(false);
    setActiveStep(0);
    setNewCampaign({
      title: '',
      description: '',
      budget: 0,
      category: '',
      platforms: [],
      requirements: '',
      startDate: '',
      endDate: '',
      location: '',
      image: '',
    });
  };

  const handleCampaignDetailsOpen = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setOpenCampaignDetailsDialog(true);
  };

  const handleCampaignDetailsClose = () => {
    setOpenCampaignDetailsDialog(false);
    setSelectedCampaign(null);
  };

  const handleInfluencersDialogOpen = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setOpenInfluencersDialog(true);
  };

  const handleInfluencersDialogClose = () => {
    setOpenInfluencersDialog(false);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNewCampaignChange = (field: string, value: any) => {
    setNewCampaign({
      ...newCampaign,
      [field]: value,
    });
  };

  const handleCreateCampaign = () => {
    if (user && user.type === 'brand') { // Ensure user is a brand
      const newCampaignData: Campaign = {
        id: Date.now().toString(),
        title: newCampaign.title,
        brand: { // Mocking brand data based on logged-in user
          id: user.id,
          name: user.name || 'Minha Marca',
          logo: user.avatar || 'https://via.placeholder.com/150',
        },
        description: newCampaign.description,
        budget: newCampaign.budget,
        category: newCampaign.category,
        platforms: newCampaign.platforms,
        requirements: newCampaign.requirements,
        startDate: newCampaign.startDate,
        endDate: newCampaign.endDate,
        status: 'draft', // Default status for new campaigns
        location: newCampaign.location,
        applicants: 0,
        image: newCampaign.image || 'https://via.placeholder.com/800x400', // Use provided image or a default
        influencerCount: 0,
        viewCount: 0,
      };
      setCampaigns(prevCampaigns => [newCampaignData, ...prevCampaigns]);
      handleCreateDialogClose();
    } else {
      // Handle case where user is not a brand or not logged in, though UI should prevent this.
      console.error("Apenas marcas podem criar campanhas.");
    }
  };

  const handleApplyToCampaign = (campaignId: string) => {
    if (user?.type === 'influencer') {
      setCampaigns(prevCampaigns =>
        prevCampaigns.map(campaign =>
          campaign.id === campaignId
            ? { ...campaign, applicants: campaign.applicants + 1 }
            : campaign
        )
      );
      setAppliedCampaignIds(prevIds => new Set(prevIds).add(campaignId));
      // console.log(`Influencer ${user.id} applied to campaign ${campaignId}`);
    } else {
      console.error("Apenas influenciadores podem aplicar para campanhas.");
    }
  };

  const handleInfluencerStatusUpdate = (influencerId: string, campaignId: string, newStatus: 'accepted' | 'rejected') => {
    if (user?.type !== 'brand' || !selectedCampaign || selectedCampaign.id !== campaignId) {
      console.error("Ação não permitida ou campanha não selecionada corretamente.");
      return;
    }

    // Update influencer status
    setInfluencers(prevInfluencers =>
      prevInfluencers.map(inf =>
        inf.id === influencerId ? { ...inf, status: newStatus } : inf
      )
    );

    // Update campaign counters
    setCampaigns(prevCampaigns =>
      prevCampaigns.map(camp => {
        if (camp.id === campaignId) {
          let updatedApplicants = camp.applicants;
          let updatedInfluencerCount = camp.influencerCount;

          // Find the original status of this influencer for this campaign context
          // This is a bit tricky because the influencer status is global in our mock data
          // We assume the influencer was 'applied' or 'invited' before this action for counter adjustments.
          const currentInfluencer = initialMockInfluencers.find(i => i.id === influencerId);


          if (newStatus === 'accepted') {
            updatedInfluencerCount += 1;
            // Only decrement applicants if they were previously in a state that counted them as an applicant (e.g. 'applied')
            if (currentInfluencer && currentInfluencer.status === 'applied') {
              updatedApplicants = Math.max(0, updatedApplicants - 1);
            }
          } else if (newStatus === 'rejected') {
            // Only decrement applicants if they were previously in a state that counted them as an applicant
            if (currentInfluencer && currentInfluencer.status === 'applied') {
               updatedApplicants = Math.max(0, updatedApplicants - 1);
            }
          }
          return { ...camp, applicants: updatedApplicants, influencerCount: updatedInfluencerCount };
        }
        return camp;
      })
    );
  };

  const filteredCampaigns = campaigns.filter((campaign) => {
    // Filter by search query
    if (
      searchQuery &&
      !campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !campaign.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Filter by category
    if (categoryFilter && campaign.category !== categoryFilter) {
      return false;
    }

    // Filter by platform
    if (
      platformFilter.length > 0 &&
      !campaign.platforms.some((platform) => platformFilter.includes(platform))
    ) {
      return false;
    }

    // Filter by status
    if (statusFilter && campaign.status !== statusFilter) {
      return false;
    }

    // Filter by budget range
    if (
      campaign.budget < budgetRange[0] ||
      campaign.budget > budgetRange[1]
    ) {
      return false;
    }

    // Filter by tab
    if (tabValue === 1 && campaign.status !== 'active') return false;
    if (tabValue === 2 && campaign.status !== 'draft') return false;
    if (tabValue === 3 && campaign.status !== 'completed') return false;

    return true;
  });

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Instagram':
        return <InstagramIcon />;
      case 'YouTube':
        return <YouTubeIcon />;
      case 'Twitter':
        return <TwitterIcon />;
      case 'Facebook':
        return <FacebookIcon />;
      case 'LinkedIn':
        return <LinkedInIcon />;
      case 'TikTok':
        return <TikTokIcon />;
      default:
        return <CategoryIcon />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return theme.palette.success.main;
      case 'draft':
        return theme.palette.warning.main;
      case 'completed':
        return theme.palette.info.main;
      case 'cancelled':
        return theme.palette.error.main;
      default:
        return theme.palette.grey[500];
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Ativa';
      case 'draft':
        return 'Rascunho';
      case 'completed':
        return 'Concluída';
      case 'cancelled':
        return 'Cancelada';
      default:
        return status;
    }
  };

  const getInfluencerStatusColor = (status: string) => {
    switch (status) {
      case 'applied':
        return theme.palette.info.main;
      case 'invited':
        return theme.palette.warning.main;
      case 'accepted':
        return theme.palette.success.main;
      case 'rejected':
        return theme.palette.error.main;
      default:
        return theme.palette.grey[500];
    }
  };

  const getInfluencerStatusLabel = (status: string) => {
    switch (status) {
      case 'applied':
        return 'Aplicou';
      case 'invited':
        return 'Convidado';
      case 'accepted':
        return 'Aceitou';
      case 'rejected':
        return 'Rejeitado';
      default:
        return status;
    }
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const formatNumber = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
  };

  // const steps = ['Informações Básicas', 'Detalhes da Campanha', 'Revisão']; // Stepper será removido

  return (
    <Container maxWidth="xl" sx={{ mt: 2, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Campanhas
        </Typography>
        {user?.type === 'brand' && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleCreateDialogOpen}
          >
            Nova Campanha
          </Button>
        )}
      </Box>

      <Paper elevation={3} sx={{ mb: 3 }}>
        <Box sx={{ p: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Buscar campanhas..."
                value={searchQuery}
                onChange={handleSearchChange}
                variant="outlined"
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel id="category-filter-label">Categoria</InputLabel>
                  <Select
                    labelId="category-filter-label"
                    value={categoryFilter}
                    onChange={handleCategoryFilterChange}
                    label="Categoria"
                  >
                    <MenuItem value="">Todas</MenuItem>
                    <MenuItem value="Moda">Moda</MenuItem>
                    <MenuItem value="Beleza">Beleza</MenuItem>
                    <MenuItem value="Tecnologia">Tecnologia</MenuItem>
                    <MenuItem value="Fitness">Fitness</MenuItem>
                    <MenuItem value="Finanças">Finanças</MenuItem>
                    <MenuItem value="Alimentação">Alimentação</MenuItem>
                    <MenuItem value="Viagem">Viagem</MenuItem>
                  </Select>
                </FormControl>

                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel id="platform-filter-label">Plataforma</InputLabel>
                  <Select
                    labelId="platform-filter-label"
                    multiple
                    value={platformFilter}
                    onChange={handlePlatformFilterChange}
                    label="Plataforma"
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {(selected as string[]).map((value) => (
                          <Chip key={value} label={value} size="small" />
                        ))}
                      </Box>
                    )}
                  >
                    <MenuItem value="Instagram">Instagram</MenuItem>
                    <MenuItem value="YouTube">YouTube</MenuItem>
                    <MenuItem value="TikTok">TikTok</MenuItem>
                    <MenuItem value="Twitter">Twitter</MenuItem>
                    <MenuItem value="Facebook">Facebook</MenuItem>
                    <MenuItem value="LinkedIn">LinkedIn</MenuItem>
                  </Select>
                </FormControl>

                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel id="status-filter-label">Status</InputLabel>
                  <Select
                    labelId="status-filter-label"
                    value={statusFilter}
                    onChange={handleStatusFilterChange}
                    label="Status"
                  >
                    <MenuItem value="">Todos</MenuItem>
                    <MenuItem value="active">Ativa</MenuItem>
                    <MenuItem value="draft">Rascunho</MenuItem>
                    <MenuItem value="completed">Concluída</MenuItem>
                    <MenuItem value="cancelled">Cancelada</MenuItem>
                  </Select>
                </FormControl>

                <Box sx={{ width: 200 }}>
                  <Typography variant="body2" gutterBottom>
                    Orçamento: {formatCurrency(budgetRange[0])} - {formatCurrency(budgetRange[1])}
                  </Typography>
                  <Slider
                    value={budgetRange}
                    onChange={handleBudgetRangeChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={50000}
                    step={1000}
                    valueLabelFormat={(value) => formatCurrency(value)}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="campaign tabs"
          >
            <Tab label="Todas" {...a11yProps(0)} />
            <Tab label="Ativas" {...a11yProps(1)} />
            <Tab label="Rascunhos" {...a11yProps(2)} />
            <Tab label="Concluídas" {...a11yProps(3)} />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            {filteredCampaigns.length > 0 ? (
              filteredCampaigns.map((campaign) => (
                <Grid item xs={12} sm={6} md={4} key={campaign.id}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={campaign.image}
                      alt={campaign.title}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Avatar
                          src={campaign.brand.logo}
                          alt={campaign.brand.name}
                          sx={{ width: 24, height: 24, mr: 1 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {campaign.brand.name}
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <Chip
                          label={getStatusLabel(campaign.status)}
                          size="small"
                          sx={{
                            backgroundColor: getStatusColor(campaign.status),
                            color: 'white',
                          }}
                        />
                      </Box>
                      <Typography variant="h6" component="div" gutterBottom>
                        {campaign.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {campaign.description.length > 100
                          ? `${campaign.description.substring(0, 100)}...`
                          : campaign.description}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <MoneyIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {formatCurrency(campaign.budget)}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <CategoryIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {campaign.category}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <LocationIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {campaign.location}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <CalendarIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {new Date(campaign.startDate).toLocaleDateString('pt-BR')} - {new Date(campaign.endDate).toLocaleDateString('pt-BR')}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 0.5, mb: 1 }}>
                        {campaign.platforms.map((platform) => (
                          <Tooltip key={platform} title={platform}>
                            <IconButton size="small">{getPlatformIcon(platform)}</IconButton>
                          </Tooltip>
                        ))}
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <PeopleIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {campaign.influencerCount} / {campaign.applicants}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <VisibilityIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {formatNumber(campaign.viewCount)}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                    <CardActions>
                      <Button size="small" onClick={() => handleCampaignDetailsOpen(campaign)}>
                        Ver Detalhes
                      </Button>
                      {user?.type === 'influencer' && campaign.status === 'active' && (
                        <Button
                          size="small"
                          color="primary"
                          onClick={() => handleApplyToCampaign(campaign.id)}
                          disabled={appliedCampaignIds.has(campaign.id)}
                        >
                          {appliedCampaignIds.has(campaign.id) ? 'Aplicado' : 'Aplicar'}
                        </Button>
                      )}
                      {user?.type === 'brand' && (
                        <Button
                          size="small"
                          color="primary"
                          onClick={() => handleInfluencersDialogOpen(campaign)}
                        >
                          Ver Influenciadores
                        </Button>
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Box sx={{ textAlign: 'center', py: 5 }}>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    Nenhuma campanha encontrada
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Tente ajustar os filtros ou criar uma nova campanha.
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            {filteredCampaigns.length > 0 ? (
              filteredCampaigns.map((campaign) => (
                <Grid item xs={12} sm={6} md={4} key={campaign.id}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={campaign.image}
                      alt={campaign.title}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Avatar
                          src={campaign.brand.logo}
                          alt={campaign.brand.name}
                          sx={{ width: 24, height: 24, mr: 1 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {campaign.brand.name}
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <Chip
                          label={getStatusLabel(campaign.status)}
                          size="small"
                          sx={{
                            backgroundColor: getStatusColor(campaign.status),
                            color: 'white',
                          }}
                        />
                      </Box>
                      <Typography variant="h6" component="div" gutterBottom>
                        {campaign.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {campaign.description.length > 100
                          ? `${campaign.description.substring(0, 100)}...`
                          : campaign.description}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <MoneyIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {formatCurrency(campaign.budget)}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <CategoryIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {campaign.category}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <LocationIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {campaign.location}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <CalendarIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {new Date(campaign.startDate).toLocaleDateString('pt-BR')} - {new Date(campaign.endDate).toLocaleDateString('pt-BR')}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 0.5, mb: 1 }}>
                        {campaign.platforms.map((platform) => (
                          <Tooltip key={platform} title={platform}>
                            <IconButton size="small">{getPlatformIcon(platform)}</IconButton>
                          </Tooltip>
                        ))}
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <PeopleIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {campaign.influencerCount} / {campaign.applicants}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <VisibilityIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {formatNumber(campaign.viewCount)}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                    <CardActions>
                      <Button size="small" onClick={() => handleCampaignDetailsOpen(campaign)}>
                        Ver Detalhes
                      </Button>
                      {user?.type === 'influencer' && (
                        <Button
                          size="small"
                          color="primary"
                          onClick={() => handleApplyToCampaign(campaign.id)}
                          disabled={appliedCampaignIds.has(campaign.id)}
                        >
                          {appliedCampaignIds.has(campaign.id) ? 'Aplicado' : 'Aplicar'}
                        </Button>
                      )}
                      {user?.type === 'brand' && (
                        <Button
                          size="small"
                          color="primary"
                          onClick={() => handleInfluencersDialogOpen(campaign)}
                        >
                          Ver Influenciadores
                        </Button>
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Box sx={{ textAlign: 'center', py: 5 }}>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    Nenhuma campanha ativa encontrada
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Tente ajustar os filtros ou criar uma nova campanha.
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            {filteredCampaigns.length > 0 ? (
              filteredCampaigns.map((campaign) => (
                <Grid item xs={12} sm={6} md={4} key={campaign.id}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={campaign.image}
                      alt={campaign.title}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Avatar
                          src={campaign.brand.logo}
                          alt={campaign.brand.name}
                          sx={{ width: 24, height: 24, mr: 1 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {campaign.brand.name}
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <Chip
                          label={getStatusLabel(campaign.status)}
                          size="small"
                          sx={{
                            backgroundColor: getStatusColor(campaign.status),
                            color: 'white',
                          }}
                        />
                      </Box>
                      <Typography variant="h6" component="div" gutterBottom>
                        {campaign.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {campaign.description.length > 100
                          ? `${campaign.description.substring(0, 100)}...`
                          : campaign.description}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <MoneyIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {formatCurrency(campaign.budget)}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <CategoryIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {campaign.category}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <LocationIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {campaign.location}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <CalendarIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {new Date(campaign.startDate).toLocaleDateString('pt-BR')} - {new Date(campaign.endDate).toLocaleDateString('pt-BR')}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 0.5, mb: 1 }}>
                        {campaign.platforms.map((platform) => (
                          <Tooltip key={platform} title={platform}>
                            <IconButton size="small">{getPlatformIcon(platform)}</IconButton>
                          </Tooltip>
                        ))}
                      </Box>
                    </CardContent>
                    <CardActions>
                      <Button size="small" onClick={() => handleCampaignDetailsOpen(campaign)}>
                        Ver Detalhes
                      </Button>
                      {user?.type === 'brand' && (
                        <>
                          <Button size="small" color="primary" startIcon={<EditIcon />}>
                            Editar
                          </Button>
                          <Button size="small" color="primary">
                            Publicar
                          </Button>
                        </>
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Box sx={{ textAlign: 'center', py: 5 }}>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    Nenhum rascunho encontrado
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Crie uma nova campanha para começar.
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Grid container spacing={3}>
            {filteredCampaigns.length > 0 ? (
              filteredCampaigns.map((campaign) => (
                <Grid item xs={12} sm={6} md={4} key={campaign.id}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={campaign.image}
                      alt={campaign.title}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Avatar
                          src={campaign.brand.logo}
                          alt={campaign.brand.name}
                          sx={{ width: 24, height: 24, mr: 1 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {campaign.brand.name}
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <Chip
                          label={getStatusLabel(campaign.status)}
                          size="small"
                          sx={{
                            backgroundColor: getStatusColor(campaign.status),
                            color: 'white',
                          }}
                        />
                      </Box>
                      <Typography variant="h6" component="div" gutterBottom>
                        {campaign.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {campaign.description.length > 100
                          ? `${campaign.description.substring(0, 100)}...`
                          : campaign.description}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <MoneyIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {formatCurrency(campaign.budget)}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <CategoryIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {campaign.category}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <LocationIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {campaign.location}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <CalendarIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {new Date(campaign.startDate).toLocaleDateString('pt-BR')} - {new Date(campaign.endDate).toLocaleDateString('pt-BR')}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 0.5, mb: 1 }}>
                        {campaign.platforms.map((platform) => (
                          <Tooltip key={platform} title={platform}>
                            <IconButton size="small">{getPlatformIcon(platform)}</IconButton>
                          </Tooltip>
                        ))}
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <PeopleIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {campaign.influencerCount} / {campaign.applicants}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <VisibilityIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {formatNumber(campaign.viewCount)}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                    <CardActions>
                      <Button size="small" onClick={() => handleCampaignDetailsOpen(campaign)}>
                        Ver Detalhes
                      </Button>
                      {user?.type === 'brand' && (
                        <Button
                          size="small"
                          color="primary"
                          onClick={() => handleInfluencersDialogOpen(campaign)}
                        >
                          Ver Relatório
                        </Button>
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Box sx={{ textAlign: 'center', py: 5 }}>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    Nenhuma campanha concluída encontrada
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    As campanhas concluídas aparecerão aqui.
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </TabPanel>
      </Paper>

      {/* Create Campaign Dialog */}
      <Dialog
        open={openCreateDialog}
        onClose={handleCreateDialogClose}
        maxWidth="md"
        fullWidth
        aria-labelledby="create-campaign-dialog-title"
      >
        <DialogTitle id="create-campaign-dialog-title">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">Nova Campanha</Typography>
            <IconButton edge="end" color="inherit" onClick={handleCreateDialogClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {/* Stepper removido para simplificar o formulário para uma única etapa */}
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Título da Campanha"
                value={newCampaign.title}
                onChange={(e) => handleNewCampaignChange('title', e.target.value)}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                multiline
                rows={3}
                label="Descrição"
                value={newCampaign.description}
                onChange={(e) => handleNewCampaignChange('description', e.target.value)}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Requisitos"
                value={newCampaign.requirements}
                onChange={(e) => handleNewCampaignChange('requirements', e.target.value)}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required sx={{ mb: 2 }}>
                <InputLabel>Categoria</InputLabel>
                <Select
                  value={newCampaign.category}
                  onChange={(e) => handleNewCampaignChange('category', e.target.value)}
                  label="Categoria"
                >
                  <MenuItem value="Moda">Moda</MenuItem>
                  <MenuItem value="Beleza">Beleza</MenuItem>
                  <MenuItem value="Tecnologia">Tecnologia</MenuItem>
                  <MenuItem value="Fitness">Fitness</MenuItem>
                  <MenuItem value="Finanças">Finanças</MenuItem>
                  <MenuItem value="Alimentação">Alimentação</MenuItem>
                  <MenuItem value="Viagem">Viagem</MenuItem>
                  <MenuItem value="Games">Games</MenuItem>
                  <MenuItem value="Outra">Outra</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Orçamento"
                type="number"
                InputProps={{
                  startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                }}
                value={newCampaign.budget}
                onChange={(e) => handleNewCampaignChange('budget', Number(e.target.value))}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="date"
                label="Data de Início"
                value={newCampaign.startDate}
                onChange={(e) => handleNewCampaignChange('startDate', e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="date"
                label="Data de Término"
                value={newCampaign.endDate}
                onChange={(e) => handleNewCampaignChange('endDate', e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required sx={{ mb: 2 }}>
                <InputLabel>Plataformas</InputLabel>
                <Select
                  multiple
                  value={newCampaign.platforms}
                  onChange={(e) => handleNewCampaignChange('platforms', e.target.value)}
                  label="Plataformas"
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {(selected as string[]).map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  <MenuItem value="Instagram">Instagram</MenuItem>
                  <MenuItem value="YouTube">YouTube</MenuItem>
                  <MenuItem value="TikTok">TikTok</MenuItem>
                  <MenuItem value="Twitter">Twitter</MenuItem>
                  <MenuItem value="Facebook">Facebook</MenuItem>
                  <MenuItem value="LinkedIn">LinkedIn</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Localização (País, Cidade, etc.)"
                value={newCampaign.location}
                onChange={(e) => handleNewCampaignChange('location', e.target.value)}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="URL da Imagem da Campanha"
                value={newCampaign.image}
                onChange={(e) => handleNewCampaignChange('image', e.target.value)}
                sx={{ mb: 2 }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateDialogClose}>Cancelar</Button>
          {/* Botões de Voltar/Próximo removidos pois o Stepper foi removido */}
          <Button onClick={handleCreateCampaign} variant="contained" color="primary">
            Criar Campanha
          </Button>
        </DialogActions>
      </Dialog>

      {/* Campaign Details Dialog */}
      <Dialog
        open={openCampaignDetailsDialog}
        onClose={handleCampaignDetailsClose}
        maxWidth="md"
        fullWidth
        aria-labelledby="campaign-details-dialog-title"
      >
        {selectedCampaign && (
          <>
            <DialogTitle id="campaign-details-dialog-title">
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h6">{selectedCampaign.title}</Typography>
                <IconButton edge="end" color="inherit" onClick={handleCampaignDetailsClose} aria-label="close">
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Box
                    component="img"
                    src={selectedCampaign.image}
                    alt={selectedCampaign.title}
                    sx={{ width: '100%', height: 'auto', borderRadius: 1, mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Typography variant="h5" gutterBottom>
                    {selectedCampaign.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                      src={selectedCampaign.brand.logo}
                      alt={selectedCampaign.brand.name}
                      sx={{ width: 32, height: 32, mr: 1 }}
                    />
                    <Typography variant="subtitle1">
                      {selectedCampaign.brand.name}
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Chip
                      label={getStatusLabel(selectedCampaign.status)}
                      sx={{
                        backgroundColor: getStatusColor(selectedCampaign.status),
                        color: 'white',
                      }}
                    />
                  </Box>
                  <Typography variant="body1" paragraph>
                    {selectedCampaign.description}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    Requisitos
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {selectedCampaign.requirements}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      Detalhes da Campanha
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <MoneyIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body1">
                        <strong>Orçamento:</strong> {formatCurrency(selectedCampaign.budget)}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <CategoryIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body1">
                        <strong>Categoria:</strong> {selectedCampaign.category}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <LocationIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body1">
                        <strong>Localização:</strong> {selectedCampaign.location}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <CalendarIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body1">
                        <strong>Período:</strong>{' '}
                        {new Date(selectedCampaign.startDate).toLocaleDateString('pt-BR')} -{' '}
                        {new Date(selectedCampaign.endDate).toLocaleDateString('pt-BR')}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                      <Typography variant="body1" sx={{ mr: 1 }}>
                        <strong>Plataformas:</strong>
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selectedCampaign.platforms.map((platform) => (
                          <Chip
                            key={platform}
                            label={platform}
                            size="small"
                            icon={getPlatformIcon(platform)}
                          />
                        ))}
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <PeopleIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body1">
                        <strong>Influenciadores:</strong> {selectedCampaign.influencerCount} /{' '}
                        {selectedCampaign.applicants} aplicantes
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <VisibilityIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body1">
                        <strong>Visualizações:</strong> {formatNumber(selectedCampaign.viewCount)}
                      </Typography>
                    </Box>
                  </Paper>
                  {user?.type === 'influencer' && selectedCampaign.status === 'active' && (
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      size="large"
                      sx={{ mb: 2 }}
                      onClick={() => handleApplyToCampaign(selectedCampaign.id)}
                      disabled={appliedCampaignIds.has(selectedCampaign.id)}
                    >
                      {appliedCampaignIds.has(selectedCampaign.id) ? 'Aplicado' : 'Aplicar para esta Campanha'}
                    </Button>
                  )}
                  {user?.type === 'brand' && (
                    <Button
                      fullWidth
                      variant="outlined"
                      color="primary"
                      size="large"
                      onClick={() => {
                        handleCampaignDetailsClose();
                        handleInfluencersDialogOpen(selectedCampaign);
                      }}
                      sx={{ mb: 2 }}
                    >
                      Ver Influenciadores
                    </Button>
                  )}
                </Grid>
              </Grid>
            </DialogContent>
          </>
        )}
      </Dialog>

      {/* Influencers Dialog */}
      <Dialog
        open={openInfluencersDialog}
        onClose={handleInfluencersDialogClose}
        maxWidth="md"
        fullWidth
        aria-labelledby="influencers-dialog-title"
      >
        {selectedCampaign && (
          <>
            <DialogTitle id="influencers-dialog-title">
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h6">Influenciadores - {selectedCampaign.title}</Typography>
                <IconButton edge="end" color="inherit" onClick={handleInfluencersDialogClose} aria-label="close">
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  {selectedCampaign.applicants} influenciadores aplicaram para esta campanha
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Chip
                    label={`${influencers.filter((i) => i.status === 'accepted').length} Aceitos`}
                    color="success"
                    size="small"
                  />
                  <Chip
                    label={`${influencers.filter((i) => i.status === 'applied').length} Pendentes`}
                    color="info"
                    size="small"
                  />
                  <Chip
                    label={`${influencers.filter((i) => i.status === 'invited').length} Convidados`}
                    color="warning"
                    size="small"
                  />
                  <Chip
                    label={`${influencers.filter((i) => i.status === 'rejected').length} Rejeitados`}
                    color="error"
                    size="small"
                  />
                </Box>
                <TextField
                  fullWidth
                  placeholder="Buscar influenciadores..."
                  variant="outlined"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 2 }}
                />
              </Box>

              <Grid container spacing={2}>
                {influencers.map((influencer) => (
                  <Grid item xs={12} key={influencer.id}>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={8}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar
                              src={influencer.avatar}
                              alt={influencer.name}
                              sx={{ width: 48, height: 48, mr: 2 }}
                            />
                            <Box>
                              <Typography variant="h6">{influencer.name}</Typography>
                              <Typography variant="body2" color="text.secondary">
                                {influencer.category} • {influencer.location}
                              </Typography>
                            </Box>
                            <Box sx={{ flexGrow: 1 }} />
                            <Chip
                              label={getInfluencerStatusLabel(influencer.status)}
                              size="small"
                              sx={{
                                backgroundColor: getInfluencerStatusColor(influencer.status),
                                color: 'white',
                              }}
                            />
                          </Box>
                          <Typography variant="body2" sx={{ mt: 2 }}>
                            {influencer.bio}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                            {influencer.platforms.map((platform) => (
                              <Chip
                                key={platform}
                                label={platform}
                                size="small"
                                icon={getPlatformIcon(platform)}
                              />
                            ))}
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <Box sx={{ mb: 2 }}>
                              <Typography variant="body2" color="text.secondary">
                                Seguidores
                              </Typography>
                              <Typography variant="h6">{formatNumber(influencer.followers)}</Typography>
                            </Box>
                            <Box sx={{ mb: 2 }}>
                              <Typography variant="body2" color="text.secondary">
                                Taxa de Engajamento
                              </Typography>
                              <Typography variant="h6">{influencer.engagement}%</Typography>
                            </Box>
                            <Box sx={{ mb: 2 }}>
                              <Typography variant="body2" color="text.secondary">
                                Taxa por Publicação
                              </Typography>
                              <Typography variant="h6">{formatCurrency(influencer.rate)}</Typography>
                            </Box>
                            <Box sx={{ mt: 'auto' }}>
                              {influencer.status === 'applied' && (
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    fullWidth
                                    onClick={() => handleInfluencerStatusUpdate(influencer.id, selectedCampaign.id, 'accepted')}
                                  >
                                    Aceitar
                                  </Button>
                                  <Button
                                    variant="outlined"
                                    color="error"
                                    size="small"
                                    fullWidth
                                    onClick={() => handleInfluencerStatusUpdate(influencer.id, selectedCampaign.id, 'rejected')}
                                  >
                                    Rejeitar
                                  </Button>
                                </Box>
                              )}
                              {/* Logic for other statuses like invited, accepted, rejected can be expanded here */}
                              {influencer.status === 'invited' && (
                                <Button variant="outlined" color="secondary" size="small" fullWidth disabled>
                                  Convidado
                                </Button>
                              )}
                              {influencer.status === 'accepted' && (
                                <Button variant="contained" color="success" size="small" fullWidth disabled>
                                  Aceito
                                </Button>
                              )}
                              {influencer.status === 'rejected' && (
                                <Button variant="contained" color="error" size="small" fullWidth disabled>
                                  Rejeitado
                                </Button>
                              )}
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default CampaignPage;