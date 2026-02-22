export async function GET(req: Request) {
  const url = new URL(req.url);
  const symbol = url.searchParams.get('symbol') || 'XAUUSD';
  
  const apiKey = process.env.ALPHA_VANTAGE_KEY || 'demo';
  
  // Map symbols for Alpha Vantage
  const symbolMap: Record<string, { from: string; to: string }> = {
    'XAUUSD': { from: 'XAU', to: 'USD' },
    'XAGUSD': { from: 'XAG', to: 'USD' },
    'BTCUSD': { from: 'BTC', to: 'USD' },
    'ETHUSD': { from: 'ETH', to: 'USD' },
    'EURUSD': { from: 'EUR', to: 'USD' },
    'GBPUSD': { from: 'GBP', to: 'USD' },
    'USDJPY': { from: 'USD', to: 'JPY' },
    'AUDUSD': { from: 'AUD', to: 'USD' },
  };

  const pair = symbolMap[symbol] || { from: symbol.slice(0, 3), to: symbol.slice(3, 6) };
  
  try {
    // Try FX intraday first
    let data;
    let apiUrl = `https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol=${pair.from}&to_symbol=${pair.to}&interval=5min&apikey=${apiKey}`;
    
    let response = await fetch(apiUrl);
    data = await response.json();
    
    // Check if we got valid data
    if (data['Time Series FX (5min)']) {
      const timeSeries = data['Time Series FX (5min)'];
      const latestTime = Object.keys(timeSeries)[0];
      const latestData = timeSeries[latestTime];
      
      return Response.json({
        symbol,
        price: parseFloat(latestData['4. close']),
        open: parseFloat(latestData['1. open']),
        high: parseFloat(latestData['2. high']),
        low: parseFloat(latestData['3. low']),
        timestamp: latestTime,
        source: 'Alpha Vantage FX'
      });
    }
    
    // Try crypto if FX didn't work
    if (symbol.includes('BTC') || symbol.includes('ETH')) {
      apiUrl = `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_INTRADAY&symbol=${pair.from}&market=${pair.to}&apikey=${apiKey}`;
      response = await fetch(apiUrl);
      data = await response.json();
      
      if (data['Time Series (Digital Currency Intraday)']) {
        const timeSeries = data['Time Series (Digital Currency Intraday)'];
        const latestTime = Object.keys(timeSeries)[0];
        const latestData = timeSeries[latestTime];
        
        return Response.json({
          symbol,
          price: parseFloat(latestData['4. close']),
          open: parseFloat(latestData['1. open']),
          high: parseFloat(latestData['2. high']),
          low: parseFloat(latestData['3. low']),
          timestamp: latestTime,
          source: 'Alpha Vantage Crypto'
        });
      }
    }
    
    // Fallback to mock data
    const mockPrices: Record<string, number> = {
      'XAUUSD': 2485.50,
      'XAGUSD': 29.50,
      'BTCUSD': 67500,
      'ETHUSD': 3450,
      'EURUSD': 1.0850,
      'GBPUSD': 1.2650,
      'USDJPY': 149.50,
      'AUDUSD': 0.6550,
    };
    
    return Response.json({
      symbol,
      price: mockPrices[symbol] || 100,
      timestamp: new Date().toISOString(),
      source: 'Mock Data (API limit)',
      note: 'Using demo data - add valid Alpha Vantage key for live prices'
    });
    
  } catch (error) {
    const mockPrices: Record<string, number> = {
      'XAUUSD': 2485.50,
      'BTCUSD': 67500,
      'EURUSD': 1.0850,
    };
    
    return Response.json({
      symbol,
      price: mockPrices[symbol] || 100,
      timestamp: new Date().toISOString(),
      source: 'Fallback Mock'
    });
  }
}
