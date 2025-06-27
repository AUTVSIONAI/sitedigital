import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemIcon,
  Avatar,
  Divider,
  IconButton,
  InputAdornment,
  Badge,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import {
  Send as SendIcon,
  AttachFile as AttachFileIcon,
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  FilterList as FilterListIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Delete as DeleteIcon,
  Block as BlockIcon,
  Image as ImageIcon,
  InsertDriveFile as FileIcon,
  EmojiEmotions as EmojiIcon,
  ArrowBack as ArrowBackIcon,
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
      id={`messages-tabpanel-${index}`}
      aria-labelledby={`messages-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ height: '100%' }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `messages-tab-${index}`,
    'aria-controls': `messages-tabpanel-${index}`,
  };
}

interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
  type: 'brand' | 'influencer';
  status: 'online' | 'offline' | 'away';
  isFavorite: boolean;
}

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  attachments?: {
    type: 'image' | 'file';
    url: string;
    name?: string;
  }[];
}

const MessagesPage: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Parse query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const userId = params.get('user');
    if (userId) {
      const contact = mockContacts.find((c) => c.id === userId);
      if (contact) {
        setSelectedContact(contact);
      }
    }
  }, [location]);

  // Mock data for contacts
  const mockContacts: Contact[] = [
    {
      id: '1',
      name: 'Ana Silva',
      avatar: 'https://via.placeholder.com/150',
      lastMessage: 'Adorei a proposta da campanha!',
      lastMessageTime: '10:30',
      unread: 2,
      type: 'influencer',
      status: 'online',
      isFavorite: true,
    },
    {
      id: '2',
      name: 'Moda Sustentável',
      avatar: 'https://via.placeholder.com/150',
      lastMessage: 'Podemos agendar uma reunião para discutir os detalhes?',
      lastMessageTime: '09:15',
      unread: 0,
      type: 'brand',
      status: 'online',
      isFavorite: true,
    },
    {
      id: '3',
      name: 'Carlos Mendes',
      avatar: 'https://via.placeholder.com/150',
      lastMessage: 'Qual o prazo para entrega do conteúdo?',
      lastMessageTime: 'Ontem',
      unread: 0,
      type: 'influencer',
      status: 'offline',
      isFavorite: false,
    },
    {
      id: '4',
      name: 'Tech Gadgets',
      avatar: 'https://via.placeholder.com/150',
      lastMessage: 'Enviamos os produtos para review. Deve chegar em 2 dias.',
      lastMessageTime: 'Ontem',
      unread: 1,
      type: 'brand',
      status: 'away',
      isFavorite: false,
    },
    {
      id: '5',
      name: 'Fernanda Lima',
      avatar: 'https://via.placeholder.com/150',
      lastMessage: 'Obrigada pelo convite!',
      lastMessageTime: '22/06',
      unread: 0,
      type: 'influencer',
      status: 'offline',
      isFavorite: false,
    },
    {
      id: '6',
      name: 'Beleza Natural',
      avatar: 'https://via.placeholder.com/150',
      lastMessage: 'Temos interesse em trabalhar com você em nossa próxima campanha.',
      lastMessageTime: '20/06',
      unread: 0,
      type: 'brand',
      status: 'offline',
      isFavorite: false,
    },
  ];

  // Mock data for messages
  const mockMessages: { [key: string]: Message[] } = {
    '1': [
      {
        id: '1',
        senderId: '1',
        receiverId: user?.id || '',
        text: 'Olá! Vi sua marca e adorei os produtos sustentáveis.',
        timestamp: '2023-06-25T10:00:00',
        status: 'read',
      },
      {
        id: '2',
        senderId: user?.id || '',
        receiverId: '1',
        text: 'Olá Ana! Obrigado pelo interesse. Estamos procurando influenciadores para nossa nova coleção de verão.',
        timestamp: '2023-06-25T10:05:00',
        status: 'read',
      },
      {
        id: '3',
        senderId: '1',
        receiverId: user?.id || '',
        text: 'Isso parece ótimo! Tenho muito interesse em moda sustentável.',
        timestamp: '2023-06-25T10:10:00',
        status: 'read',
      },
      {
        id: '4',
        senderId: user?.id || '',
        receiverId: '1',
        text: 'Perfeito! Posso te enviar mais detalhes sobre a campanha?',
        timestamp: '2023-06-25T10:15:00',
        status: 'read',
      },
      {
        id: '5',
        senderId: '1',
        receiverId: user?.id || '',
        text: 'Claro, por favor!',
        timestamp: '2023-06-25T10:20:00',
        status: 'read',
      },
      {
        id: '6',
        senderId: user?.id || '',
        receiverId: '1',
        text: 'Estamos lançando uma coleção de roupas feitas com materiais reciclados. Gostaríamos que você criasse conteúdo mostrando como as peças podem ser usadas no dia a dia.',
        timestamp: '2023-06-25T10:25:00',
        status: 'read',
        attachments: [
          {
            type: 'image',
            url: 'https://via.placeholder.com/300',
            name: 'colecao_verao.jpg',
          },
          {
            type: 'file',
            url: '#',
            name: 'briefing_campanha.pdf',
          },
        ],
      },
      {
        id: '7',
        senderId: '1',
        receiverId: user?.id || '',
        text: 'Adorei a proposta da campanha! As peças são lindas e combina muito com o conteúdo que produzo.',
        timestamp: '2023-06-25T10:30:00',
        status: 'delivered',
      },
    ],
    '2': [
      {
        id: '1',
        senderId: '2',
        receiverId: user?.id || '',
        text: 'Olá! Vimos seu perfil e gostaríamos de trabalhar com você.',
        timestamp: '2023-06-25T09:00:00',
        status: 'read',
      },
      {
        id: '2',
        senderId: user?.id || '',
        receiverId: '2',
        text: 'Olá! Obrigado pelo contato. Que tipo de colaboração vocês têm em mente?',
        timestamp: '2023-06-25T09:05:00',
        status: 'read',
      },
      {
        id: '3',
        senderId: '2',
        receiverId: user?.id || '',
        text: 'Estamos procurando influenciadores para nossa campanha de conscientização ambiental.',
        timestamp: '2023-06-25T09:10:00',
        status: 'read',
      },
      {
        id: '4',
        senderId: user?.id || '',
        receiverId: '2',
        text: 'Isso parece interessante! Pode me contar mais sobre a campanha?',
        timestamp: '2023-06-25T09:15:00',
        status: 'read',
      },
      {
        id: '5',
        senderId: '2',
        receiverId: user?.id || '',
        text: 'Claro! A campanha visa educar sobre o impacto da indústria da moda no meio ambiente e como escolhas conscientes podem fazer a diferença.',
        timestamp: '2023-06-25T09:20:00',
        status: 'read',
      },
      {
        id: '6',
        senderId: '2',
        receiverId: user?.id || '',
        text: 'Podemos agendar uma reunião para discutir os detalhes?',
        timestamp: '2023-06-25T09:15:00',
        status: 'delivered',
      },
    ],
  };

  useEffect(() => {
    // Load contacts
    setContacts(mockContacts);

    // Load messages for selected contact
    if (selectedContact) {
      setMessages(mockMessages[selectedContact.id] || []);
    }
  }, [selectedContact]);

  useEffect(() => {
    // Scroll to bottom of messages
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact);
    // Mark messages as read
    const updatedContacts = contacts.map((c) =>
      c.id === contact.id ? { ...c, unread: 0 } : c
    );
    setContacts(updatedContacts);
    // Load messages for selected contact
    setMessages(mockMessages[contact.id] || []);
  };

  const handleSendMessage = () => {
    if (message.trim() === '' || !selectedContact) return;

    const newMessage: Message = {
      id: `${messages.length + 1}`,
      senderId: user?.id || '',
      receiverId: selectedContact.id,
      text: message,
      timestamp: new Date().toISOString(),
      status: 'sent',
    };

    setMessages([...messages, newMessage]);
    setMessage('');

    // Update last message in contacts
    const updatedContacts = contacts.map((c) =>
      c.id === selectedContact.id
        ? {
            ...c,
            lastMessage: message,
            lastMessageTime: 'Agora',
          }
        : c
    );
    setContacts(updatedContacts);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleFilterMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterMenuClose = () => {
    setFilterAnchorEl(null);
  };

  const toggleFavorite = (contactId: string) => {
    const updatedContacts = contacts.map((c) =>
      c.id === contactId ? { ...c, isFavorite: !c.isFavorite } : c
    );
    setContacts(updatedContacts);
  };

  const filteredContacts = contacts.filter((contact) => {
    // Filter by search query
    if (
      searchQuery &&
      !contact.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Filter by tab
    if (tabValue === 1 && contact.type !== 'brand') return false;
    if (tabValue === 2 && contact.type !== 'influencer') return false;
    if (tabValue === 3 && !contact.isFavorite) return false;
    if (tabValue === 4 && contact.unread === 0) return false;

    return true;
  });

  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) {
      return date.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      });
    } else if (diffDays === 1) {
      return 'Ontem';
    } else {
      return date.toLocaleDateString('pt-BR');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return theme.palette.success.main;
      case 'away':
        return theme.palette.warning.main;
      default:
        return theme.palette.grey[500];
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 2, mb: 4 }}>
      <Paper elevation={3} sx={{ height: { xs: 'calc(100vh - 180px)', md: 'calc(100vh - 140px)' }, overflow: 'hidden' }}>
        <Grid container sx={{ height: '100%' }}>
          {/* Contacts Sidebar */}
          <Grid
            item
            xs={12}
            md={4}
            lg={3}
            sx={{
              height: '100%',
              borderRight: 1,
              borderColor: 'divider',
              display: isMobile && selectedContact ? 'none' : 'block',
            }}
          >
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
              <Typography variant="h6" gutterBottom>
                Mensagens
              </Typography>
              <TextField
                fullWidth
                placeholder="Buscar contatos..."
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
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={handleFilterMenuOpen}>
                        <FilterListIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Menu
                anchorEl={filterAnchorEl}
                open={Boolean(filterAnchorEl)}
                onClose={handleFilterMenuClose}
              >
                <MenuItem onClick={() => { setTabValue(0); handleFilterMenuClose(); }}>
                  Todos
                </MenuItem>
                <MenuItem onClick={() => { setTabValue(1); handleFilterMenuClose(); }}>
                  Marcas
                </MenuItem>
                <MenuItem onClick={() => { setTabValue(2); handleFilterMenuClose(); }}>
                  Influenciadores
                </MenuItem>
                <MenuItem onClick={() => { setTabValue(3); handleFilterMenuClose(); }}>
                  Favoritos
                </MenuItem>
                <MenuItem onClick={() => { setTabValue(4); handleFilterMenuClose(); }}>
                  Não lidas
                </MenuItem>
              </Menu>
            </Box>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="message tabs"
              >
                <Tab label="Todos" {...a11yProps(0)} />
                <Tab label="Marcas" {...a11yProps(1)} />
                <Tab label="Influenciadores" {...a11yProps(2)} />
                <Tab label="Favoritos" {...a11yProps(3)} />
                <Tab
                  label={
                    <Badge
                      color="error"
                      badgeContent={contacts.reduce((total, contact) => total + contact.unread, 0)}
                      max={99}
                    >
                      Não lidas
                    </Badge>
                  }
                  {...a11yProps(4)}
                />
              </Tabs>
            </Box>

            <List sx={{ height: 'calc(100% - 130px)', overflow: 'auto' }}>
              <TabPanel value={tabValue} index={0}>
                {filteredContacts.map((contact) => (
                  <React.Fragment key={contact.id}>
                    <ListItem
                      button
                      selected={selectedContact?.id === contact.id}
                      onClick={() => handleContactSelect(contact)}
                      sx={{
                        bgcolor: selectedContact?.id === contact.id ? 'action.selected' : 'inherit',
                        '&:hover': { bgcolor: 'action.hover' },
                      }}
                    >
                      <ListItemAvatar>
                        <Badge
                          overlap="circular"
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                          variant="dot"
                          sx={{
                            '& .MuiBadge-badge': {
                              backgroundColor: getStatusColor(contact.status),
                              boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
                            },
                          }}
                        >
                          <Avatar src={contact.avatar} alt={contact.name} />
                        </Badge>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography
                              variant="subtitle1"
                              sx={{ fontWeight: contact.unread > 0 ? 'bold' : 'normal' }}
                            >
                              {contact.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {contact.lastMessageTime}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography
                              variant="body2"
                              sx={{
                                color: contact.unread > 0 ? 'text.primary' : 'text.secondary',
                                fontWeight: contact.unread > 0 ? 'medium' : 'normal',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                maxWidth: '180px',
                              }}
                            >
                              {contact.lastMessage}
                            </Typography>
                            {contact.unread > 0 && (
                              <Badge
                                color="primary"
                                badgeContent={contact.unread}
                                sx={{ ml: 1 }}
                              />
                            )}
                          </Box>
                        }
                      />
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(contact.id);
                        }}
                      >
                        {contact.isFavorite ? (
                          <StarIcon color="primary" fontSize="small" />
                        ) : (
                          <StarBorderIcon fontSize="small" />
                        )}
                      </IconButton>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
              </TabPanel>

              <TabPanel value={tabValue} index={1}>
                {filteredContacts.map((contact) => (
                  <React.Fragment key={contact.id}>
                    <ListItem
                      button
                      selected={selectedContact?.id === contact.id}
                      onClick={() => handleContactSelect(contact)}
                      sx={{
                        bgcolor: selectedContact?.id === contact.id ? 'action.selected' : 'inherit',
                        '&:hover': { bgcolor: 'action.hover' },
                      }}
                    >
                      <ListItemAvatar>
                        <Badge
                          overlap="circular"
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                          variant="dot"
                          sx={{
                            '& .MuiBadge-badge': {
                              backgroundColor: getStatusColor(contact.status),
                              boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
                            },
                          }}
                        >
                          <Avatar src={contact.avatar} alt={contact.name} />
                        </Badge>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography
                              variant="subtitle1"
                              sx={{ fontWeight: contact.unread > 0 ? 'bold' : 'normal' }}
                            >
                              {contact.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {contact.lastMessageTime}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography
                              variant="body2"
                              sx={{
                                color: contact.unread > 0 ? 'text.primary' : 'text.secondary',
                                fontWeight: contact.unread > 0 ? 'medium' : 'normal',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                maxWidth: '180px',
                              }}
                            >
                              {contact.lastMessage}
                            </Typography>
                            {contact.unread > 0 && (
                              <Badge
                                color="primary"
                                badgeContent={contact.unread}
                                sx={{ ml: 1 }}
                              />
                            )}
                          </Box>
                        }
                      />
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(contact.id);
                        }}
                      >
                        {contact.isFavorite ? (
                          <StarIcon color="primary" fontSize="small" />
                        ) : (
                          <StarBorderIcon fontSize="small" />
                        )}
                      </IconButton>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
              </TabPanel>

              <TabPanel value={tabValue} index={2}>
                {filteredContacts.map((contact) => (
                  <React.Fragment key={contact.id}>
                    <ListItem
                      button
                      selected={selectedContact?.id === contact.id}
                      onClick={() => handleContactSelect(contact)}
                      sx={{
                        bgcolor: selectedContact?.id === contact.id ? 'action.selected' : 'inherit',
                        '&:hover': { bgcolor: 'action.hover' },
                      }}
                    >
                      <ListItemAvatar>
                        <Badge
                          overlap="circular"
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                          variant="dot"
                          sx={{
                            '& .MuiBadge-badge': {
                              backgroundColor: getStatusColor(contact.status),
                              boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
                            },
                          }}
                        >
                          <Avatar src={contact.avatar} alt={contact.name} />
                        </Badge>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography
                              variant="subtitle1"
                              sx={{ fontWeight: contact.unread > 0 ? 'bold' : 'normal' }}
                            >
                              {contact.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {contact.lastMessageTime}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography
                              variant="body2"
                              sx={{
                                color: contact.unread > 0 ? 'text.primary' : 'text.secondary',
                                fontWeight: contact.unread > 0 ? 'medium' : 'normal',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                maxWidth: '180px',
                              }}
                            >
                              {contact.lastMessage}
                            </Typography>
                            {contact.unread > 0 && (
                              <Badge
                                color="primary"
                                badgeContent={contact.unread}
                                sx={{ ml: 1 }}
                              />
                            )}
                          </Box>
                        }
                      />
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(contact.id);
                        }}
                      >
                        {contact.isFavorite ? (
                          <StarIcon color="primary" fontSize="small" />
                        ) : (
                          <StarBorderIcon fontSize="small" />
                        )}
                      </IconButton>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
              </TabPanel>

              <TabPanel value={tabValue} index={3}>
                {filteredContacts.map((contact) => (
                  <React.Fragment key={contact.id}>
                    <ListItem
                      button
                      selected={selectedContact?.id === contact.id}
                      onClick={() => handleContactSelect(contact)}
                      sx={{
                        bgcolor: selectedContact?.id === contact.id ? 'action.selected' : 'inherit',
                        '&:hover': { bgcolor: 'action.hover' },
                      }}
                    >
                      <ListItemAvatar>
                        <Badge
                          overlap="circular"
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                          variant="dot"
                          sx={{
                            '& .MuiBadge-badge': {
                              backgroundColor: getStatusColor(contact.status),
                              boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
                            },
                          }}
                        >
                          <Avatar src={contact.avatar} alt={contact.name} />
                        </Badge>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography
                              variant="subtitle1"
                              sx={{ fontWeight: contact.unread > 0 ? 'bold' : 'normal' }}
                            >
                              {contact.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {contact.lastMessageTime}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography
                              variant="body2"
                              sx={{
                                color: contact.unread > 0 ? 'text.primary' : 'text.secondary',
                                fontWeight: contact.unread > 0 ? 'medium' : 'normal',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                maxWidth: '180px',
                              }}
                            >
                              {contact.lastMessage}
                            </Typography>
                            {contact.unread > 0 && (
                              <Badge
                                color="primary"
                                badgeContent={contact.unread}
                                sx={{ ml: 1 }}
                              />
                            )}
                          </Box>
                        }
                      />
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(contact.id);
                        }}
                      >
                        {contact.isFavorite ? (
                          <StarIcon color="primary" fontSize="small" />
                        ) : (
                          <StarBorderIcon fontSize="small" />
                        )}
                      </IconButton>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
              </TabPanel>

              <TabPanel value={tabValue} index={4}>
                {filteredContacts.map((contact) => (
                  <React.Fragment key={contact.id}>
                    <ListItem
                      button
                      selected={selectedContact?.id === contact.id}
                      onClick={() => handleContactSelect(contact)}
                      sx={{
                        bgcolor: selectedContact?.id === contact.id ? 'action.selected' : 'inherit',
                        '&:hover': { bgcolor: 'action.hover' },
                      }}
                    >
                      <ListItemAvatar>
                        <Badge
                          overlap="circular"
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                          variant="dot"
                          sx={{
                            '& .MuiBadge-badge': {
                              backgroundColor: getStatusColor(contact.status),
                              boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
                            },
                          }}
                        >
                          <Avatar src={contact.avatar} alt={contact.name} />
                        </Badge>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography
                              variant="subtitle1"
                              sx={{ fontWeight: contact.unread > 0 ? 'bold' : 'normal' }}
                            >
                              {contact.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {contact.lastMessageTime}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography
                              variant="body2"
                              sx={{
                                color: contact.unread > 0 ? 'text.primary' : 'text.secondary',
                                fontWeight: contact.unread > 0 ? 'medium' : 'normal',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                maxWidth: '180px',
                              }}
                            >
                              {contact.lastMessage}
                            </Typography>
                            {contact.unread > 0 && (
                              <Badge
                                color="primary"
                                badgeContent={contact.unread}
                                sx={{ ml: 1 }}
                              />
                            )}
                          </Box>
                        }
                      />
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(contact.id);
                        }}
                      >
                        {contact.isFavorite ? (
                          <StarIcon color="primary" fontSize="small" />
                        ) : (
                          <StarBorderIcon fontSize="small" />
                        )}
                      </IconButton>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
              </TabPanel>
            </List>
          </Grid>

          {/* Chat Area */}
          <Grid
            item
            xs={12}
            md={8}
            lg={9}
            sx={{
              height: '100%',
              display: isMobile && !selectedContact ? 'none' : 'flex',
              flexDirection: 'column',
            }}
          >
            {selectedContact ? (
              <>
                {/* Chat Header */}
                <Box
                  sx={{
                    p: 2,
                    borderBottom: 1,
                    borderColor: 'divider',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {isMobile && (
                      <IconButton
                        edge="start"
                        sx={{ mr: 1 }}
                        onClick={() => setSelectedContact(null)}
                      >
                        <ArrowBackIcon />
                      </IconButton>
                    )}
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      variant="dot"
                      sx={{
                        '& .MuiBadge-badge': {
                          backgroundColor: getStatusColor(selectedContact.status),
                          boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
                        },
                      }}
                    >
                      <Avatar
                        src={selectedContact.avatar}
                        alt={selectedContact.name}
                        sx={{ width: 40, height: 40, mr: 2 }}
                      />
                    </Badge>
                    <Box>
                      <Typography variant="subtitle1">{selectedContact.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {selectedContact.status === 'online'
                          ? 'Online'
                          : selectedContact.status === 'away'
                          ? 'Ausente'
                          : 'Offline'}
                      </Typography>
                    </Box>
                  </Box>
                  <IconButton onClick={handleMenuOpen}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleMenuClose}>
                      <ListItemIcon>
                        {selectedContact.isFavorite ? <StarIcon fontSize="small" /> : <StarBorderIcon fontSize="small" />}
                      </ListItemIcon>
                      {selectedContact.isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose}>
                      <ListItemIcon>
                        <DeleteIcon fontSize="small" />
                      </ListItemIcon>
                      Apagar conversa
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose}>
                      <ListItemIcon>
                        <BlockIcon fontSize="small" />
                      </ListItemIcon>
                      Bloquear contato
                    </MenuItem>
                  </Menu>
                </Box>

                {/* Messages */}
                <Box
                  sx={{
                    flexGrow: 1,
                    p: 2,
                    overflow: 'auto',
                    bgcolor: 'background.default',
                  }}
                >
                  {messages.map((msg) => {
                    const isSentByMe = msg.senderId === user?.id;
                    return (
                      <Box
                        key={msg.id}
                        sx={{
                          display: 'flex',
                          justifyContent: isSentByMe ? 'flex-end' : 'flex-start',
                          mb: 2,
                        }}
                      >
                        {!isSentByMe && (
                          <Avatar
                            src={selectedContact.avatar}
                            alt={selectedContact.name}
                            sx={{ width: 36, height: 36, mr: 1 }}
                          />
                        )}
                        <Box
                          sx={{
                            maxWidth: '70%',
                            bgcolor: isSentByMe ? 'primary.main' : 'background.paper',
                            color: isSentByMe ? 'primary.contrastText' : 'text.primary',
                            borderRadius: 2,
                            p: 2,
                            boxShadow: 1,
                          }}
                        >
                          <Typography variant="body1">{msg.text}</Typography>
                          {msg.attachments && msg.attachments.length > 0 && (
                            <Box sx={{ mt: 1 }}>
                              {msg.attachments.map((attachment, index) => (
                                <Box
                                  key={index}
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    mt: 1,
                                    p: 1,
                                    borderRadius: 1,
                                    bgcolor: isSentByMe
                                      ? 'rgba(255, 255, 255, 0.1)'
                                      : 'rgba(0, 0, 0, 0.05)',
                                  }}
                                >
                                  {attachment.type === 'image' ? (
                                    <>
                                      <ImageIcon sx={{ mr: 1 }} />
                                      <Box
                                        component="img"
                                        src={attachment.url}
                                        alt={attachment.name || 'Imagem'}
                                        sx={{ maxWidth: '100%', maxHeight: 200, borderRadius: 1 }}
                                      />
                                    </>
                                  ) : (
                                    <>
                                      <FileIcon sx={{ mr: 1 }} />
                                      <Typography variant="body2">
                                        {attachment.name}
                                      </Typography>
                                    </>
                                  )}
                                </Box>
                              ))}
                            </Box>
                          )}
                          <Typography
                            variant="caption"
                            sx={{
                              display: 'block',
                              mt: 0.5,
                              textAlign: 'right',
                              color: isSentByMe ? 'rgba(255, 255, 255, 0.7)' : 'text.secondary',
                            }}
                          >
                            {formatMessageTime(msg.timestamp)}
                            {isSentByMe && (
                              <span style={{ marginLeft: 4 }}>
                                {msg.status === 'sent' && '✓'}
                                {msg.status === 'delivered' && '✓✓'}
                                {msg.status === 'read' && (
                                  <span style={{ color: '#2196f3' }}>✓✓</span>
                                )}
                              </span>
                            )}
                          </Typography>
                        </Box>
                      </Box>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </Box>

                {/* Message Input */}
                <Box
                  sx={{
                    p: 2,
                    borderTop: 1,
                    borderColor: 'divider',
                    bgcolor: 'background.paper',
                  }}
                >
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={1}>
                      <Tooltip title="Anexar arquivo">
                        <IconButton color="primary">
                          <AttachFileIcon />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                    <Grid item xs={1}>
                      <Tooltip title="Inserir emoji">
                        <IconButton color="primary">
                          <EmojiIcon />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                    <Grid item xs={8}>
                      <TextField
                        fullWidth
                        placeholder="Digite sua mensagem..."
                        variant="outlined"
                        value={message}
                        onChange={handleMessageChange}
                        onKeyPress={handleKeyPress}
                        multiline
                        maxRows={4}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        endIcon={<SendIcon />}
                        onClick={handleSendMessage}
                        disabled={message.trim() === ''}
                      >
                        Enviar
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  p: 3,
                  bgcolor: 'background.default',
                }}
              >
                <Typography variant="h5" gutterBottom>
                  Selecione um contato para iniciar uma conversa
                </Typography>
                <Typography variant="body1" color="text.secondary" align="center">
                  Conecte-se com marcas e influenciadores para discutir parcerias e campanhas.
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default MessagesPage;