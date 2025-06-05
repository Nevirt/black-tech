'use client';

import { Box, Container, Typography } from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { motion } from 'framer-motion';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import CloudIcon from '@mui/icons-material/Cloud';
import SecurityIcon from '@mui/icons-material/Security';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const services = [
  {
    icon: <CodeIcon />,
    title: 'Desarrollo de Software a Medida',
    description: 'Creamos soluciones personalizadas que se adaptan perfectamente a tus necesidades específicas.',
  },
  {
    icon: <StorageIcon />,
    title: 'Integración de Sistemas',
    description: 'Conectamos tus sistemas existentes con nuevas tecnologías para maximizar su eficiencia.',
  },
  {
    icon: <CloudIcon />,
    title: 'Servicios en la Nube',
    description: 'Implementamos y gestionamos infraestructuras cloud escalables y seguras.',
  },
  {
    icon: <SecurityIcon />,
    title: 'Seguridad Digital',
    description: 'Protegemos tus datos y sistemas con las últimas tecnologías en ciberseguridad.',
  },
  {
    icon: <SupportAgentIcon />,
    title: 'Soporte Técnico 24/7',
    description: 'Brindamos asistencia técnica continua para garantizar el funcionamiento óptimo de tus sistemas.',
  },
];

const Services = () => {
  return (
    <Box
      id="services"
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h2"
            align="center"
            gutterBottom
            sx={{
              mb: { xs: 4, md: 6 },
              color: 'text.primary',
            }}
          >
            Nuestros Servicios
          </Typography>

          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            sx={{
              mb: { xs: 6, md: 8 },
              maxWidth: '800px',
              mx: 'auto',
            }}
          >
            Ofrecemos una gama completa de servicios tecnológicos para impulsar
            tu negocio hacia el futuro.
          </Typography>
        </motion.div>

        <Timeline position="alternate">
          {services.map((service, index) => (
            <TimelineItem key={service.title}>
              <TimelineSeparator>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 20,
                    delay: index * 0.1,
                  }}
                >
                  <TimelineDot
                    sx={{
                      bgcolor: 'primary.main',
                      p: 2,
                    }}
                  >
                    {service.icon}
                  </TimelineDot>
                </motion.div>
                {index < services.length - 1 && (
                  <TimelineConnector sx={{ bgcolor: 'primary.light' }} />
                )}
              </TimelineSeparator>
              <TimelineContent>
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <Box
                    sx={{
                      bgcolor: 'background.paper',
                      p: 3,
                      borderRadius: 2,
                      boxShadow: 1,
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        transition: 'transform 0.3s ease-in-out',
                        boxShadow: 3,
                      },
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="h3"
                      gutterBottom
                      sx={{ fontWeight: 600 }}
                    >
                      {service.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {service.description}
                    </Typography>
                  </Box>
                </motion.div>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Container>
    </Box>
  );
};

export default Services; 