'use client';

import { Box, Container, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ParticlesBackground from '../ParticlesBackground';

const Hero = () => {
  const scrollToProduct = () => {
    const element = document.querySelector('#product');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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
        background: 'linear-gradient(135deg, #000000 0%, #1B1B1B 100%)',
      }}
    >
      <ParticlesBackground />
      <Container maxWidth="lg">
        <Box
          sx={{
            textAlign: 'center',
            color: 'white',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h1"
              sx={{
                fontWeight: 700,
                mb: 2,
                background: 'linear-gradient(to right, #FFFFFF, #90E0EF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              BLACK TECH
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Typography
              variant="h2"
              sx={{
                mb: 4,
                fontSize: { xs: '1.5rem', md: '2.5rem' },
                fontWeight: 500,
              }}
            >
              Automatizá tu comunicación con tecnología de punta
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={scrollToProduct}
              sx={{
                mt: 4,
                px: 4,
                py: 2,
                borderRadius: '30px',
                background: 'linear-gradient(45deg, #00B4D8 30%, #0077B6 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #0077B6 30%, #00B4D8 90%)',
                },
              }}
            >
              Descubrí nuestro producto
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            style={{
              position: 'absolute',
              bottom: '2rem',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            >
              <KeyboardArrowDownIcon
                sx={{
                  fontSize: '3rem',
                  color: 'primary.main',
                  cursor: 'pointer',
                }}
                onClick={scrollToProduct}
              />
            </motion.div>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero; 