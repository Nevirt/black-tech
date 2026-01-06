import Layout from '@/components/layout/Layout';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Products from '@/components/sections/Products';
import Services from '@/components/sections/Services';
import Contact from '@/components/sections/Contact';
import NeuralBackground from '@/components/background/NeuralBackground';

export default function Home() {
  return (
    <Layout>
      <NeuralBackground />
      <main className="overflow-hidden flex flex-col gap-0 bg-black relative z-10">
        <Hero />
        <About />
        <Products />
        <Services />
        <Contact />
      </main>
    </Layout>
  );
}
