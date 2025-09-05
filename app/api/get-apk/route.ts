import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Always redirect to the main APK file, ignoring architecture detection
  return NextResponse.redirect(new URL('/7esenTV.apk', request.url));
} 