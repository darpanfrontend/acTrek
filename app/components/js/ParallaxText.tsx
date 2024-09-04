"use client"
import React, { FC, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValue, useVelocity, useAnimationFrame, wrap } from 'framer-motion';
import { headingFont } from 'app/fonts';

interface ParallaxTextProps {
  children: string;
  baseVelocity?: number;
}

const ParallaxText: FC<ParallaxTextProps> = ({ children, baseVelocity = 100 }) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  /**
   * This is a magic wrapping for the length of the text - you
   * have to replace for wrapping that works for you or dynamically
   * calculate
   */
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    /**
     * This is what changes the direction of the scroll once we
     * switch scrolling directions.
     */
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden margin-0 whitespace-nowrap flex flex-nowrap tracking-tight leading-3">
      <motion.div className={headingFont.className + ` text-6xl md:text-7xl lg:text-8xl xl:text-9xl flex whitespace-nowrap flex-nowrap uppercase font-bold`} style={{ x }}>
        <span className="block mr-20">{children} </span>
        <span className="block mr-20">{children} </span>
        <span className="block mr-20">{children} </span>
        <span className="block mr-20">{children} </span>
      </motion.div>
    </div>
  );
};

export default ParallaxText;