import { NextResponse } from 'next/server';
import yahooFinance from 'yahoo-finance2';

export async function GET(
  request: Request,
  { params }: { params: { ticker: string } }
) {
  const ticker = params.ticker; // Accessing params directly is usually fine here in App Router

  if (!ticker) {
    // Add await here (though likely not the primary issue)
    return await NextResponse.json({ error: 'Ticker symbol is required' }, { status: 400 });
  }

  try {
    // Specify fields needed by the dashboard component
    const quote = await yahooFinance.quote(ticker, {
      fields: ['symbol', 'regularMarketChangePercent', 'shortName']
    });

    if (!quote) {
        // Add await here
        return await NextResponse.json({ error: 'Data not found for ticker' }, { status: 404 });
    }

    // Return only the necessary data
    const responseData = {
        name: quote.shortName || quote.symbol || 'N/A',
        symbol: quote.symbol || 'N/A',
        change: quote.regularMarketChangePercent?.toFixed(2) || '0.00',
    };
    // Add await here
    return await NextResponse.json(responseData);

  } catch (error) {
    console.error(`Error fetching quote for ${ticker}:`, error);
    let errorMessage = 'Failed to fetch quote data';
    let statusCode = 500;
    // Add await here
    return await NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}
