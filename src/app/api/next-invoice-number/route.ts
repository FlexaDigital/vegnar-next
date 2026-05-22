import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import os from 'os';

// Use Node's global object to cache in memory across requests in a running process
const globalAny = global as any;
if (!globalAny.invoiceCounters) {
  globalAny.invoiceCounters = null;
}

const getFilePath = () => path.join(os.tmpdir(), 'vegnar-invoice-counter.json');

async function loadCounters(): Promise<Record<string, number>> {
  // If already in memory, return cached counters
  if (globalAny.invoiceCounters) {
    return globalAny.invoiceCounters;
  }

  const filePath = getFilePath();
  let counters: Record<string, number> = {};
  
  try {
    const content = await fs.promises.readFile(filePath, 'utf-8');
    counters = JSON.parse(content);
  } catch (e: any) {
    if (e.code !== 'ENOENT') {
      console.error('Error reading/parsing counter file from temp directory:', e);
    }
  }

  globalAny.invoiceCounters = counters;
  return counters;
}

async function saveCounters(counters: Record<string, number>): Promise<void> {
  globalAny.invoiceCounters = counters;
  const filePath = getFilePath();
  try {
    const dirPath = path.dirname(filePath);
    await fs.promises.mkdir(dirPath, { recursive: true });
    await fs.promises.writeFile(filePath, JSON.stringify(counters, null, 2), 'utf-8');
  } catch (e) {
    console.error('Error writing counter file to temp directory:', e);
  }
}

export async function POST() {
  try {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); // 0-indexed (Jan = 0, Dec = 11)
    
    // Indian Financial Year runs from April 1st to March 31st
    let startYear = year;
    if (month < 3) { // Jan, Feb, Mar (0, 1, 2)
      startYear = year - 1;
    }
    const endYear = startYear + 1;
    const fyString = `${String(startYear % 100).padStart(2, '0')}-${String(endYear % 100).padStart(2, '0')}`;

    const counters = await loadCounters();
    const currentCount = counters[fyString] || 0;
    const nextCount = currentCount + 1;
    counters[fyString] = nextCount;

    await saveCounters(counters);

    const paddedCount = String(nextCount).padStart(4, '0');
    const invoiceNo = `VGR-${paddedCount}-${fyString}`;

    return NextResponse.json({ invoiceNo });
  } catch (error) {
    console.error('Error in next-invoice-number API:', error);
    return NextResponse.json(
      { error: 'Failed to generate invoice number', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
