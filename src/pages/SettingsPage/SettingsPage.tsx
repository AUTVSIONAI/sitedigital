import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Tabs,
  Tab,
  Grid,
  TextField,
  Button,
  Divider,
  Switch,
  FormControlLabel,
  Avatar,
  IconButton,
  Alert,
  Snackbar,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
} from '@mui/material';
import {
  Person as PersonIcon,
  Security as SecurityIcon,
  Notifications as NotificationsIcon,
  Payment as PaymentIcon,
  PhotoCamera as PhotoCameraIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Edit as EditIcon,
  AccountBalance as AccountBalanceIcon,
} from '@mui/icons-material';
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
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `settings-tab-${index}`,
    'aria-controls': `settings-tabpanel-${index}`,
  };
}

const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [deleteAccountDialogOpen, setDeleteAccountDialogOpen] = useState(false);
  const [addPaymentMethodDialogOpen, setAddPaymentMethodDialogOpen] = useState(false);

  // Profile state
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '(11) 98765-4321',
    bio: 'Especialista em marketing digital e criação de conteúdo para redes sociais.',
    website: 'www.meusite.com.br',
    location: 'São Paulo, Brasil',
  });

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    campaignAlerts: true,
    messageAlerts: true,
    newsletterSubscription: false,
  });

  // Payment methods
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: '1',
      type: 'credit_card',
      name: 'Cartão de Crédito',
      last4: '4242',
      expiry: '12/25',
      isDefault: true,
    },
    {
      id: '2',
      type: 'bank_account',
      name: 'Conta Bancária',
      bankName: 'Banco do Brasil',
      accountNumber: '****5678',
      isDefault: false,
    },
  ]);

  // New payment method
  const [newPaymentMethod, setNewPaymentMethod] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleProfileChange = (field: string, value: string) => {
    setProfileData({
      ...profileData,
      [field]: value,
    });
  };

  const handleNotificationChange = (setting: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: event.target.checked,
    });
  };

  const handleSaveProfile = () => {
    // In a real app, you would save the profile data to your backend
    setSnackbarMessage('Perfil atualizado com sucesso!');
    setSnackbarOpen(true);
  };

  const handleSaveNotifications = () => {
    // In a real app, you would save the notification settings to your backend
    setSnackbarMessage('Configurações de notificação atualizadas!');
    setSnackbarOpen(true);
  };

  const handleSavePassword = () => {
    // In a real app, you would validate and update the password
    setSnackbarMessage('Senha atualizada com sucesso!');
    setSnackbarOpen(true);
  };

  const handleDeleteAccount = () => {
    // In a real app, you would delete the user's account
    setDeleteAccountDialogOpen(false);
    setSnackbarMessage('Conta excluída com sucesso!');
    setSnackbarOpen(true);
  };

  const handleSetDefaultPaymentMethod = (id: string) => {
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      }))
    );
    setSnackbarMessage('Método de pagamento padrão atualizado!');
    setSnackbarOpen(true);
  };

  const handleDeletePaymentMethod = (id: string) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id));
    setSnackbarMessage('Método de pagamento removido!');
    setSnackbarOpen(true);
  };

  const handleAddPaymentMethod = () => {
    // In a real app, you would validate and add the payment method
    const newMethod = {
      id: `${paymentMethods.length + 1}`,
      type: 'credit_card',
      name: 'Cartão de Crédito',
      last4: newPaymentMethod.cardNumber.slice(-4),
      expiry: newPaymentMethod.expiry,
      isDefault: paymentMethods.length === 0,
    };

    setPaymentMethods([...paymentMethods, newMethod]);
    setAddPaymentMethodDialogOpen(false);
    setNewPaymentMethod({
      cardNumber: '',
      cardName: '',
      expiry: '',
      cvv: '',
    });
    setSnackbarMessage('Método de pagamento adicionado!');
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 0, mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="settings tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab icon={<PersonIcon />} label="Perfil" {...a11yProps(0)} />
            <Tab icon={<SecurityIcon />} label="Segurança" {...a11yProps(1)} />
            <Tab icon={<NotificationsIcon />} label="Notificações" {...a11yProps(2)} />
            <Tab icon={<PaymentIcon />} label="Pagamentos" {...a11yProps(3)} />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar
                src={user?.avatar || 'https://via.placeholder.com/150'}
                alt={user?.name}
                sx={{ width: 150, height: 150, mb: 2 }}
              />
              <Box sx={{ position: 'relative' }}>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="avatar-upload"
                  type="file"
                />
                <label htmlFor="avatar-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<PhotoCameraIcon />}
                    sx={{ mb: 2 }}
                  >
                    Alterar Foto
                  </Button>
                </label>
              </Box>
              <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
                Recomendado: 300x300px, máximo 2MB
              </Typography>
            </Grid>

            <Grid item xs={12} md={8}>
              <Typography variant="h6" gutterBottom>
                Informações Pessoais
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Nome Completo"
                    value={profileData.name}
                    onChange={(e) => handleProfileChange('name', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleProfileChange('email', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Telefone"
                    value={profileData.phone}
                    onChange={(e) => handleProfileChange('phone', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Localização"
                    value={profileData.location}
                    onChange={(e) => handleProfileChange('location', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Website"
                    value={profileData.website}
                    onChange={(e) => handleProfileChange('website', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Bio"
                    multiline
                    rows={4}
                    value={profileData.bio}
                    onChange={(e) => handleProfileChange('bio', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSaveProfile}
                    >
                      Salvar Alterações
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom>
            Alterar Senha
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Senha Atual"
                type="password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nova Senha"
                type="password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Confirmar Nova Senha"
                type="password"
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSavePassword}
                >
                  Atualizar Senha
                </Button>
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h6" gutterBottom sx={{ color: 'error.main' }}>
            Zona de Perigo
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Ao excluir sua conta, todos os seus dados serão permanentemente removidos. Esta ação não pode ser desfeita.
          </Typography>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => setDeleteAccountDialogOpen(true)}
          >
            Excluir Minha Conta
          </Button>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom>
            Preferências de Notificação
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onChange={handleNotificationChange('emailNotifications')}
                  />
                }
                label="Notificações por Email"
              />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 4, mb: 2 }}>
                Receba atualizações importantes sobre sua conta e campanhas por email.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={notificationSettings.pushNotifications}
                    onChange={handleNotificationChange('pushNotifications')}
                  />
                }
                label="Notificações Push"
              />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 4, mb: 2 }}>
                Receba notificações em tempo real no seu navegador ou dispositivo móvel.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={notificationSettings.campaignAlerts}
                    onChange={handleNotificationChange('campaignAlerts')}
                  />
                }
                label="Alertas de Campanhas"
              />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 4, mb: 2 }}>
                Seja notificado sobre novas campanhas que correspondam ao seu perfil.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={notificationSettings.messageAlerts}
                    onChange={handleNotificationChange('messageAlerts')}
                  />
                }
                label="Alertas de Mensagens"
              />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 4, mb: 2 }}>
                Receba notificações quando alguém enviar uma mensagem para você.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={notificationSettings.newsletterSubscription}
                    onChange={handleNotificationChange('newsletterSubscription')}
                  />
                }
                label="Inscrição na Newsletter"
              />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 4, mb: 2 }}>
                Receba dicas, tendências e novidades sobre marketing de influência.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSaveNotifications}
                >
                  Salvar Preferências
                </Button>
              </Box>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">Métodos de Pagamento</Typography>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => setAddPaymentMethodDialogOpen(true)}
            >
              Adicionar Método
            </Button>
          </Box>

          <List>
            {paymentMethods.map((method) => (
              <React.Fragment key={method.id}>
                <ListItem>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {method.type === 'credit_card' ? (
                          <PaymentIcon sx={{ mr: 1 }} />
                        ) : (
                          <AccountBalanceIcon sx={{ mr: 1 }} />
                        )}
                        <Typography variant="subtitle1">
                          {method.name}
                          {method.isDefault && (
                            <Chip
                              label="Padrão"
                              size="small"
                              color="primary"
                              sx={{ ml: 1 }}
                            />
                          )}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      method.type === 'credit_card'
                        ? `**** **** **** ${method.last4} | Expira em ${method.expiry}`
                        : `${method.bankName} | ${method.accountNumber}`
                    }
                  />
                  <ListItemSecondaryAction>
                    {!method.isDefault && (
                      <Button
                        size="small"
                        onClick={() => handleSetDefaultPaymentMethod(method.id)}
                      >
                        Definir como Padrão
                      </Button>
                    )}
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeletePaymentMethod(method.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))}
          </List>

          {paymentMethods.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="text.secondary">
                Nenhum método de pagamento cadastrado.
              </Typography>
            </Box>
          )}
        </TabPanel>
      </Paper>

      {/* Delete Account Dialog */}
      <Dialog
        open={deleteAccountDialogOpen}
        onClose={() => setDeleteAccountDialogOpen(false)}
        aria-labelledby="delete-account-dialog-title"
      >
        <DialogTitle id="delete-account-dialog-title">Confirmar Exclusão de Conta</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            Você tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita e todos os seus dados serão permanentemente removidos.
          </Typography>
          <Typography variant="body1" color="error" sx={{ mt: 2 }}>
            Digite "EXCLUIR" para confirmar:
          </Typography>
          <TextField
            fullWidth
            margin="dense"
            variant="outlined"
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteAccountDialogOpen(false)}>Cancelar</Button>
          <Button onClick={handleDeleteAccount} color="error">
            Excluir Conta
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Payment Method Dialog */}
      <Dialog
        open={addPaymentMethodDialogOpen}
        onClose={() => setAddPaymentMethodDialogOpen(false)}
        aria-labelledby="add-payment-dialog-title"
      >
        <DialogTitle id="add-payment-dialog-title">Adicionar Método de Pagamento</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Número do Cartão"
                value={newPaymentMethod.cardNumber}
                onChange={(e) =>
                  setNewPaymentMethod({
                    ...newPaymentMethod,
                    cardNumber: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nome no Cartão"
                value={newPaymentMethod.cardName}
                onChange={(e) =>
                  setNewPaymentMethod({
                    ...newPaymentMethod,
                    cardName: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Validade (MM/AA)"
                value={newPaymentMethod.expiry}
                onChange={(e) =>
                  setNewPaymentMethod({
                    ...newPaymentMethod,
                    expiry: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="CVV"
                value={newPaymentMethod.cvv}
                onChange={(e) =>
                  setNewPaymentMethod({
                    ...newPaymentMethod,
                    cvv: e.target.value,
                  })
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddPaymentMethodDialogOpen(false)}>Cancelar</Button>
          <Button onClick={handleAddPaymentMethod} color="primary">
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SettingsPage;