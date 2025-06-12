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
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const steps = ['Configurar Empresa', 'Agregar Productos', 'Demo del Chat'];

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Saludo
    if (lowerMessage.includes('hola') || lowerMessage.includes('buenas') || lowerMessage.includes('buenos dias')) {
      return `¡Hola! Bienvenido a ${demoConfig.companyName} 👋\n\nSoy tu asistente virtual especializado en ${demoConfig.industry}. Estoy aqui para ayudarte con:\n\n• Informacion de productos 📦\n• Realizar pedidos 🛒\n• Consultas sobre precios 💰\n• Horarios y ubicacion 📍\n• Y mucho mas!\n\n¿En que te puedo ayudar hoy?`;
    }
    
    // Productos
    if (lowerMessage.includes('producto') || lowerMessage.includes('catalogo') || lowerMessage.includes('que venden')) {
      if (demoConfig.products.length === 0) {
        return 'Actualmente no tenemos productos configurados en nuestro catalogo. ¿Te gustaria que te ayude con algo mas?';
      }
      const productList = demoConfig.products.map(p => 
        `• *${p.name}* - $${p.price}\n  ${p.description}`
      ).join('\n\n');
      
      return `¡Perfecto! 🛍️ Aqui tienes nuestro catalogo de productos:\n\n${productList}\n\n¿Te interesa alguno en particular? Puedo darte mas detalles o ayudarte a hacer un pedido.`;
    }
    
    // Precios
    if (lowerMessage.includes('precio') || lowerMessage.includes('cuesta') || lowerMessage.includes('vale')) {
      const productFound = demoConfig.products.find(p => 
        lowerMessage.includes(p.name.toLowerCase())
      );
      if (productFound) {
        return `El precio de *${productFound.name}* es *$${productFound.price}* 💰\n\n${productFound.description}\n\n¿Te gustaria hacer un pedido o necesitas mas informacion?`;
      }
      return 'Por favor, especifica que producto te interesa para darte el precio exacto. Puedes escribir "productos" para ver nuestro catalogo completo 📋';
    }
    
    // Horarios
    if (lowerMessage.includes('horario') || lowerMessage.includes('abierto') || lowerMessage.includes('atencion')) {
      return '🕒 *Nuestros horarios de atencion:*\n\n• Lunes a Viernes: 8:00 AM - 8:00 PM\n• Sabados: 9:00 AM - 6:00 PM\n• Domingos: 10:00 AM - 4:00 PM\n\n¡Pero como soy un asistente virtual, puedo atenderte las 24 horas! 🤖\n\n¿En que mas puedo ayudarte?';
    }
    
    // Pedidos
    if (lowerMessage.includes('pedido') || lowerMessage.includes('comprar') || lowerMessage.includes('ordenar')) {
      return '¡Excelente! 🛒 Me encanta ayudarte con tu pedido.\n\nPara procesar tu orden necesito:\n\n1️⃣ ¿Que producto(s) te interesa(n)?\n2️⃣ ¿Cuantas unidades?\n3️⃣ Tu nombre completo\n4️⃣ Numero de telefono\n5️⃣ Direccion de entrega\n\n¿Podrias proporcionarme esta informacion?';
    }
    
    // Entrega
    if (lowerMessage.includes('entrega') || lowerMessage.includes('envio') || lowerMessage.includes('delivery')) {
      return '🚚 *Informacion de entregas:*\n\n• *Zona urbana:* 1-2 dias habiles\n• *Zona metropolitana:* 2-3 dias habiles\n• *Interior del pais:* 3-5 dias habiles\n\n💰 *Costo de envio:*\n• Gratis en compras mayores a $50\n• $5 en compras menores\n\n¿Necesitas mas informacion sobre nuestro servicio de entrega?';
    }
    
    // Pago
    if (lowerMessage.includes('pago') || lowerMessage.includes('forma de pago') || lowerMessage.includes('tarjeta')) {
      return '💳 *Formas de pago disponibles:*\n\n• Tarjetas de credito/debito 💳\n• Transferencias bancarias 🏦\n• PayPal 💸\n• Efectivo contra entrega 💵\n• Pago en tienda fisica 🏪\n\n¿Cual metodo prefieres para tu compra?';
    }
    
    // Contacto
    if (lowerMessage.includes('contacto') || lowerMessage.includes('telefono') || lowerMessage.includes('ubicacion')) {
      return `📞 *Informacion de contacto:*\n\n• *WhatsApp:* Este mismo numero\n• *Email:* info@${demoConfig.companyName.toLowerCase().replace(/\s/g, '')}.com\n• *Telefono:* +1 (555) 123-4567\n• *Direccion:* Av. Principal 123, Ciudad\n\n🕒 *Atencion al cliente:*\n• Chat: 24/7 via WhatsApp\n• Telefono: Lun-Vie 8AM-8PM\n\n¿Hay algo especifico en lo que pueda ayudarte?`;
    }
    
    // Respuesta generica
    return `Entiendo tu consulta: "${userMessage}" 🤔\n\nComo asistente de *${demoConfig.companyName}*, puedo ayudarte con:\n\n• Ver productos (escribe "productos") 🛍️\n• Informacion de precios 💰\n• Realizar pedidos 🛒\n• Horarios y contacto 📞\n• Formas de pago y entrega 🚚\n\n¿Sobre cual de estos temas te gustaria saber mas?`;
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
        }]);
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
    if (!currentMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      message: currentMessage,
      timestamp: new Date(),
    };

    setChatMessages(prev => [...prev, userMessage]);
    const messageToProcess = currentMessage;
    setCurrentMessage('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        message: generateBotResponse(messageToProcess),
        timestamp: new Date(),
      };
      setChatMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
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
          borderRadius: 3,
          height: '90vh',
          maxHeight: '900px',
        },
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        pb: 2,
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}>
        <Typography variant="h5" fontWeight={600}>
          Demo Interactivo - Bot de WhatsApp
        </Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 0, height: '100%' }}>
        <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
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
                    <CardContent sx={{ p: 4 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <BusinessIcon sx={{ mr: 2, color: 'primary.main' }} />
                        <Typography variant="h6" fontWeight={600}>
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
                    <CardContent sx={{ p: 4 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <InventoryIcon sx={{ mr: 2, color: 'primary.main' }} />
                        <Typography variant="h6" fontWeight={600}>
                          Catalogo de Productos
                        </Typography>
                      </Box>

                      {/* Add Product Form */}
                      <Box sx={{ mb: 4, p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
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
                        p: 2,
                        bgcolor: '#075E54',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2
                      }}
                    >
                      <Avatar sx={{ bgcolor: '#25D366' }}>
                        <SmartToyIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {demoConfig.companyName} - Asistente Virtual
                        </Typography>
                        <Typography variant="caption" sx={{ opacity: 0.8 }}>
                          En linea • Bot de WhatsApp
                        </Typography>
                      </Box>
                    </Box>

                    {/* Messages Container */}
                    <Box
                      ref={chatContainerRef}
                      sx={{
                        flexGrow: 1,
                        p: 2,
                        bgcolor: '#E5DDD5',
                        backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\' viewBox=\'0 0 100 100\'%3E%3Cg fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.03\'%3E%3Cpath opacity=\'.5\' d=\'M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                        overflow: 'auto',
                        minHeight: '400px',
                        maxHeight: '500px'
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
                                maxWidth: '80%',
                                display: 'flex',
                                alignItems: 'flex-end',
                                gap: 1,
                                flexDirection: message.sender === 'user' ? 'row-reverse' : 'row',
                              }}
                            >
                              <Avatar
                                sx={{
                                  width: 28,
                                  height: 28,
                                  bgcolor: message.sender === 'bot' ? '#25D366' : 'primary.main',
                                }}
                              >
                                {message.sender === 'bot' ? <SmartToyIcon fontSize="small" /> : <PersonIcon fontSize="small" />}
                              </Avatar>
                              <Paper
                                elevation={1}
                                sx={{
                                  p: 2,
                                  bgcolor: message.sender === 'user' ? '#DCF8C6' : 'white',
                                  borderRadius: 2,
                                  position: 'relative',
                                  '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    bottom: 0,
                                    [message.sender === 'user' ? 'right' : 'left']: -8,
                                    width: 0,
                                    height: 0,
                                    borderLeft: message.sender === 'user' ? '8px solid #DCF8C6' : '8px solid transparent',
                                    borderRight: message.sender === 'user' ? '8px solid transparent' : '8px solid white',
                                    borderTop: '8px solid transparent',
                                  }
                                }}
                              >
                                <Typography variant="body2" sx={{ whiteSpace: 'pre-line', lineHeight: 1.4 }}>
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
                    <Box sx={{ p: 2, bgcolor: '#F0F0F0', borderTop: '1px solid', borderColor: 'divider' }}>
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
                          disabled={isTyping}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 3,
                              bgcolor: 'white'
                            }
                          }}
                        />
                        <Button
                          variant="contained"
                          onClick={sendMessage}
                          disabled={!currentMessage.trim() || isTyping}
                          sx={{
                            minWidth: 'auto',
                            width: 48,
                            height: 48,
                            borderRadius: '50%',
                            bgcolor: '#25D366',
                            '&:hover': { bgcolor: '#128C7E' }
                          }}
                        >
                          <SendIcon />
                        </Button>
                      </Box>

                      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block', textAlign: 'center' }}>
                        💡 Prueba escribir: "hola", "productos", "precios", "horarios", "hacer pedido"
                      </Typography>
                    </Box>
                  </Paper>
                </motion.div>
              )}
            </AnimatePresence>
          </Box>

          {/* Navigation Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button
              onClick={handleBack}
              disabled={activeStep === 0}
              variant="outlined"
              sx={{ px: 3 }}
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
                sx={{ px: 3 }}
              >
                Siguiente
              </Button>
            ) : (
              <Button
                onClick={resetDemo}
                variant="outlined"
                sx={{ px: 3 }}
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
