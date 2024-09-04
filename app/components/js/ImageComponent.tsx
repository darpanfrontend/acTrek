"use client"
import { FC, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';

interface ImageComponentProps {
  className: string;
  src:string;
  alt:string;
  [key: string]: any
}

const ImageComponent: FC<ImageComponentProps> = ({ className, src, alt, ...rest }) => {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start end', 'end end'],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], ['50%', '100%']);
  const scale = useTransform(scrollYProgress, [0, 1], ['120%', '100%']);
  return (
    <motion.div className='relative h-full w-full overflow-hidden' ref={scrollRef}>
      <motion.div
        className='w-full relative h-full transform'
        initial={{ opacity: '50%', scale:'120%' }}
        style={{ opacity, scale }}
        animate={{ opacity: '100%', scale:'100%' }}
        transition={{ ease: 'circInOut', stiffness: 120, duration: 4, type: 'spring' }}
      >
        <div className='h-full w-full relative'>
          <Image
            alt={alt}
            src={src}
            className={`transform origin-center skew-y-0 scale-100 hover:skew-y-2 hover:scale-110 transition-transform duration-300 ease-out-quint ${className}`}
            {...rest}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ImageComponent;