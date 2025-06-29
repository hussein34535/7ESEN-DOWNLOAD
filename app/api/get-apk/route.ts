import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const userAgent = request.headers.get('user-agent')?.toLowerCase() || '';
  const clientHintArch = request.headers.get('sec-ch-ua-arch')?.toLowerCase() || '';

  let detectedArchitecture: '64bit' | '32bit' | 'unknown' = 'unknown';

  // 1. Check for 64-bit (most reliable: Client Hints or explicit User Agent markers)
  if (clientHintArch.includes('arm64') || clientHintArch.includes('aarch64') || clientHintArch.includes('armv8')) {
    detectedArchitecture = '64bit';
  } else if (userAgent.includes("arm64") || userAgent.includes("aarch64") || userAgent.includes("armv8")) {
    detectedArchitecture = '64bit';
  }
  // 2. Check for explicit 32-bit (User Agent markers)
  else if (userAgent.includes("armeabi") || userAgent.includes("armv7") || userAgent.includes("x86")) { // Assuming x86 is 32-bit for this context
    detectedArchitecture = '32bit';
  }

  // 3. Redirect based on detected architecture
  if (detectedArchitecture === '64bit') {
    return NextResponse.redirect(new URL('/apks/7esenTV64.apk', request.url));
  } else if (detectedArchitecture === '32bit') {
    return NextResponse.redirect(new URL('/apks/7esenTV32.apk', request.url));
  } else {
    // Fallback for unknown/unspecified architectures
    return NextResponse.redirect(new URL('/public/7esenTV.apk', request.url));
  }
} 