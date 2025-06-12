'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button, 
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import { motion } from 'framer-motion';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LaunchIcon from '@mui/icons-material/Launch';
import IconRenderer from '../ui/IconRenderer';
import { PRODUCTS_CONFIG } from '@/config/company';
import UseCases from '../products/UseCases';
import DemoModal from '../products/DemoModal';

type ViewMode = 'products' | 'use-cases';

const cardVariants = {
  offscreen: {
    y: 50,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const Products = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('products');
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  
  const featuredProducts = PRODUCTS_CONFIG.filter(product => product.featured);
  const allProducts = PRODUCTS_CONFIG;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'success';
      case 'beta':
        return 'warning';
      case 'coming-soon':
        return 'info';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return 'Disponible';
      case 'beta':
        return 'Beta';
      case 'coming-soon':
        return 'Próximamente';
      default:
        return 'Estado desconocido';
    }
  };

  const handleShowUseCases = () => {
    setViewMode('use-cases');
  };

  const handleBackToProducts = () => {
    setViewMode('products');
  };

  const handleOpenDemo = () => {
    setDemoModalOpen(true);
  };

  const handleCloseDemo = () => {
    setDemoModalOpen(false);
  };

  // Mostrar vista de casos de uso si está seleccionada
  if (viewMode === 'use-cases') {
    return <UseCases onBack={handleBackToProducts} onOpenDemo={handleOpenDemo} />;
  }

  return (
    <Box
      id="products"
      component="section"
      sx={{
        py: { xs: 10, md: 15 },
        bgcolor: 'background.paper',
        position: 'relative',
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Box sx={{ textAlign: 'center', mb: { xs: 8, md: 12 } }}>
            <Typography
              variant="h2"
              sx={{
                mb: 4,
                color: 'text.primary',
                fontWeight: 700,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
              }}
            >
              Nuestros Productos
            </Typography>

            <Typography
              variant="h5"
              color="text.secondary"
              sx={{
                maxWidth: '800px',
                mx: 'auto',
                lineHeight: 1.6,
                fontSize: { xs: '1.1rem', md: '1.3rem' },
                fontWeight: 400,
              }}
            >
              Soluciones innovadoras diseñadas para transformar tu negocio con el poder de la inteligencia artificial.
            </Typography>
          </Box>
        </motion.div>

        {/* Featured Products */}
        {featuredProducts.length > 0 && (
          <Box sx={{ mb: { xs: 8, md: 12 } }}>
            <Typography
              variant="h4"
              sx={{
                mb: 6,
                color: 'text.primary',
                fontWeight: 600,
                textAlign: 'center',
              }}
            >
              Productos Destacados
            </Typography>

            <Grid container spacing={4}>
              {featuredProducts.map((product, index) => (
                <Grid item xs={12} lg={6} key={product.id}>
                  <motion.div
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={cardVariants}
                    transition={{ delay: index * 0.2 }}
                  >
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: 3,
                        border: '2px solid',
                        borderColor: 'primary.main',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: '0px 20px 60px rgba(0, 0, 0, 0.15)',
                        },
                      }}
                    >
                      <CardContent sx={{ p: 4, flexGrow: 1 }}>
                        {/* Product Header */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                          <Box>
                            <Typography
                              variant="h5"
                              component="h3"
                              sx={{
                                fontWeight: 600,
                                mb: 1,
                                color: 'text.primary',
                              }}
                            >
                              {product.name}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ mb: 2 }}
                            >
                              {product.category}
                            </Typography>
                          </Box>
                          <Chip
                            label={getStatusText(product.status)}
                            color={getStatusColor(product.status) as any}
                            size="small"
                            sx={{ fontWeight: 500 }}
                          />
                        </Box>

                        {/* Description */}
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          sx={{
                            mb: 4,
                            lineHeight: 1.6,
                          }}
                        >
                          {product.description}
                        </Typography>

                        {/* Features */}
                        <Typography
                          variant="h6"
                          sx={{
                            mb: 2,
                            fontWeight: 600,
                            color: 'text.primary',
                          }}
                        >
                          Características Principales
                        </Typography>

                        <List sx={{ mb: 4 }}>
                          {product.features.slice(0, 3).map((feature, featureIndex) => (
                            <ListItem key={featureIndex} sx={{ px: 0, py: 0.5 }}>
                              <ListItemIcon sx={{ minWidth: 36 }}>
                                <IconRenderer iconName={feature.icon} fontSize="small" color="#000000" />
                              </ListItemIcon>
                              <ListItemText
                                primary={feature.title}
                                secondary={feature.description}
                                primaryTypographyProps={{
                                  fontWeight: 500,
                                  fontSize: '0.9rem',
                                }}
                                secondaryTypographyProps={{
                                  fontSize: '0.8rem',
                                }}
                              />
                            </ListItem>
                          ))}
                        </List>

                        {/* Benefits */}
                        {product.benefits && (
                          <>
                            <Typography
                              variant="h6"
                              sx={{
                                mb: 2,
                                fontWeight: 600,
                                color: 'text.primary',
                              }}
                            >
                              Beneficios
                            </Typography>
                            <List sx={{ mb: 4 }}>
                              {product.benefits.slice(0, 3).map((benefit, benefitIndex) => (
                                <ListItem key={benefitIndex} sx={{ px: 0, py: 0.5 }}>
                                  <ListItemIcon sx={{ minWidth: 36 }}>
                                    <CheckCircleOutlineIcon sx={{ fontSize: 20, color: 'primary.main' }} />
                                  </ListItemIcon>
                                  <ListItemText
                                    primary={benefit}
                                    primaryTypographyProps={{
                                      fontSize: '0.9rem',
                                    }}
                                  />
                                </ListItem>
                              ))}
                            </List>
                          </>
                        )}

                        {/* Action Buttons */}
                        <Box sx={{ display: 'flex', gap: 2, mt: 'auto' }}>
                          <Button
                            variant="contained"
                            endIcon={<ArrowForwardIcon />}
                            disabled={product.status !== 'available'}
                            onClick={product.id === 'ai-chatbot' ? handleShowUseCases : undefined}
                            sx={{
                              borderRadius: 2,
                              px: 3,
                              py: 1.5,
                              fontWeight: 600,
                            }}
                          >
                            {product.status === 'available' ? 'Ver Casos de Uso' : 'Próximamente'}
                          </Button>
                          
                          {product.status === 'available' && (
                            <Button
                              variant="outlined"
                              endIcon={<LaunchIcon />}
                              onClick={product.id === 'ai-chatbot' ? handleOpenDemo : undefined}
                              sx={{
                                borderRadius: 2,
                                px: 3,
                                py: 1.5,
                                fontWeight: 600,
                              }}
                            >
                              Demo
                            </Button>
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* All Products Grid */}
        {allProducts.length > featuredProducts.length && (
          <>
            <Divider sx={{ my: { xs: 6, md: 8 } }} />
            
            <Typography
              variant="h4"
              sx={{
                mb: 6,
                color: 'text.primary',
                fontWeight: 600,
                textAlign: 'center',
              }}
            >
              Todos los Productos
            </Typography>

            <Grid container spacing={3}>
              {allProducts.map((product, index) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <motion.div
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={cardVariants}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: product.featured ? 'primary.main' : 'grey.200',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0px 12px 32px rgba(0, 0, 0, 0.1)',
                          borderColor: 'primary.main',
                        },
                      }}
                    >
                      <CardContent sx={{ p: 3, flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                          <Typography
                            variant="h6"
                            component="h3"
                            sx={{
                              fontWeight: 600,
                              color: 'text.primary',
                              fontSize: '1.1rem',
                            }}
                          >
                            {product.name}
                          </Typography>
                          <Chip
                            label={getStatusText(product.status)}
                            color={getStatusColor(product.status) as any}
                            size="small"
                          />
                        </Box>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            mb: 3,
                            lineHeight: 1.5,
                          }}
                        >
                          {product.shortDescription}
                        </Typography>

                        <Button
                          variant={product.featured ? 'contained' : 'outlined'}
                          size="small"
                          disabled={product.status !== 'available'}
                          onClick={product.id === 'ai-chatbot' ? handleShowUseCases : undefined}
                          sx={{
                            borderRadius: 2,
                            fontWeight: 500,
                            mt: 'auto',
                          }}
                        >
                          {product.status === 'available' ? 'Ver Más' : 'Próximamente'}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Container>

      {/* Demo Modal */}
      <DemoModal open={demoModalOpen} onClose={handleCloseDemo} />
    </Box>
  );
};

export default Products; 