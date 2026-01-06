'use client';

import Layout from '@/components/layout/Layout';
import { Box, Container, Typography, List, ListItem } from '@mui/material';
import { useI18n } from '@/i18n/I18nProvider';

export default function PrivacyPage() {
  const { t, company } = useI18n();
  return (
    <Layout>
      <Box component="section" sx={{ py: { xs: 10, md: 14 } }}>
        <Container maxWidth="md">
          <Typography variant="h2" sx={{ mb: 2, fontWeight: 700 }}>
            {t('privacy.title')}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            {t('privacy.lastUpdated')}
          </Typography>

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

          <Typography color="text.secondary" sx={{ mt: 4 }}>
            {t('privacy.footer').replace('{email}', company.contact.email)}
          </Typography>
        </Container>
      </Box>
    </Layout>
  );
}

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

function Section({ title, children }: SectionProps) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h5" sx={{ mb: 1, fontWeight: 700 }}>
        {title}
      </Typography>
      <Typography color="text.secondary">{children}</Typography>
    </Box>
  );
}


