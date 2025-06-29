import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const userAgent = request.headers.get('user-agent')?.toLowerCase() || '';
  const clientHintArch = request.headers.get('sec-ch-ua-arch')?.toLowerCase() || '';

  let is64Bit = false;

  // 1. Check Client Hints first (most reliable)
  if (clientHintArch.includes('arm64') || clientHintArch.includes('aarch64') || clientHintArch.includes('armv8')) {
    is64Bit = true;
  } 
  // 2. Fallback to User Agent detection (more inferential)
  else if (userAgent.includes("arm64") || userAgent.includes("aarch64") || userAgent.includes("armv8")) {
    is64Bit = true;
  } 
  // 3. More aggressive inference for Android if no explicit 32-bit indicators
  else if (userAgent.includes("android") && !(userAgent.includes("armeabi") || userAgent.includes("armv7") || userAgent.includes("x86") || userAgent.includes("x86_64"))) {
    is64Bit = true;
  }

  if (is64Bit) {
    return NextResponse.redirect(new URL('/apks/7esenTV64.apk', request.url));
  } else {
    return NextResponse.redirect(new URL('/apks/7esenTV.apk', request.url));
  }
} 