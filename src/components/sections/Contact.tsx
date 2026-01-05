'use client';

import { useState } from 'react';
import { Container, TextField, Snackbar, Alert } from '@mui/material';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import MinimalButton from '../ui/NeonButton';

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

const Contact = () => {
  const { t, company } = useI18n();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setOpenSnackbar(true);
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  const contactInfo = [
    { icon: <Mail className="w-6 h-6" />, title: t('contact.email'), value: company.contact.email, href: `mailto:${company.contact.email}` },
    { icon: <Phone className="w-6 h-6" />, title: t('contact.phone'), value: company.contact.phone, href: `tel:${company.contact.phone}` },
    { icon: <MapPin className="w-6 h-6" />, title: t('contact.location'), value: company.contact.address, href: '#' },
  ];

  const inputSx = {
    '& .MuiFilledInput-root': {
      bgcolor: 'rgba(255,255,255,0.03)',
      borderRadius: 1,
      color: 'white',
      border: '1px solid rgba(255,255,255,0.1)',
      '&:before': { display: 'none' },
      '&:after': { display: 'none' },
      '&:hover': { bgcolor: 'rgba(255,255,255,0.06)' },
      '&.Mui-focused': { bgcolor: 'rgba(255,255,255,0.06)', borderColor: 'white' }
    },
    '& .MuiInputLabel-root': { color: 'grey.500', '&.Mui-focused': { color: 'white' } }
  };

  return (
    <section id="contact" className="relative z-10 py-24 md:py-32 bg-black text-white">
      <Container maxWidth="lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">

          {/* Info Side */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white tracking-tight">
                {t('contact.title')}
              </h2>
              <p className="text-xl text-gray-400 mb-16 font-light leading-relaxed">
                {t('contact.subtitle')}
              </p>

              <div className="space-y-6 mb-12">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.href !== '#' ? info.href : undefined}
                    className="flex items-center p-6 rounded-xl border border-transparent hover:border-white/20 hover:bg-white/5 transition-all duration-300 group"
                  >
                    <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-white mr-6 group-hover:bg-white group-hover:text-black transition-colors border border-white/10">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">{info.title}</h4>
                      <p className="text-lg text-white font-medium">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="p-8 rounded-xl border border-white/10 bg-white/5">
                <h4 className="text-lg font-bold text-white mb-2">{t('contact.whyUs')}</h4>
                <p className="text-gray-400 leading-relaxed font-light">
                  In {company.name}, we believe in the power of simplicity and black & white precision.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Form Side */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="h-full"
            >
              <div className="glass-panel p-8 md:p-12 h-full rounded-2xl border border-white/10 flex flex-col justify-center bg-black/40 backdrop-blur-xl">
                <h3 className="text-2xl font-bold text-white mb-10 text-center">{t('contact.form.title')}</h3>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <TextField fullWidth label={t('contact.form.name')} name="name" value={formData.name} onChange={handleChange} required variant="filled" sx={inputSx} />
                    <TextField fullWidth label={t('contact.form.email')} name="email" type="email" value={formData.email} onChange={handleChange} required variant="filled" sx={inputSx} />
                  </div>

                  <TextField fullWidth label={t('contact.form.company')} name="company" value={formData.company} onChange={handleChange} variant="filled" sx={inputSx} />

                  <TextField fullWidth label={t('contact.form.message')} name="message" value={formData.message} onChange={handleChange} required multiline rows={6} variant="filled" sx={inputSx} />

                  <MinimalButton type="submit" fullWidth className="py-4 text-lg mt-4" variant="primary">
                    {t('contact.form.submit')} <Send className="w-5 h-5 ml-2" />
                  </MinimalButton>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%', bgcolor: 'black', color: 'white', border: '1px solid white' }}>
          {t('contact.snackbar.success')}
        </Alert>
      </Snackbar>
    </section>
  );
};

export default Contact;