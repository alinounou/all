"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, ExternalLink, Globe, Sparkles, Crown, GraduationCap } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useTranslation } from "@/lib/i18n";

interface NavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { t, language, setLanguage } = useTranslation();

  const navItems = [
    { id: "home", label: language === 'ar' ? "الرئيسية" : "Home" },
    { id: "calculators", label: language === 'ar' ? "الحاسبات" : "Calculators" },
    { id: "ai", label: language === 'ar' ? "تحليل AI" : "AI Analysis" },
    { id: "about", label: language === 'ar' ? "حولنا" : "About" },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Premium gradient border line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      
      <div className="glass-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              className="cursor-pointer"
              whileHover={{ scale: 1.02 }}
              onClick={() => onNavigate("home")}
            >
              <Logo size="sm" />
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => onNavigate(item.id)}
                  className={`relative px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                    activeSection === item.id
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-primary/10 rounded-full border border-primary/30"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Button>
              ))}
            </div>

            {/* Right side buttons */}
            <div className="flex items-center gap-3">
              {/* Language Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleLanguage}
                className="rounded-full hover:bg-primary/10 hover:text-primary"
                title={language === 'en' ? 'العربية' : 'English'}
              >
                <Globe className="h-5 w-5" />
              </Button>

              {/* Academy Button - Premium Style */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  asChild
                  className="hidden sm:flex btn-premium gap-2 px-6 py-2.5 rounded-full"
                >
                  <a
                    href="https://infinityalgoacademy.net/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GraduationCap className="w-4 h-4" />
                    <span>{language === 'ar' ? 'الأكاديمية' : 'Academy'}</span>
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </Button>
              </motion.div>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full hover:bg-primary/10 hover:text-primary"
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden rounded-full"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-dark border-t border-primary/20"
          >
            <div className="px-4 py-6 space-y-2">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => {
                    onNavigate(item.id);
                    setIsOpen(false);
                  }}
                  className={`w-full justify-start gap-3 py-3 rounded-xl ${
                    activeSection === item.id
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </Button>
              ))}
              
              {/* Academy CTA in mobile */}
              <Button
                asChild
                className="w-full mt-4 btn-premium gap-2 py-3 rounded-xl"
              >
                <a
                  href="https://infinityalgoacademy.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Crown className="w-5 h-5" />
                  <span>{language === 'ar' ? 'انضم للأكاديمية' : 'Join Academy'}</span>
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
