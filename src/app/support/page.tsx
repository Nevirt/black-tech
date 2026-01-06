'use client';

import Layout from '@/components/layout/Layout';
import { Box, Container, Typography, Grid, Link, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useI18n } from '@/i18n/I18nProvider';
import NeuralBackground from '@/components/background/NeuralBackground';
import GlassCard from '@/components/ui/GlassCard';

export default function SupportPage() {
  const { t, company } = useI18n();

  const faqs = [
    { q: t('support.faq.payments.q'), a: t('support.faq.payments.a') },
    { q: t('support.faq.cancel.q'), a: t('support.faq.cancel.a') },
    { q: t('support.faq.support.q'), a: t('support.faq.support.a') },
  ];

  return (
    <Box sx={{ bgcolor: 'black', minHeight: '100vh', color: 'white', position: 'relative' }}>
      <NeuralBackground />
      <Layout>
        <Box component="section" sx={{ py: { xs: 15, md: 20 }, position: 'relative', zIndex: 1 }}>
          <Container maxWidth="lg">
            <Typography variant="h2" sx={{ mb: 2, fontWeight: 800, textAlign: 'center' }}>
              {t('support.title')}
            </Typography>
            <Typography variant="h6" sx={{ mb: 8, opacity: 0.7, textAlign: 'center', maxWidth: '700px', mx: 'auto' }}>
              {t('support.subtitle')}
            </Typography>

            <Grid container spacing={4} justifyContent="center">
              {/* Contact Info */}
              <Grid item xs={12} md={5}>
                <GlassCard>
                  <Typography variant="h5" sx={{ mb: 4, fontWeight: 700 }}>
                    {t('support.contactTitle')}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Box>
                      <Typography sx={{ opacity: 0.5, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        {t('support.email')}
                      </Typography>
                      <Link href={`mailto:${company.contact.email}`} sx={{ color: 'white', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 500, '&:hover': { opacity: 0.8 } }}>
                        {company.contact.email}
                      </Link>
                    </Box>
                    <Box>
                      <Typography sx={{ opacity: 0.5, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        {t('support.phone')}
                      </Typography>
                      <Link href={`tel:${company.contact.phone}`} sx={{ color: 'white', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 500, '&:hover': { opacity: 0.8 } }}>
                        {company.contact.phone}
                      </Link>
                    </Box>
                    <Box>
                      <Typography sx={{ opacity: 0.5, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        {t('support.location')}
                      </Typography>
                      <Typography sx={{ color: 'white', fontSize: '1.1rem', fontWeight: 500 }}>
                        {company.contact.address}
                      </Typography>
                    </Box>
                  </Box>
                </GlassCard>
              </Grid>

              {/* FAQ Section */}
              <Grid item xs={12} md={7}>
                <Box>
                  <Typography variant="h5" sx={{ mb: 4, fontWeight: 700 }}>
                    {t('support.faqTitle')}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {faqs.map((faq, i) => (
                      <Accordion 
                        key={i} 
                        sx={{ 
                          bgcolor: 'rgba(255,255,255,0.03)', 
                          color: 'white', 
                          borderRadius: '12px !important', 
                          border: '1px solid rgba(255,255,255,0.1)',
                          '&:before': { display: 'none' },
                          boxShadow: 'none'
                        }}
                      >
                        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
                          <Typography sx={{ fontWeight: 600, py: 0.5 }}>{faq.q}</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ borderTop: '1px solid rgba(255,255,255,0.1)', pt: 2 }}>
                          <Typography sx={{ opacity: 0.7, lineHeight: 1.6 }}>{faq.a}</Typography>
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Layout>
    </Box>
  );
}
