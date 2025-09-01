"use client";

import { useRef, useState } from "react";

export default function Home() {
  const videoRef = useRef(null);
  const [ended, setEnded] = useState(false);

  const handleEnded = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setEnded(true);
  };

  return (
    <div className="relative w-full">
      <nav className="absolute top-0 left-0 w-full  h-16 flex items-center justify-between px-4 bg-background border-b border-dashed border-foreground z-10">
        <div className="text-xs flex items-center justify-between gap-2 uppercase tracking-[3px] font-regular w-full   max-w-[1200px] mx-auto ">
          <button className="flex items-center gap-2 uppercase cursor-pointer text-xs font-syncopate font-regular tracking-[3px]">
            <img src="/unmanned/unmanned-logo.png" alt="Unmanned united" className="w-10 h-10" />
            Unmanned united
          </button>
          <button className="uppercase text-xs font-syncopate font-regular tracking-[3px] cursor-pointer"
            onClick={() => { console.log("This does nothing yet"); }}
          >
            Contact us
          </button>

        </div>
      </nav>
      <video
        ref={videoRef}
        src="/unmanned/start.mp4"
        autoPlay
        muted
        playsInline
        className="w-full h-screen object-cover"
        onEnded={handleEnded}
      />

      {(ended || true) && (
        <div className="absolute bottom-0 left-0 w-full h-16 flex bg-background border-t border-dashed border-foreground z-10">
          <button 
            className="uppercase  px-6 py-3 bg-blue left-1/2 relative -translate-x-1/2 -translate-y-1/2 hover:bg-foreground text-white rounded-xl shadow-lg text-lg font-regular tracking-[3px] font-syncopate" 
            onClick={() => {
            }}>
            Schedule a demo
          </button>
        </div>
      )}
    </div>
  );
}