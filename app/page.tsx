"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, ChevronDown } from "lucide-react"
import Image from "next/image"

export default function DownloadPage() {
  const [deviceType, setDeviceType] = useState<string | null>(null)
  const [detectionFailed, setDetectionFailed] = useState(false)
  const [showOptions, setShowOptions] = useState(false)

  // APK download links - using actual APK files
  const apkLinks = {
    "armeabi-v7a": "/app-armeabi-v7a-release.apk",
    "arm64-v8a": "/app-arm64-v8a-release.apk",
  }

  const deviceDescriptions = {
    "armeabi-v7a": "الأجهزة القديمة",
    "arm64-v8a": "الأجهزة الحديثة",
  }

  useEffect(() => {
    // Simple device detection
    const userAgent = navigator.userAgent.toLowerCase()

    if (userAgent.includes("arm64") || userAgent.includes("aarch64")) {
      setDeviceType("arm64-v8a")
      setDetectionFailed(false)
    } else if (userAgent.includes("armeabi") || userAgent.includes("arm")) {
      setDeviceType("armeabi-v7a")
      setDetectionFailed(false)
    } else if (userAgent.includes("x86_64") || userAgent.includes("x64")) {
      setDeviceType("x86_64")
      setDetectionFailed(false)
    } else {
      // Detection failed, default to arm64-v8a but show options
      setDeviceType("arm64-v8a")
      setDetectionFailed(true)
    }
  }, [])

  // Get the appropriate download link
  const downloadLink = deviceType ? apkLinks[deviceType as keyof typeof apkLinks] : apkLinks["arm64-v8a"]

  const selectVersion = (version: string) => {
    setDeviceType(version)
    setShowOptions(false)
  }

  const handleDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = downloadLink;
    link.download = `waledpro-${deviceType}.apk`;
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
        <p className="text-gray-400 mb-8">Download the official app for your device</p>

        <Card className="bg-gray-900 border-gray-800 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              {detectionFailed ? (
                <div className="w-full mb-4">
                  <p className="text-sm text-gray-400 mb-3">We couldn't detect your device type. Please select:</p>

                  <div className="relative w-full">
                    <button
                      onClick={() => setShowOptions(!showOptions)}
                      className="flex items-center justify-between w-full p-3 bg-gray-800 rounded-md border border-gray-700 text-left"
                    >
                      <span>
                        {deviceType} ({deviceDescriptions[deviceType as keyof typeof deviceDescriptions]})
                      </span>
                      <ChevronDown className="h-4 w-4" />
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
              ) : (
                <p className="text-sm text-gray-400 mb-4">
                  Recommended version: <span className="text-white font-medium">{deviceType}</span>
                </p>
              )}

              <a href={downloadLink} onClick={handleDownload}>
                <Button size="lg" className="w-full bg-red-600 hover:bg-red-700 text-white py-6 px-8 text-lg">
                  <Download className="mr-2 h-5 w-5" />
                  Download Waledpro
                </Button>
              </a>

              {!detectionFailed && (
                <button onClick={() => setDetectionFailed(true)} className="text-xs text-white hover:text-gray-300 underline mt-2">
                  ليست النسخة الصحيحة؟ اختر يدويًا
                </button>
              )}

              <p className="text-xs text-gray-500 mt-4">Version 1.0.3 • 10MB</p>
            </div>
          </CardContent>
        </Card>

        <div className="text-xs text-gray-600">© 2024 Waledpro. All rights reserved</div>
      </div>
    </div>
  )
}
