"use client";

import { useState, useRef, useEffect } from "react";
import { getImageUrl } from "@/lib/utils";

export default function VideoPlayer({ src, className = "", volume = 0.2 }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
      videoRef.current.muted = true; // Asegurar que esté silenciado para autoplay
      
      // Intentar reproducir automáticamente
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setIsPlaying(true);
        }).catch((error) => {
          console.log("Autoplay falló:", error);
          setIsPlaying(false);
        });
      }
    }
  }, [volume]);

  return (
    <div className={`relative w-full ${className}`}>
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted={isMuted}
        playsInline
        loop
        className="w-full h-fit bg-black object-contain relative"
        style={{ zIndex: 1000 }}
        onClick={togglePlayPause}
      />
      
      {/* Overlay de controles */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Botón de play/pause central */}
        {!isPlaying && (
          <button
            onClick={togglePlayPause}
            className="pointer-events-auto bg-black bg-opacity-50 rounded-full p-4 hover:bg-opacity-70 transition-all duration-200"
          >
            <img
              src={getImageUrl("/controls/play.png")}
              alt="Play"
              className="md:h-18 h-10 relative"
              style={{ zIndex: 1200 }}
            />
          </button>
        )}
      </div>

      {/* Controles en la esquina inferior derecha */}
      <div className="absolute bottom-4 right-4 flex gap-2 pointer-events-none">
        {/* Botón de mute/unmute */}
        <button
          onClick={toggleMute}
          className="pointer-events-auto bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-all duration-200"
        >
          <img
            src={getImageUrl(isMuted ? "/controls/unmute.png" : "/controls/mute.png")}
            alt={isMuted ? "Unmute" : "Mute"}
            className="md:h-18 h-10 relative"
            style={{ zIndex: 1200 }}
          />
        </button>
      </div>
    </div>
  );
}
