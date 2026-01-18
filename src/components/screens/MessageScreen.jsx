"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MoveRight } from "lucide-react";

const message = `
I just wanted to tell you something... you really are special in a way that’s hard to explain.  
There’s a softness in the way you talk, a sweetness in the way you smile, and something genuine about you that just feels good to be around.  
You don’t try to be anything extra, you’re just you, and that’s what makes you so lovely.
`;

export default function MessageScreen({ onNext }) {
  const [opened, setOpened] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const scrollRef = useRef(null);

  /* 🖋 Typewriter effect */
  useEffect(() => {
  if (!opened) return;

  let index = 0;
  let cancelled = false;

  const type = () => {
    if (cancelled) return;

    if (index < message.length) {
      setCurrentText(message.slice(0, index + 1));
      index++;
      setTimeout(type, 35); // typing speed
    }
  };

  type();

  return () => {
    cancelled = true;
  };
}, [opened]);



  return (
    <div className="flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Title */}
      <motion.h2
        className="text-4xl md:text-5xl font-dancing-script text-zinc-50 font-semibold leading-tight mb-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        A little note for you
      </motion.h2>

      {/* Spacer (layout stability) */}
      <p className="invisible -mt-10 min-[481px]:-mt-4">Lorem ipsum</p>

      <div className="relative w-full h-full flex justify-center">
        <AnimatePresence mode="wait">
          {/* ================= ENVELOPE ================= */}
          {!opened && (
            <motion.div
              key="envelope"
              tabIndex={0}
              onClick={() => {
                setOpened(true);
                setCurrentText("");
                setShowCursor(true);
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative cursor-pointer"
            >
              <div className="w-80 h-52 rounded-2xl shadow-2xl border-2 border-pink-300/90 relative overflow-hidden">
                {/* Top flap */}
                <div className="absolute top-0 left-0 w-full h-26 bg-linear-to-br from-pink-300 to-rose-400" />

                {/* Bottom */}
                <div className="absolute bottom-0 left-0 w-full h-40 bg-linear-to-br from-pink-200 to-rose-300" />

                {/* Corner hearts */}
                <div className="absolute top-3 right-4">
                  <Heart className="w-6 h-6 text-pink-500 fill-current" />
                </div>
                <div className="absolute top-3 left-4">
                  <Heart className="w-6 h-6 text-pink-500 fill-current" />
                </div>

                {/* 🎀 Center ribbon */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="ribbon"></div>
                </div>

                {/* 💗 Dynamic heart + tap */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
                  <motion.div
                    animate={{ scale: [1, 1.5, 0.5], opacity: [0.6, 1, 0.6] }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                    className="flex flex-col items-center gap-1"
                  >
                    <span className="text-pink-500/80 text-sm font-semibold">
                      Tap to open
                    </span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ================= MESSAGE ================= */}
          {opened && (
            <motion.div
              key="note"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="
                w-full max-w-lg sm:min-w-lg
                rounded-2xl bg-linear-to-br from-pink-200 to-rose-300
                border border-pink-500/20 p-8 relative
              "
            >
              {/* 💓 Heart above message */}
              <div className="text-center mb-6">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], rotate: [-3, 3, -3] }}
                  transition={{ repeat: Infinity, duration: 1.4 }}
                  className="inline-block"
                >
                  <Heart className="w-12 h-12 text-pink-500 fill-pink-500" />
                </motion.div>
              </div>

              {/* 🖋 Dynamic message */}
              <div
                ref={scrollRef}
                className="min-h-66 max-h-66 sm:min-h-56 overflow-y-auto leading-relaxed"
              >
                <p className="whitespace-pre-wrap text-zinc-900">
                  {currentText}
                  {showCursor && <span className="opacity-70">|</span>}
                </p>
              </div>

              {/* Button */}
              <div className="text-center mt-6">
                <motion.button
                  onClick={onNext}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="
                    bg-linear-to-r from-pink-500 via-rose-500 to-pink-500
                    text-white px-8 py-3 rounded-full font-medium
                    shadow-2xl hover:shadow-pink-500/25
                    transition-all flex items-center gap-2 mx-auto
                  "
                >
                  <span>One more thing</span>
                  <MoveRight size={18} className="fill-current" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
