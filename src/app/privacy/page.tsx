'use client';

import Layout from '@/components/layout/Layout';
import { Box, Container, Typography } from '@mui/material';

export default function PrivacyPage() {
  return (
    <Layout>
      <Box component="section" sx={{ py: { xs: 10, md: 14 } }}>
        <Container maxWidth="md">
          <Typography variant="h2" sx={{ mb: 2, fontWeight: 700 }}>
            Política de Privacidad
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Explicamos cómo recopilamos, usamos y protegemos tus datos. Implementamos medidas técnicas y organizativas para garantizar la seguridad de la información.
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 1 }}>
            - Datos recopilados y finalidad.
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 1 }}>
            - Derechos de los usuarios.
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 1 }}>
            - Conservación y eliminación.
          </Typography>
          <Typography color="text.secondary">
            Si tienes preguntas, contáctanos en el correo indicado en Soporte.
          </Typography>
        </Container>
      </Box>
    </Layout>
  );
}


