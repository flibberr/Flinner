import { NextResponse } from 'next/server';
import yahooFinance from 'yahoo-finance2';

// Helper function to calculate date N years ago
function getDateNYearsAgo(years: number): string {
  const date = new Date();
  date.setFullYear(date.getFullYear() - years);
  // Format as YYYY-MM-DD
  return date.toISOString().split('T')[0];
}

export async function GET(
  request: Request,
  { params }: { params: { ticker: string } }
) {
  const ticker = params.ticker; // Accessing params directly is usually fine here in App Router

  if (!ticker) {
    // Add await here
    return await NextResponse.json({ error: 'Ticker symbol is required' }, { status: 400 });
  }

  // Default to 1 year of data
  const period1 = getDateNYearsAgo(1);
  const queryOptions = { period1: period1, /* interval: '1d' // Default is 1d */ };

  try {
    // Use chart module as historical is deprecated and mapped internally anyway
    const result = await yahooFinance.chart(ticker, queryOptions);

    // Extract relevant data (timestamps and closing prices)
    const quotes = result.quotes || [];
    const responseData = quotes.map(q => ({
        date: q.date ? new Date(q.date).getTime() : null, // Return timestamp for easier client-side formatting
        close: q.close
    })).filter(q => q.date !== null); // Filter out any potential null dates

    if (responseData.length === 0) {
         // Add await here
         return await NextResponse.json({ error: 'No historical data found for the period' }, { status: 404 });
    }
    // Add await here
    return await NextResponse.json(responseData);

  } catch (error) {
    console.error(`Error fetching historical data for ${ticker}:`, error);
    let errorMessage = 'Failed to fetch historical data';
    let statusCode = 500;
     // Add await here
    return await NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}
