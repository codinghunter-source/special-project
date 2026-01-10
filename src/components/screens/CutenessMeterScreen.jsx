"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

export default function CutenessMeterScreen({ onNext }) {
  const target = 120;

  const progress = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const controls = animate(progress, target, {
      duration: 2.5,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplayValue(Math.round(latest));
      },
      onComplete: () => {
        setFinished(true);

        setTimeout(() => {
          onNext();
        }, 4000);
      },
    });

    return () => controls.stop();
  }, [onNext, progress]);

  return (
    <motion.div
      className="flex items-center justify-center h-full w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* 🔥 BLINKING BOX */}
      <motion.div
        className="
          w-full max-w-[420px]
          max-[364px]:h-[250px]
          rounded-3xl p-6 relative overflow-hidden
          bg-[#12060b]/80 backdrop-blur-md
          border border-pink-500/40
          shadow-2xl shadow-pink-500/20
        "
        animate={{
          boxShadow: finished
            ? [
                "0 0 20px rgba(236,72,153,0.4)",
                "0 0 45px rgba(236,72,153,0.9)",
                "0 0 20px rgba(236,72,153,0.4)",
              ]
            : [
                "0 0 12px rgba(236,72,153,0.25)",
                "0 0 26px rgba(236,72,153,0.5)",
                "0 0 12px rgba(236,72,153,0.25)",
              ],
          scale: finished ? [1, 1.03, 1] : [1, 1.02, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: finished ? 0.9 : 1.6,
          ease: "easeInOut",
        }}
      >
        {/* Title */}
        {/* Percentage */}
        <div className="flex flex-col items-center justify-center text-center mb-6">
          <div className="text-sm md:text-base text-foreground/80 mb-1">
            Measuring your cuteness...
          </div>

          <div className="text-4xl md:text-5xl font-bold text-pink-400">
            {displayValue}%
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-6 w-full bg-black/40 rounded-full overflow-hidden relative border border-pink-500/20">
          <motion.div
            className="h-full bg-linear-to-r from-pink-500 via-rose-500 to-pink-500"
            style={{
              width: `${Math.min(displayValue, 100)}%`,
            }}
          />
          <div
            className="absolute top-0 left-0 h-full bg-white/40"
            style={{ width: "20%" }}
          />
        </div>

        {/* Spacer */}
        <p className="invisible">
          Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.
        </p>

        {/* Status text */}
        {!finished ? (
          <div className="text-pink-400 text-center font-medium mt-2">
            Calculating cuteness...
          </div>
        ) : (
          <motion.div
            className="-mt-5 md:text-lg font-semibold text-pink-400 text-center w-full"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ repeat: Infinity, duration: 3.0 }}
          >
            ⚠️ WARNING: TOO CUTE TO HANDLE
          </motion.div>
        )}

        {/* Border glow */}
        <div className="absolute inset-0 rounded-3xl border-2 border-pink-500/60 pointer-events-none" />
      </motion.div>
    </motion.div>
  );
}
