'use client';

import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ParticlesBackground from '../ParticlesBackground';
import { COMPANY_CONFIG } from '@/config/company';
import { useScrollTo } from '@/hooks/useScrollTo';

const Hero = () => {
  const { scrollToSection } = useScrollTo();

  const scrollToProducts = () => {
    scrollToSection('#products');
  };

  const scrollToContact = () => {
    scrollToSection('#contact');
  };

  return (
    <Box
      id="home"
      component="section"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)',
        pt: { xs: '80px', md: 0 }, // Padding-top solo en móvil para evitar solapamiento con navbar
      }}
    >
      <ParticlesBackground />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={{ xs: 2, md: 4 }} alignItems="center" sx={{ minHeight: { xs: 'auto', md: '80vh' }, py: { xs: 6, md: 0 } }}>
          <Grid item xs={12} md={8}>
            <Box sx={{ color: 'white' }}>
              {/* Tagline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    mb: 1.5,
                    color: 'grey.400',
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                  }}
                >
                  {COMPANY_CONFIG.tagline}
                </Typography>
              </motion.div>

              {/* Company Name */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    fontSize: { xs: '2.25rem', md: '3.5rem', lg: '4.25rem' },
                    lineHeight: 1.15,
                    background: 'linear-gradient(135deg, #FFFFFF 0%, #E0E0E0 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {COMPANY_CONFIG.name}
                </Typography>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    mb: 3,
                    fontSize: { xs: '1rem', md: '1.25rem' },
                    fontWeight: 400,
                    lineHeight: 1.55,
                    color: 'grey.300',
                    maxWidth: '560px',
                  }}
                >
                  {COMPANY_CONFIG.heroDescription.split('\n\n')[0]}
                </Typography>
              </motion.div>

              {/* Additional Description */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    mb: 4,
                    fontSize: '1rem',
                    lineHeight: 1.6,
                    color: 'grey.400',
                    maxWidth: '600px',
                  }}
                >
                  {COMPANY_CONFIG.heroDescription.split('\n\n')[1]}
                </Typography>
              </motion.div>

              {/* Call to Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Box sx={{ display: 'flex', gap: { xs: 1.5, md: 2 }, flexWrap: 'wrap' }}>
                  <Button
                    variant="contained"
                    size="medium"
                    onClick={scrollToProducts}
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      px: { xs: 2.25, md: 3 },
                      py: { xs: 1.1, md: 1.5 },
                      borderRadius: '50px',
                      fontSize: { xs: '0.95rem', md: '1rem' },
                      fontWeight: 600,
                      background: 'linear-gradient(135deg, #FFFFFF 0%, #E0E0E0 100%)',
                      color: 'black',
                      boxShadow: '0px 8px 32px rgba(255, 255, 255, 0.2)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #E0E0E0 0%, #BDBDBD 100%)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0px 12px 40px rgba(255, 255, 255, 0.3)',
                      },
                    }}
                  >
                    Explorar Productos
                  </Button>
                  
                  <Button
                    variant="outlined"
                    size="medium"
                    onClick={scrollToContact}
                    sx={{
                      px: { xs: 2.25, md: 3 },
                      py: { xs: 1.1, md: 1.5 },
                      borderRadius: '50px',
                      fontSize: { xs: '0.95rem', md: '1rem' },
                      fontWeight: 600,
                      borderColor: 'white',
                      color: 'white',
                      borderWidth: '2px',
                      '&:hover': {
                        borderColor: 'white',
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                        transform: 'translateY(-2px)',
                        borderWidth: '2px',
                      },
                    }}
                  >
                    Contactanos
                  </Button>
                </Box>
              </motion.div>
            </Box>
          </Grid>

          {/* Right side - Visual element */}
          <Grid item xs={12} md={4} sx={{ display: { xs: 'none', md: 'block' } }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <Box
                sx={{
                  position: 'relative',
                  height: { xs: '300px', md: '400px' },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Geometric shapes for visual interest */}
                <Box
                  sx={{
                    position: 'absolute',
                    width: '200px',
                    height: '200px',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '50%',
                    animation: 'rotate 20s linear infinite',
                    '@keyframes rotate': {
                      '0%': { transform: 'rotate(0deg)' },
                      '100%': { transform: 'rotate(360deg)' },
                    },
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    width: '150px',
                    height: '150px',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '50%',
                    animation: 'rotate 15s linear infinite reverse',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    width: '100px',
                    height: '100px',
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '50%',
                    backdropFilter: 'blur(10px)',
                  }}
                />
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        {/* Scroll indicator - hidden on mobile */}
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            style={{
              position: 'absolute',
              bottom: '2rem',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
            >
              <KeyboardArrowDownIcon
                sx={{ fontSize: '3rem', color: 'white', cursor: 'pointer', opacity: 0.7, '&:hover': { opacity: 1 } }}
                onClick={scrollToProducts}
              />
            </motion.div>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero; 