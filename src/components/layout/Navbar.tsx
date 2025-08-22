'use client';

import { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useScrollTrigger,
} from '@mui/material';
import { motion } from 'framer-motion';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import { COMPANY_CONFIG } from '@/config/company';
import { useScrollTo } from '@/hooks/useScrollTo';
import { useI18n } from '@/i18n/I18nProvider';
import TranslateIcon from '@mui/icons-material/Translate';

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const { scrollToSection: scrollTo } = useScrollTo();
  const { locale, setLocale, t, company } = useI18n();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const scrollToSection = (sectionId: string) => {
    handleCloseNavMenu();
    scrollTo(sectionId);
  };

  return (
    <AppBar 
      position="fixed" 
      color="transparent"
      sx={{
        background: trigger ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
        boxShadow: trigger ? '0px 2px 20px rgba(0, 0, 0, 0.1)' : 'none',
        backdropFilter: trigger ? 'blur(20px)' : 'none',
        transition: 'all 0.3s ease-in-out',
        borderBottom: trigger ? '1px solid rgba(0, 0, 0, 0.1)' : 'none',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ py: 1 }}>
          {/* Logo - Desktop */}
          <Box
            component={motion.div}
            whileHover={{ scale: 1.05 }}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={() => scrollToSection('#home')}
          >
            <Image
              src={trigger ? "/inzaiq-logo.png" : "/inzaiq-logo-blanco.png"}
              alt={`${COMPANY_CONFIG.name} Logo`}
              width={40}
              height={40}
              style={{ marginRight: '12px' }}
            />
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontWeight: 700,
                color: trigger ? 'primary.main' : 'white',
                textDecoration: 'none',
                fontSize: '1.5rem',
                letterSpacing: '0.5px',
              }}
            >
              {company.name}
            </Typography>
          </Box>

          {/* Logo - Mobile */}
          <Box
            component={motion.div}
            whileHover={{ scale: 1.05 }}
            sx={{
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={() => scrollToSection('#home')}
          >
            <Image
              src={trigger ? "/inzaiq-logo.png" : "/inzaiq-logo-blanco.png"}
              alt={`${COMPANY_CONFIG.name} Logo`}
              width={32}
              height={32}
              style={{ marginRight: '8px' }}
            />
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontWeight: 700,
                color: trigger ? 'primary.main' : 'white',
                textDecoration: 'none',
                fontSize: '1.25rem',
              }}
            >
              {company.name}
            </Typography>
          </Box>

          {/* Mobile Menu */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: trigger ? 'primary.main' : 'white' }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiPaper-root': {
                  borderRadius: 2,
                  mt: 1,
                  boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.12)',
                },
              }}
            >
              {company.navigation.map((page) => (
                <MenuItem 
                  key={page.title} 
                  onClick={() => scrollToSection(page.href)}
                  sx={{
                    '&:hover': {
                      bgcolor: 'grey.50',
                    },
                  }}
                >
                  <Typography textAlign="center" fontWeight={500}>
                    {page.title}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
            {company.navigation.map((page) => (
              <Button
                key={page.title}
                component={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(page.href)}
                sx={{ 
                  my: 2, 
                  mx: 1,
                  px: 2,
                  py: 1,
                  color: trigger ? 'text.primary' : 'white',
                  display: 'block',
                  fontWeight: 500,
                  borderRadius: 2,
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    color: 'primary.main',
                    bgcolor: trigger ? 'grey.50' : 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                {page.title}
              </Button>
            ))}
            <Button
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLocale(locale === 'en' ? 'es' : 'en')}
              startIcon={<TranslateIcon />}
              sx={{
                my: 2,
                mx: 1,
                px: 2,
                py: 1,
                color: trigger ? 'text.primary' : 'white',
                fontWeight: 500,
                borderRadius: 2,
                border: trigger ? '1px solid rgba(0,0,0,0.12)' : '1px solid rgba(255,255,255,0.4)',
                textTransform: 'none',
              }}
            >
              {locale === 'en' ? t('lang.es') : t('lang.en')}
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 