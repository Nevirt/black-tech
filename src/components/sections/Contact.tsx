'use client';

import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  IconButton,
  Alert,
  Snackbar,
} from '@mui/material';
import { motion } from 'framer-motion';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    // For now, we'll just show a success message
    setSnackbar({
      open: true,
      message: '¡Gracias por tu mensaje! Te contactaremos pronto.',
      severity: 'success',
    });
    setFormData({ name: '', email: '', message: '' });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const socialLinks = [
    { icon: <LinkedInIcon />, href: 'https://linkedin.com' },
    { icon: <TwitterIcon />, href: 'https://twitter.com' },
    { icon: <InstagramIcon />, href: 'https://instagram.com' },
    { icon: <GitHubIcon />, href: 'https://github.com' },
  ];

  return (
    <Box
      id="contact"
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: 'background.paper',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          {/* Contact Info */}
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
                  color: 'text.primary',
                  mb: 4,
                }}
              >
                Contactanos
              </Typography>

              <Typography
                variant="h5"
                color="text.secondary"
                paragraph
                sx={{ mb: 4 }}
              >
                ¿Listo para revolucionar tu comunicación digital?
                Ponte en contacto con nosotros.
              </Typography>

              <Box sx={{ mb: 4 }}>
                <Typography variant="body1" paragraph>
                  Email: info@blacktech.com
                </Typography>
                <Typography variant="body1" paragraph>
                  Tel: +54 (11) 1234-5678
                </Typography>
                <Typography variant="body1">
                  Buenos Aires, Argentina
                </Typography>
              </Box>

              <Box>
                {socialLinks.map((social, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    style={{ display: 'inline-block' }}
                  >
                    <IconButton
                      component="a"
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        mr: 2,
                        color: 'text.secondary',
                        '&:hover': {
                          color: 'primary.main',
                          transform: 'translateY(-4px)',
                          transition: 'all 0.3s ease-in-out',
                        },
                      }}
                    >
                      {social.icon}
                    </IconButton>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  bgcolor: 'background.default',
                  p: 4,
                  borderRadius: 2,
                  boxShadow: 1,
                }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Nombre"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Mensaje"
                      name="message"
                      multiline
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      fullWidth
                      sx={{
                        py: 1.5,
                        background: 'linear-gradient(45deg, #00B4D8 30%, #0077B6 90%)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #0077B6 30%, #00B4D8 90%)',
                        },
                      }}
                    >
                      Enviar Mensaje
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Contact; 