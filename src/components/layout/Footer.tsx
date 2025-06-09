'use client';

import { Box, Container, Typography, Link, IconButton } from '@mui/material';
import { Grid as MuiGrid } from '@mui/material';
import { motion } from 'framer-motion';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useTheme } from '@mui/material/styles';
import { COMPANY_CONFIG } from '@/config/company';

const Footer = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  const socialIcons = {
    LinkedIn: <LinkedInIcon />,
    Twitter: <TwitterIcon />,
    Instagram: <InstagramIcon />,
    GitHub: <GitHubIcon />,
  };

  const footerLinks = [
    { title: 'Inicio', href: '#home' },
    { title: 'Nosotros', href: '#about' },
    { title: 'Productos', href: '#products' },
    { title: 'Servicios', href: '#services' },
    { title: 'Contacto', href: '#contact' },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: 8,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.05,
          backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <MuiGrid container spacing={4}>
          {/* Company Info */}
          <MuiGrid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 700, 
                  mb: 2,
                  fontSize: '1.5rem',
                }}
              >
                {COMPANY_CONFIG.name}
              </Typography>
              
              <Typography 
                variant="body2" 
                sx={{ 
                  mb: 3, 
                  opacity: 0.9,
                  lineHeight: 1.6,
                  fontSize: '1rem',
                }}
              >
                {COMPANY_CONFIG.tagline}
              </Typography>
              
              <Typography 
                variant="body2" 
                sx={{ 
                  mb: 4, 
                  opacity: 0.8,
                  lineHeight: 1.6,
                }}
              >
                Transformamos ideas en soluciones tecnológicas que impulsan el futuro.
                Especialistas en IA y automatización.
              </Typography>

              <Box sx={{ display: 'flex', gap: 1 }}>
                {COMPANY_CONFIG.socialLinks.map((social, index) => (
                  <motion.div
                    key={social.name}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconButton
                      component="a"
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: 'white',
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                        '&:hover': {
                          bgcolor: 'rgba(255, 255, 255, 0.2)',
                        },
                      }}
                    >
                      {socialIcons[social.icon as keyof typeof socialIcons]}
                    </IconButton>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </MuiGrid>

          {/* Quick Links */}
          <MuiGrid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600, 
                  mb: 3,
                  fontSize: '1.2rem',
                }}
              >
                Enlaces Rápidos
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {footerLinks.map((link) => (
                  <motion.div
                    key={link.title}
                    whileHover={{ x: 5 }}
                  >
                    <Link
                      component="button"
                      onClick={() => scrollToSection(link.href)}
                      sx={{
                        color: 'white',
                        textDecoration: 'none',
                        opacity: 0.8,
                        fontSize: '1rem',
                        textAlign: 'left',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '4px 0',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          opacity: 1,
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      {link.title}
                    </Link>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </MuiGrid>

          {/* Contact Info */}
          <MuiGrid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600, 
                  mb: 3,
                  fontSize: '1.2rem',
                }}
              >
                Contacto
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    opacity: 0.9,
                    fontSize: '1rem',
                  }}
                >
                  <strong>Email:</strong> {COMPANY_CONFIG.contact.email}
                </Typography>
                
                <Typography 
                  variant="body2" 
                  sx={{ 
                    opacity: 0.9,
                    fontSize: '1rem',
                  }}
                >
                  <strong>Teléfono:</strong> {COMPANY_CONFIG.contact.phone}
                </Typography>
                
                <Typography 
                  variant="body2" 
                  sx={{ 
                    opacity: 0.9,
                    fontSize: '1rem',
                  }}
                >
                  <strong>Ubicación:</strong> {COMPANY_CONFIG.contact.address}
                </Typography>
              </Box>
            </motion.div>
          </MuiGrid>
        </MuiGrid>

        {/* Divider */}
        <Box
          sx={{
            height: '1px',
            bgcolor: 'rgba(255, 255, 255, 0.2)',
            my: 6,
          }}
        />

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                opacity: 0.8,
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              © {currentYear} {COMPANY_CONFIG.name}. Todos los derechos reservados.
            </Typography>
            
            <Typography
              variant="body2"
              sx={{
                opacity: 0.6,
                textAlign: { xs: 'center', md: 'right' },
                fontSize: '0.875rem',
              }}
            >
              Hecho con ❤️ para transformar el futuro
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Footer; 