import React from 'react';

export default function AuthLayout({ children }) {
  return (
    <div 
      className="glass relative min-h-screen w-full flex flex-col lg:flex-row text-white overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #1a1030 0%, #12142b 45%, #0b1224 100%)',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');
        .glass * { font-family: 'Inter', sans-serif; }
        .display { font-family: 'Space Grotesk', sans-serif; }

        .orb { position: absolute; border-radius: 9999px; filter: blur(70px); pointer-events: none; z-index: 0; }
        @keyframes drift1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(40px,-30px); } }
        @keyframes drift2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-50px,25px); } }
        @keyframes drift3 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(25px,40px); } }

        .pane {
          background: rgba(255,255,255,0.055);
          border: 1px solid rgba(255,255,255,0.12);
          backdrop-filter: blur(22px);
          -webkit-backdrop-filter: blur(22px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.08);
        }
      `}</style>

      {/* ambient gradient orbs */}
      <div className="orb" style={{ width: 420, height: 420, top: -140, left: -120, background: '#7C3AED', opacity: 0.35, animation: 'drift1 16s ease-in-out infinite' }} />
      <div className="orb" style={{ width: 380, height: 380, top: 120, right: '30%', background: '#0EA5E9', opacity: 0.3, animation: 'drift2 19s ease-in-out infinite' }} />
      <div className="orb" style={{ width: 320, height: 320, bottom: -120, right: -120, background: '#EC4899', opacity: 0.22, animation: 'drift3 21s ease-in-out infinite' }} />

      {/* Left 2/3rd Title Section */}
      <div className="lg:w-2/3 w-full flex flex-col items-center justify-center p-8 sm:p-14 lg:p-24 relative z-10 border-b lg:border-b-0 lg:border-r border-white/10">
        <div className="max-w-3xl w-full flex flex-col items-center animate-slide-up">
          
          <div className="text-center mb-6 text-sm sm:text-base font-medium tracking-wide" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Created by <span className="text-gray-200">Rahul Javalagi 241IT059</span>, <span className="text-gray-200">Sagar Hiremath 241IT067</span>, <span className="text-gray-200">Santosh Gouda 241IT070 for Software Engineering(IT303) Course</span>
          </div>

          {/* Overhead Line with Downward Fading Glow */}
          <div className="relative mb-8 w-full max-w-xl">
            <div className="w-full h-[2px] bg-[#A78BFA]"></div>
            <div 
              className="absolute top-[2px] left-0 right-0 h-28 pointer-events-none bg-gradient-to-b from-[#A78BFA]/25 via-[#A78BFA]/5 to-transparent"
              aria-hidden="true"
            ></div>
          </div>

          {/* Title */}
          <h1 className="display text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-none select-none text-center mb-8">
            Algorithm<br />
            Visualizer<br />
            <span style={{ 
              background: 'linear-gradient(90deg, #A78BFA, #7DD3FC 55%, #5EEAD4)', 
              WebkitBackgroundClip: 'text', 
              backgroundClip: 'text', 
              color: 'transparent' 
            }}>System</span>
          </h1>

          <div className="text-center text-sm sm:text-base max-w-2xl mt-4 italic leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
            In the guidance of <span className="text-gray-200 font-medium not-italic">Professor Jaidhar C D</span>,<br />
            Department of Information Technology,<br />
            National Institute of Technology Karnataka, Surathkal
          </div>
        </div>

        <div className="absolute bottom-6 left-0 right-0 text-center text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
          &copy; {new Date().getFullYear()} Algorithm Visualizer System. All rights reserved.
        </div>
      </div>

      {/* Right 1/3rd Authentication Section */}
      <div className="lg:w-1/3 w-full flex items-center justify-center p-8 sm:p-12 lg:p-16 relative z-10">
        <div className="w-full max-w-sm pane rounded-3xl p-8 animate-pop-in">
          {children}
        </div>
      </div>
    </div>
  );
}
