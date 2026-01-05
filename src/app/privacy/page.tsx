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
            Última actualización: Agosto 2025
          </Typography>

          <Section title="1. Responsable del tratamiento">
            {company.name} (Wyoming, EE. UU.). Contacto: {company.contact.email}. Dirección: {company.contact.address}.
          </Section>

          <Section title="2. Datos que recopilamos">
            Recopilamos datos de contacto (nombre, email, teléfono), datos de uso (páginas visitadas, eventos de interacción), identificadores técnicos (dirección IP, tipo de dispositivo, navegador) y, en su caso, información de facturación procesada por terceros como Stripe.
          </Section>

          <Section title="3. Finalidades y base legal">
            Prestación del servicio, soporte al cliente, mejora del producto y comunicaciones comerciales. Base legal: ejecución de contrato, interés legítimo en mejorar servicios y consentimiento cuando aplique (por ejemplo, suscripción a newsletters).
          </Section>

          <Section title="4. Cookies y analítica">
            Utilizamos cookies técnicas y, opcionalmente, analíticas para entender el uso del sitio. Puedes gestionar tus preferencias de cookies desde la configuración del navegador. Herramientas de terceros pueden procesar datos agregados y anonimizados.
          </Section>

          <Section title="5. Conservación de datos">
            Conservamos los datos mientras exista una relación activa y por los plazos necesarios para cumplir obligaciones legales. Eliminamos o anonimizamos los datos cuando dejan de ser necesarios.
          </Section>

          <Section title="6. Derechos de los usuarios">
            Acceso, rectificación, supresión, oposición, limitación y portabilidad. Para ejercerlos, contáctanos en {company.contact.email}. Responderemos en plazos razonables según normativa aplicable.
          </Section>

          <Section title="7. Compartición con terceros">
            Podemos compartir datos con proveedores que actúan en nuestro nombre (por ejemplo, hosting, analítica, soporte, procesamiento de pagos como Stripe) bajo contratos de encargo con medidas de seguridad y confidencialidad.
          </Section>

          <Section title="8. Transferencias internacionales">
            Cuando sea necesario, aplicamos salvaguardas adecuadas (cláusulas contractuales tipo, evaluaciones de riesgo) para transferir datos fuera de tu país, conforme a las leyes aplicables.
          </Section>

          <Section title="9. Seguridad de la información">
            Implementamos medidas técnicas y organizativas proporcionales al riesgo: cifrado en tránsito, controles de acceso, registros de auditoría y políticas internas de seguridad.
          </Section>

          <Section title="10. Menores de edad">
            Nuestros servicios no están dirigidos a menores. Si detectamos datos de menores sin consentimiento verificable, procederemos a su eliminación.
          </Section>

          <Section title="11. Cambios a esta política">
            Podemos actualizar esta política para reflejar cambios legales o de servicio. Publicaremos la versión vigente en este sitio con su fecha de actualización.
          </Section>

          <Typography color="text.secondary" sx={{ mt: 4 }}>
            Para consultas sobre privacidad, escríbenos a {company.contact.email}.
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


