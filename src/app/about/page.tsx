'use client';

import Layout from '@/components/layout/Layout';
import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { COMPANY_CONFIG } from '@/config/company';
import IconRenderer from '@/components/ui/IconRenderer';

export default function AboutPage() {
  return (
    <Layout>
      <Box component="section" sx={{ py: { xs: 10, md: 14 } }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ mb: 2, fontWeight: 700 }}>
            Sobre InzaiQ
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            InzaiQ LLC desarrolla y gestiona múltiples productos digitales bajo una misma marca.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 6, maxWidth: 900 }}>
            Somos una empresa SaaS enfocada en automatización con IA. Nuestra misión es ayudar a empresas y emprendedores a escalar con tecnología práctica, segura y medible. Operamos con estándares internacionales de cumplimiento y gestión. La empresa está constituida como LLC en Wyoming, EE. UU. Dirección del agente registrado: Registered Agents Inc, 30 N Gould St Ste R, Sheridan, WY 82801.
          </Typography>

          <Grid container spacing={3}>
            {COMPANY_CONFIG.about.features.map((feature) => (
              <Grid item xs={12} md={4} key={feature.title}>
                <Card sx={{ height: '100%', borderRadius: 2, border: '1px solid', borderColor: 'grey.200' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                      <IconRenderer iconName={feature.icon} />
                      <Typography variant="h6" fontWeight={600}>{feature.title}</Typography>
                    </Box>
                    <Typography color="text.secondary">{feature.description}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
}


