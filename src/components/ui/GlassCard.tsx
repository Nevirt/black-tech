import { ReactNode } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    hoverEffect?: boolean;
    delay?: number;
}

const GlassCard = ({ children, className, hoverEffect = true, delay = 0 }: GlassCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className={clsx(
                'glass-panel p-8 relative overflow-hidden flex flex-col h-full',
                hoverEffect && 'glass-panel-hover cursor-default',
                className
            )}
        >
            {/* Content */}
            <div className="relative z-10 flex-grow flex flex-col">
                {children}
            </div>
        </motion.div>
    );
};

export default GlassCard;
