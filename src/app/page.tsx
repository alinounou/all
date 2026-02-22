"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Logo, HeroLogo } from "@/components/Logo";
import { FibonacciCalculator } from "@/components/calculators/FibonacciCalculator";
import { PositionSizeCalculator } from "@/components/calculators/PositionSizeCalculator";
import { CalculatorStub } from "@/components/calculators/CalculatorStub";
import { AIAnalysisSection } from "@/components/AIAnalysisSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  calculators,
  calculatorCategories,
  featuredCalculators,
  CalculatorConfig,
} from "@/config/calculators";
import {
  ArrowRight,
  Calculator,
  Brain,
  Users,
  Zap,
  Shield,
  TrendingUp,
  ExternalLink,
  Star,
  ChevronRight,
  Sparkles,
  Target,
  BarChart3,
  Clock,
  CheckCircle2,
  Crown,
  Rocket,
  Award,
  Play,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export default function Home() {
  const { language, setLanguage } = useTranslation();
  const isRTL = language === 'ar';
  const direction = isRTL ? 'rtl' : 'ltr';
  
  const [activeSection, setActiveSection] = useState("home");
  const [selectedCalculator, setSelectedCalculator] = useState<string>("fibonacci");
  const homeRef = useRef<HTMLDivElement>(null);
  const calculatorsRef = useRef<HTMLDivElement>(null);
  const aiRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
  }, [direction, language]);

  const navigateTo = (section: string) => {
    setActiveSection(section);
    const refs: Record<string, React.RefObject<HTMLDivElement | null>> = {
      home: homeRef,
      calculators: calculatorsRef,
      ai: aiRef,
      about: aboutRef,
    };
    refs[section]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const renderCalculator = (calc: CalculatorConfig) => {
    if (calc.id === "fibonacci") {
      return <FibonacciCalculator />;
    }
    if (calc.id === "position-size") {
      return <PositionSizeCalculator />;
    }
    return <CalculatorStub config={calc} />;
  };

  // Translations
  const t = {
    hero: {
      badge: isRTL ? "منصة ذكاء التداول بالذكاء الاصطناعي" : "AI-Powered Trading Intelligence Platform",
      title: isRTL ? "ذكاء التداول" : "Trading Intelligence",
      titleHighlight: isRTL ? "للمتداولين المحترفين" : "for Professional Traders",
      description: isRTL 
        ? "أكثر من 22 حاسبة تداول احترافية، تحليل السوق بالذكاء الاصطناعي، وتعليم متخصص من نخبة الخبراء"
        : "22+ professional trading calculators, AI-powered market analysis, and expert education from elite professionals",
      cta: {
        primary: isRTL ? "ابدأ مجاناً" : "Get Started Free",
        secondary: isRTL ? "زيارة الأكاديمية" : "Visit Academy",
      },
    },
    stats: {
      calculators: isRTL ? "حاسبة" : "Calculators",
      analysis: isRTL ? "تحليل" : "Analysis",
      free: isRTL ? "مجاني" : "Free",
      secure: isRTL ? "آمن" : "Secure",
    },
    featured: {
      badge: isRTL ? "أدوات مميزة" : "Featured Tools",
      title: isRTL ? "حاسبات تداول احترافية" : "Professional Trading Calculators",
      description: isRTL 
        ? "ابدأ بأشهر حاسباتنا. أدوات احترافية يستخدمها آلاف المتداولين حول العالم."
        : "Start with our most popular calculators. Professional tools used by thousands of traders worldwide.",
      tryNow: isRTL ? "جرب الآن" : "Try Now",
      viewAll: isRTL ? "عرض جميع الحاسبات 22+" : "View All 22+ Calculators",
    },
    whyUs: {
      badge: isRTL ? "لماذا نحن" : "Why Choose Us",
      title: isRTL ? "صُنع للمتداولين المحترفين" : "Built for Professional Traders",
      description: isRTL 
        ? "كل ميزة مصممة مع وضع احتياجات المتداول المحترف في الاعتبار"
        : "Every feature designed with professional traders' needs in mind",
      features: [
        {
          icon: Brain,
          title: isRTL ? "تحليل AI متقدم" : "Advanced AI Analysis",
          description: isRTL 
            ? "خوارزميات ذكاء اصطناعي متطورة تحلل السوق وتقدم رؤى قابلة للتنفيذ"
            : "Advanced AI algorithms analyze markets and provide actionable insights",
          color: "from-amber-500/20 to-yellow-500/20",
        },
        {
          icon: Calculator,
          title: isRTL ? "22+ حاسبة احترافية" : "22+ Pro Calculators",
          description: isRTL 
            ? "من فيبوناتشي إلى كيلي كريتيوريون - كل ما تحتاجه لتحليل احترافي"
            : "From Fibonacci to Kelly Criterion - everything for professional analysis",
          color: "from-blue-500/20 to-indigo-500/20",
        },
        {
          icon: TrendingUp,
          title: isRTL ? "تحليل فوري" : "Real-Time Analysis",
          description: isRTL 
            ? "احصل على تحليلات فورية مع تغير ظروف السوق"
            : "Get instant analysis as market conditions change",
          color: "from-green-500/20 to-emerald-500/20",
        },
        {
          icon: Crown,
          title: isRTL ? "أكاديمية النخبة" : "Elite Academy",
          description: isRTL 
            ? "تكامل مباشر مع أكاديمية Infinity Algo للدورات والتوجيه"
            : "Direct integration with Infinity Algo Academy for courses & mentoring",
          color: "from-purple-500/20 to-pink-500/20",
        },
      ],
    },
    calculators: {
      badge: isRTL ? "أدوات التداول" : "Trading Tools",
      title: isRTL ? "جميع حاسبات التداول" : "All Trading Calculators",
      description: isRTL 
        ? "أكثر من 22 حاسبة احترافية منظمة حسب الفئة"
        : "22+ professional calculators organized by category",
      categories: {
        risk: isRTL ? "إدارة المخاطر" : "Risk Management",
        position: isRTL ? "حجم المراكز" : "Position Sizing",
        technical: isRTL ? "التحليل الفني" : "Technical Analysis",
        performance: isRTL ? "مقاييس الأداء" : "Performance Metrics",
      },
    },
    about: {
      badge: isRTL ? "قصتنا" : "Our Story",
      title: isRTL ? "قصة Infinity Algo" : "The Story of Infinity Algo",
      story: isRTL 
        ? "Infinity Algo منصة ذكاء تداول متقدمة أسسها Jeremy، خبير تداول بأكثر من عقد من الخبرة. مهمتنا تمكين المتداولين من أدوات احترافية وتعليم متميز."
        : "Infinity Algo is an advanced trading intelligence platform founded by Jeremy, a trading expert with over a decade of experience. Our mission is to empower traders with professional tools and premium education.",
      whatWeOffer: isRTL ? "ما نقدمه" : "What We Offer",
      comingSoon: isRTL ? "قريباً" : "Coming Soon",
    },
    cta: {
      title: isRTL ? "مستعد لرفع مستوى تداولك؟" : "Ready to Elevate Your Trading?",
      description: isRTL 
        ? "انضم لآلاف المتداولين المحترفين. ابدأ مجاناً، ترقِ عندما تكون مستعداً."
        : "Join thousands of professional traders. Start free, upgrade when ready.",
      primary: isRTL ? "ابدأ مجاناً الآن" : "Start Free Now",
      secondary: isRTL ? "انضم للأكاديمية" : "Join Academy",
    },
  };

  const stats = [
    { value: "22+", label: t.stats.calculators, icon: Calculator },
    { value: "AI", label: t.stats.analysis, icon: Brain },
    { value: t.stats.free, label: "", icon: Zap },
    { value: "100%", label: t.stats.secure, icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden" dir={direction}>
      {/* Background Effects */}
      <div className="fixed inset-0 bg-grid-pattern pointer-events-none opacity-30" />
      <motion.div
        className="fixed top-0 left-0 w-[600px] h-[600px] rounded-full orb-gold"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="fixed bottom-0 right-0 w-[500px] h-[500px] rounded-full orb-royal"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <div className="fixed inset-0 bg-gradient-radial pointer-events-none" />

      {/* Navbar */}
      <Navbar activeSection={activeSection} onNavigate={navigateTo} />

      {/* Main Content */}
      <main className="relative">
        {/* Hero Section */}
        <section ref={homeRef} id="home" className="min-h-screen flex items-center justify-center pt-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - Content */}
              <div className="text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Badge variant="outline" className="mb-6 bg-primary/10 text-primary border-primary/30 px-4 py-2">
                    <Sparkles className="w-4 h-4 mr-2" />
                    {t.hero.badge}
                  </Badge>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                >
                  <span className="text-gradient-gold">{t.hero.title}</span>
                  <br />
                  <span className="text-foreground">{t.hero.titleHighlight}</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto lg:mx-0"
                >
                  {t.hero.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
                >
                  <Button
                    size="lg"
                    onClick={() => navigateTo("calculators")}
                    className="btn-premium gap-2 px-8 py-6 text-lg rounded-full"
                  >
                    {t.hero.cta.primary}
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="gap-2 px-8 py-6 rounded-full border-primary/30 hover:bg-primary/10"
                  >
                    <a
                      href="https://infinityalgoacademy.net/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t.hero.cta.secondary}
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </Button>
                </motion.div>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12"
                >
                  {stats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl glass-card border-primary/20 text-center hover:border-primary/40 transition-all"
                      >
                        <Icon className="w-6 h-6 text-primary mb-2 mx-auto" />
                        <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                        <div className="text-xs text-muted-foreground">{stat.label}</div>
                      </div>
                    );
                  })}
                </motion.div>
              </div>

              {/* Right - Logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="hidden lg:flex items-center justify-center"
              >
                <HeroLogo className="w-80 h-80" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Academy Promo Banner */}
        <section className="py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20" />
              <div className="absolute inset-0 bg-grid-pattern opacity-20" />
              
              {/* Animated border */}
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent animate-shimmer-gold" />
              
              <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <motion.div
                    className="p-4 rounded-2xl bg-primary/20"
                    animate={{ boxShadow: ["0 0 20px rgba(212, 175, 55, 0.3)", "0 0 40px rgba(212, 175, 55, 0.4)", "0 0 20px rgba(212, 175, 55, 0.3)"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Crown className="w-8 h-8 text-primary" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-gradient-gold">
                      {isRTL ? "أكاديمية Infinity Algo" : "Infinity Algo Academy"}
                    </h3>
                    <p className="text-muted-foreground">
                      {isRTL ? "تعلم من نخبة الخبراء" : "Learn from elite experts"}
                    </p>
                  </div>
                </div>
                <Button
                  asChild
                  size="lg"
                  className="btn-premium gap-2 px-8 rounded-full shrink-0"
                >
                  <a href="https://infinityalgoacademy.net/" target="_blank" rel="noopener noreferrer">
                    {isRTL ? "انضم الآن" : "Join Now"}
                    <Rocket className="w-5 h-5" />
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Calculators Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4 bg-primary/10 text-primary border-primary/30">
                <Star className="w-4 h-4 mr-2" />
                {t.featured.badge}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t.featured.title}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t.featured.description}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {featuredCalculators.map((calc, idx) => (
                <motion.div
                  key={calc.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card
                    className="glass-card border-primary/20 hover:border-primary/40 cursor-pointer transition-all group h-full"
                    onClick={() => {
                      setSelectedCalculator(calc.id);
                      navigateTo("calculators");
                    }}
                  >
                    <CardHeader>
                      <div className="p-3 rounded-2xl bg-primary/20 w-fit mb-3 group-hover:scale-110 transition-transform">
                        <Calculator className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {calc.name}
                      </CardTitle>
                      <CardDescription>{calc.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-primary text-sm font-medium">
                        {t.featured.tryNow} <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigateTo("calculators")}
                className="gap-2 px-8 rounded-full border-primary/30 hover:bg-primary/10"
              >
                {t.featured.viewAll}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Why Us Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4 bg-primary/10 text-primary border-primary/30">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                {t.whyUs.badge}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t.whyUs.title}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t.whyUs.description}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.whyUs.features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className={`glass-card border-primary/20 h-full hover:border-primary/40 hover:scale-105 transition-all`}>
                      <CardHeader>
                        <div className={`p-3 rounded-2xl bg-gradient-to-br ${feature.color} w-fit mb-3`}>
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* All Calculators Section */}
        <section ref={calculatorsRef} id="calculators" className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4 bg-primary/10 text-primary border-primary/30">
                <Calculator className="w-4 h-4 mr-2" />
                {t.calculators.badge}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t.calculators.title}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t.calculators.description}
              </p>
            </div>

            <div className="grid lg:grid-cols-4 gap-6">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <Card className="glass-card border-primary/20 sticky top-24">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{t.calculators.badge}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ScrollArea className="h-[500px]">
                      {Object.entries(calculatorCategories).map(([key, category]) => {
                        const categoryCalcs = calculators.filter((c) => c.category === key);
                        return (
                          <div key={key} className="mb-2">
                            <div className="px-4 py-2 text-sm font-semibold bg-primary/10 text-primary">
                              {t.calculators.categories[key as keyof typeof t.calculators.categories]}
                            </div>
                            {categoryCalcs.map((calc) => (
                              <button
                                key={calc.id}
                                onClick={() => setSelectedCalculator(calc.id)}
                                className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 transition-colors ${
                                  selectedCalculator === calc.id
                                    ? "bg-primary/15 text-primary border-l-2 border-primary"
                                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                                }`}
                              >
                                {calc.featured && <Star className="w-3 h-3 text-primary" />}
                                {calc.name}
                              </button>
                            ))}
                          </div>
                        );
                      })}
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>

              {/* Calculator Area */}
              <div className="lg:col-span-3">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedCalculator}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderCalculator(calculators.find((c) => c.id === selectedCalculator)!)}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* AI Analysis Section */}
        <div ref={aiRef}>
          <AIAnalysisSection />
        </div>

        {/* About Section */}
        <section ref={aboutRef} id="about" className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="outline" className="mb-4 bg-primary/10 text-primary border-primary/30">
                  <Clock className="w-4 h-4 mr-2" />
                  {t.about.badge}
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient-gold">
                  {t.about.title}
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  {t.about.story}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild className="btn-premium gap-2 rounded-full">
                    <a href="https://infinityalgoacademy.net/" target="_blank" rel="noopener noreferrer">
                      {isRTL ? "زيارة الأكاديمية" : "Visit Academy"}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Calculator, text: "22+ Calculators" },
                  { icon: Brain, text: "AI Analysis" },
                  { icon: Users, text: "Community" },
                  { icon: Award, text: "Expert Courses" },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="p-6 rounded-2xl glass-card border-primary/20 text-center"
                  >
                    <item.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                    <p className="font-semibold">{item.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl"
            >
              <div className="absolute inset-0 glass-card border-primary/30" />
              <div className="relative p-12">
                <Crown className="w-12 h-12 text-primary mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-gold">
                  {t.cta.title}
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  {t.cta.description}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button size="lg" onClick={() => navigateTo("calculators")} className="btn-premium gap-2 px-8 rounded-full">
                    {t.cta.primary}
                    <Rocket className="w-5 h-5" />
                  </Button>
                  <Button size="lg" variant="outline" asChild className="gap-2 px-8 rounded-full border-primary/30">
                    <a href="https://infinityalgoacademy.net/" target="_blank" rel="noopener noreferrer">
                      {t.cta.secondary}
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
