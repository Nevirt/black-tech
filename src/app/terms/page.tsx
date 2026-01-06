'use client';

import Layout from '@/components/layout/Layout';
import { Box, Container, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useI18n } from '@/i18n/I18nProvider';
import NeuralBackground from '@/components/background/NeuralBackground';
import GlassCard from '@/components/ui/GlassCard';

export default function TermsPage() {
  const { t } = useI18n();
  
  return (
    <Box sx={{ bgcolor: 'black', minHeight: '100vh', color: 'white', position: 'relative' }}>
      <NeuralBackground />
      <Layout>
        <Box component="section" sx={{ py: { xs: 15, md: 20 }, position: 'relative', zIndex: 1 }}>
          <Container maxWidth="md">
            <Typography variant="h2" sx={{ mb: 2, fontWeight: 800, textAlign: 'center' }}>
              {t('terms.title')}
            </Typography>
            
            <Typography variant="body2" sx={{ mb: 8, opacity: 0.5, textAlign: 'center' }}>
              {t('terms.lastUpdated')}
            </Typography>

            <GlassCard hoverEffect={false}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <Typography sx={{ opacity: 0.8, fontSize: '1.1rem', lineHeight: 1.7 }}>
                  {t('terms.welcome')}
                </Typography>

                <Section title={t('terms.section1.title')}>
                  {t('terms.section1.content')}
                </Section>

                <Section title={t('terms.section2.title')}>
                  {t('terms.section2.content')}
                </Section>

                <Section title={t('terms.section3.title')}>
                  {t('terms.section3.content')}
                </Section>

                <Section title={t('terms.section4.title')}>
                  {t('terms.section4.content')}
                </Section>

                <Section title={t('terms.section5.title')}>
                  {t('terms.section5.content')}
                </Section>

                <Section title={t('terms.section6.title')}>
                  {t('terms.section6.content')}
                </Section>

                <Section title={t('terms.section7.title')}>
                  {t('terms.section7.content')}
                </Section>

                <Section title={t('terms.section8.title')}>
                  {t('terms.section8.content')}
                </Section>

                <Section title={t('terms.section9.title')}>
                  {t('terms.section9.content')}
                </Section>

                <Section title={t('terms.section10.title')}>
                  {t('terms.section10.content').replace('{email}', 'soporte@inzaiq.com')}
                </Section>

                <Box sx={{ mt: 2 }}>
                  <Typography variant="h4" sx={{ mb: 3, fontWeight: 800, color: 'white' }}>
                    {t('terms.specific.title')}
                  </Typography>
                  <Typography sx={{ mb: 4, opacity: 0.7, lineHeight: 1.7 }}>
                    {t('terms.specific.intro')}
                  </Typography>
                  <List sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {[
                      t('terms.specific.point1'),
                      t('terms.specific.point2'),
                      t('terms.specific.point3')
                    ].map((point, i) => (
                      <ListItem key={i} disableGutters sx={{ alignItems: 'flex-start' }}>
                        <ListItemIcon sx={{ minWidth: 32, color: 'white', opacity: 0.5, mt: 0.5 }}>
                          <CheckCircleOutlineIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={point} primaryTypographyProps={{ sx: { opacity: 0.7, lineHeight: 1.6 } }} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Box>
            </GlassCard>
          </Container>
        </Box>
      </Layout>
    </Box>
  );
}

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

function Section({ title, children }: SectionProps) {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: 'white' }}>
        {title}
      </Typography>
      <Typography sx={{ opacity: 0.7, lineHeight: 1.7 }}>{children}</Typography>
    </Box>
  );
}
