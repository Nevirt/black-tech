'use client';
import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Chip,
  Divider,
} from '@mui/material';
import { motion } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import BusinessIcon from '@mui/icons-material/Business';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SchoolIcon from '@mui/icons-material/School';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleIcon from '@mui/icons-material/People';

interface UseCasesProps {
  onBack: () => void;
}

const useCases = [
  {
    icon: ShoppingCartIcon,
    title: 'Tiendas y E-commerce',
    description: 'Automatiza ventas, consultas de productos, seguimiento de pedidos y atencion al cliente 24/7.',
    benefits: [
      'Aumento del 70% en conversiones',
      'Reduccion del 80% en tiempo de respuesta',
      'Atencion 24/7 sin costo adicional',
      'Seguimiento automatico de pedidos'
    ],
    roi: '300% ROI en 3 meses',
    color: '#4CAF50'
  },
  {
    icon: RestaurantIcon,
    title: 'Restaurantes y Delivery',
    description: 'Gestiona reservas, pedidos, menu del dia y promociones de forma automatizada.',
    benefits: [
      'Incremento del 60% en pedidos',
      'Gestion automatica de reservas',
      'Promociones personalizadas',
      'Reduccion de errores en pedidos'
    ],
    roi: '250% ROI en 2 meses',
    color: '#FF9800'
  },
  {
    icon: BusinessIcon,
    title: 'Servicios Profesionales',
    description: 'Califica leads, agenda citas, envia recordatorios y da seguimiento a clientes potenciales.',
    benefits: [
      'Calificacion automatica de leads',
      'Agenda sincronizada',
      'Seguimiento personalizado',
      'Aumento del 85% en citas confirmadas'
    ],
    roi: '400% ROI en 4 meses',
    color: '#2196F3'
  },
  {
    icon: SupportAgentIcon,
    title: 'Soporte al Cliente',
    description: 'Resuelve dudas frecuentes, escala casos complejos y mantiene satisfechos a tus clientes.',
    benefits: [
      'Resolucion del 80% de consultas automaticamente',
      'Reduccion del 90% en tiempo de espera',
      'Escalacion inteligente a humanos',
      'Historial completo de conversaciones'
    ],
    roi: '500% ROI en 6 meses',
    color: '#9C27B0'
  },
  {
    icon: SchoolIcon,
    title: 'Educacion y Capacitacion',
    description: 'Inscripciones, informacion de cursos, recordatorios de clases y soporte estudiantil.',
    benefits: [
      'Automatizacion de inscripciones',
      'Recordatorios de clases',
      'Informacion de cursos 24/7',
      'Aumento del 45% en inscripciones'
    ],
    roi: '200% ROI en 5 meses',
    color: '#607D8B'
  },
  {
    icon: LocalHospitalIcon,
    title: 'Servicios de Salud',
    description: 'Agendamiento de citas, recordatorios medicos, informacion de servicios y seguimiento.',
    benefits: [
      'Reduccion del 70% en no-presentaciones',
      'Agendamiento automatico 24/7',
      'Recordatorios personalizados',
      'Mejor experiencia del paciente'
    ],
    roi: '350% ROI en 6 meses',
    color: '#F44336'
  }
];

const stats = [
  { label: 'Ahorro en Costos Operativos', value: '75%', icon: AttachMoneyIcon },
  { label: 'Aumento en Ventas', value: '65%', icon: TrendingUpIcon },
  { label: 'Reduccion Tiempo Respuesta', value: '90%', icon: AccessTimeIcon },
  { label: 'Satisfaccion del Cliente', value: '95%', icon: PeopleIcon }
];

