import { Box } from '@mui/material';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Product from '@/components/sections/Product';
import Services from '@/components/sections/Services';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <Layout>
      <Box sx={{ overflow: 'hidden' }}>
        <Hero />
        <About />
        <Product />
        <Services />
        <Contact />
      </Box>
    </Layout>
  );
}
