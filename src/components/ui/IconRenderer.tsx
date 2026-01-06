import React from 'react';
import {
  // Iconos de navegación y UI
  Chat,
  Autorenew,
  IntegrationInstructions,
  AccessTime,
  Analytics,
  SmartToy,
  AutoMode,
  Hub,
  Lightbulb,
  Support,
  Psychology,
  EmojiObjects,
  BarChart,
  TrendingUp,
  Storage,
  
  // Iconos de redes sociales
  LinkedIn,
  Twitter,
  Instagram,
  GitHub,
  
  // Iconos adicionales
  CheckCircleOutline,
  Speed,
  Security,
  CloudSync,
  Code,
  Insights,
  Description,
  Checklist,
  Upload,
} from '@mui/icons-material';

interface IconRendererProps {
  iconName: string;
  sx?: any;
  fontSize?: 'small' | 'medium' | 'large';
  color?: string;
}

const iconMap: { [key: string]: React.ComponentType<any> } = {
  // Iconos principales
  Chat,
  Autorenew,
  IntegrationInstructions,
  AccessTime,
  Analytics,
  SmartToy,
  AutoMode,
  Hub,
  Lightbulb,
  Support,
  Psychology,
  Innovation: EmojiObjects,
  BarChart,
  TrendingUp,
  Storage,
  
  // Redes sociales
  LinkedIn,
  Twitter,
  Instagram,
  GitHub,
  
  // Adicionales
  CheckCircleOutline,
  Speed,
  Security,
  CloudSync,
  Code,
  Insights,
  Description,
  Checklist,
  Upload,
};

const IconRenderer: React.FC<IconRendererProps> = ({ 
  iconName, 
  sx = {}, 
  fontSize = 'medium',
  color 
}) => {
  const IconComponent = iconMap[iconName];
  
  if (!IconComponent) {
    // Fallback icon si no se encuentra el icono
    return <CheckCircleOutline sx={sx} fontSize={fontSize} style={{ color }} />;
  }
  
  return <IconComponent sx={sx} fontSize={fontSize} style={{ color }} />;
};

export default IconRenderer; 