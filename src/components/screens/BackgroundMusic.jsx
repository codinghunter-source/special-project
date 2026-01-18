"use client";

import { useEffect, useRef, useState } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.4;
    audio.loop = true;
    audio.muted = true; // REQUIRED for mobile autoplay preparation

    const startMusic = async () => {
      try {
        audio.muted = false;   // unmute after user interaction
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        console.log("Music blocked until user interaction");
      }
    };

    // First user interaction (mobile safe)
    window.addEventListener("click", startMusic, { once: true });
    window.addEventListener("touchstart", startMusic, { once: true });

    return () => {
      window.removeEventListener("click", startMusic);
      window.removeEventListener("touchstart", startMusic);
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      src="/music/Dooron1.mp3"
      preload="metadata"
      playsInline   // REQUIRED for iOS Safari
    />
  );
}
