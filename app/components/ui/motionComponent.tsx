"use client"
import { domAnimation, LazyMotion, m, Transition, Variants } from 'framer-motion';
import { FC, ReactNode } from 'react';

interface MotionComponentProps {
  transition?: Transition;
  variants?: "moveUp" | "letterSpacing";
  children: ReactNode;
  className?:string;
  [propName: string]: unknown;
}

const MotionComponent: FC<MotionComponentProps> = ({
  transition = { type: 'spring', duration: 1, delay:0.5 },
  variants = "moveUp",
  className='',
  children,
  ...rest
}) => {
  let variantSet: Variants = (variants === "moveUp") ? {
    visible: { top:'0px', opacity:1},
    hidden: { top:'100px', opacity:0}
  } : {
    visible: { letterSpacing: "0px", skew:'0deg', opacity:1},
    hidden: { letterSpacing: "1px", skew:'1deg', opacity:0}
  };

  return (
    <LazyMotion features={domAnimation}>
      <div className={`${className} overflow-hidden`}>
        <m.div
          initial="hidden"
          whileInView="visible"
          transition={transition}
          variants={variantSet}
          viewport={{ once: true }}
          className={`${className} relative will-change-[top]`}
          {...rest}>{children}</m.div>
      </div>
    </LazyMotion>
  );
};

export default MotionComponent;
