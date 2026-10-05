import React from 'react';

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#08080a] text-white">
      {/* Left 2/3rd Title Section */}
      <div className="lg:w-2/3 w-full flex flex-col items-center justify-center p-8 sm:p-14 lg:p-24 border-b lg:border-b-0 lg:border-r border-[#1f2024] bg-[#08080a] relative">
        <div className="max-w-3xl w-full flex flex-col items-center">
          
          <div className="text-center mb-6 text-sm sm:text-base text-gray-400 font-medium tracking-wide">
            Created by <span className="text-gray-200">Rahul Javalagi 241IT059</span>, <span className="text-gray-200">Sagar Hiremath 241IT067</span>, <span className="text-gray-200">Santosh Gouda 241IT070</span>
          </div>

          {/* Overhead Red Line with Downward Fading Glow */}
          <div className="relative mb-8 w-full max-w-xl">
            <div className="w-full h-[2px] bg-[#e50914]"></div>
            <div 
              className="absolute top-[2px] left-0 right-0 h-28 pointer-events-none bg-gradient-to-b from-[#e50914]/25 via-[#e50914]/5 to-transparent"
              aria-hidden="true"
            ></div>
          </div>

          {/* Title */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-none select-none text-center mb-8">
            Algorithm<br />
            Visualizer<br />
            <span className="text-[#e50914]">System</span>
          </h1>

          <div className="text-center text-sm sm:text-base text-gray-400 max-w-2xl mt-4 italic leading-relaxed">
            In the guidance of <span className="text-gray-200 font-medium not-italic">Professor Jaidhar C D</span>,<br />
            Department of Information Technology,<br />
            National Institute of Technology Karnataka, Surathkal
          </div>
        </div>

        <div className="absolute bottom-6 left-0 right-0 text-center text-xs text-gray-600">
          &copy; {new Date().getFullYear()} Algorithm Visualizer System. All rights reserved.
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