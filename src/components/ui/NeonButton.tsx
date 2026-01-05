import { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

interface MinimalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'primary' | 'outline' | 'text';
    fullWidth?: boolean;
}

const MinimalButton = ({ children, className, variant = 'primary', fullWidth, ...props }: MinimalButtonProps) => {
    const baseStyles = "relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium transition-all duration-300 rounded-lg group focus:outline-none";

    const variants = {
        primary: "bg-white text-black hover:bg-gray-200 border border-transparent",
        outline: "bg-transparent text-white border border-white hover:bg-white hover:text-black",
        text: "bg-transparent text-white hover:text-gray-300 px-4"
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={clsx(baseStyles, variants[variant], fullWidth ? 'w-full' : '', className)}
            {...props}
        >
            <span className="relative z-10 flex items-center gap-2">
                {children}
            </span>
        </motion.button>
    );
};

export default MinimalButton;
