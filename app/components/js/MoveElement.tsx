"use client"
import { FC, ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface MoveElementProps {
  children: ReactNode;
  className: string;
  movePos?: string;
}

const MoveElement: FC<MoveElementProps> = ({
  children,
  className,
  movePos = "20%",
  ...rest
}) => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end end"],
  });
  const top = useTransform(scrollYProgress, [0, 1], ["0%", movePos]);

  return (
    <div ref={aboutRef} className={className}>
      <motion.div
        className={`w-full h-full relative`}
        transition={{
          ease: "circIn",
          mass: 2,
          stiffness: 120,
          type: "spring",
          duration: 1.5,
        }}
        initial={{ top: movePos }}
        animate={{ top: "0%" }}
        {...rest}
        style={{ top }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default MoveElement;