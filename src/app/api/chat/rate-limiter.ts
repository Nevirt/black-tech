// Sistema de Rate Limiting escalable
interface RateLimitData {
  count: number;
  resetTime: number;
  lastActivity: number;
  sessionCount: number;
}

interface SessionData {
  id: string;
  startTime: number;
  messageCount: number;
  resetCount: number;
}

class RateLimiter {
  private ipLimits = new Map<string, RateLimitData>();
  private sessions = new Map<string, SessionData>();
  
  // Configuración escalable
  private readonly limits = {
    messagesPerHour: 50,        // Mensajes por hora por IP
    sessionsPerDay: 5,          // Sesiones por día por IP
    resetsPerSession: 2,        // Resets por sesión
    sessionDuration: 30 * 60 * 1000, // 30 minutos por sesión
    hourWindow: 60 * 60 * 1000, // Ventana de 1 hora
    dayWindow: 24 * 60 * 60 * 1000, // Ventana de 24 horas
  };

  private cleanupOldEntries() {
    const now = Date.now();
    
    // Limpiar límites de IP antiguos
    for (const [ip, data] of this.ipLimits.entries()) {
      if (now - data.lastActivity > this.limits.dayWindow) {
        this.ipLimits.delete(ip);
      }
    }
    
    // Limpiar sesiones expiradas
    for (const [sessionId, session] of this.sessions.entries()) {
      if (now - session.startTime > this.limits.sessionDuration) {
        this.sessions.delete(sessionId);
      }
    }
  }

  checkMessageLimit(clientIP: string): { allowed: boolean; retryAfter?: number; reason?: string } {
    this.cleanupOldEntries();
    const now = Date.now();
    
    let ipData = this.ipLimits.get(clientIP);
    
    if (!ipData) {
      ipData = {
        count: 0,
        resetTime: now,
        lastActivity: now,
        sessionCount: 0
      };
      this.ipLimits.set(clientIP, ipData);
    }
    
    // Reset contador si ha pasado una hora
    if (now - ipData.resetTime >= this.limits.hourWindow) {
      ipData.count = 0;
      ipData.resetTime = now;
    }
    
    // Verificar límite de mensajes por hora
    if (ipData.count >= this.limits.messagesPerHour) {
      const retryAfter = Math.ceil((this.limits.hourWindow - (now - ipData.resetTime)) / 1000);
      return {
        allowed: false,
        retryAfter,
        reason: 'Límite de mensajes por hora alcanzado'
      };
    }
    
    // Incrementar contador
    ipData.count++;
    ipData.lastActivity = now;
    
    return { allowed: true };
  }

  checkSessionLimit(clientIP: string): { allowed: boolean; retryAfter?: number; reason?: string } {
    const now = Date.now();
    const ipData = this.ipLimits.get(clientIP);
    
    if (ipData) {
      // Reset contador de sesiones si ha pasado un día
      if (now - ipData.resetTime >= this.limits.dayWindow) {
        ipData.sessionCount = 0;
      }
      
      if (ipData.sessionCount >= this.limits.sessionsPerDay) {
        const retryAfter = Math.ceil((this.limits.dayWindow - (now - ipData.resetTime)) / 1000);
        return {
          allowed: false,
          retryAfter,
          reason: 'Límite de sesiones diarias alcanzado'
        };
      }
    }
    
    return { allowed: true };
  }

  createSession(clientIP: string): string {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const now = Date.now();
    
    this.sessions.set(sessionId, {
      id: sessionId,
      startTime: now,
      messageCount: 0,
      resetCount: 0
    });
    
    // Incrementar contador de sesiones para la IP
    const ipData = this.ipLimits.get(clientIP);
    if (ipData) {
      ipData.sessionCount++;
    }
    
    return sessionId;
  }

  checkResetLimit(sessionId: string): { allowed: boolean; reason?: string } {
    const session = this.sessions.get(sessionId);
    
    if (!session) {
      return { allowed: false, reason: 'Sesión no válida' };
    }
    
    if (session.resetCount >= this.limits.resetsPerSession) {
      return { allowed: false, reason: 'Límite de reinicios por sesión alcanzado' };
    }
    
    return { allowed: true };
  }

  incrementReset(sessionId: string): void {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.resetCount++;
    }
  }

  incrementMessage(sessionId: string): void {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.messageCount++;
    }
  }

  getSessionInfo(sessionId: string): SessionData | null {
    return this.sessions.get(sessionId) || null;
  }

  getIPInfo(clientIP: string): RateLimitData | null {
    return this.ipLimits.get(clientIP) || null;
  }
}

// Instancia singleton
export const rateLimiter = new RateLimiter();

// Utilidades para obtener IP del cliente
export function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  if (cfConnectingIP) {
    return cfConnectingIP;
  }
  
  return 'unknown';
} 