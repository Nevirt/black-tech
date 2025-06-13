import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { rateLimiter, getClientIP } from './rate-limiter';

// 🔧 CONFIGURACIÓN DE SEGURIDAD
// ⚠️ CAMBIA ESTA BANDERA PARA ACTIVAR/DESACTIVAR TODAS LAS MEDIDAS DE SEGURIDAD
// true = Activar seguridad (producción)
// false = Desactivar seguridad (desarrollo/testing sin límites)
const SECURITY_ENABLED = true;

// Configuración de OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Límites de la conversación
const MAX_MESSAGES = 10;
const MAX_TOKENS_PER_MESSAGE = 200;

// Interfaz para los datos de la empresa
interface CompanyData {
  companyName: string;
  industry: string;
  products: Array<{
    id: string;
    name: string;
    price: number;
    description: string;
  }>;
}

// Función para crear el system prompt con los datos de la empresa
function createSystemPrompt(companyData: CompanyData): string {
  const productsInfo = companyData.products.length > 0 
    ? companyData.products.map(p => 
        `- ${p.name}: $${p.price} - ${p.description}`
      ).join('\n')
    : 'No hay productos configurados actualmente.';

  return `Eres un asistente virtual especializado para ${companyData.companyName}, una empresa del sector ${companyData.industry}.

INFORMACIÓN DE LA EMPRESA:
- Nombre: ${companyData.companyName}
- Industria: ${companyData.industry}
- Productos disponibles:
${productsInfo}

INSTRUCCIONES IMPORTANTES:
1. SOLO responde preguntas relacionadas con ${companyData.companyName} y sus productos/servicios
2. Si te preguntan sobre temas no relacionados con la empresa, responde: "Lo siento, solo puedo ayudarte con información sobre ${companyData.companyName} y nuestros productos/servicios. ¿En qué puedo asistirte relacionado con nuestra empresa?"
3. Mantén un tono profesional, amigable y servicial
4. Proporciona información precisa sobre productos, precios y servicios
5. Si no tienes información específica, sugiere contactar directamente con la empresa
6. Responde en español
7. Mantén las respuestas concisas pero informativas
8. No inventes información que no esté en los datos proporcionados

TEMAS PERMITIDOS:
- Información de productos y precios
- Consultas sobre servicios
- Horarios de atención
- Formas de contacto
- Procesos de compra/pedidos
- Información general de la empresa

TEMAS NO PERMITIDOS:
- Política, religión, temas controvertidos
- Información personal de empleados
- Datos financieros internos
- Cualquier tema no relacionado con ${companyData.companyName}

Responde siempre como representante oficial de ${companyData.companyName}.`;
}

// Función para validar si el mensaje está relacionado con la empresa
function isMessageRelatedToCompany(message: string, companyData: CompanyData): boolean {
  const lowerMessage = message.toLowerCase();
  const companyName = companyData.companyName.toLowerCase();
  const industry = companyData.industry.toLowerCase();
  
  // Palabras clave relacionadas con negocios/empresa
  const businessKeywords = [
    'producto', 'servicio', 'precio', 'comprar', 'vender', 'pedido', 'orden',
    'horario', 'contacto', 'información', 'ayuda', 'asistencia', 'consulta',
    'disponible', 'stock', 'inventario', 'catálogo', 'oferta', 'promoción',
    'entrega', 'envío', 'pago', 'factura', 'garantía', 'soporte', 'hola',
    'buenos días', 'buenas tardes', 'buenas noches', 'gracias', 'por favor'
  ];

  // Verificar si contiene el nombre de la empresa o industria
  if (lowerMessage.includes(companyName) || lowerMessage.includes(industry)) {
    return true;
  }

  // Verificar si contiene nombres de productos
  const hasProductName = companyData.products.some(product => 
    lowerMessage.includes(product.name.toLowerCase())
  );
  if (hasProductName) {
    return true;
  }

  // Verificar si contiene palabras clave de negocio
  const hasBusinessKeyword = businessKeywords.some(keyword => 
    lowerMessage.includes(keyword)
  );

  return hasBusinessKeyword;
}

