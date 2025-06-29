'use client';

import { useEffect } from 'react';

export default function DownloadPage() {
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const is64Bit = userAgent.includes("arm64") || userAgent.includes("aarch64") || userAgent.includes("armv8");

    if (is64Bit) {
      window.location.href = "/apks/7esenTV64.apk";
    } else {
      window.location.href = "/apks/7esenTV.apk";
    }
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '24px' }}>
      <p>جارٍ تحديد نوع جهازك... برجاء الانتظار لحظة</p>
    </div>
  );
} 