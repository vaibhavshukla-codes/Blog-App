import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';

export async function GET() {
  try {
    await dbConnect();
    return NextResponse.json({ 
      success: true, 
      message: 'MongoDB connection successful',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Test API error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 