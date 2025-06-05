'use client';

import { Box, Container, Typography, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import CodeIcon from '@mui/icons-material/Code';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SmartToyIcon from '@mui/icons-material/SmartToy';

const features = [
  {
    icon: <CodeIcon sx={{ fontSize: 40 }} />,
    title: 'Tecnología',
    description: 'Utilizamos las últimas tecnologías para crear soluciones innovadoras y escalables.',
  },
  {
    icon: <AutoAwesomeIcon sx={{ fontSize: 40 }} />,
    title: 'Innovación',
    description: 'Buscamos constantemente nuevas formas de mejorar y optimizar los procesos de comunicación.',
  },
  {
    icon: <SmartToyIcon sx={{ fontSize: 40 }} />,
    title: 'Inteligencia Artificial',
    description: 'Implementamos IA avanzada para automatizar y mejorar las interacciones con los clientes.',
  },
];

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

const About = () => {
  return (
    <Box
      id="about"
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
            Quiénes Somos
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
            En Black Tech, nos dedicamos a revolucionar la forma en que las empresas
            se comunican con sus clientes a través de soluciones tecnológicas innovadoras.
          </Typography>
        </motion.div>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(3, 1fr)',
            },
            gap: 4,
          }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
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
                  alignItems: 'center',
                  textAlign: 'center',
                  p: 3,
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    transition: 'transform 0.3s ease-in-out',
                    boxShadow: (theme) => `0 8px 24px ${theme.palette.primary.main}20`,
                  },
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    color: 'white',
                    mb: 2,
                  }}
                >
                  {feature.icon}
                </Box>
                <CardContent>
                  <Typography
                    variant="h5"
                    component="h3"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default About; 