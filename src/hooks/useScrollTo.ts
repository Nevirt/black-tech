import { useCallback } from 'react';

export const useScrollTo = () => {
  const scrollToSection = useCallback((sectionId: string, offset: number = 80) => {
    const element = document.querySelector(sectionId) as HTMLElement;
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      // Añadir una pequeña animación de feedback visual
      const currentScrollY = window.pageYOffset;
      const distance = Math.abs(offsetPosition - currentScrollY);
      
      // Solo hacer scroll si la distancia es significativa
      if (distance > 50) {
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Añadir un efecto visual sutil al elemento destino
        element.style.transform = 'scale(1.01)';
        element.style.transition = 'transform 0.3s ease-out';
        
        setTimeout(() => {
          element.style.transform = 'scale(1)';
          setTimeout(() => {
            element.style.transition = '';
          }, 300);
        }, 150);
      }
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  const scrollToElement = useCallback((element: HTMLElement, offset: number = 80) => {
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  return {
    scrollToSection,
    scrollToTop,
    scrollToElement
  };
}; 