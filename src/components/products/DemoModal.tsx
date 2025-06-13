'use client';
import React, { useState, useRef, useEffect } from 'react';
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
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import InventoryIcon from '@mui/icons-material/Inventory';
import ChatIcon from '@mui/icons-material/Chat';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [activeStep, setActiveStep] = useState(0);
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

  const steps = ['Configurar Empresa', 'Agregar Productos', 'Demo del Chat'];

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const generateBotResponseWithOpenAI = async (userMessage: string): Promise<string> => {
    try {
      // Verificar límite de mensajes
      if (messageCount >= 10) {
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
          companyData: demoConfig
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
        setChatMessages([{
          id: '1',
          sender: 'bot',
          message: `¡Hola! Bienvenido a ${demoConfig.companyName} 👋\n\nSoy tu asistente virtual especializado en ${demoConfig.industry}. ¿En que puedo ayudarte hoy?`,
          timestamp: new Date(),
          role: 'assistant',
        }]);
        setMessageCount(1);
        setIsLimitReached(false);
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
      setDemoConfig(prev => ({
        ...prev,
        products: [...prev.products, product],
      }));
      setNewProduct({ name: '', price: '', description: '' });
    }
  };

  const removeProduct = (id: string) => {
    setDemoConfig(prev => ({
      ...prev,
      products: prev.products.filter(p => p.id !== id),
    }));
  };

  const sendMessage = async () => {
    if (!currentMessage.trim() || isLimitReached) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      message: currentMessage,
      timestamp: new Date(),
      role: 'user',
    };

    setChatMessages(prev => [...prev, userMessage]);
    const messageToProcess = currentMessage;
    setCurrentMessage('');
    setIsTyping(true);
    setMessageCount(prev => prev + 1);

    try {
      const botResponseText = await generateBotResponseWithOpenAI(messageToProcess);
      
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        message: botResponseText,
        timestamp: new Date(),
        role: 'assistant',
      };
      
      setChatMessages(prev => [...prev, botResponse]);
      setMessageCount(prev => prev + 1);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        message: `Como asistente de ${demoConfig.companyName}, estoy aquí para ayudarte. Por favor, intenta nuevamente.`,
        timestamp: new Date(),
        role: 'assistant',
      };
      setChatMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const resetDemo = () => {
    setActiveStep(0);
    setDemoConfig({
      companyName: '',
      industry: '',
      products: [],
    });
    setChatMessages([]);
    setCurrentMessage('');
    setNewProduct({ name: '', price: '', description: '' });
    setMessageCount(0);
    setIsLimitReached(false);
  };

  const handleClose = () => {
    resetDemo();
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
      PaperProps={{
        sx: {
          borderRadius: { xs: 0, sm: 3 },
          height: { xs: '100vh', sm: '90vh' },
          maxHeight: { xs: '100vh', sm: '900px' },
          margin: { xs: 0, sm: 2 },
        },
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        pb: 2,
        px: { xs: 2, sm: 3 },
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}>
        <Typography 
          variant="h5" 
          fontWeight={600}
          sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}
        >
          Demo Interactivo - Bot de WhatsApp
        </Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 0, height: '100%' }}>
        <Box sx={{ p: { xs: 2, sm: 3 }, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Stepper 
            activeStep={activeStep} 
            sx={{ 
              mb: 4,
              '& .MuiStepLabel-label': {
                fontSize: { xs: '0.8rem', sm: '1rem' }
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
                          Configuracion de tu Empresa
                        </Typography>
                      </Box>

                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Nombre de la Empresa"
                            value={demoConfig.companyName}
                            onChange={(e) => setDemoConfig(prev => ({ ...prev, companyName: e.target.value }))}
                            placeholder="Ej: TechStore Pro"
                            required
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Sector/Industria"
                            value={demoConfig.industry}
                            onChange={(e) => setDemoConfig(prev => ({ ...prev, industry: e.target.value }))}
                            placeholder="Ej: Tecnologia, Restaurante, Moda, etc."
                            required
                          />
                        </Grid>
                      </Grid>

                      <Box sx={{ mt: 3, p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          💡 Esta informacion se usara para personalizar las respuestas del bot y crear 
                          una experiencia mas realista en el demo.
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
                          Catalogo de Productos
                        </Typography>
                      </Box>

                      {/* Add Product Form */}
                      <Box sx={{ mb: 4, p: { xs: 2, sm: 3 }, bgcolor: 'grey.50', borderRadius: 2 }}>
                        <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
                          Agregar Producto
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={4}>
                            <TextField
                              fullWidth
                              size="small"
                              label="Nombre del Producto"
                              value={newProduct.name}
                              onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                            />
                          </Grid>
                          <Grid item xs={12} sm={3}>
                            <TextField
                              fullWidth
                              size="small"
                              label="Precio"
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
                              label="Descripcion Breve"
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
                            Productos Agregados ({demoConfig.products.length})
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
                            Agrega algunos productos para hacer la demo mas realista
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
                  {/* WhatsApp-style Chat Interface */}
                  <Paper
                    elevation={1}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 3,
                      overflow: 'hidden'
                    }}
                  >
                    {/* Chat Header */}
                    <Box
                      sx={{
                        p: { xs: 1.5, sm: 2 },
                        bgcolor: '#075E54',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2
                      }}
                    >
                      <Avatar sx={{ bgcolor: '#25D366', width: { xs: 36, sm: 40 }, height: { xs: 36, sm: 40 } }}>
                        <SmartToyIcon sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />
                      </Avatar>
                      <Box>
                        <Typography 
                          variant="subtitle1" 
                          fontWeight={600}
                          sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
                        >
                          {demoConfig.companyName} - Asistente Virtual
                        </Typography>
                        <Typography variant="caption" sx={{ opacity: 0.8, fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                          En línea • Bot de WhatsApp • {messageCount}/10 mensajes
                        </Typography>
                      </Box>
                    </Box>

                    {/* Messages Container */}
                    <Box
                      ref={chatContainerRef}
                      sx={{
                        flexGrow: 1,
                        p: { xs: 1, sm: 2 },
                        bgcolor: '#E5DDD5',
                        backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\' viewBox=\'0 0 100 100\'%3E%3Cg fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.03\'%3E%3Cpath opacity=\'.5\' d=\'M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                        overflow: 'auto',
                        minHeight: { xs: '300px', sm: '400px' },
                        maxHeight: { xs: '400px', sm: '500px' }
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
                    <Box sx={{ p: { xs: 1.5, sm: 2 }, bgcolor: '#F0F0F0', borderTop: '1px solid', borderColor: 'divider' }}>
                      <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
                        <TextField
                          fullWidth
                          multiline
                          maxRows={3}
                          placeholder="Escribe un mensaje..."
                          value={currentMessage}
                          onChange={(e) => setCurrentMessage(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              sendMessage();
                            }
                          }}
                          disabled={isTyping || isLimitReached}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 3,
                              bgcolor: isLimitReached ? 'grey.100' : 'white'
                            }
                          }}
                        />
                        <Button
                          variant="contained"
                          onClick={sendMessage}
                          disabled={!currentMessage.trim() || isTyping || isLimitReached}
                          sx={{
                            minWidth: 'auto',
                            width: 48,
                            height: 48,
                            borderRadius: '50%',
                            bgcolor: isLimitReached ? 'grey.400' : '#25D366',
                            '&:hover': { bgcolor: isLimitReached ? 'grey.400' : '#128C7E' }
                          }}
                        >
                          <SendIcon />
                        </Button>
                      </Box>

                      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block', textAlign: 'center' }}>
                        {isLimitReached 
                          ? '⚠️ Límite de mensajes alcanzado. Reinicia el demo para continuar.'
                          : '💡 Prueba escribir: "hola", "productos", "precios", "horarios", "hacer pedido"'
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
            mt: 3,
            gap: { xs: 1, sm: 2 }
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
              Anterior
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
                Siguiente
              </Button>
            ) : (
              <Button
                onClick={resetDemo}
                variant="outlined"
                size="small"
                sx={{ 
                  px: { xs: 2, sm: 3 },
                  fontSize: { xs: '0.8rem', sm: '0.875rem' }
                }}
              >
                Reiniciar Demo
              </Button>
            )}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DemoModal;
