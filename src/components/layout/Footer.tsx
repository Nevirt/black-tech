'use client';

import { Box, Container, Typography, Link, IconButton } from '@mui/material';
import { Grid as MuiGrid } from '@mui/material';
import { motion } from 'framer-motion';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import { useI18n } from '@/i18n/I18nProvider';
import { useScrollTo } from '@/hooks/useScrollTo';

const Footer = () => {
  const theme = useTheme();
  const { t, company } = useI18n();
  const currentYear = new Date().getFullYear();
  const { scrollToSection: scrollTo } = useScrollTo();

  const socialIcons = {
    LinkedIn: <LinkedInIcon />,
    Twitter: <TwitterIcon />,
    Instagram: <InstagramIcon />,
    GitHub: <GitHubIcon />,
  };

  const footerLinks = [
    { title: t('nav.home'), href: '#home' },
    { title: t('nav.about'), href: '/about' },
    { title: t('nav.services'), href: '/services' },
    { title: 'Pricing', href: '/pricing' },
    { title: 'Support', href: '/support' },
    { title: t('footer.link.terms'), href: '/terms' },
    { title: t('footer.link.privacy'), href: '/privacy' },
    { title: t('footer.link.refunds'), href: '/refunds' },
    { title: t('nav.contact'), href: '#contact' },
  ];

  const scrollToSection = (sectionId: string) => {
    if (sectionId.startsWith('#')) {
      scrollTo(sectionId);
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
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Image
                  src="/inzaiq-logo-blanco.png"
                  alt={`${company.name} Logo`}
                  width={40}
                  height={40}
                  style={{ marginRight: '12px' }}
                />
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 700,
                    fontSize: '1.5rem',
                  }}
                >
                  {company.name}
                </Typography>
              </Box>
              
              <Typography 
                variant="body2" 
                sx={{ 
                  mb: 3, 
                  opacity: 0.9,
                  lineHeight: 1.6,
                  fontSize: '1rem',
                }}
              >
                {company.tagline}
              </Typography>
              
              <Typography 
                variant="body2" 
                sx={{ 
                  mb: 4, 
                  opacity: 0.8,
                  lineHeight: 1.6,
                }}
              >
                {t('footer.companyLine')}
              </Typography>

              <Box sx={{ display: 'flex', gap: 1 }}>
                {company.socialLinks.map((social, index) => (
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
                {t('footer.quickLinks')}
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {footerLinks.map((link) => (
                  <motion.div
                    key={link.title}
                    whileHover={{ x: 5 }}
                  >
                    <Link
                      component={link.href.startsWith('#') ? 'button' : 'a'}
                      href={!link.href.startsWith('#') ? link.href : undefined}
                      onClick={link.href.startsWith('#') ? () => scrollToSection(link.href) : undefined}
                      sx={{
                        color: 'white',
                        textDecoration: 'none',
                        opacity: 0.8,
                        fontSize: '1rem',
                        textAlign: 'left',
                        background: link.href.startsWith('#') ? 'none' : undefined,
                        border: link.href.startsWith('#') ? 'none' : undefined,
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
                {t('footer.contact')}
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    opacity: 0.9,
                    fontSize: '1rem',
                  }}
                >
                  <strong>{t('contact.email')}:</strong> {company.contact.email}
                </Typography>
                
                <Typography 
                  variant="body2" 
                  sx={{ 
                    opacity: 0.9,
                    fontSize: '1rem',
                  }}
                >
                  <strong>{t('contact.phone')}:</strong> {company.contact.phone}
                </Typography>
                
                <Typography 
                  variant="body2" 
                  sx={{ 
                    opacity: 0.9,
                    fontSize: '1rem',
                  }}
                >
                  <strong>{t('contact.location')}:</strong> {company.contact.address}
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
              © {currentYear} {company.name}. {t('footer.copyright')}
            </Typography>
            
            <Typography
              variant="body2"
              sx={{
                opacity: 0.6,
                textAlign: { xs: 'center', md: 'right' },
                fontSize: '0.875rem',
              }}
            >
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Footer; 