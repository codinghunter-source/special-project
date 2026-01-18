"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, MoveRight } from "lucide-react";

const compliments = [
  "Aap bahut achhi lagti ho",
  "Aapki presence positive feel karati hai",
  "Aapse baat karke mann halka feel karta hai",
  "Aapke hone se chhoti baatein bhi khaas lagti hain",
  "Aapki wajah se cheezein aur special lagti hain",
];

function Card({ text }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <motion.div
      tabIndex={0}
      onClick={() => setRevealed(true)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="
        relative px-4 py-3 rounded-2xl
        bg-white/5 border border-pink-500/15
        text-foreground text-sm md:text-base
        shadow-[0_0_20px_rgba(0,0,0,0.25)]
        backdrop-blur-md cursor-pointer
        overflow-hidden will-change-transform
      "
    >
      {/* Heart overlay */}
      {!revealed && (
        <div
          className="
          absolute inset-0
          bg-linear-to-br from-pink-500/10 to-rose-500/10
          backdrop-blur-sm
          flex items-center justify-center
          pointer-events-none
        "
        >
          <Heart className="w-6 h-6 text-pink-300 opacity-80" />
        </div>
      )}

      {/* Text */}
      <motion.p
        className="h-5 md:h-6 text-nowrap overflow-x-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: revealed ? 1 : 0 }}
        transition={{ duration: 0.35 }}
      >
        {text}
      </motion.p>
    </motion.div>
  );
}

export default function ComplimentsScreen({ onNext }) {
  return (
    <motion.div className="flex flex-col items-center justify-center h-full w-full text-center">
      <div className="w-full max-w-xl mx-auto flex flex-col items-center gap-8">
        {/* Center heart */}
        <motion.div
          className="
            w-28 h-28 rounded-full
            bg-linear-to-br from-pink-500/15 to-rose-500/15
            border border-pink-400/30
            shadow-[0_0_40px_rgba(244,114,182,0.25)]
            flex items-center justify-center
            backdrop-blur-md
          "
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <Heart className="w-14 h-14 text-pink-400 fill-pink-400" />
          </motion.div>
        </motion.div>

        {/* Heading */}
        <div>
          <motion.h2
            className="text-4xl md:text-5xl font-dancing-script text-zinc-50 font-semibold leading-tight"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Just for you
          </motion.h2>

          {/* Spacer (keeps layout like DOM) */}
          <p className="invisible -mb-10 min-[449px]:-mb-4">
            Lorem ipsum dolor sit amet.
          </p>

          <p
            className="mt-2 
            text-xs sm:text-sm md:text-base
            text-foreground/75
            leading-relaxed
            ">
            Tap each one to reveal
          </p>
        </div>

        {/* Compliments list */}
        <motion.div className="grid grid-cols-1 gap-4 w-full px-4">
          {compliments.map((line, index) => (
            <Card key={index} text={line} />
          ))}
        </motion.div>

        {/* Button */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <motion.button
            onClick={onNext}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="
              bg-linear-to-r from-pink-500 via-rose-500 to-pink-500
              text-white px-10 py-4 rounded-full
              text-lg font-semibold
              shadow-2xl hover:shadow-pink-500/25
              transition-all flex items-center gap-2
              will-change-transform
            "
          >
            <span>See more</span>
            <MoveRight size={20} className="fill-current" />
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
