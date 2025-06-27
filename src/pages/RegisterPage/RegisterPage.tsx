import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Paper,
  Tabs,
  Tab,
  Alert,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import { PersonAdd as PersonAddIcon } from '@mui/icons-material';
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
      id={`register-tabpanel-${index}`}
      aria-labelledby={`register-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `register-tab-${index}`,
    'aria-controls': `register-tabpanel-${index}`,
  };
}

const RegisterPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
    // Brand specific fields
    companyName: '',
    industry: '',
    website: '',
    // Influencer specific fields
    niche: '',
    instagramHandle: '',
    youtubeChannel: '',
    tiktokHandle: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const { register, loading, error } = useAuth();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validateBasicInfo = () => {
    const errors: Record<string, string> = {};
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = 'Nome é obrigatório';
      isValid = false;
    }

    if (!formData.email) {
      errors.email = 'Email é obrigatório';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email inválido';
      isValid = false;
    }

    if (!formData.password) {
      errors.password = 'Senha é obrigatória';
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = 'A senha deve ter pelo menos 6 caracteres';
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'As senhas não coincidem';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const validateProfileInfo = () => {
    const errors: Record<string, string> = {};
    let isValid = true;

    if (activeTab === 0) { // Brand
      if (!formData.companyName.trim()) {
        errors.companyName = 'Nome da empresa é obrigatório';
        isValid = false;
      }
      if (!formData.industry.trim()) {
        errors.industry = 'Indústria é obrigatória';
        isValid = false;
      }
    } else { // Influencer
      if (!formData.niche.trim()) {
        errors.niche = 'Nicho é obrigatório';
        isValid = false;
      }
      // At least one social media handle is required
      if (!formData.instagramHandle && !formData.youtubeChannel && !formData.tiktokHandle) {
        errors.socialMedia = 'Pelo menos uma rede social é obrigatória';
        isValid = false;
      }
    }

    setFormErrors(errors);
    return isValid;
  };

  const validateTerms = () => {
    const errors: Record<string, string> = {};
    let isValid = true;

    if (!formData.agreeTerms) {
      errors.agreeTerms = 'Você deve concordar com os termos para continuar';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleNext = () => {
    let isValid = false;

    if (activeStep === 0) {
      isValid = validateBasicInfo();
    } else if (activeStep === 1) {
      isValid = validateProfileInfo();
    } else if (activeStep === 2) {
      isValid = validateTerms();
    }

    if (isValid) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (validateTerms()) {
      try {
        const userType = activeTab === 0 ? 'brand' : 'influencer';
        await register(
          {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
          },
          userType
        );
      } catch (err) {
        console.error('Registration error:', err);
      }
    }
  };

  const steps = ['Informações Básicas', 'Perfil Profissional', 'Termos e Condições'];

  return (
    <Container component="main" maxWidth="md">
      <Paper
        elevation={3}
        sx={{
          mt: 8,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: 2,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <PersonAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Cadastro
        </Typography>

        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="register tabs"
          sx={{ mt: 3, borderBottom: 1, borderColor: 'divider', width: '100%' }}
          centered
        >
          <Tab label="Sou uma Marca" {...a11yProps(0)} />
          <Tab label="Sou um Influenciador" {...a11yProps(1)} />
        </Tabs>

        <Box sx={{ width: '100%', mt: 3 }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {error && (
          <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
          {/* Step 1: Basic Information */}
          {activeStep === 0 && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Nome Completo"
                  autoFocus
                  value={formData.name}
                  onChange={handleChange}
                  error={!!formErrors.name}
                  helperText={formErrors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Senha"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  error={!!formErrors.password}
                  helperText={formErrors.password}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirmar Senha"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={!!formErrors.confirmPassword}
                  helperText={formErrors.confirmPassword}
                />
              </Grid>
            </Grid>
          )}

          {/* Step 2: Profile Information */}
          {activeStep === 1 && (
            <TabPanel value={activeTab} index={0}>
              {/* Brand Profile */}
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="companyName"
                    label="Nome da Empresa"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    error={!!formErrors.companyName}
                    helperText={formErrors.companyName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="industry"
                    label="Indústria/Setor"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    error={!!formErrors.industry}
                    helperText={formErrors.industry}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="website"
                    label="Website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </TabPanel>
          )}

          {activeStep === 1 && (
            <TabPanel value={activeTab} index={1}>
              {/* Influencer Profile */}
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="niche"
                    label="Nicho/Categoria"
                    name="niche"
                    value={formData.niche}
                    onChange={handleChange}
                    error={!!formErrors.niche}
                    helperText={formErrors.niche}
                  />
                </Grid>
                <Grid item xs={12}>
                  {formErrors.socialMedia && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                      {formErrors.socialMedia}
                    </Alert>
                  )}
                  <TextField
                    fullWidth
                    id="instagramHandle"
                    label="Instagram (@username)"
                    name="instagramHandle"
                    value={formData.instagramHandle}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="youtubeChannel"
                    label="Canal do YouTube"
                    name="youtubeChannel"
                    value={formData.youtubeChannel}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="tiktokHandle"
                    label="TikTok (@username)"
                    name="tiktokHandle"
                    value={formData.tiktokHandle}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </TabPanel>
          )}

          {/* Step 3: Terms and Conditions */}
          {activeStep === 2 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" gutterBottom>
                Ao criar uma conta, você concorda com nossos Termos de Uso e Política de Privacidade.
              </Typography>
              <Box sx={{ height: 200, overflowY: 'auto', border: '1px solid #ddd', p: 2, my: 2 }}>
                <Typography variant="body2">
                  <strong>Termos de Uso</strong>
                  <br /><br />
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget
                  aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.
                  Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam
                  nisl nunc quis nisl.
                  <br /><br />
                  Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam
                  nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet
                  nunc, quis aliquam nisl nunc quis nisl.
                  <br /><br />
                  <strong>Política de Privacidade</strong>
                  <br /><br />
                  Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam
                  nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet
                  nunc, quis aliquam nisl nunc quis nisl.
                  <br /><br />
                  Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam
                  nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet
                  nunc, quis aliquam nisl nunc quis nisl.
                </Typography>
              </Box>
              <FormControlLabel
                control={
                  <Checkbox
                    name="agreeTerms"
                    color="primary"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                  />
                }
                label="Eu li e concordo com os Termos de Uso e Política de Privacidade"
              />
              {formErrors.agreeTerms && (
                <Typography color="error" variant="body2">
                  {formErrors.agreeTerms}
                </Typography>
              )}
            </Box>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button
              onClick={handleBack}
              disabled={activeStep === 0}
              sx={{ mr: 1 }}
            >
              Voltar
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {activeStep === steps.length - 1 ? (
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Cadastrar'}
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
              >
                Próximo
              </Button>
            )}
          </Box>
        </Box>
      </Paper>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Já tem uma conta?{' '}
          <Link component={RouterLink} to="/login" variant="body2">
            Faça login
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default RegisterPage;