"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download } from "lucide-react"
import Image from "next/image"

export default function DownloadPage() {
  // Single download link
  const downloadLink = "/7esenTV.apk"
  const downloadFilename = "7esenTV.apk"

  const handleDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = downloadLink;
    link.download = downloadFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto text-center">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <Image src="/logo.png" alt="7eSen TV Logo" width={120} height={120} className="mb-2" />
        </div>

        <h1 className="text-3xl font-bold mb-2 text-red-600">7eSen TV</h1>
        <p className="text-gray-400 mb-8">قم بتنزيل التطبيق الرسمي لجهازك</p>

        <Card className="bg-gray-900 border-gray-800 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              {/* Removed version selection UI */}
              {/* <p className="text-sm text-gray-400 mb-4">انقر أدناه لبدء التحميل</p> REMOVED THIS LINE */}

              <a href={downloadLink} onClick={handleDownload}>
                <Button size="lg" className="w-full bg-red-600 hover:bg-red-700 text-white py-6 px-8 text-lg">
                  <Download className="mr-2 h-5 w-5" />
                  تحميل 7eSen TV
                </Button>
              </a>

              <p className="text-xs text-gray-500 mt-4">Version 1.0.3 • ~12MB</p> {/* You might want to update the size if waledpro.apk is different */}
            </div>
          </CardContent>
        </Card>

        <div className="text-xs text-gray-600">© 2024 7eSen TV. All rights reserved</div>
      </div>
    </div>
  )
}
