'use client';

import Layout from '@/components/layout/Layout';
import { Box, Container, Typography } from '@mui/material';
import { useI18n } from '@/i18n/I18nProvider';
import NeuralBackground from '@/components/background/NeuralBackground';
import GlassCard from '@/components/ui/GlassCard';

export default function PrivacyPage() {
  const { t, company } = useI18n();
  
  return (
    <Box sx={{ bgcolor: 'black', minHeight: '100vh', color: 'white', position: 'relative' }}>
      <NeuralBackground />
      <Layout>
        <Box component="section" sx={{ py: { xs: 15, md: 20 }, position: 'relative', zIndex: 1 }}>
          <Container maxWidth="md">
            <Typography variant="h2" sx={{ mb: 2, fontWeight: 800, textAlign: 'center' }}>
              {t('privacy.title')}
            </Typography>

            <Typography variant="body2" sx={{ mb: 8, opacity: 0.5, textAlign: 'center' }}>
              {t('privacy.lastUpdated')}
            </Typography>

            <GlassCard hoverEffect={false}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <Section title={t('privacy.section1.title')}>
                  {t('privacy.section1.content')
                    .replace('{companyName}', company.name)
                    .replace('{email}', company.contact.email)
                    .replace('{address}', company.contact.address)}
                </Section>

                <Section title={t('privacy.section2.title')}>
                  {t('privacy.section2.content')}
                </Section>

                <Section title={t('privacy.section3.title')}>
                  {t('privacy.section3.content')}
                </Section>

                <Section title={t('privacy.section4.title')}>
                  {t('privacy.section4.content')}
                </Section>

                <Section title={t('privacy.section5.title')}>
                  {t('privacy.section5.content')}
                </Section>

                <Section title={t('privacy.section6.title')}>
                  {t('privacy.section6.content').replace('{email}', company.contact.email)}
                </Section>

                <Section title={t('privacy.section7.title')}>
                  {t('privacy.section7.content')}
                </Section>

                <Section title={t('privacy.section8.title')}>
                  {t('privacy.section8.content')}
                </Section>

                <Section title={t('privacy.section9.title')}>
                  {t('privacy.section9.content')}
                </Section>

                <Section title={t('privacy.section10.title')}>
                  {t('privacy.section10.content')}
                </Section>

                <Section title={t('privacy.section11.title')}>
                  {t('privacy.section11.content')}
                </Section>

                <Box sx={{ pt: 4, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <Typography sx={{ opacity: 0.7 }}>
                    {t('privacy.footer').replace('{email}', company.contact.email)}
                  </Typography>
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
