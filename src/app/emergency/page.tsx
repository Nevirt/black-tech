'use client';

import { Container, Typography, Box, Grid, List, ListItem, ListItemIcon, ListItemText, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { motion } from 'framer-motion';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NeuralBackground from '@/components/background/NeuralBackground';
import GlassCard from '@/components/ui/GlassCard';
import MinimalButton from '@/components/ui/NeonButton';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useI18n } from '@/i18n/I18nProvider';

export default function EmergencyPage() {
  const { t } = useI18n();

  return (
    <Box sx={{ bgcolor: 'black', minHeight: '100vh', color: 'white' }}>
      <NeuralBackground />
      <Navbar />

      <Container maxWidth="lg" sx={{ pt: { xs: 15, md: 20 }, pb: 10, position: 'relative', zIndex: 1 }}>
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '4.5rem' },
              fontWeight: 900,
              textAlign: 'center',
              mb: 3,
              background: 'linear-gradient(to right, #fff, #888)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1.1,
              letterSpacing: '-0.02em'
            }}
          >
            {t('emergency.hero.title')}
          </Typography>
          
          <Typography
            variant="h5"
            sx={{
              textAlign: 'center',
              mb: 6,
              opacity: 0.8,
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.6,
              fontSize: { xs: '1.1rem', md: '1.4rem' }
            }}
          >
            {t('emergency.hero.subtitle')}
          </Typography>

          {/* Core Benefits */}
          <Grid container spacing={3} sx={{ mb: 8 }}>
            {[
              t('emergency.benefit1'),
              t('emergency.benefit2'),
              t('emergency.benefit3')
            ].map((text, index) => (
              <Grid item xs={12} md={4} key={index}>
                <GlassCard className="text-center py-6">
                  <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 600 }}>
                    {text}
                  </Typography>
                </GlassCard>
              </Grid>
            ))}
          </Grid>

          {/* Main CTAs */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center', mb: 4 }}>
            <MinimalButton variant="primary" className="min-w-[240px]" href="/support">
              {t('emergency.cta.book')}
            </MinimalButton>
            <MinimalButton variant="outline" className="min-w-[240px]" href="#packages">
              {t('emergency.cta.packages')}
            </MinimalButton>
          </Box>
          
          <Typography variant="body2" sx={{ textAlign: 'center', opacity: 0.6, fontStyle: 'italic', fontSize: '1rem' }}>
            {t('emergency.riskReversal')}
          </Typography>
        </motion.div>

        {/* What I can fix today */}
        <Box sx={{ mt: 20 }}>
          <Typography variant="h3" sx={{ textAlign: 'center', mb: 8, fontWeight: 800, fontSize: { xs: '2rem', md: '3rem' } }}>
            {t('emergency.fix.title')}
          </Typography>
          <Grid container spacing={4}>
            {[
              { title: t('emergency.fix.infra.title'), items: [t('emergency.fix.infra.item1'), t('emergency.fix.infra.item2'), t('emergency.fix.infra.item3')] },
              { title: t('emergency.fix.next.title'), items: [t('emergency.fix.next.item1'), t('emergency.fix.next.item2'), t('emergency.fix.next.item3')] },
              { title: t('emergency.fix.db.title'), items: [t('emergency.fix.db.item1'), t('emergency.fix.db.item2'), t('emergency.fix.db.item3')] },
              { title: t('emergency.fix.payments.title'), items: [t('emergency.fix.payments.item1'), t('emergency.fix.payments.item2'), t('emergency.fix.payments.item3')] }
            ].map((section, idx) => (
              <Grid item xs={12} md={6} key={idx}>
                <GlassCard className="h-full">
                  <Typography variant="h5" sx={{ mb: 3, fontWeight: 800, color: 'white' }}>
                    {section.title}
                  </Typography>
                  <List>
                    {section.items.map((item, i) => (
                      <ListItem key={i} disableGutters sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32, color: '#4ade80' }}>
                          <CheckCircleOutlineIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={item} primaryTypographyProps={{ fontSize: '1.1rem', opacity: 0.9 }} />
                      </ListItem>
                    ))}
                  </List>
                </GlassCard>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Packages */}
        <Box id="packages" sx={{ mt: 20 }}>
          <Typography variant="h3" sx={{ textAlign: 'center', mb: 8, fontWeight: 800, fontSize: { xs: '2rem', md: '3rem' } }}>
            {t('emergency.packages.title')}
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={5}>
              <GlassCard className="border-t-4 border-t-white hover:border-t-white/80 transition-colors">
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, opacity: 0.7 }}>{t('emergency.packages.a.title')}</Typography>
                <Typography variant="h3" sx={{ fontWeight: 900, mb: 4, color: 'white' }}>{t('emergency.packages.a.price')}</Typography>
                <List sx={{ mb: 6 }}>
                  <ListItem disableGutters><ListItemText primary={`• ${t('emergency.packages.a.item1')}`} primaryTypographyProps={{ fontSize: '1.1rem' }} /></ListItem>
                  <ListItem disableGutters><ListItemText primary={`• ${t('emergency.packages.a.item2')}`} primaryTypographyProps={{ fontSize: '1.1rem' }} /></ListItem>
                  <ListItem disableGutters><ListItemText primary={`• ${t('emergency.packages.a.item3')}`} primaryTypographyProps={{ fontSize: '1.1rem' }} /></ListItem>
                </List>
                <MinimalButton fullWidth variant="primary" href="/support">
                  {t('emergency.packages.cta')}
                </MinimalButton>
              </GlassCard>
            </Grid>
            <Grid item xs={12} md={5}>
              <GlassCard className="border-t-4 border-t-blue-500 hover:border-t-blue-400 transition-colors">
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, opacity: 0.7 }}>{t('emergency.packages.b.title')}</Typography>
                <Typography variant="h3" sx={{ fontWeight: 900, mb: 4, color: 'white' }}>{t('emergency.packages.b.price')}</Typography>
                <List sx={{ mb: 6 }}>
                  <ListItem disableGutters><ListItemText primary={`• ${t('emergency.packages.b.item1')}`} primaryTypographyProps={{ fontSize: '1.1rem' }} /></ListItem>
                  <ListItem disableGutters><ListItemText primary={`• ${t('emergency.packages.b.item2')}`} primaryTypographyProps={{ fontSize: '1.1rem' }} /></ListItem>
                  <ListItem disableGutters><ListItemText primary={`• ${t('emergency.packages.b.item3')}`} primaryTypographyProps={{ fontSize: '1.1rem' }} /></ListItem>
                </List>
                <MinimalButton fullWidth variant="primary" href="/support">
                  {t('emergency.packages.cta')}
                </MinimalButton>
              </GlassCard>
            </Grid>
          </Grid>
        </Box>

        {/* How it works */}
        <Grid container spacing={8} sx={{ mt: 20 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h3" sx={{ mb: 6, fontWeight: 800, fontSize: { xs: '2rem', md: '3rem' } }}>{t('emergency.how.title')}</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {[
                { step: "1", title: t('emergency.how.step1.title'), desc: t('emergency.how.step1.desc') },
                { step: "2", title: t('emergency.how.step2.title'), desc: t('emergency.how.step2.desc') },
                { step: "3", title: t('emergency.how.step3.title'), desc: t('emergency.how.step3.desc') }
              ].map((item, i) => (
                <Box key={i} sx={{ display: 'flex', gap: 4 }}>
                  <Typography variant="h2" sx={{ opacity: 0.1, fontWeight: 900, lineHeight: 1 }}>{item.step}</Typography>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>{item.title}</Typography>
                    <Typography sx={{ opacity: 0.7, fontSize: '1.1rem', lineHeight: 1.6 }}>{item.desc}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h3" sx={{ mb: 6, fontWeight: 800, fontSize: { xs: '2rem', md: '3rem' } }}>{t('emergency.need.title')}</Typography>
            <GlassCard>
              <List sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                  t('emergency.need.item1'),
                  t('emergency.need.item2'),
                  t('emergency.need.item3'),
                  t('emergency.need.item4'),
                  t('emergency.need.item5')
                ].map((item, i) => (
                  <ListItem key={i} disableGutters sx={{ alignItems: 'flex-start' }}>
                    <ListItemIcon sx={{ color: 'white', minWidth: 28, mt: 1 }}>•</ListItemIcon>
                    <ListItemText primary={item} primaryTypographyProps={{ fontSize: '1.2rem', fontWeight: 500 }} />
                  </ListItem>
                ))}
              </List>
            </GlassCard>
          </Grid>
        </Grid>

        {/* FAQ */}
        <Box sx={{ mt: 20, mb: 10 }}>
          <Typography variant="h3" sx={{ textAlign: 'center', mb: 8, fontWeight: 800, fontSize: { xs: '2rem', md: '3rem' } }}>{t('emergency.faq.title')}</Typography>
          <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
            {[
              { q: t('emergency.faq.q1'), a: t('emergency.faq.a1') },
              { q: t('emergency.faq.q2'), a: t('emergency.faq.a2') },
              { q: t('emergency.faq.q3'), a: t('emergency.faq.a3') }
            ].map((item, i) => (
              <Accordion 
                key={i} 
                sx={{ 
                  bgcolor: 'rgba(255,255,255,0.03)', 
                  color: 'white', 
                  mb: 2, 
                  borderRadius: '12px !important', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  '&:before': { display: 'none' },
                  boxShadow: 'none'
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
                  <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', py: 1 }}>{item.q}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ borderTop: '1px solid rgba(255,255,255,0.1)', pt: 3 }}>
                  <Typography sx={{ opacity: 0.7, fontSize: '1.1rem', lineHeight: 1.6 }}>{item.a}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
}
