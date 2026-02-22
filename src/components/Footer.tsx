"use client";

import { motion } from "framer-motion";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { 
  ExternalLink, 
  Twitter, 
  Linkedin, 
  Youtube, 
  MessageCircle, 
  Crown, 
  Sparkles,
  Star,
  ChevronRight,
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export function Footer() {
  const { language } = useTranslation();
  const currentYear = new Date().getFullYear();

  const isRTL = language === 'ar';

  const footerLinks = {
    product: [
      { label: isRTL ? "الحاسبات" : "Calculators", href: "#calculators" },
      { label: isRTL ? "تحليل AI" : "AI Analysis", href: "#ai" },
      { label: isRTL ? "حولنا" : "About", href: "#about" },
    ],
    resources: [
      { label: isRTL ? "الأكاديمية" : "Academy", href: "https://infinityalgoacademy.net/", external: true },
      { label: isRTL ? "التوثيق" : "Documentation", href: "#" },
      { label: "API", href: "#" },
    ],
    legal: [
      { label: isRTL ? "سياسة الخصوصية" : "Privacy Policy", href: "#" },
      { label: isRTL ? "شروط الخدمة" : "Terms of Service", href: "#" },
      { label: isRTL ? "إخلاء المسؤولية" : "Disclaimer", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: MessageCircle, href: "#", label: "Discord" },
  ];

  return (
    <footer className="relative mt-20">
      {/* Top gradient border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent" />
      
      {/* Academy Promo Section - Premium */}
      <section className="relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5" />
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        
        {/* Floating orbs */}
        <motion.div
          className="absolute left-1/4 top-1/2 w-64 h-64 rounded-full orb-gold"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div
          className="absolute right-1/4 top-1/2 w-48 h-48 rounded-full orb-royal"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            {/* Premium badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-6"
              animate={{ boxShadow: ["0 0 20px rgba(212, 175, 55, 0.2)", "0 0 40px rgba(212, 175, 55, 0.3)", "0 0 20px rgba(212, 175, 55, 0.2)"] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Crown className="w-5 h-5 text-primary" />
              <span className="text-primary font-semibold">{isRTL ? "تداول احترافي" : "Professional Trading"}</span>
            </motion.div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-gradient-gold">
                {isRTL ? "انضم لنجوم التداول" : "Join the Trading Stars"}
              </span>
            </h2>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              {isRTL 
                ? "اكتشف أسرار التداول الناجح مع نخبة المحللين والخبراء في أكاديمية Infinity Algo"
                : "Discover the secrets of successful trading with elite analysts and experts at Infinity Algo Academy"
              }
            </p>
            
            {/* Features list */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {[
                { icon: Star, text: isRTL ? "دورات احترافية" : "Pro Courses" },
                { icon: Sparkles, text: isRTL ? "توجيه شخصي" : "Personal Mentoring" },
                { icon: Crown, text: isRTL ? "مجتمع النخبة" : "Elite Community" },
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-primary/20"
                >
                  <feature.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </div>
            
            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Button
                asChild
                size="lg"
                className="btn-premium gap-2 px-8 py-6 text-lg rounded-full"
              >
                <a
                  href="https://infinityalgoacademy.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Crown className="w-5 h-5" />
                  <span>{isRTL ? "ابدأ رحلتك الآن" : "Start Your Journey"}</span>
                  <ChevronRight className="w-5 h-5" />
                </a>
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                asChild
                className="gap-2 px-6 py-6 rounded-full border-primary/30 hover:bg-primary/10"
              >
                <a
                  href="https://infinityalgoacademy.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{isRTL ? "تعرف أكثر" : "Learn More"}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Footer */}
      <div className="relative bg-gradient-to-b from-transparent to-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <Logo size="md" className="mb-4" />
              <p className="text-muted-foreground text-sm mt-4 max-w-sm">
                {isRTL 
                  ? "منصة ذكاء التداول المتقدمة للمتداولين المحترفين. رحلتك نحو التميز تبدأ هنا."
                  : "Advanced AI Trading Intelligence Platform for Serious Traders. Your journey to excellence starts here."
                }
              </p>
              
              {/* Social Links */}
              <div className="flex gap-3 mt-6">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <Button
                      key={social.label}
                      variant="ghost"
                      size="icon"
                      className="rounded-full hover:bg-primary/20 hover:text-primary transition-all"
                      asChild
                    >
                      <a href={social.href} aria-label={social.label}>
                        <Icon className="w-5 h-5" />
                      </a>
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Links Columns */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">{isRTL ? "المنتج" : "Product"}</h3>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">{isRTL ? "المصادر" : "Resources"}</h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-1"
                    >
                      {link.label}
                      {link.external && <ExternalLink className="w-3 h-3" />}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">{isRTL ? "قانوني" : "Legal"}</h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-primary/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                © {currentYear} Infinity Algo by Jeremy. {isRTL ? "جميع الحقوق محفوظة." : "All rights reserved."}
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{isRTL ? "مدعوم من" : "Powered by"}</span>
                <a
                  href="https://infinityalgoacademy.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  Infinity Algo Academy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
