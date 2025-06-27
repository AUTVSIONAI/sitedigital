import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Divider,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
} from '@mui/icons-material';

const Footer: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const footerLinks = [
    {
      title: 'DInfluencer',
      links: [
        { name: 'Sobre nós', url: '/about' },
        { name: 'Como funciona', url: '/how-it-works' },
        { name: 'Configurações', url: '/settings' },
        { name: 'Ajuda', url: '/help' },
        { name: 'Carreiras', url: '/careers' },
        { name: 'Contato', url: '/contact' },
      ],
    },
    {
      title: 'Para Marcas',
      links: [
        { name: 'Por que usar', url: '/brands/why-use' },
        { name: 'Casos de sucesso', url: '/brands/success-stories' },
        { name: 'Preços', url: '/brands/pricing' },
        { name: 'FAQ', url: '/brands/faq' },
      ],
    },
    {
      title: 'Para Influenciadores',
      links: [
        { name: 'Por que usar', url: '/influencers/why-use' },
        { name: 'Histórias de sucesso', url: '/influencers/success-stories' },
        { name: 'Como crescer', url: '/influencers/growth' },
        { name: 'FAQ', url: '/influencers/faq' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Termos de uso', url: '/terms' },
        { name: 'Política de privacidade', url: '/privacy' },
        { name: 'Cookies', url: '/cookies' },
        { name: 'LGPD', url: '/lgpd' },
      ],
    },
  ];

  const socialLinks = [
    { icon: <FacebookIcon />, url: 'https://facebook.com' },
    { icon: <TwitterIcon />, url: 'https://twitter.com' },
    { icon: <InstagramIcon />, url: 'https://instagram.com' },
    { icon: <LinkedInIcon />, url: 'https://linkedin.com' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[100],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          {footerLinks.map((section) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={section.title}
              sx={{ mb: isMobile ? 3 : 0 }}
            >
              <Typography variant="h6" color="text.primary" gutterBottom>
                {section.title}
              </Typography>
              <Box>
                {section.links.map((link) => (
                  <Link
                    key={link.name}
                    component={RouterLink}
                    to={link.url}
                    color="text.secondary"
                    display="block"
                    sx={{ mb: 1 }}
                    underline="hover"
                  >
                    {link.name}
                  </Link>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'center' : 'flex-start',
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: isMobile ? 2 : 0 }}
          >
            © {new Date().getFullYear()} DInfluencer. Todos os direitos reservados.
          </Typography>

          <Box>
            {socialLinks.map((social, index) => (
              <IconButton
                key={index}
                component="a"
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Link para ${social.url}`}
                sx={{ ml: 1 }}
                color="primary"
              >
                {social.icon}
              </IconButton>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;