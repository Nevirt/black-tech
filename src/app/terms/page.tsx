'use client';

import Layout from '@/components/layout/Layout';
import { Box, Container, Typography } from '@mui/material';

export default function TermsPage() {
  return (
    <Layout>
      <Box component="section" sx={{ py: { xs: 10, md: 14 } }}>
        <Container maxWidth="md">
          <Typography variant="h2" sx={{ mb: 2, fontWeight: 700 }}>
            Términos y Condiciones
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Estos términos regulan el uso de los servicios y productos de InzaiQ. Al utilizar la plataforma aceptas estas condiciones.
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 1 }}>
            - Uso permitido y restricciones.
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 1 }}>
            - Propiedad intelectual y licencias.
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 1 }}>
            - Límites de responsabilidad y garantías.
          </Typography>
          <Typography color="text.secondary">
            Para una versión completa, contáctanos y te enviaremos el documento formal.
          </Typography>
        </Container>
      </Box>
    </Layout>
  );
}


