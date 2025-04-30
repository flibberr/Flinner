"use client"; // Required for Recharts client components and data fetching

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowUp, ArrowDown, Activity, List, BarChartBig, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from "@/components/ui/button";
import { BentoGrid } from "@/components/ui/bento-grid";
import { cn } from "@/lib/utils";

// --- Data Fetching Hooks (Keep as is) ---
export default function DashboardPage() {
  // State for fetched data
  const [marketTrendsStats, setMarketTrendsStats] = useState<any[]>([]);
  const [loadingMarketTrends, setLoadingMarketTrends] = useState(true);
  const [errorMarketTrends, setErrorMarketTrends] = useState<string | null>(null);
  const [topGainersChartData, setTopGainersChartData] = useState<any[]>([]);
  const [loadingTopGainersChart, setLoadingTopGainersChart] = useState(true);
  const [errorTopGainersChart, setErrorTopGainersChart] = useState<string | null>(null);
  const [topGainersList, setTopGainersList] = useState<any[]>([]); // For dynamic list
  const [topLosersList, setTopLosersList] = useState<any[]>([]); // For dynamic list
  const [loadingGainersLosers, setLoadingGainersLosers] = useState(true);
  const [errorGainersLosers, setErrorGainersLosers] = useState<string | null>(null);

  // Fetch Market Trends Stats
  useEffect(() => {
    const fetchMarketTrends = async () => {
      setLoadingMarketTrends(true);
      setErrorMarketTrends(null);
      const tickers = ['QCOM', 'JPM', 'XOM'];
      try {
        const results = await Promise.all(
          tickers.map(ticker => fetch(`/api/yahoo/quote/${ticker}`).then(res => {
            if (!res.ok) throw new Error(`Failed to fetch quote for ${ticker}`);
            return res.json();
          }))
        );
        setMarketTrendsStats(results);
      } catch (err) {
        console.error("Error fetching market trends:", err);
        setErrorMarketTrends("Failed to load market trends data.");
      } finally {
        setLoadingMarketTrends(false);
      }
    };
    fetchMarketTrends();
  }, []);

  // Fetch Top Gainers Chart Data
  useEffect(() => {
    const fetchChartData = async () => {
      setLoadingTopGainersChart(true);
      setErrorTopGainersChart(null);
      const tickers = ['TSLA', 'PFE'];
      try {
        const results = await Promise.all(
          tickers.map(ticker => fetch(`/api/yahoo/historical/${ticker}`).then(res => {
             if (!res.ok) throw new Error(`Failed to fetch historical data for ${ticker}`);
             return res.json();
          }))
        );
        if (results[0]?.length > 0 && results[1]?.length > 0) {
            const maxLength = Math.max(results[0].length, results[1].length);
            const formattedData = [];
            for (let i = 0; i < maxLength; i++) {
                const tslaData = results[0][i];
                const pfeData = results[1][i];
                formattedData.push({
                    date: tslaData ? new Date(tslaData.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : null,
                    TSLA: tslaData?.close || null,
                    PFE: pfeData?.close || null,
                });
            }
            setTopGainersChartData(formattedData.filter(d => d.date));
        } else {
            setTopGainersChartData([]);
            console.warn("Missing historical data for TSLA or PFE from API");
        }
      } catch (err) {
        console.error("Error fetching chart data:", err);
        setErrorTopGainersChart("Failed to load chart data.");
      } finally {
        setLoadingTopGainersChart(false);
      }
    };
    fetchChartData();
  }, []);

  // Fetch Top Gainers/Losers List Data (for the combined list)
  useEffect(() => {
    const fetchGainersLosers = async () => {
      setLoadingGainersLosers(true);
      setErrorGainersLosers(null);
      const gainerTickers = ['TSLA', 'PFE', 'NKE']; // Tickers for the combined list
      const loserTickers = ['META', 'ETSY', 'INTC']; // Tickers for the combined list
      try {
        const gainerResults = await Promise.all(
          gainerTickers.map(ticker => fetch(`/api/yahoo/quote/${ticker}`).then(res => {
            if (!res.ok) throw new Error(`Failed to fetch quote for ${ticker}`);
            return res.json();
          }))
        );
         const loserResults = await Promise.all(
          loserTickers.map(ticker => fetch(`/api/yahoo/quote/${ticker}`).then(res => {
            if (!res.ok) throw new Error(`Failed to fetch quote for ${ticker}`);
            return res.json();
          }))
        );
        gainerResults.sort((a, b) => parseFloat(b.change) - parseFloat(a.change));
        loserResults.sort((a, b) => parseFloat(a.change) - parseFloat(b.change));
        setTopGainersList(gainerResults);
        setTopLosersList(loserResults);
      } catch (err) {
        console.error("Error fetching gainers/losers data:", err);
        setErrorGainersLosers("Failed to load gainers/losers data.");
      } finally {
        setLoadingGainersLosers(false);
      }
    };
    fetchGainersLosers();
  }, []);

  // --- Define Content Components ---
  const SectorsOverviewContent = () => (
    <div className="space-y-3 p-4 h-full text-xs">
       <h3 className="font-semibold text-base mb-2">Sectors Overview</h3>
      {[
        { name: 'Technology', marketCap: '$12,41T', change: '+2,1%', description: 'Market cap: $12,41T' },
        { name: 'Finance', marketCap: '7,35 T', change: '+1,4%', description: 'Avg, growth +1,1%' },
        { name: 'Healthcare', marketCap: '1,4,9 T', change: '+3,2%', description: 'Top performer (MRV)' },
        { name: 'Energy', marketCap: '4,29 T', change: '+1,5%', description: 'Top perfom - 0,3%' },
        { name: 'Consumer Goods', marketCap: '3,87 T', change: '+2,8%', description: 'Top performer PG (PG' },
      ].map((sector) => (
        <div key={sector.name} className="flex items-center justify-between">
          <div> <p className="font-medium">{sector.name}</p> <p className="text-xs text-muted-foreground">{sector.description}</p> </div>
          <div className="text-right"> <p className="font-semibold">{sector.marketCap}</p> <p className={`text-xs ${sector.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{sector.change}</p> </div>
        </div>
      ))}
    </div>
  );

  const MarketTrendsContent = () => (
    <div className="p-4">
        <h3 className="font-semibold text-base mb-1">Market Trends</h3>
        <p className="text-xs text-muted-foreground mb-2">Overview of market portarch</p>
       <div className="h-[60px]">
         <ResponsiveContainer width="100%" height="100%">
           <LineChart data={[ { name: 'Jan', uv: 400 }, { name: 'Feb', uv: 300 }, { name: 'Mar', uv: 200 }, { name: 'Apr', uv: 278 }, { name: 'May', uv: 189 }, { name: 'Jun', uv: 239 }, { name: 'Jul', uv: 349 }, { name: 'Aug', uv: 400 }, { name: 'Sep', uv: 300 }, { name: 'Oct', uv: 200 }, { name: 'Nov', uv: 278 }, { name: 'Dec', uv: 189 } ]}>
             <Line type="monotone" dataKey="uv" stroke="#8884d8" strokeWidth={2} dot={false} />
             <YAxis hide={true} domain={['dataMin - 50', 'dataMax + 50']} /> <XAxis dataKey="name" hide={true} />
           </LineChart>
         </ResponsiveContainer>
       </div>
       <div className="mt-2 space-y-1 text-xs">
         {loadingMarketTrends && <p>Loading...</p>}
         {errorMarketTrends && <p className="text-red-500 text-xs">{errorMarketTrends}</p>}
         {!loadingMarketTrends && !errorMarketTrends && marketTrendsStats.map((stat) => (
           <div key={stat.symbol} className="flex justify-between">
             <span>{stat.name} ({stat.symbol})</span>
             <span className={parseFloat(stat.change) >= 0 ? 'text-green-500' : 'text-red-500'}> {parseFloat(stat.change) >= 0 ? '+' : ''}{stat.change}% </span>
           </div>
         ))}
       </div>
    </div>
  );

   const StaticTopGainersListContent = () => (
     <div className="p-4 space-y-2 text-sm">
        <h3 className="font-semibold text-base mb-2">Top Gainers</h3>
       {[ { name: 'Tesla', change: '+5,3%' }, { name: 'Prizer', change: '+4,2%' }, { name: 'Nike', change: '+3,9%' } ].map((gainer) => (
         <div key={gainer.name} className="flex justify-between items-center">
           <span>{gainer.name}</span>
           <span className="flex items-center text-red-500"> {/* Image shows red arrow */}
             <ArrowUp className="h-3 w-3 mr-1" />
             {gainer.change}
           </span>
         </div>
       ))}
     </div>
   );

  const TopGainersChartContent = () => (
     <div className="p-4 h-full flex flex-col">
        <h3 className="font-semibold text-base mb-2">Top Gainers</h3>
        <div className="flex-grow h-[200px]">
            {loadingTopGainersChart && <p>Loading chart...</p>}
            {errorTopGainersChart && <p className="text-red-500 text-xs">{errorTopGainersChart}</p>}
            {!loadingTopGainersChart && !errorTopGainersChart && topGainersChartData.length > 0 && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={topGainersChartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground) / 0.3)" />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))', borderRadius: 'var(--radius)' }} labelFormatter={(label) => `Date: ${label}`} />
                  <Line type="monotone" dataKey="TSLA" stroke="#3b82f6" strokeWidth={2} dot={false} name="TSLA" />
                  <Line type="monotone" dataKey="PFE" stroke="#8884d8" strokeWidth={2} dot={false} name="PFE" />
                  <YAxis hide={true} domain={['auto', 'auto']} /> <XAxis dataKey="date" hide={true} />
                </LineChart>
              </ResponsiveContainer>
            )}
            {!loadingTopGainersChart && !errorTopGainersChart && topGainersChartData.length === 0 && ( <p>No chart data available.</p> )}
        </div>
        <div className="flex justify-center gap-1 mt-2">
            {['1D', '5M', '1M', '3M', '1Y', 'YTD'].map((range) => ( <Button key={range} variant="ghost" size="sm" className="text-xs h-6 px-1.5"> {range} </Button> ))}
        </div>
     </div>
  );

  const DynamicGainersLosersListContent = () => (
     <div className="p-4 text-xs h-full">
       <div className="grid grid-cols-2 gap-4 h-full">
         <div className="space-y-1">
            <h3 className="font-semibold mb-1 text-sm">Top Gainers</h3>
            {loadingGainersLosers && <p>Loading...</p>}
            {errorGainersLosers && <p className="text-red-500 text-xs">{errorGainersLosers}</p>}
            {!loadingGainersLosers && !errorGainersLosers && topGainersList.map((gainer) => (
             <div key={gainer.symbol} className="flex justify-between items-center"> <span>{gainer.symbol}</span> <span className="flex items-center text-green-500"> <ArrowUp className="h-3 w-3 mr-1" /> +{gainer.change}% </span> </div>
           ))}
         </div>
         <div className="space-y-1">
            <h3 className="font-semibold mb-1 text-sm">Top Losers</h3>
             {loadingGainersLosers && <p>Loading...</p>}
             {errorGainersLosers && <p className="text-red-500 text-xs">{errorGainersLosers}</p>}
             {!loadingGainersLosers && !errorGainersLosers && topLosersList.map((loser) => (
             <div key={loser.symbol} className="flex justify-between items-center"> <span>{loser.symbol}</span> <span className="flex items-center text-red-500"> <ArrowDown className="h-3 w-3 mr-1" /> {loser.change}% </span> </div>
           ))}
         </div>
       </div>
     </div>
  );

  // --- Define Items for Bento Grid ---
  // Reordered and adjusted spans for 7-column layout to match image
  const items = [
    { className: "xl:col-span-2 row-span-2", content: <SectorsOverviewContent /> },    // Col 1-2, Row 1-2
    { className: "xl:col-span-2 row-span-1", content: <MarketTrendsContent /> },        // Col 3-4, Row 1
    { className: "xl:col-span-3 row-span-1", content: <TopGainersChartContent /> },    // Col 5-7, Row 1
    { className: "xl:col-span-2 row-span-1", content: <StaticTopGainersListContent /> }, // Col 3-4, Row 2
    { className: "xl:col-span-3 row-span-1", content: <DynamicGainersLosersListContent /> }, // Col 5-7, Row 2
  ];

  // --- Render Page ---
  return (
    // Padding top is now handled by layout.tsx
    <div className="flex-1 space-y-4 p-4 md:p-8 bg-background text-foreground"> {/* Removed pt-20 */}
      {/* Bento Grid Layout */}
      <BentoGrid className="max-w-7xl mx-auto md:auto-rows-[15rem] xl:grid-cols-7"> {/* Using 7 columns on xl, adjusted row height */}
        {items.map((item, i) => (
          <div
            key={i}
            className={cn(
              "group relative flex flex-col justify-start overflow-hidden rounded-xl",
              // Basic card styling
              "bg-card text-card-foreground [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
              "dark:bg-card dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
              item.className // Apply grid span classes
            )}
          >
            {item.content}
             <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
          </div>
        ))}
      </BentoGrid>
       {/* Footer Text Removed */}
    </div>
  );
}
