'use client';

import Layout from '@/components/layout/Layout';
import { Box, Container, Typography, Grid, Card, CardContent, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function PricingPage() {
  const plans = [
    { name: 'Starter', price: '$29', period: '/mes', features: ['Hasta 100 fichas/mes', 'Exportación CSV', 'Soporte por email'] },
    { name: 'Professional', price: '$99', period: '/mes', features: ['Hasta 1.000 fichas/mes', 'Plantillas avanzadas', 'Soporte prioritario'] },
    { name: 'Enterprise', price: 'Personalizado', period: '', features: ['Volumen ilimitado', 'Integraciones a medida', 'SLA y soporte dedicado'] },
  ];

  return (
    <Layout>
      <Box component="section" sx={{ py: { xs: 10, md: 14 } }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ mb: 2, fontWeight: 700 }}>
            Precios
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 6 }}>
            Pagos gestionados de forma segura mediante Stripe.
          </Typography>

          <Grid container spacing={3}>
            {plans.map((plan) => (
              <Grid item xs={12} md={4} key={plan.name}>
                <Card sx={{ height: '100%', borderRadius: 2, border: '1px solid', borderColor: 'grey.200' }}>
                  <CardContent>
                    <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>{plan.name}</Typography>
                    <Typography variant="h4" fontWeight={800} sx={{ mb: 2 }}>{plan.price} <Typography component="span" variant="subtitle1">{plan.period}</Typography></Typography>
                    <List>
                      {plan.features.map((f) => (
                        <ListItem key={f} sx={{ px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <CheckCircleOutlineIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText primary={f} />
                        </ListItem>
                      ))}
                    </List>
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


