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
            Última actualización: Agosto 2025
          </Typography>

          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Bienvenido a InzaiQ. Estos Términos y Condiciones regulan el acceso y uso de todos los servicios desarrollados y ofrecidos bajo la marca InzaiQ. Al registrarse y utilizar cualquiera de nuestros servicios, usted acepta cumplir con los presentes Términos y Condiciones. Si no está de acuerdo, debe abstenerse de utilizar los servicios.
          </Typography>

          <Section title="1. Aceptación de los términos">
            El uso de los servicios de InzaiQ implica la aceptación plena de estos términos. Cada servicio puede tener reglas adicionales específicas que complementen este documento.
          </Section>

          <Section title="2. Descripción general de los servicios">
            InzaiQ es una empresa de tecnología que desarrolla y ofrece soluciones de software como servicio (SaaS). Los servicios pueden incluir herramientas de automatización, generación de contenido y otras aplicaciones digitales. Cada servicio se describe en su respectiva página de producto.
          </Section>

          <Section title="3. Registro y cuenta">
            El usuario debe registrarse con un correo electrónico válido y mantener la confidencialidad de sus credenciales. InzaiQ se reserva el derecho de suspender cuentas en caso de uso indebido o actividades fraudulentas.
          </Section>

          <Section title="4. Pagos y suscripciones">
            Algunos servicios requieren suscripción o compra de créditos. Todos los pagos se procesan de forma segura a través de Stripe. Al suscribirse o comprar créditos, el usuario autoriza a InzaiQ a procesar los cargos según el plan seleccionado.
          </Section>

          <Section title="5. Política de reembolsos">
            Los servicios digitales, créditos o suscripciones utilizadas no son reembolsables. Se podrán considerar reembolsos únicamente en casos comprobados de fallos técnicos atribuibles al servicio. Para solicitarlo, el usuario debe contactar a soporte@inzaIQ.com en un plazo máximo de 7 días tras la compra.
          </Section>

          <Section title="6. Uso permitido">
            El usuario se compromete a utilizar los servicios únicamente para fines legales y comerciales legítimos. Queda prohibido el uso de los servicios para actividades ilícitas o que infrinjan derechos de terceros.
          </Section>

          <Section title="7. Limitación de responsabilidad">
            InzaiQ no garantiza resultados específicos en ventas, posicionamiento o rendimiento derivados del uso de sus servicios. La responsabilidad de InzaiQ se limita al importe pagado por el usuario en los últimos 30 días.
          </Section>

          <Section title="8. Propiedad intelectual">
            El software, la plataforma y los contenidos de InzaiQ son propiedad exclusiva de la empresa. El contenido generado mediante nuestros servicios podrá ser utilizado libremente por el usuario en el marco de sus actividades comerciales legítimas.
          </Section>

          <Section title="9. Modificaciones">
            InzaiQ se reserva el derecho de modificar estos términos en cualquier momento. Las modificaciones serán publicadas en el sitio web oficial.
          </Section>

          <Section title="10. Contacto">
            Para consultas o soporte, comuníquese con: soporte@inzaIQ.com
          </Section>

          <Typography variant="h4" sx={{ mt: 6, mb: 2, fontWeight: 700 }}>
            Cláusula específica: Generador de fichas de producto e-commerce
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Actualmente, InzaiQ ofrece el servicio de Generación automatizada de fichas de producto para e-commerce. Este servicio permite a los usuarios crear títulos, descripciones, bullets y palabras clave optimizadas para SEO en marketplaces como Amazon, Shopify, Mercado Libre, Etsy y otros. El usuario entiende y acepta que:
          </Typography>
          <List sx={{ listStyle: 'disc', pl: 3 }}>
            <ListItem sx={{ display: 'list-item', color: 'text.secondary' }}>
              El contenido generado es sugerido como apoyo y no garantiza ventas ni posicionamiento.
            </ListItem>
            <ListItem sx={{ display: 'list-item', color: 'text.secondary' }}>
              Es responsabilidad exclusiva del usuario revisar y aprobar la información generada antes de publicarla en sus tiendas.
            </ListItem>
            <ListItem sx={{ display: 'list-item', color: 'text.secondary' }}>
              El uso indebido del contenido generado en actividades fraudulentas o ilegales es responsabilidad exclusiva del usuario.
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

