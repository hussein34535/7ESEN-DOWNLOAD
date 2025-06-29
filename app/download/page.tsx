'use client';

import { useEffect } from 'react';

export default function DownloadPage() {
  useEffect(() => {
    window.location.href = "/api/get-apk";
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '24px' }}>
      <p>جارٍ تحديد نوع جهازك... برجاء الانتظار لحظة</p>
    </div>
  );
} 