export async function POST(request: NextRequest) {
  try {
    const clientIP = getClientIP(request);
    const body = await request.json();
    const { messages, companyData, sessionId } = body;

    // ⚡ MEDIDAS DE SEGURIDAD (controladas por SECURITY_ENABLED)
    if (SECURITY_ENABLED) {
      // Verificar rate limiting
      const rateLimitCheck = rateLimiter.checkMessageLimit(clientIP);
      if (!rateLimitCheck.allowed) {
        return NextResponse.json(
          {
            error: 'Límite de mensajes alcanzado',
            message: rateLimitCheck.reason,
            retryAfter: rateLimitCheck.retryAfter
          },
          { status: 429 }
        );
      }

      // Verificar sesión válida
      if (sessionId) {
        const sessionInfo = rateLimiter.getSessionInfo(sessionId);
        if (!sessionInfo) {
          return NextResponse.json(
            { error: 'Sesión no válida o expirada' },
            { status: 401 }
          );
        }
        
        // Incrementar contador de mensajes de la sesión
        rateLimiter.incrementMessage(sessionId);
      }
    }

    // Validaciones de seguridad
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Formato de mensajes inválido' },
        { status: 400 }
      );
    }

    if (!companyData || !companyData.companyName || !companyData.industry) {
      return NextResponse.json(
        { error: 'Datos de empresa requeridos' },
        { status: 400 }
      );
    }

    // ⚡ LÍMITES DE MENSAJES Y VALIDACIONES (controladas por SECURITY_ENABLED)
    if (SECURITY_ENABLED) {
      // Verificar límite de mensajes
      if (messages.length > MAX_MESSAGES) {
        return NextResponse.json(
          { 
            error: 'Límite de conversación alcanzado',
            message: `Has alcanzado el límite de ${MAX_MESSAGES} mensajes en esta conversación. Por favor, inicia una nueva conversación para continuar.`
          },
          { status: 429 }
        );
      }

      // Obtener el último mensaje del usuario
      const lastUserMessage = messages[messages.length - 1];
      if (!lastUserMessage || lastUserMessage.role !== 'user') {
        return NextResponse.json(
          { error: 'Mensaje de usuario requerido' },
          { status: 400 }
        );
      }

      // Validar que el mensaje esté relacionado con la empresa
      if (!isMessageRelatedToCompany(lastUserMessage.content, companyData)) {
        return NextResponse.json({
          message: `Lo siento, solo puedo ayudarte con información sobre ${companyData.companyName} y nuestros productos/servicios. ¿En qué puedo asistirte relacionado con nuestra empresa?`
        });
      }
    }

    // Crear el system prompt con los datos de la empresa
    const systemPrompt = createSystemPrompt(companyData);

    // Preparar mensajes para OpenAI
    const openaiMessages = [
      { role: 'system' as const, content: systemPrompt },
      ...messages.slice(-5) // Solo los últimos 5 mensajes para mantener contexto
    ];

    // Llamada a OpenAI con límites de tokens (condicionales)
    const completion = await openai.chat.completions.create({
      model: 'gpt-4.1-nano',
      messages: openaiMessages,
      max_tokens: SECURITY_ENABLED ? MAX_TOKENS_PER_MESSAGE : 1000, // Sin límite estricto si seguridad desactivada
      temperature: 0.7,
      presence_penalty: 0.1,
      frequency_penalty: 0.1,
    });

    const assistantMessage = completion.choices[0]?.message?.content;

    if (!assistantMessage) {
      return NextResponse.json(
        { error: 'No se pudo generar respuesta' },
        { status: 500 }
      );
    }

    // ⚡ VERIFICACIÓN ADICIONAL DE SEGURIDAD EN LA RESPUESTA (controlada por SECURITY_ENABLED)
    if (SECURITY_ENABLED) {
      const lowerResponse = assistantMessage.toLowerCase();
      const companyName = companyData.companyName.toLowerCase();
      
      // Si la respuesta no menciona la empresa o parece fuera de contexto, usar respuesta de seguridad
      if (!lowerResponse.includes(companyName) && 
          !lowerResponse.includes('producto') && 
          !lowerResponse.includes('servicio') &&
          !lowerResponse.includes('empresa') &&
          !lowerResponse.includes('ayuda')) {
        
        return NextResponse.json({
          message: `Como asistente de ${companyData.companyName}, estoy aquí para ayudarte con información sobre nuestros productos y servicios. ¿En qué puedo asistirte específicamente?`
        });
      }
    }

    return NextResponse.json({
      message: assistantMessage,
      tokensUsed: completion.usage?.total_tokens || 0,
      messagesCount: messages.length + 1
    });

  } catch (error) {
    console.error('Error en API de chat:', error);
    
    // Manejo específico de errores de OpenAI
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return NextResponse.json(
          { error: 'Error de configuración de API' },
          { status: 500 }
        );
      }
      if (error.message.includes('rate limit')) {
        return NextResponse.json(
          { error: 'Límite de uso excedido, intenta más tarde' },
          { status: 429 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
} 