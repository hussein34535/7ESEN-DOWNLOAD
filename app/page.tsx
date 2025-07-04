"use client"

import { Button } from "@/components/ui/button"
import { Download, CheckCircle } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { UpdateDialog } from "@/components/UpdateDialog"

interface Star {
  id: number;
  top: string;
  left: string;
  size: number;
  opacity: number;
  twinkleDuration: number;
  twinkleDelay: number;
  driftDuration: number;
  driftDelay: number;
}

export default function SimpleDownloadPage() {
  const downloadFilename = "7esenTV.apk"
  const [isMounted, setIsMounted] = useState(false);
  const [generatedStars, setGeneratedStars] = useState<Star[]>([]); // State for stars

  const updatesList = [
    "إضافة اختيار الجودة في المباريات المعادة والملخصات",
    "إضافة خاصية تعديل ألوان التطبيق حسب اختيارك",
    "تعديل الأخطاء وتحسين الأداء",
    "إزالة الباسورد",
    "إضافة قنوات جديدة",
    "تعديلات جميع روابط القنوات",
  ];

  useEffect(() => {
    setIsMounted(true);

    // Generate stars only on the client after mount
    const starsArray = Array.from({ length: 50 }, (_, i): Star => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 1.5 + 0.5, // 0.5px to 2px
      opacity: Math.random() * 0.6 + 0.4, // 0.4 to 1.0 base opacity
      twinkleDuration: Math.random() * 5 + 5, // 5-10s twinkle cycle
      twinkleDelay: Math.random() * 5, // Randomize twinkle start
      driftDuration: Math.random() * 30 + 20, // Faster drift: 20-50s cycle
      driftDelay: Math.random() * 20, // Randomize drift start (shorter delay range)
    }));
    setGeneratedStars(starsArray); // Update state

  }, []); // Empty dependency array ensures this runs only once on the client

  const handleDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // No need to prevent default or manually create link, API route handles redirection
  };

  return (
    <div className="min-h-screen bg-black overflow-hidden relative text-white flex flex-col items-center justify-center p-4 sm:p-6">
      {/* Dramatic Space Background - Darker & Moving */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtler Nebula Clouds */}
        <div className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%] opacity-20 mix-blend-screen">
          <div className="absolute inset-0 bg-gradient-radial from-red-800/30 via-transparent to-transparent blur-[150px]"></div>
        </div>
        <div className="absolute -bottom-1/3 -right-1/3 w-[120%] h-[120%] opacity-30 mix-blend-screen">
          <div className="absolute inset-0 bg-gradient-radial from-purple-900/20 via-transparent to-transparent blur-[130px]"></div>
        </div>
         <div className="absolute top-10 left-1/2 w-[80%] h-[80%] opacity-15 mix-blend-color-dodge">
          <div className="absolute inset-0 bg-gradient-radial from-cyan-800/15 via-transparent to-transparent blur-[100px] animate-slow-drift"></div>
        </div>

        {/* Twinkling & Drifting Stars (Rendered from state) */}
        {generatedStars.map((star: Star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationName: 'twinkle, starDrift',
              animationDuration: `${star.twinkleDuration}s, ${star.driftDuration}s`,
              animationDelay: `${star.twinkleDelay}s, ${star.driftDelay}s`,
              animationTimingFunction: 'linear, linear',
              animationIterationCount: 'infinite, infinite',
            }}
          ></div>
        ))}
      </div>
      
      {/* Removed perspective div */}

      {/* Content Container (remains the same) */}
      <div className="relative z-10 w-full max-w-md text-center px-2 sm:px-0">
        {/* Logo */}
        <div 
          className={`mb-8 sm:mb-10 flex justify-center transition-all duration-1000 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="relative p-1 bg-gradient-to-b from-gray-800 to-black rounded-3xl border border-gray-800 shadow-xl transition-all duration-300 hover:shadow-red-900/20 hover:scale-105 cursor-pointer">
            <Image 
              src="/logo.png" 
              alt="7eSen TV Logo" 
              width={110} 
              height={110} 
              className="rounded-2xl overflow-hidden"
              style={{ objectFit: 'contain' }}
              sizes="(max-width: 640px) 110px, 130px"
            />
          </div>
        </div>

        {/* App Name */}
        <h1 
          className={`text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-red-500 tracking-tight transition-all duration-1000 delay-300 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          7eSen TV
        </h1>

        {/* Description */}
        <p 
          className={`text-base sm:text-lg text-gray-200 mb-4 sm:mb-6 leading-relaxed max-w-xs sm:max-w-sm mx-auto transition-all duration-1000 delay-500 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          تطبيقك الأمثل لمشاهدة القنوات العربية والرياضية ومباريات كرة القدم مباشرة ومعادة.
        </p>

        {/* SEO Enhancement Text (Visually Hidden) */}
        <p 
          className={`sr-only`}
        >
          قم بتنزيل 7esen TV (المعروف أيضًا باسم حسين تيفي أو 7esentv) واستمتع بأفضل تجربة مشاهدة. التطبيق مجاني وسهل الاستخدام ومتوافق مع Android.
        </p>

        {/* Download Button */}
        <div
          className={`w-full mb-5 sm:mb-6 transition-all duration-1000 delay-700 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <a href="/api/get-apk" className="block w-full">
            <div className="relative">
              <span className="absolute -inset-2 rounded-[22px] bg-red-500/30 blur-md animate-pulse opacity-85"></span>
              <Button 
                size="lg" 
                className="relative w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold py-4 sm:py-5 px-4 sm:px-6 text-base sm:text-lg rounded-[22px] shadow-lg transition-all duration-300 hover:shadow-red-500/30 hover:translate-y-[-2px]"
              >
                <Download className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                <span>تحميل التطبيق <span className="text-xs font-light opacity-70 mr-1">(احدث نسخه)</span></span>
              </Button>
            </div>
          </a>
        </div>
        
        {/* Compatibility Note */}
        <div 
          className={`flex items-center justify-center gap-1.5 text-xs sm:text-sm text-gray-300 mb-4 transition-all duration-1000 delay-900 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
           <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500" />
           <span>متوافق مع أجهزة Android</span>
        </div>
      </div>

      {/* Footer */}
      <div 
        className={`absolute bottom-0 left-0 w-full py-2 sm:py-3 px-4 bg-black/70 backdrop-blur-sm border-t border-gray-900 transition-all duration-1000 delay-1100 z-10 ${isMounted ? 'opacity-100' : 'opacity-0'}`}
      >
        <p className="text-[10px] sm:text-xs text-center text-gray-500">
           © 2025 7eSen TV
        </p>
      </div>

      <UpdateDialog updates={updatesList} />
    </div>
  )
}
