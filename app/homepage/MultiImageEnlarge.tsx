"use client"
import { FC, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image'
import get_image_from_path from 'app/components/actions/helpers';
import MotionComponent from 'app/components/ui/motionComponent';
import HeadingText from 'app/components/ui/HeadingText';
import ButtonComponent from 'app/components/ui/ButtonComponent';
interface MultiImageEnlargeProps {
    images: {
      source: string;
      alt: string
    }[];
    link:string;
    description:string;
}

const MultiImageEnlarge: FC<MultiImageEnlargeProps> = ({images,description,link}) => {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end end"]
  });
  const opacity = useTransform(scrollYProgress, [0.6, 0.9], [0, 1]);
  const width = useTransform(scrollYProgress, [0, 0.6], ["33vw", "100vw"]);
  const height = useTransform(scrollYProgress, [0, 0.6], ["33vh", "100vh"]);

  return (
    <section className="z-0 flex-col flex-start items-center relative flex pt-96 bg-white" ref={scrollRef}>
      <div className='z-[2] max-h-screen min-h-screen object-none flex-none sticky w-full top-0 flex items-center justify-center'>
        <div className="w-1/3 flex-initial overflow-hidden relative flex-[0 auto]">
        {
          images.filter((item,index) => index < 3).map(item => (
            <div key={item.source} className='last:mb-0 mb-4 relative overflow-hidden flex items-center justify-center h-[300px] ease-out-quint duration-300 transition-all'>
              <Image
                src={get_image_from_path(item.source)}
                alt={item.alt}
                className="object-cover"
                fill={true}
                priority
              />
            </div>

          ))
        }
        </div>
        <motion.div transition={{ type: "spring", ease: 'linear', stiffness: 100 }} className='w-1/3 flex-none mx-4 overflow-hidden relative items-center will-change-[width]' style={{ width }}>
        {
          images.filter((item,index) => index >= 3 && index < 6).map((item,index) => (
            <motion.div key={index} transition={{ type: "spring", ease: 'linear', stiffness: 100 }} className={`relative overflow-hidden flex items-center justify-center min-h-[300px] will-change-[width,height] ${index == 1 && 'my-4'}`} style={{ width, height }}>
              <Image
                src={get_image_from_path(item.source)}
                alt={item.alt}
                className="object-cover h-full w-full"
                fill={true}
                priority
              />
              {
                index == 1 &&
                  <motion.div initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ type: "spring", ease: "linear", stiffness: 100, duration: 1.5 }} style={{ opacity }} className='absolute top-0 left-0 w-full h-full text-center text-white'>
                  <div className='w-full h-full relative flex items-center justify-center'>
                    <div className='xl:max-w-7xl lg:max-w-6xl md:max-w-3xl sm:max-w-xl px-8 mx-auto relative z-[1]'>
                      <div className='w-full lg:w-7/12 xl:w-8/12 mx-auto'>
                        <MotionComponent>
                          <HeadingText level={2} classList='text-4xl sm:text-5xl md:text-6xl xl:text-7xl mb-8 text-gray-900 font-bold'>{description}</HeadingText>
                          <ButtonComponent tagType="a" href={link}>See our packages</ButtonComponent>
                        </MotionComponent>
                      </div>
                    </div>
                    <div className='z-0 absolute top-0 left-0 w-full h-full bg-gradient-to-b bg-opacity-10 from-transparent to-green-900' />
                  </div>
                </motion.div>
              }
            </motion.div>
          ))
        }
        </motion.div>
        <div className='w-1/3 flex-initial overflow-hidden relative flex-[0 auto]'>
        {
          images.filter((item,index) => index > 5).map(item => (
            <div key={item.source} className='last:mb-0 mb-4 relative overflow-hidden flex items-center justify-center h-[300px] ease-out-quint duration-300 transition-all'>
              <Image
                src={get_image_from_path(item.source)}
                alt={item.alt}
                className="object-cover"
                fill={true}
                priority
              />
            </div>

          ))
        }
        </div>
      </div>
      <div className='h-[300vh] w-full'></div>
    </section>
  );
}

export default MultiImageEnlarge;