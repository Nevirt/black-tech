import { NextRequest, NextResponse } from 'next/server';
import { rateLimiter, getClientIP } from '../chat/rate-limiter';

export async function POST(request: NextRequest) {
  try {
    const clientIP = getClientIP(request);
    
    // Leer el body UNA SOLA VEZ al inicio
    const body = await request.json();
    const { action, sessionId } = body;

    switch (action) {
      case 'create':
        // Verificar límite de sesiones
        const sessionCheck = rateLimiter.checkSessionLimit(clientIP);
        if (!sessionCheck.allowed) {
          return NextResponse.json(
            {
              error: 'Límite de sesiones alcanzado',
              message: sessionCheck.reason,
              retryAfter: sessionCheck.retryAfter
            },
            { status: 429 }
          );
        }

        // Crear nueva sesión
        const newSessionId = rateLimiter.createSession(clientIP);
        return NextResponse.json({
          sessionId: newSessionId,
          message: 'Sesión creada exitosamente'
        });

      case 'check':
        if (!sessionId) {
          return NextResponse.json(
            { error: 'sessionId requerido para verificar sesión' },
            { status: 400 }
          );
        }

        const sessionInfo = rateLimiter.getSessionInfo(sessionId);
        const ipInfo = rateLimiter.getIPInfo(clientIP);

        if (!sessionInfo) {
          return NextResponse.json(
            { error: 'Sesión no válida o expirada' },
            { status: 404 }
          );
        }

        return NextResponse.json({
          session: {
            id: sessionInfo.id,
            messageCount: sessionInfo.messageCount,
            resetCount: sessionInfo.resetCount,
            remainingResets: 2 - sessionInfo.resetCount,
            timeRemaining: Math.max(0, 30 * 60 * 1000 - (Date.now() - sessionInfo.startTime))
          },
          limits: {
            messagesUsed: ipInfo?.count || 0,
            messagesLimit: 50,
            sessionsUsed: ipInfo?.sessionCount || 0,
            sessionsLimit: 5
          }
        });

      case 'reset':
        if (!sessionId) {
          return NextResponse.json(
            { error: 'sessionId requerido para reset' },
            { status: 400 }
          );
        }
        
        // Verificar límite de resets
        const resetCheck = rateLimiter.checkResetLimit(sessionId);
        if (!resetCheck.allowed) {
          return NextResponse.json(
            {
              error: 'Límite de reinicios alcanzado',
              message: resetCheck.reason
            },
            { status: 429 }
          );
        }

        // Incrementar contador de resets
        rateLimiter.incrementReset(sessionId);
        
        return NextResponse.json({
          message: 'Reset autorizado',
          remainingResets: 2 - (rateLimiter.getSessionInfo(sessionId)?.resetCount || 0)
        });

      default:
        return NextResponse.json(
          { error: 'Acción no válida' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error en API de sesión:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
} 