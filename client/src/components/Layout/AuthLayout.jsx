import React from 'react';

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#08080a] text-white">
      {/* Left 2/3rd Title Section */}
      <div className="lg:w-2/3 w-full flex items-center justify-center p-8 sm:p-14 lg:p-24 border-b lg:border-b-0 lg:border-r border-[#1f2024] bg-[#08080a]">
        <div className="max-w-xl w-full">
          {/* Overhead Red Line with Downward Fading Glow */}
          <div className="relative mb-8">
            <div className="w-full h-[2px] bg-[#e50914]"></div>
            <div 
              className="absolute top-[2px] left-0 right-0 h-28 pointer-events-none bg-gradient-to-b from-[#e50914]/25 via-[#e50914]/5 to-transparent"
              aria-hidden="true"
            ></div>
          </div>

          {/* Title */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-none select-none text-center">
            Algorithm<br />
            Visualizer<br />
            <span className="text-[#e50914]">System</span>
          </h1>
        </div>
      </div>

      {/* Right 1/3rd Authentication Section */}
      <div className="lg:w-1/3 w-full flex items-center justify-center p-8 sm:p-12 lg:p-16 bg-[#111113]">
        <div className="w-full max-w-sm">
          {children}
        </div>
      </div>
    </div>
  );
}