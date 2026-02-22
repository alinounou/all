"use client";

import { motion } from "framer-motion";

export function Logo({ className = "", showText = true, size = "md" }: {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}) {
  const sizes = {
    sm: { logo: "w-10 h-10", text: "text-xl", sub: "text-xs" },
    md: { logo: "w-14 h-14", text: "text-2xl", sub: "text-xs" },
    lg: { logo: "w-24 h-24", text: "text-4xl", sub: "text-sm" },
    xl: { logo: "w-32 h-32", text: "text-5xl", sub: "text-base" },
  };

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* Animated Infinity Logo */}
      <motion.div 
        className={`relative ${sizes[size].logo}`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Outer glow ring */}
        <motion.div
          className="absolute inset-0 rounded-full opacity-50"
          style={{
            background: "radial-gradient(circle, rgba(212, 175, 55, 0.3) 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            {/* Main gold gradient */}
            <linearGradient id="infinityGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#B8860B">
                <animate attributeName="stop-color" values="#B8860B;#D4AF37;#F4E4BA;#D4AF37;#B8860B" dur="4s" repeatCount="indefinite"/>
              </stop>
              <stop offset="50%" stopColor="#D4AF37">
                <animate attributeName="stop-color" values="#D4AF37;#F4E4BA;#D4AF37;#B8860B;#D4AF37" dur="4s" repeatCount="indefinite"/>
              </stop>
              <stop offset="100%" stopColor="#F4E4BA">
                <animate attributeName="stop-color" values="#F4E4BA;#D4AF37;#B8860B;#D4AF37;#F4E4BA" dur="4s" repeatCount="indefinite"/>
              </stop>
            </linearGradient>
            
            {/* Royal blue accent */}
            <linearGradient id="royalAccent" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4169E1"/>
              <stop offset="100%" stopColor="#1E40AF"/>
            </linearGradient>
            
            {/* Glow filter */}
            <filter id="goldGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="blur"/>
              <feComposite in="SourceGraphic" in2="blur" operator="over"/>
            </filter>
            
            {/* Drop shadow */}
            <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#D4AF37" floodOpacity="0.5"/>
            </filter>
          </defs>
          
          {/* Background circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="48"
            fill="url(#infinityGold)"
            opacity="0.1"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Outer rotating ring */}
          <motion.circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="url(#infinityGold)"
            strokeWidth="1"
            strokeDasharray="6 4"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "center" }}
          />
          
          {/* Infinity symbol - animated drawing */}
          <motion.path
            d="M25 50 
               C25 35, 35 30, 45 35 
               C55 40, 55 55, 50 55 
               C45 55, 35 55, 30 50 
               C25 45, 30 35, 40 32
               C50 29, 60 35, 60 50
               C60 65, 50 70, 40 65
               C30 60, 25 55, 25 50"
            fill="none"
            stroke="url(#infinityGold)"
            strokeWidth="4"
            strokeLinecap="round"
            filter="url(#goldGlow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          
          {/* Center AI text */}
          <motion.text
            x="50"
            y="54"
            textAnchor="middle"
            fontSize="16"
            fontWeight="bold"
            fill="url(#infinityGold)"
            filter="url(#dropShadow)"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            AI
          </motion.text>
          
          {/* Sparkle effects */}
          <motion.circle
            cx="20"
            cy="30"
            r="2"
            fill="#F4E4BA"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
          />
          <motion.circle
            cx="80"
            cy="35"
            r="1.5"
            fill="#F4E4BA"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
          <motion.circle
            cx="75"
            cy="70"
            r="2"
            fill="#F4E4BA"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
          <motion.circle
            cx="25"
            cy="65"
            r="1.5"
            fill="#F4E4BA"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
          />
        </svg>
      </motion.div>
      
      {showText && (
        <motion.div 
          className="flex flex-col"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <span className={`${sizes[size].text} font-bold text-gradient-gold tracking-tight`}>
            Infinity Algo
          </span>
          <span className={`${sizes[size].sub} text-muted-foreground font-medium tracking-widest uppercase`}>
            by Jeremy
          </span>
        </motion.div>
      )}
    </div>
  );
}

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className={`w-10 h-10 ${className}`}
      whileHover={{ scale: 1.1, rotate: 5 }}
    >
      <defs>
        <linearGradient id="infinityGoldSmall" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4AF37"/>
          <stop offset="100%" stopColor="#B8860B"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="none" stroke="url(#infinityGoldSmall)" strokeWidth="2"/>
      <motion.path
        d="M25 50 C25 35, 35 30, 45 35 C55 40, 55 55, 50 55 C45 55, 35 55, 30 50 C25 45, 30 35, 40 32 C50 29, 60 35, 60 50 C60 65, 50 70, 40 65 C30 60, 25 55, 25 50"
        fill="none"
        stroke="url(#infinityGoldSmall)"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
    </motion.svg>
  );
}

// Animated hero logo with extra effects
export function HeroLogo({ className = "" }: { className?: string }) {
  return (
    <motion.div 
      className={`relative ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Background orbs */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-40 h-40 rounded-full orb-gold"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>
      
      <Logo size="xl" showText={false} />
      
      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary rounded-full"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 1, 0.3],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}
    </motion.div>
  );
}
