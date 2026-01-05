'use client';

import { Box, Container, Typography, Link, IconButton } from '@mui/material';
import { Grid as MuiGrid } from '@mui/material';
import { motion } from 'framer-motion';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useI18n } from '@/i18n/I18nProvider';
import { useScrollTo } from '@/hooks/useScrollTo';
import Image from 'next/image';

const Footer = () => {
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
    { title: t('footer.link.support'), href: '/support' },
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
        bgcolor: 'black',
        color: 'white',
        py: 8,
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <MuiGrid container spacing={8}>
          {/* Company Info */}
          <MuiGrid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
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
                    fontWeight: 800,
                    fontSize: '1.5rem',
                    letterSpacing: '-0.5px',
                  }}
                >
                  {company.name}
                </Typography>
              </Box>

              <Typography
                variant="body2"
                sx={{
                  mb: 3,
                  opacity: 0.7,
                  lineHeight: 1.6,
                  fontSize: '0.9rem',
                }}
              >
                {company.tagline}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  mb: 4,
                  opacity: 0.7,
                  lineHeight: 1.6,
                }}
              >
                {t('footer.companyLine')}
              </Typography>

              <Box sx={{ display: 'flex', gap: 1 }}>
                {company.socialLinks.map((social) => (
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
                        bgcolor: 'transparent',
                        border: '1px solid rgba(255,255,255,0.2)',
                        '&:hover': {
                          bgcolor: 'white',
                          color: 'black',
                          borderColor: 'white',
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
                  fontSize: '1.1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}
              >
                {t('footer.quickLinks')}
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
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
                        color: 'gray',
                        textDecoration: 'none',
                        fontSize: '0.95rem',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        '&:hover': {
                          color: 'white',
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
                  fontSize: '1.1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}
              >
                {t('footer.contact')}
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="body2" sx={{ color: 'gray' }}>
                  <strong style={{ color: 'white' }}>{t('contact.email')}:</strong><br />
                  {company.contact.email}
                </Typography>

                <Typography variant="body2" sx={{ color: 'gray' }}>
                  <strong style={{ color: 'white' }}>{t('contact.phone')}:</strong><br />
                  {company.contact.phone}
                </Typography>

                <Typography variant="body2" sx={{ color: 'gray' }}>
                  <strong style={{ color: 'white' }}>{t('contact.location')}:</strong><br />
                  {company.contact.address}
                </Typography>
              </Box>
            </motion.div>
          </MuiGrid>
        </MuiGrid>

        <Box sx={{ height: '1px', bgcolor: 'rgba(255, 255, 255, 0.1)', my: 6 }} />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
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
            <Typography variant="body2" sx={{ color: 'gray' }}>
              © {currentYear} {company.name}. {t('footer.copyright')}
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Footer;