'use client';

import { Box, Container, Typography, Grid, Paper, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { motion } from 'framer-motion';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ChatIcon from '@mui/icons-material/Chat';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AnalyticsIcon from '@mui/icons-material/Analytics';

const features = [
  {
    icon: <ChatIcon />,
    title: 'Respuestas Inteligentes',
    description: 'Nuestro bot utiliza IA para proporcionar respuestas precisas y contextuales.',
  },
  {
    icon: <AutorenewIcon />,
    title: 'Aprendizaje Continuo',
    description: 'El sistema mejora constantemente a través del aprendizaje automático.',
  },
  {
    icon: <IntegrationInstructionsIcon />,
    title: 'Integración Sencilla',
    description: 'Fácil integración con WhatsApp, Telegram, y otras plataformas de mensajería.',
  },
  {
    icon: <AccessTimeIcon />,
    title: 'Disponibilidad 24/7',
    description: 'Atención al cliente automatizada las 24 horas, los 7 días de la semana.',
  },
  {
    icon: <AnalyticsIcon />,
    title: 'Análisis Detallado',
    description: 'Métricas y análisis completos de todas las interacciones.',
  },
];

const Product = () => {
  return (
    <Box
      id="product"
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: 'background.paper',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          {/* Product Info */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                variant="h2"
                gutterBottom
                sx={{
                  mb: 4,
                  color: 'text.primary',
                }}
              >
                Bot de Mensajería Inteligente
              </Typography>

              <Typography
                variant="h5"
                color="text.secondary"
                paragraph
                sx={{ mb: 4 }}
              >
                Automatiza tu atención al cliente con nuestro bot de mensajería
                potenciado por inteligencia artificial.
              </Typography>

              <List>
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ color: 'primary.main' }}>
                        <CheckCircleOutlineIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={feature.title}
                        secondary={feature.description}
                        primaryTypographyProps={{
                          fontWeight: 600,
                          color: 'text.primary',
                        }}
                        secondaryTypographyProps={{
                          color: 'text.secondary',
                        }}
                      />
                    </ListItem>
                  </motion.div>
                ))}
              </List>
            </motion.div>
          </Grid>

          {/* Product Mockup */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Paper
                elevation={0}
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: 4,
                  bgcolor: 'background.default',
                  p: 2,
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    pt: '56.25%', // 16:9 aspect ratio
                  }}
                >
                  <Box
                    component="img"
                    src="/mockup.png"
                    alt="Bot de Mensajería"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: 2,
                    }}
                  />
                </Box>

                {/* Feature Icons */}
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 20,
                      delay: 0.5 + index * 0.1,
                    }}
                    style={{
                      position: 'absolute',
                      top: `${20 + (index * 15)}%`,
                      left: index % 2 === 0 ? '5%' : '85%',
                    }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        boxShadow: 3,
                      }}
                    >
                      {feature.icon}
                    </Box>
                  </motion.div>
                ))}
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Product; 