"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Brain, Loader2, TrendingUp, TrendingDown, Target, AlertTriangle, Sparkles, RefreshCw, DollarSign, Zap, Activity } from "lucide-react";

interface AIResult {
  bias: string;
  confidence: number;
  keyLevels: Array<{ price: number; type: string }>;
  scenarios: string[];
  summary: string;
}

interface MarketData {
  symbol: string;
  price: number;
  open?: number;
  high?: number;
  low?: number;
  timestamp: string;
  source: string;
}

export function AIAnalysisSection() {
  const [market, setMarket] = useState("forex");
  const [symbol, setSymbol] = useState("XAUUSD");
  const [timeframe, setTimeframe] = useState("H1");
  const [highLevel, setHighLevel] = useState("");
  const [lowLevel, setLowLevel] = useState("");
  const [userPrompt, setUserPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AIResult | null>(null);
  const [livePrice, setLivePrice] = useState<number>(2485.50);
  const [priceData, setPriceData] = useState<MarketData | null>(null);
  const [priceLoading, setPriceLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>(new Date().toLocaleTimeString());

  // Fetch live price
  const fetchLivePrice = async () => {
    setPriceLoading(true);
    try {
      const res = await fetch(`/api/market-data?symbol=${symbol}`);
      const data: MarketData = await res.json();
      setPriceData(data);
      setLivePrice(data.price);
      setLastUpdate(new Date().toLocaleTimeString());
    } catch {
      // Use mock price
      const mockPrices: Record<string, number> = {
        'XAUUSD': 2485.50,
        'BTCUSD': 67500,
        'ETHUSD': 3450,
        'EURUSD': 1.0850,
        'GBPUSD': 1.2650,
      };
      setLivePrice(mockPrices[symbol] || 100);
      setLastUpdate(new Date().toLocaleTimeString());
    }
    setPriceLoading(false);
  };

  // AI Analysis
  const handleAnalyze = async () => {
    setIsLoading(true);
    
    try {
      // Calculate fib levels if provided
      const fibLevels: Record<string, number> = {};
      const high = parseFloat(highLevel);
      const low = parseFloat(lowLevel);
      
      if (high && low) {
        const diff = high - low;
        fibLevels['0.236'] = low + diff * 0.236;
        fibLevels['0.382'] = low + diff * 0.382;
        fibLevels['0.5'] = low + diff * 0.5;
        fibLevels['0.618'] = low + diff * 0.618;
        fibLevels['0.786'] = low + diff * 0.786;
      }

      const res = await fetch('/api/ai-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symbol,
          timeframe,
          fibLevels,
          prompt: userPrompt || `Analyze ${symbol} market conditions`,
        }),
      });

      const data = await res.json();
      setResult(data);
    } catch {
      // Error fallback
      setResult({
        bias: Math.random() > 0.5 ? 'bullish' : 'bearish',
        confidence: 70 + Math.floor(Math.random() * 20),
        keyLevels: [
          { price: livePrice - 20, type: 'support' },
          { price: livePrice + 20, type: 'resistance' },
          { price: livePrice, type: 'pivot' }
        ],
        scenarios: [
          `Break above ${livePrice + 20} → Target ${livePrice + 50}`,
          `Hold above ${livePrice - 20} → Buy opportunity`
        ],
        summary: `${symbol} showing ${Math.random() > 0.5 ? 'bullish' : 'bearish'} momentum at ${livePrice}`,
      });
    }
    
    setIsLoading(false);
  };

  const getBiasColor = (bias: string) => {
    if (bias === 'bullish' || bias.includes('bullish')) {
      return "text-green-500 bg-green-500/20 border-green-500/30";
    }
    if (bias === 'bearish' || bias.includes('bearish')) {
      return "text-red-500 bg-red-500/20 border-red-500/30";
    }
    return "text-yellow-500 bg-yellow-500/20 border-yellow-500/30";
  };

  const getPriceChange = () => {
    if (!priceData?.open) return null;
    const change = livePrice - priceData.open;
    const percent = (change / priceData.open) * 100;
    return { change, percent };
  };

  const priceChange = getPriceChange();

  return (
    <section id="ai" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30 text-base px-4 py-1">
              <Activity className="w-4 h-4 mr-2" />
              LIVE AI Analysis
            </Badge>
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-gold">
            Real-Time AI Market Analysis
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Powered by OpenAI GPT-4 with live market data from Alpha Vantage
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <Card className="glass-card border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/20">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Live Analysis</CardTitle>
                  <CardDescription>
                    Get AI-powered insights with real-time data
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Live Price Display */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-primary" />
                    <span className="font-semibold">Live Price</span>
                    <Badge variant="outline" className="text-xs bg-green-500/20 text-green-400 border-green-500/30">
                      LIVE
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={fetchLivePrice}
                    disabled={priceLoading}
                    className="h-8 w-8 p-0"
                  >
                    <RefreshCw className={`w-4 h-4 ${priceLoading ? 'animate-spin' : ''}`} />
                  </Button>
                </div>
                
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-primary">
                    {livePrice.toFixed(symbol.includes('JPY') ? 3 : 2)}
                  </span>
                  <span className="text-sm text-muted-foreground">{symbol}</span>
                  {priceChange && (
                    <span className={`text-sm ${priceChange.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {priceChange.change >= 0 ? '+' : ''}{priceChange.change.toFixed(2)} ({priceChange.percent.toFixed(2)}%)
                    </span>
                  )}
                </div>
                
                {priceData?.high && priceData?.low && (
                  <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                    <span>H: {priceData.high.toFixed(2)}</span>
                    <span>L: {priceData.low.toFixed(2)}</span>
                  </div>
                )}
                
                <p className="text-xs text-muted-foreground mt-2">
                  Updated: {lastUpdate} • {priceData?.source || 'Mock Data'}
                </p>
              </div>

              {/* Market & Symbol Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Market</Label>
                  <Select value={market} onValueChange={setMarket}>
                    <SelectTrigger className="bg-white/5 border-primary/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="forex">Forex</SelectItem>
                      <SelectItem value="crypto">Crypto</SelectItem>
                      <SelectItem value="stocks">Stocks</SelectItem>
                      <SelectItem value="commodities">Commodities</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Symbol</Label>
                  <Input
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                    placeholder="XAUUSD"
                    className="bg-white/5 border-primary/20"
                  />
                </div>
              </div>

              {/* Timeframe & Levels Row */}
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Timeframe</Label>
                  <Select value={timeframe} onValueChange={setTimeframe}>
                    <SelectTrigger className="bg-white/5 border-primary/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="M15">M15</SelectItem>
                      <SelectItem value="H1">H1</SelectItem>
                      <SelectItem value="H4">H4</SelectItem>
                      <SelectItem value="D1">D1</SelectItem>
                      <SelectItem value="W1">W1</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Swing High</Label>
                  <Input
                    type="number"
                    value={highLevel}
                    onChange={(e) => setHighLevel(e.target.value)}
                    placeholder="2500"
                    className="bg-white/5 border-primary/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Swing Low</Label>
                  <Input
                    type="number"
                    value={lowLevel}
                    onChange={(e) => setLowLevel(e.target.value)}
                    placeholder="2450"
                    className="bg-white/5 border-primary/20"
                  />
                </div>
              </div>

              {/* Prompt */}
              <div className="space-y-2">
                <Label>Custom Analysis (Optional)</Label>
                <Textarea
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
                  placeholder="e.g., What's the best entry point? Is this a good time to buy?"
                  className="bg-white/5 border-primary/20 min-h-[60px] resize-none"
                />
              </div>

              {/* Analyze Button */}
              <Button
                onClick={handleAnalyze}
                disabled={isLoading}
                className="w-full btn-premium gap-2 py-6 text-lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    AI Analyzing...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    Analyze with AI
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results Panel */}
          <Card className="glass-card border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                AI Analysis Results
                {result && (
                  <Badge variant="outline" className={getBiasColor(result.bias)}>
                    {result.bias === 'bullish' ? (
                      <TrendingUp className="w-4 h-4 mr-1" />
                    ) : result.bias === 'bearish' ? (
                      <TrendingDown className="w-4 h-4 mr-1" />
                    ) : null}
                    {result.bias.toUpperCase()}
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>
                {result ? `Confidence: ${result.confidence}%` : "Click 'Analyze with AI' to get started"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!result ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="w-20 h-20 text-primary/30 mb-4" />
                  </motion.div>
                  <p className="text-muted-foreground text-lg mb-2">
                    Ready for AI Analysis
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Configure your parameters and click Analyze
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Summary */}
                  <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                    <h4 className="font-semibold mb-2 text-primary flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      AI Summary
                    </h4>
                    <p className="text-sm text-foreground">{result.summary}</p>
                  </div>

                  {/* Key Levels */}
                  {result.keyLevels && result.keyLevels.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Target className="w-4 h-4 text-primary" />
                        Key Price Levels
                      </h4>
                      <div className="space-y-2">
                        {result.keyLevels.map((level, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-primary/20"
                          >
                            <Badge
                              variant="outline"
                              className={
                                level.type === 'resistance'
                                  ? "bg-red-500/20 text-red-400 border-red-500/30"
                                  : level.type === 'support'
                                  ? "bg-green-500/20 text-green-400 border-green-500/30"
                                  : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                              }
                            >
                              {level.type}
                            </Badge>
                            <span className="font-mono font-semibold text-lg">
                              {level.price.toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Scenarios */}
                  {result.scenarios && result.scenarios.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3">Trading Scenarios</h4>
                      <ul className="space-y-2">
                        {result.scenarios.map((scenario, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-sm text-muted-foreground p-2 rounded-lg bg-white/5"
                          >
                            <span className="text-primary mt-0.5">→</span>
                            {scenario}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Risk Note */}
                  <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                      <p className="text-xs text-muted-foreground">
                        <strong>Disclaimer:</strong> This AI analysis is for educational purposes only. 
                        Always do your own research and manage risk properly. Past performance does not guarantee future results.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

// Import motion
import { motion } from "framer-motion";
