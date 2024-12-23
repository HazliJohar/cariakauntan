import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const words = ['Connect', 'Collaborate', 'Innovate'];

export function AnimatedTitle() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % words.length);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative inline-flex items-center">
      {/* Background rectangle */}
      <motion.div
        className="absolute bg-[#CFF45F] opacity-90 -rotate-2"
        style={{
          height: '85%',
          width: `calc(100% + 0.5em)`, // Slightly wider than text
          left: '-0.25em', // Offset to center
          bottom: '0',
        }}
        layoutId="background"
        transition={{ duration: 0.3 }}
      />
      
      {/* Animated text */}
      <AnimatePresence mode="wait">
        <motion.span
          ref={textRef}
          key={words[currentIndex]}
          className="relative inline-block px-1" // Add padding for rectangle spacing
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {words[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}