const UseCases: React.FC<UseCasesProps> = ({ onBack }) => {
  const cardVariants = {
    offscreen: { y: 50, opacity: 0 },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', bounce: 0.4, duration: 0.8 }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ mb: 6 }}>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={onBack}
              sx={{
                mb: 4,
                color: 'text.secondary',
                '&:hover': { bgcolor: 'action.hover' }
              }}
            >
              Volver a Productos
            </Button>

            <Typography
              variant="h2"
              sx={{
                mb: 3,
                fontWeight: 700,
                color: 'text.primary',
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                textAlign: 'center'
              }}
            >
              Casos de Uso Reales
            </Typography>

            <Typography
              variant="h5"
              color="text.secondary"
              sx={{
                mb: 6,
                lineHeight: 1.6,
                maxWidth: '900px',
                mx: 'auto',
                textAlign: 'center'
              }}
            >
              Descubre como empresas reales estan transformando sus negocios con nuestro Bot de WhatsApp. 
              Resultados comprobados que puedes lograr tu tambien.
            </Typography>

            {/* Stats Section */}
            <Paper
              elevation={0}
              sx={{
                p: 4,
                mb: 6,
                borderRadius: 3,
                background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
                color: 'white'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <WhatsAppIcon sx={{ fontSize: 40, color: '#25D366' }} />
                <Typography variant="h4" fontWeight={600}>
                  Resultados Comprobados
                </Typography>
              </Box>
              
              <Grid container spacing={4}>
                {stats.map((stat, index) => (
                  <Grid item xs={6} md={3} key={index}>
                    <Box sx={{ textAlign: 'center' }}>
                      <stat.icon sx={{ fontSize: 40, mb: 1, color: '#25D366' }} />
                      <Typography variant="h3" fontWeight={700} sx={{ mb: 1 }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        {stat.label}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Box>
        </motion.div>

        {/* Use Cases Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid container spacing={4}>
            {useCases.map((useCase, index) => (
              <Grid item xs={12} md={6} key={index}>
                <motion.div
                  variants={cardVariants}
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <Card
                    elevation={0}
                    sx={{
                      height: '100%',
                      borderRadius: 3,
                      border: '1px solid',
                      borderColor: 'divider',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.1)',
                        borderColor: useCase.color
                      }
                    }}
                  >
                    <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                      {/* Header */}
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Box
                          sx={{
                            p: 2,
                            borderRadius: 2,
                            bgcolor: useCase.color,
                            color: 'white',
                            mr: 3,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <useCase.icon fontSize="large" />
                        </Box>
                        <Box>
                          <Typography variant="h5" fontWeight={600} color="text.primary">
                            {useCase.title}
                          </Typography>
                          <Chip
                            label={useCase.roi}
                            size="small"
                            sx={{
                              mt: 1,
                              bgcolor: `${useCase.color}20`,
                              color: useCase.color,
                              fontWeight: 600
                            }}
                          />
                        </Box>
                      </Box>

                      {/* Description */}
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ mb: 3, lineHeight: 1.6, flexGrow: 1 }}
                      >
                        {useCase.description}
                      </Typography>

                      <Divider sx={{ my: 2 }} />

                      {/* Benefits */}
                      <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                        Beneficios Clave:
                      </Typography>
                      <List dense sx={{ p: 0 }}>
                        {useCase.benefits.map((benefit, idx) => (
                          <ListItem key={idx} sx={{ px: 0, py: 0.5 }}>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                              <CheckCircleIcon 
                                sx={{ 
                                  fontSize: 20, 
                                  color: useCase.color 
                                }} 
                              />
                            </ListItemIcon>
                            <ListItemText 
                              primary={benefit}
                              primaryTypographyProps={{
                                variant: 'body2',
                                color: 'text.secondary'
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Paper
            elevation={0}
            sx={{
              mt: 8,
              p: 6,
              textAlign: 'center',
              borderRadius: 3,
              border: '2px solid',
              borderColor: 'primary.main',
              background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)'
            }}
          >
            <Typography variant="h3" fontWeight={700} sx={{ mb: 2 }}>
              Tu Negocio Puede Ser el Siguiente
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: '600px', mx: 'auto' }}>
              No importa el tamaño de tu empresa. Nuestro bot se adapta a cualquier industria y 
              comienza a generar resultados desde el primer dia.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                onClick={onBack}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 2
                }}
              >
                Ver Demo Interactivo
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 2
                }}
              >
                Solicitar Cotizacion
              </Button>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default UseCases;
