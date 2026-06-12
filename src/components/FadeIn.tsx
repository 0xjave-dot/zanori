import React from 'react';
import { motion } from 'motion/react';

export const FadeIn: React.FC<{ delay?: number; y?: number; children?: React.ReactNode }> = ({ delay = 0, y = 24, children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
