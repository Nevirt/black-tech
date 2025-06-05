'use client';

import {
  Box,
  Container,
  Grid as MuiGrid,
  Typography,
  IconButton,
  Link,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <LinkedInIcon />, href: 'https://linkedin.com' },
    { icon: <TwitterIcon />, href: 'https://twitter.com' },
    { icon: <InstagramIcon />, href: 'https://instagram.com' },
    { icon: <GitHubIcon />, href: 'https://github.com' },
  ];

  const footerLinks = [
    { title: 'Inicio', href: '#home' },
    { title: 'Quiénes Somos', href: '#about' },
    { title: 'Producto', href: '#product' },
    { title: 'Servicios', href: '#services' },
    { title: 'Contacto', href: '#contact' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        py: 6,
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <MuiGrid container spacing={4}>
          {/* Company Info */}
          <MuiGrid item xs={12} md={4}>
            <Typography variant="h6" color="primary.main" gutterBottom>
              BLACK TECH
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Automatizando la comunicación con tecnología de punta.
              Transformamos la manera en que las empresas interactúan con sus clientes.
            </Typography>
            <Box sx={{ mt: 2 }}>
              {socialLinks.map((social, index) => (
                <IconButton
                  key={index}
                  component={motion.a}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  sx={{
                    mr: 1,
                    color: 'text.secondary',
                    '&:hover': {
                      color: 'primary.main',
                    },
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </MuiGrid>

          {/* Links */}
          <MuiGrid item xs={12} md={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Enlaces Rápidos
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {footerLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  component={motion.a}
                  whileHover={{ x: 5 }}
                  sx={{
                    color: 'text.secondary',
                    textDecoration: 'none',
                    mb: 1,
                    '&:hover': {
                      color: 'primary.main',
                    },
                  }}
                >
                  {link.title}
                </Link>
              ))}
            </Box>
          </MuiGrid>

          {/* Contact Info */}
          <MuiGrid item xs={12} md={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contacto
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Email: info@blacktech.com
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Tel: +54 (11) 1234-5678
            </Typography>
            <Typography variant="body2" color="text.secondary">
              San Juan Bautista, Paraguay
            </Typography>
          </MuiGrid>
        </MuiGrid>

        {/* Copyright */}
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 4 }}
        >
          © {currentYear} Black Tech. Todos los derechos reservados.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 