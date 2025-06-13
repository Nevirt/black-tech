import { useState, useEffect, useCallback } from 'react';

interface SessionInfo {
  id: string;
  messageCount: number;
  resetCount: number;
  remainingResets: number;
  timeRemaining: number;
}

interface SessionLimits {
  messagesUsed: number;
  messagesLimit: number;
  sessionsUsed: number;
  sessionsLimit: number;
}

interface UseSessionManagerReturn {
  sessionId: string | null;
  sessionInfo: SessionInfo | null;
  sessionLimits: SessionLimits | null;
  isLoading: boolean;
  error: string | null;
  canReset: boolean;
  timeUntilReset: number;
  createSession: () => Promise<boolean>;
  checkSession: () => Promise<void>;
  requestReset: () => Promise<boolean>;
  formatTimeRemaining: (ms: number) => string;
}

export const useSessionManager = (): UseSessionManagerReturn => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [sessionInfo, setSessionInfo] = useState<SessionInfo | null>(null);
  const [sessionLimits, setSessionLimits] = useState<SessionLimits | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timeUntilReset, setTimeUntilReset] = useState(0);

  // Formatear tiempo restante
  const formatTimeRemaining = useCallback((ms: number): string => {
    if (ms <= 0) return '0m';
    
    const minutes = Math.floor(ms / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    
    if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    }
    return `${seconds}s`;
  }, []);

  // Crear nueva sesión
  const createSession = useCallback(async (): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'create' })
      });

      const data = await response.json();

      if (response.ok) {
        setSessionId(data.sessionId);
        await checkSessionInfo(data.sessionId);
        return true;
      } else {
        setError(data.message || 'Error al crear sesión');
        return false;
      }
    } catch (err) {
      setError('Error de conexión');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Verificar información de sesión
  const checkSessionInfo = useCallback(async (currentSessionId?: string): Promise<void> => {
    const idToCheck = currentSessionId || sessionId;
    if (!idToCheck) return;

    try {
      const response = await fetch('/api/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'check', sessionId: idToCheck })
      });

      const data = await response.json();

      if (response.ok) {
        setSessionInfo(data.session);
        setSessionLimits(data.limits);
        setError(null);
      } else {
        if (response.status === 404) {
          // Sesión expirada
          setSessionId(null);
          setSessionInfo(null);
          setSessionLimits(null);
        }
        setError(data.error || 'Error al verificar sesión');
      }
    } catch (err) {
      setError('Error de conexión');
    }
  }, [sessionId]);

  // Solicitar reset
  const requestReset = useCallback(async (): Promise<boolean> => {
    if (!sessionId) return false;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reset', sessionId })
      });

      const data = await response.json();

      if (response.ok) {
        // Actualizar información de sesión
        await checkSessionInfo();
        
        // Iniciar cooldown de 3 minutos
        setTimeUntilReset(3 * 60 * 1000);
        
        return true;
      } else {
        setError(data.message || 'Error al solicitar reset');
        return false;
      }
    } catch (err) {
      setError('Error de conexión');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [sessionId, checkSessionInfo]);

  // Función pública para verificar sesión
  const checkSession = useCallback(async (): Promise<void> => {
    await checkSessionInfo();
  }, [checkSessionInfo]);

  // Calcular si se puede hacer reset
  const canReset = sessionInfo ? 
    sessionInfo.remainingResets > 0 && timeUntilReset <= 0 : 
    false;

  // Efecto para countdown del cooldown
  useEffect(() => {
    if (timeUntilReset > 0) {
      const interval = setInterval(() => {
        setTimeUntilReset(prev => Math.max(0, prev - 1000));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timeUntilReset]);

  // Efecto para verificar sesión periódicamente
  useEffect(() => {
    if (sessionId) {
      const interval = setInterval(() => {
        checkSessionInfo();
      }, 30000); // Verificar cada 30 segundos

      return () => clearInterval(interval);
    }
  }, [sessionId, checkSessionInfo]);

  return {
    sessionId,
    sessionInfo,
    sessionLimits,
    isLoading,
    error,
    canReset,
    timeUntilReset,
    createSession,
    checkSession,
    requestReset,
    formatTimeRemaining
  };
}; 