'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useI18n } from '@/i18n/I18nProvider';

// 🔧 CONFIGURACIÓN DE SEGURIDAD
// ⚠️ CAMBIA ESTA BANDERA PARA ACTIVAR/DESACTIVAR LÍMITES EN EL FRONTEND
// true = Activar límites (producción)
// false = Desactivar límites (desarrollo/testing sin restricciones)
const SECURITY_ENABLED = true;
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
  Box,
  Paper,
  TextField,
  Button,
  Avatar,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  Grid,
  Chip,
  List,
  ListItem,
  ListItemText,
  InputAdornment,
  Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import InventoryIcon from '@mui/icons-material/Inventory';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { motion, AnimatePresence } from 'framer-motion';
import { useSessionManager } from '../../hooks/useSessionManager';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  message: string;
  timestamp: Date;
  typing?: boolean;
  role?: 'user' | 'assistant';
}

interface DemoConfig {
  companyName: string;
  industry: string;
  products: Product[];
}

interface DemoModalProps {
  open: boolean;
  onClose: () => void;
}

const DemoModal: React.FC<DemoModalProps> = ({ open, onClose }) => {
  const { t } = useI18n();
  const [activeStep, setActiveStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [demoConfig, setDemoConfig] = useState<DemoConfig>({
    companyName: '',
    industry: '',
    products: [],
  });
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
  });
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [isLimitReached, setIsLimitReached] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Hook de gestión de sesiones
  const {
    sessionId,
    createSession,
    requestReset,
  } = useSessionManager();

  const steps = [t('demo.steps.configureCompany'), t('demo.steps.addProducts'), t('demo.steps.chatDemo')];

  // Inicializar chat con sesión
  const initializeChat = async () => {
    if (!sessionId) {
      const success = await createSession();
      if (!success) {
        return;
      }
    }

    setChatMessages([{
      id: '1',
      sender: 'bot',
      message: `¡Hola! Bienvenido a ${demoConfig.companyName} 👋\n\nSoy tu asistente virtual especializado en ${demoConfig.industry}. ¿En que puedo ayudarte hoy?`,
      timestamp: new Date(),
      role: 'assistant',
    }]);
    setMessageCount(1);
    setIsLimitReached(false);
  };

  // Detectar tamaño de pantalla
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 600);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const generateBotResponseWithOpenAI = async (userMessage: string): Promise<string> => {
    try {
      // ⚡ VERIFICAR LÍMITE DE MENSAJES (controlado por SECURITY_ENABLED)
      if (SECURITY_ENABLED && messageCount >= 10) {
        setIsLimitReached(true);
        return 'Has alcanzado el límite de 10 mensajes en esta conversación. Por favor, reinicia el demo para continuar probando el asistente.';
      }

      // Preparar mensajes para la API
      const apiMessages = chatMessages
        .filter(msg => msg.sender !== 'bot' || !msg.typing)
        .map(msg => ({
          role: msg.sender === 'user' ? 'user' as const : 'assistant' as const,
          content: msg.message
        }));

      // Agregar el mensaje actual del usuario
      apiMessages.push({
        role: 'user' as const,
        content: userMessage
      });

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: apiMessages,
          companyData: demoConfig,
          sessionId: sessionId
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          setIsLimitReached(true);
          return data.message || 'Límite de conversación alcanzado.';
        }
        throw new Error(data.error || 'Error en la respuesta');
      }

      return data.message;
    } catch (error) {
      console.error('Error al generar respuesta:', error);
      return `Como asistente de ${demoConfig.companyName}, estoy aquí para ayudarte con información sobre nuestros productos y servicios. ¿En qué puedo asistirte?`;
    }
  };

  const handleNext = () => {
    if (activeStep === 0 && (!demoConfig.companyName || !demoConfig.industry)) {
      return;
    }
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
      
      // Initialize chat when reaching the chat step
      if (activeStep === 1) {
        initializeChat();
      }
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const addProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.description) {
      const product: Product = {
        id: Date.now().toString(),
        name: newProduct.name,
        price: parseFloat(newProduct.price),
        description: newProduct.description,
      };
      setDemoConfig(prev => ({ ...prev, products: [...prev.products, product] }));
      setNewProduct({ name: '', price: '', description: '' });
    }
  };

  const removeProduct = (id: string) => {
    setDemoConfig(prev => ({ ...prev, products: prev.products.filter(p => p.id !== id) }));
  };

  const sendMessage = async () => {
    if (!currentMessage.trim() || isTyping || (SECURITY_ENABLED && isLimitReached)) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      message: currentMessage.trim(),
      timestamp: new Date(),
      role: 'user',
    };

    setChatMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsTyping(true);

    try {
      const botResponse = await generateBotResponseWithOpenAI(currentMessage.trim());
      
      setTimeout(() => {
        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          message: botResponse,
          timestamp: new Date(),
          role: 'assistant',
        };

        setChatMessages(prev => [...prev, botMessage]);
        setMessageCount(prev => prev + 1);
        setIsTyping(false);
      }, 1000 + Math.random() * 2000);

    } catch (error) {
      console.error('Error sending message:', error);
      setIsTyping(false);
    }
  };

  const resetDemo = async () => {
    const success = await requestReset();
    if (success) {
      setChatMessages([]);
      setMessageCount(0);
      setIsLimitReached(false);
      setCurrentMessage('');
      initializeChat();
    }
  };

  const handleClose = () => {
    onClose();
  };

  const formatMessage = (message: string) => {
    return message.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < message.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="lg"
      fullWidth
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          borderRadius: { xs: 0, sm: 3 },
          height: { xs: '100vh', sm: '90vh' },
          maxHeight: { xs: '100vh', sm: '900px' },
          margin: { xs: 0, sm: 2 },
          width: { xs: '100%', sm: 'auto' },
          maxWidth: { xs: '100%', sm: '1200px' }
        },
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        pb: { xs: 1, sm: 2 },
        px: { xs: 1.5, sm: 3 },
        borderBottom: '1px solid',
        borderColor: 'divider',
        minHeight: { xs: '56px', sm: 'auto' }
      }}>
        <Typography 
          variant="h5" 
          fontWeight={600}
          sx={{ 
            fontSize: { xs: '1.1rem', sm: '1.5rem' },
            lineHeight: 1.2
          }}
        >
          {t('demo.dialog.title')}
        </Typography>
        <IconButton 
          onClick={handleClose}
          sx={{ 
            p: { xs: 1, sm: 1.5 },
            '& .MuiSvgIcon-root': {
              fontSize: { xs: '20px', sm: '24px' }
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 0, height: '100%', overflow: 'hidden' }}>
        <Box sx={{ 
          p: { xs: 1, sm: 3 }, 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          <Stepper 
            activeStep={activeStep} 
            sx={{ 
              mb: { xs: 2, sm: 4 },
              '& .MuiStepLabel-label': {
                fontSize: { xs: '0.75rem', sm: '1rem' }
              },
              '& .MuiStepIcon-root': {
                fontSize: { xs: '1.2rem', sm: '1.5rem' }
              }
            }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box sx={{ flex: 1, overflow: 'auto' }}>
            <AnimatePresence mode="wait">
              {/* Step 1: Company Configuration */}
              {activeStep === 0 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', mb: 3 }}>
                    <CardContent sx={{ p: { xs: 2, sm: 4 } }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <BusinessIcon sx={{ mr: 2, color: 'primary.main' }} />
                        <Typography variant="h6" fontWeight={600} sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                          {t('demo.companyConfig.title')}
                        </Typography>
                      </Box>

                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label={t('demo.companyConfig.companyName')}
                            value={demoConfig.companyName}
                            onChange={(e) => setDemoConfig(prev => ({ ...prev, companyName: e.target.value }))}
                            placeholder={t('demo.companyConfig.companyName.placeholder')}
                            required
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label={t('demo.companyConfig.industry')}
                            value={demoConfig.industry}
                            onChange={(e) => setDemoConfig(prev => ({ ...prev, industry: e.target.value }))}
                            placeholder={t('demo.companyConfig.industry.placeholder')}
                            required
                          />
                        </Grid>
                      </Grid>

                      <Box sx={{ mt: 3, p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          {t('demo.companyConfig.hint')}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Step 2: Products */}
              {activeStep === 1 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', mb: 3 }}>
                    <CardContent sx={{ p: { xs: 2, sm: 4 } }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <InventoryIcon sx={{ mr: 2, color: 'primary.main' }} />
                        <Typography variant="h6" fontWeight={600} sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                          {t('demo.catalog.title')}
                        </Typography>
                      </Box>

                      {/* Add Product Form */}
                      <Box sx={{ mb: 4, p: { xs: 2, sm: 3 }, bgcolor: 'grey.50', borderRadius: 2 }}>
                        <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
                          {t('demo.catalog.addProduct')}
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={4}>
                            <TextField
                              fullWidth
                              size="small"
                              label={t('demo.product.name')}
                              value={newProduct.name}
                              onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                            />
                          </Grid>
                          <Grid item xs={12} sm={3}>
                            <TextField
                              fullWidth
                              size="small"
                              label={t('demo.product.price')}
                              type="number"
                              value={newProduct.price}
                              onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
                              InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <TextField
                              fullWidth
                              size="small"
                              label={t('demo.product.description')}
                              value={newProduct.description}
                              onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                            />
                          </Grid>
                          <Grid item xs={12} sm={1}>
                            <Button
                              fullWidth
                              variant="contained"
                              onClick={addProduct}
                              sx={{ height: '40px' }}
                              disabled={!newProduct.name || !newProduct.price || !newProduct.description}
                            >
                              <AddIcon />
                            </Button>
                          </Grid>
                        </Grid>
                      </Box>

                      {/* Products List */}
                      {demoConfig.products.length > 0 && (
                        <Box>
                          <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
                            {t('demo.products.added')} ({demoConfig.products.length})
                          </Typography>
                          <List>
                            {demoConfig.products.map((product) => (
                              <ListItem
                                key={product.id}
                                sx={{
                                  border: '1px solid',
                                  borderColor: 'divider',
                                  borderRadius: 2,
                                  mb: 1,
                                }}
                                secondaryAction={
                                  <IconButton onClick={() => removeProduct(product.id)}>
                                    <DeleteIcon />
                                  </IconButton>
                                }
                              >
                                <ListItemText
                                  primary={
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                      <Typography fontWeight={600}>{product.name}</Typography>
                                      <Chip label={`$${product.price}`} size="small" color="primary" />
                                    </Box>
                                  }
                                  secondary={product.description}
                                />
                              </ListItem>
                            ))}
                          </List>
                        </Box>
                      )}

                      {demoConfig.products.length === 0 && (
                        <Box sx={{ textAlign: 'center', py: 4 }}>
                          <Typography variant="body2" color="text.secondary">
                            {t('demo.empty.addProductsHint')}
                          </Typography>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Step 3: Chat Demo */}
              {activeStep === 2 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  {/* Alerta de límite alcanzado */}
                  {SECURITY_ENABLED && isLimitReached && (
                    <Alert 
                      severity="warning" 
                      sx={{ mb: 2 }}
                      action={
                        <Button color="inherit" size="small" onClick={resetDemo}>
                          Reiniciar Demo
                        </Button>
                      }
                    >
                      Has alcanzado el límite de mensajes de la demo. Reinicia para continuar probando.
                    </Alert>
                  )}

                  {/* Chat Interface */}
                  <Paper
                    elevation={3}
                    sx={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: { xs: 2, sm: 3 },
                      overflow: 'hidden',
                      minHeight: { xs: 'calc(100vh - 200px)', sm: '500px' },
                      maxHeight: { xs: 'calc(100vh - 200px)', sm: '600px' },
                      border: '1px solid #E4E6EA'
                    }}
                  >
                    {/* Chat Header */}
                    <Box sx={{
                      p: { xs: 2, sm: 2.5 },
                      bgcolor: '#075E54',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      borderBottom: '1px solid rgba(255,255,255,0.1)'
                    }}>
                      <Avatar sx={{ 
                        bgcolor: '#25D366',
                        width: { xs: 40, sm: 44 },
                        height: { xs: 40, sm: 44 },
                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                      }}>
                        <SmartToyIcon sx={{ fontSize: { xs: '20px', sm: '22px' } }} />
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            fontSize: { xs: '1rem', sm: '1.1rem' },
                            fontWeight: 600,
                            lineHeight: 1.2
                          }}
                        >
                          {demoConfig.companyName} - Asistente Virtual
                        </Typography>
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            opacity: 0.85, 
                            fontSize: { xs: '0.75rem', sm: '0.8rem' },
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5
                          }}
                        >
                          <Box 
                            sx={{ 
                              width: 8, 
                              height: 8, 
                              borderRadius: '50%', 
                              bgcolor: '#25D366',
                              animation: 'pulse 2s infinite',
                              '@keyframes pulse': {
                                '0%': { opacity: 1 },
                                '50%': { opacity: 0.5 },
                                '100%': { opacity: 1 }
                              }
                            }} 
                          />
                          En línea • Bot de WhatsApp{SECURITY_ENABLED ? ` • ${messageCount}/10 mensajes` : ''}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Messages Container */}
                    <Box
                      ref={chatContainerRef}
                      sx={{
                        flex: 1,
                        p: { xs: 1, sm: 2 },
                        bgcolor: '#E5DDD5',
                        backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\' viewBox=\'0 0 100 100\'%3E%3Cg fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.03\'%3E%3Cpath opacity=\'.5\' d=\'M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                        overflow: 'auto',
                        overflowX: 'hidden',
                        scrollBehavior: 'smooth'
                      }}
                    >
                      {chatMessages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              mb: 2,
                              justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                            }}
                          >
                            <Box
                              sx={{
                                maxWidth: { xs: '90%', sm: '80%' },
                                display: 'flex',
                                alignItems: 'flex-end',
                                gap: 1,
                                flexDirection: message.sender === 'user' ? 'row-reverse' : 'row',
                              }}
                            >
                              <Avatar
                                sx={{
                                  width: { xs: 24, sm: 28 },
                                  height: { xs: 24, sm: 28 },
                                  bgcolor: message.sender === 'bot' ? '#25D366' : 'primary.main',
                                }}
                              >
                                {message.sender === 'bot' ? 
                                  <SmartToyIcon sx={{ fontSize: { xs: '0.8rem', sm: '1rem' } }} /> : 
                                  <PersonIcon sx={{ fontSize: { xs: '0.8rem', sm: '1rem' } }} />
                                }
                              </Avatar>
                              <Paper
                                elevation={1}
                                sx={{
                                  p: { xs: 1.5, sm: 2 },
                                  bgcolor: message.sender === 'user' ? '#DCF8C6' : 'white',
                                  borderRadius: 2,
                                  position: 'relative',
                                  '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    bottom: 0,
                                    [message.sender === 'user' ? 'right' : 'left']: { xs: -6, sm: -8 },
                                    width: 0,
                                    height: 0,
                                    borderLeft: message.sender === 'user' ? { xs: '6px solid #DCF8C6', sm: '8px solid #DCF8C6' } : { xs: '6px solid transparent', sm: '8px solid transparent' },
                                    borderRight: message.sender === 'user' ? { xs: '6px solid transparent', sm: '8px solid transparent' } : { xs: '6px solid white', sm: '8px solid white' },
                                    borderTop: { xs: '6px solid transparent', sm: '8px solid transparent' },
                                  }
                                }}
                              >
                                <Typography 
                                  variant="body2" 
                                  sx={{ 
                                    whiteSpace: 'pre-line', 
                                    lineHeight: 1.4,
                                    fontSize: { xs: '0.8rem', sm: '0.875rem' }
                                  }}
                                >
                                  {formatMessage(message.message)}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  sx={{
                                    opacity: 0.6,
                                    display: 'block',
                                    mt: 0.5,
                                    textAlign: 'right'
                                  }}
                                >
                                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </Typography>
                              </Paper>
                            </Box>
                          </Box>
                        </motion.div>
                      ))}

                      {/* Typing Indicator */}
                      {isTyping && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <Box sx={{ display: 'flex', mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1 }}>
                              <Avatar sx={{ width: 28, height: 28, bgcolor: '#25D366' }}>
                                <SmartToyIcon fontSize="small" />
                              </Avatar>
                              <Paper
                                elevation={1}
                                sx={{
                                  p: 2,
                                  bgcolor: 'white',
                                  borderRadius: 2,
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 0.5
                                }}
                              >
                                <Box sx={{ display: 'flex', gap: 0.5 }}>
                                  {[0, 1, 2].map((i) => (
                                    <Box
                                      key={i}
                                      sx={{
                                        width: 6,
                                        height: 6,
                                        borderRadius: '50%',
                                        bgcolor: 'grey.400',
                                        animation: 'pulse 1.4s ease-in-out infinite',
                                        animationDelay: `${i * 0.2}s`,
                                        '@keyframes pulse': {
                                          '0%, 80%, 100%': {
                                            transform: 'scale(0)',
                                          },
                                          '40%': {
                                            transform: 'scale(1)',
                                          },
                                        },
                                      }}
                                    />
                                  ))}
                                </Box>
                                <Typography variant="caption" sx={{ ml: 1, color: 'text.secondary' }}>
                                  escribiendo...
                                </Typography>
                              </Paper>
                            </Box>
                          </Box>
                        </motion.div>
                      )}
                    </Box>

                    {/* Message Input */}
                    <Box 
                      sx={{ 
                        p: { xs: 1.5, sm: 2.5 }, 
                        bgcolor: '#F0F2F5', 
                        borderTop: '1px solid #E4E6EA',
                        minHeight: 'auto',
                        flexShrink: 0
                      }}
                    >
                      <Box sx={{ 
                        display: 'flex', 
                        gap: { xs: 1, sm: 1.5 }, 
                        alignItems: 'center',
                        mb: 1
                      }}>
                        <TextField
                          fullWidth
                          multiline
                          maxRows={4}
                          minRows={1}
                          placeholder="Escribe un mensaje..."
                          value={currentMessage}
                          onChange={(e) => setCurrentMessage(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              sendMessage();
                            }
                          }}
                          disabled={isTyping || (SECURITY_ENABLED && isLimitReached)}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '24px',
                              bgcolor: (SECURITY_ENABLED && isLimitReached) ? '#F5F5F5' : 'white',
                              border: '1px solid #E4E6EA',
                              fontSize: { xs: '14px', sm: '15px' },
                              lineHeight: 1.4,
                              minHeight: { xs: '44px', sm: '48px' },
                              '&:hover': {
                                borderColor: '#25D366'
                              },
                              '&.Mui-focused': {
                                borderColor: '#25D366',
                                boxShadow: '0 0 0 2px rgba(37, 211, 102, 0.1)'
                              },
                              '& .MuiOutlinedInput-notchedOutline': {
                                border: 'none'
                              }
                            },
                            '& .MuiInputBase-input': {
                              padding: { xs: '12px 16px', sm: '14px 18px' },
                              '&::placeholder': {
                                color: '#8696A0',
                                opacity: 1
                              }
                            }
                          }}
                        />
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}
                        >
                          <Button
                            variant="contained"
                            onClick={sendMessage}
                            disabled={!currentMessage.trim() || isTyping || (SECURITY_ENABLED && isLimitReached)}
                            sx={{
                              minWidth: 'auto',
                              width: { xs: 44, sm: 48 },
                              height: { xs: 44, sm: 48 },
                              borderRadius: '50%',
                              padding: 0,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              bgcolor: (SECURITY_ENABLED && isLimitReached) ? '#BDC3C7' : '#25D366',
                              boxShadow: '0 2px 8px rgba(37, 211, 102, 0.3)',
                              transition: 'all 0.2s ease-in-out',
                              '&:hover': { 
                                bgcolor: (SECURITY_ENABLED && isLimitReached) ? '#BDC3C7' : '#128C7E',
                                boxShadow: '0 4px 12px rgba(37, 211, 102, 0.4)',
                                transform: 'scale(1.05)'
                              },
                              '&:active': {
                                transform: 'scale(0.95)'
                              },
                              '&.Mui-disabled': {
                                bgcolor: '#BDC3C7',
                                boxShadow: 'none'
                              }
                            }}
                          >
                            <SendIcon sx={{ 
                              fontSize: { xs: '18px', sm: '20px' },
                              color: 'white'
                            }} />
                          </Button>
                        </Box>
                      </Box>

                      <Typography 
                        variant="caption" 
                        color="text.secondary" 
                        sx={{ 
                          display: 'block', 
                          textAlign: 'center',
                          fontSize: { xs: '11px', sm: '12px' },
                          color: '#8696A0',
                          lineHeight: 1.3,
                          px: 1
                        }}
                      >
                        {(SECURITY_ENABLED && isLimitReached)
                          ? t('demo.limit.caption')
                          : t('demo.examplesHint')
                        }
                      </Typography>
                    </Box>
                  </Paper>
                </motion.div>
              )}
            </AnimatePresence>
          </Box>

          {/* Navigation Buttons */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            mt: { xs: 2, sm: 3 },
            gap: { xs: 1, sm: 2 },
            px: { xs: 1, sm: 0 }
          }}>
            <Button
              onClick={handleBack}
              disabled={activeStep === 0}
              variant="outlined"
              size="small"
              sx={{ 
                px: { xs: 2, sm: 3 },
                fontSize: { xs: '0.8rem', sm: '0.875rem' }
              }}
            >
              {t('actions.previous')}
            </Button>
            
            {activeStep < steps.length - 1 ? (
              <Button
                onClick={handleNext}
                variant="contained"
                disabled={
                  (activeStep === 0 && (!demoConfig.companyName || !demoConfig.industry))
                }
                size="small"
                sx={{ 
                  px: { xs: 2, sm: 3 },
                  fontSize: { xs: '0.8rem', sm: '0.875rem' }
                }}
              >
                {t('actions.next')}
              </Button>
            ) : (
              <Button
                onClick={resetDemo}
                variant="outlined"
                disabled={messageCount === 0}
                size="small"
                sx={{ 
                  px: { xs: 2, sm: 3 },
                  fontSize: { xs: '0.8rem', sm: '0.875rem' }
                }}
              >
                {t('actions.restartDemo')}
              </Button>
            )}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DemoModal;
