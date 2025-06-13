import React from 'react';
import {
  Box,
  Typography,
  LinearProgress,
  Chip,
  Alert,
  Tooltip,
  IconButton,
} from '@mui/material';
import {
  Info as InfoIcon,
  Timer as TimerIcon,
  Message as MessageIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';

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

interface SessionLimitsInfoProps {
  sessionInfo: SessionInfo | null;
  sessionLimits: SessionLimits | null;
  canReset: boolean;
  timeUntilReset: number;
  formatTimeRemaining: (ms: number) => string;
  isLoading?: boolean;
}

const SessionLimitsInfo: React.FC<SessionLimitsInfoProps> = ({
  sessionInfo,
  sessionLimits,
  canReset,
  timeUntilReset,
  formatTimeRemaining,
  isLoading = false
}) => {
  if (!sessionInfo || !sessionLimits) {
    return null;
  }

  const messageProgress = (sessionLimits.messagesUsed / sessionLimits.messagesLimit) * 100;
  const sessionProgress = (sessionLimits.sessionsUsed / sessionLimits.sessionsLimit) * 100;
  const sessionTimeProgress = sessionInfo.timeRemaining > 0 
    ? ((30 * 60 * 1000 - sessionInfo.timeRemaining) / (30 * 60 * 1000)) * 100 
    : 100;

  const getProgressColor = (progress: number) => {
    if (progress < 50) return 'success';
    if (progress < 80) return 'warning';
    return 'error';
  };

  const isNearLimit = messageProgress > 80 || sessionProgress > 80;

  return (
    <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <InfoIcon sx={{ mr: 1, color: 'primary.main', fontSize: '1.2rem' }} />
        <Typography variant="subtitle2" fontWeight={600}>
          Estado de la Sesión Demo
        </Typography>
        <Tooltip title="Información sobre los límites de uso del demo">
          <IconButton size="small" sx={{ ml: 'auto' }}>
            <InfoIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Alertas */}
      {isNearLimit && (
        <Alert severity="warning" sx={{ mb: 2, fontSize: '0.8rem' }}>
          Te estás acercando a los límites de uso. El demo está diseñado para una experiencia de prueba.
        </Alert>
      )}

      {timeUntilReset > 0 && (
        <Alert severity="info" sx={{ mb: 2, fontSize: '0.8rem' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TimerIcon sx={{ mr: 1, fontSize: '1rem' }} />
            Próximo reset disponible en: {formatTimeRemaining(timeUntilReset)}
          </Box>
        </Alert>
      )}

      {/* Métricas de Sesión */}
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="caption" color="text.secondary">
            Tiempo de sesión
          </Typography>
          <Typography variant="caption" fontWeight={500}>
            {formatTimeRemaining(sessionInfo.timeRemaining)} restantes
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={sessionTimeProgress}
          color={getProgressColor(sessionTimeProgress)}
          sx={{ height: 6, borderRadius: 3 }}
        />
      </Box>

      {/* Métricas de Mensajes */}
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <MessageIcon sx={{ mr: 0.5, fontSize: '1rem', color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">
              Mensajes (por hora)
            </Typography>
          </Box>
          <Typography variant="caption" fontWeight={500}>
            {sessionLimits.messagesUsed}/{sessionLimits.messagesLimit}
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={messageProgress}
          color={getProgressColor(messageProgress)}
          sx={{ height: 6, borderRadius: 3 }}
        />
      </Box>

      {/* Métricas de Sesiones */}
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="caption" color="text.secondary">
            Sesiones (por día)
          </Typography>
          <Typography variant="caption" fontWeight={500}>
            {sessionLimits.sessionsUsed}/{sessionLimits.sessionsLimit}
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={sessionProgress}
          color={getProgressColor(sessionProgress)}
          sx={{ height: 6, borderRadius: 3 }}
        />
      </Box>

      {/* Chips de Estado */}
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        <Chip
          icon={<RefreshIcon />}
          label={`${sessionInfo.remainingResets} resets`}
          size="small"
          color={sessionInfo.remainingResets > 0 ? 'success' : 'default'}
          variant="outlined"
        />
        
        <Chip
          label={`${sessionInfo.messageCount} msgs en sesión`}
          size="small"
          color="primary"
          variant="outlined"
        />

        {sessionInfo.timeRemaining <= 5 * 60 * 1000 && (
          <Chip
            icon={<TimerIcon />}
            label="Expirando pronto"
            size="small"
            color="warning"
            variant="filled"
          />
        )}
      </Box>

      {/* Información adicional */}
      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block', fontStyle: 'italic' }}>
        💡 Los límites se reinician automáticamente para mantener un uso justo del demo.
      </Typography>
    </Box>
  );
};

export default SessionLimitsInfo; 