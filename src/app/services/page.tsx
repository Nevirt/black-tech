'use client';

import Layout from '@/components/layout/Layout';
import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { useI18n } from '@/i18n/I18nProvider';
import IconRenderer from '@/components/ui/IconRenderer';

export default function ServicesPage() {
  const { t, company, products } = useI18n();
  return (
    <Layout>
      <Box component="section" sx={{ py: { xs: 10, md: 14 } }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ mb: 2, fontWeight: 700 }}>
            {t('services.mainTitle')}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 6 }}>
            {t('services.mainSubtitle')}
          </Typography>

          <Grid container spacing={3} sx={{ mb: 8 }}>
            {company.services.map((service) => (
              <Grid item xs={12} sm={6} md={4} key={service.title}>
                <Card sx={{ height: '100%', borderRadius: 2, border: '1px solid', borderColor: 'grey.200' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                      <IconRenderer iconName={service.icon} />
                      <Typography variant="h6" fontWeight={600}>{service.title}</Typography>
                    </Box>
                    <Typography color="text.secondary">{service.description}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
            {t('services.products.title')}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            {t('services.products.subtitle')}
          </Typography>
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item xs={12} md={6} key={product.id}>
                <Card sx={{ height: '100%', borderRadius: 2, border: '1px solid', borderColor: 'grey.200' }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight={600} sx={{ mb: 0.5 }}>
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                      {product.category} · {product.status === 'available' ? t('products.status.available') : product.status === 'coming-soon' ? t('products.status.coming-soon') : t('products.status.beta')}
                    </Typography>
                    <Typography color="text.secondary">{product.description}</Typography>
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


