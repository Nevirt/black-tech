'use client';

import Layout from '@/components/layout/Layout';
import { Box, Container, Typography, List, ListItem } from '@mui/material';
import { useI18n } from '@/i18n/I18nProvider';

export default function TermsPage() {
  const { t } = useI18n();
  return (
    <Layout>
      <Box component="section" sx={{ py: { xs: 10, md: 14 } }}>
        <Container maxWidth="md">
          <Typography variant="h2" sx={{ mb: 1.5, fontWeight: 700 }}>
            {t('terms.title')}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            {t('terms.lastUpdated')}
          </Typography>

          <Typography color="text.secondary" sx={{ mb: 3 }}>
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

          <Typography variant="h4" sx={{ mt: 6, mb: 2, fontWeight: 700 }}>
            {t('terms.specific.title')}
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            {t('terms.specific.intro')}
          </Typography>
          <List sx={{ listStyle: 'disc', pl: 3 }}>
            <ListItem sx={{ display: 'list-item', color: 'text.secondary' }}>
              {t('terms.specific.point1')}
            </ListItem>
            <ListItem sx={{ display: 'list-item', color: 'text.secondary' }}>
              {t('terms.specific.point2')}
            </ListItem>
            <ListItem sx={{ display: 'list-item', color: 'text.secondary' }}>
              {t('terms.specific.point3')}
            </ListItem>
          </List>
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

