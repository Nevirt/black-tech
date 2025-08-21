'use client';

import Layout from '@/components/layout/Layout';
import { Box, Container, Typography } from '@mui/material';

export default function RefundsPage() {
  return (
    <Layout>
      <Box component="section" sx={{ py: { xs: 10, md: 14 } }}>
        <Container maxWidth="md">
          <Typography variant="h2" sx={{ mb: 2, fontWeight: 700 }}>
            Política de Reembolsos y Cancelación
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Detallamos las condiciones para cancelaciones y reembolsos. Buscamos transparencia y una buena experiencia para todos los clientes.
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 1 }}>
            - Cancelación de suscripciones.
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 1 }}>
            - Casos elegibles para reembolso.
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 1 }}>
            - Procesos y tiempos de gestión.
          </Typography>
          <Typography color="text.secondary">
            Para soporte relacionado con pagos, ponte en contacto con nuestro equipo.
          </Typography>
        </Container>
      </Box>
    </Layout>
  );
}


