"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, ChevronDown } from "lucide-react"
import Image from "next/image"

export default function DownloadPage() {
  // Default to the most common version
  const [deviceType, setDeviceType] = useState<string>("arm64-v8a")
  const [showOptions, setShowOptions] = useState(false)

  // APK download links - using actual APK files
  const apkLinks = {
    "arm64-v8a": "/app-arm64-v8a-release.apk",
    "armeabi-v7a": "/app-armeabi-v7a-release.apk", // Order changed for display
  }

  const deviceDescriptions = {
    "arm64-v8a": "الأجهزة الحديثة",
    "armeabi-v7a": "الأجهزة القديمة",
  }

  // Get the appropriate download link
  const downloadLink = apkLinks[deviceType as keyof typeof apkLinks]

  const selectVersion = (version: string) => {
    setDeviceType(version)
    setShowOptions(false)
  }

  const handleDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = downloadLink;
    link.download = `waledpro-${deviceType}.apk`; // No need for default now
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto text-center">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <Image src="/logo.png" alt="Waledpro Logo" width={120} height={120} className="mb-2" />
        </div>

        <h1 className="text-3xl font-bold mb-2 text-red-600">Waledpro</h1>
        <p className="text-gray-400 mb-8">قم بتنزيل التطبيق الرسمي لجهازك</p> {/* Updated text */}

        <Card className="bg-gray-900 border-gray-800 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              {/* Simplified version selection */}
              <div className="w-full mb-4">
                <p className="text-sm text-gray-400 mb-3">إصدار التحميل المحدد:</p>
                <div className="relative w-full">
                  <button
                    onClick={() => setShowOptions(!showOptions)}
                    className="flex items-center justify-between w-full p-3 bg-gray-800 rounded-md border border-gray-700 text-left"
                  >
                    <span>
                      {deviceType} ({deviceDescriptions[deviceType as keyof typeof deviceDescriptions]})
                    </span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${showOptions ? 'rotate-180' : ''}`} />
                  </button>

                  {showOptions && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-700 rounded-md overflow-hidden z-10">
                      {Object.entries(apkLinks).map(([arch]) => (
                        <button
                          key={arch}
                          onClick={() => selectVersion(arch)}
                          className="w-full p-3 text-left hover:bg-gray-700 transition-colors"
                        >
                          {arch} ({deviceDescriptions[arch as keyof typeof deviceDescriptions]})
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <a href={downloadLink} onClick={handleDownload}>
                <Button size="lg" className="w-full bg-red-600 hover:bg-red-700 text-white py-6 px-8 text-lg">
                  <Download className="mr-2 h-5 w-5" />
                  تحميل Waledpro
                </Button>
              </a>

              <p className="text-xs text-gray-500 mt-4">Version 1.0.3 • ~12MB</p>
            </div>
          </CardContent>
        </Card>

        <div className="text-xs text-gray-600">© 2024 Waledpro. All rights reserved</div>
      </div>
    </div>
  )
}
