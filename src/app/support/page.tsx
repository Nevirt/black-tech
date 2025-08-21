'use client';

import Layout from '@/components/layout/Layout';
import { Box, Container, Typography, Grid, Paper, Link } from '@mui/material';
import { COMPANY_CONFIG } from '@/config/company';

export default function SupportPage() {
  return (
    <Layout>
      <Box component="section" sx={{ py: { xs: 10, md: 14 } }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ mb: 2, fontWeight: 700 }}>
            Soporte y Contacto
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 6 }}>
            ¿Necesitas ayuda? Escríbenos y con gusto te asistimos.
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, borderRadius: 2, border: '1px solid', borderColor: 'grey.200' }}>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>Contacto</Typography>
                <Typography>Email: <Link href={`mailto:${COMPANY_CONFIG.contact.email}`}>{COMPANY_CONFIG.contact.email}</Link></Typography>
                <Typography>Teléfono: <Link href={`tel:${COMPANY_CONFIG.contact.phone}`}>{COMPANY_CONFIG.contact.phone}</Link></Typography>
                <Typography>Ubicación: {COMPANY_CONFIG.contact.address}</Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, borderRadius: 2, border: '1px solid', borderColor: 'grey.200' }}>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>FAQ</Typography>
                <Typography variant="subtitle1" fontWeight={600}>¿Cómo funcionan los pagos?</Typography>
                <Typography color="text.secondary" sx={{ mb: 2 }}>Todos los pagos se procesan de forma segura mediante Stripe.</Typography>
                <Typography variant="subtitle1" fontWeight={600}>¿Puedo cancelar cuando quiera?</Typography>
                <Typography color="text.secondary" sx={{ mb: 2 }}>Sí, puedes cancelar o cambiar tu plan en cualquier momento.</Typography>
                <Typography variant="subtitle1" fontWeight={600}>¿Ofrecen soporte?</Typography>
                <Typography color="text.secondary">Sí, contamos con soporte por email y opciones avanzadas para planes superiores.</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
}


