"use client"
import React, { FC, useRef } from 'react';
import { motion, useScroll, useTransform } from "framer-motion";
import { Product } from 'app/api_interfaces/ApiProps';
import YouTube,{YouTubeProps} from 'react-youtube';
import HeadingText from 'app/components/ui/HeadingText';
import ButtonComponent from 'app/components/ui/ButtonComponent';
import { headingFont } from 'app/fonts';

interface TopScrollAnimProps {
  text?: string;
  imageSrc?: string;
  viewport?: string;
  link:string;
  slogan:string;
  productList: boolean;
  product:Product[];
}

const TopScrollAnim: FC<TopScrollAnimProps> = ({ text,imageSrc,viewport,link,slogan}) => {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end end"]
  });
  const videoPos = useTransform(scrollYProgress, [0, 0.9], ["200%", "50%"]);
  const videoRes = useTransform(scrollYProgress, [0, 0.9], ["72rem", "100vw"]);
  const imagePosition = useTransform(scrollYProgress, [0, 1], ["0%", "-150%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [1, 1, 0]);
  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  const opts: YouTubeProps['opts'] = {
    height: '100%',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      controls:0,
    },
  };

  return (
    <section ref={scrollRef} style={{ height: viewport }} className={`text-center relative bg-white`}>
      <div className="h-screen sticky top-0 w-full">
        <div className="overflow-hidden h-full w-full relative">
          <div className='w-full px-8 mx-auto h-full relative'>
            <div className='bg-white opacity-10 h-full w-full absolute left-0 top-0 transform will-change-transform z-[2]' />
            <motion.div style={{ backgroundImage: `url(${imageSrc})`, top: imagePosition, height: viewport }} className='w-full h-full absolute right-0 top-0 z-0 bg-cover' transition={{ stiffness: 120, type: "spring", damping: 20, ease: 'easeInOut', duration: 1.5, delay: 0.5 }} />
            <motion.div transition={{ stiffness: 120, type: "spring", damping: 20, ease: 'easeInOut', duration: 1.5, delay: 0.5 }} initial={{ opacity: 0 }} animate={{ opacity: 1}} style={{ opacity: textOpacity }} className='xl:max-w-7xl lg:max-w-6xl md:max-w-3xl sm:max-w-xl mx-auto w-full h-screen px-8 relative z-[3]'>
              <div className='relative w-full h-full z-0 flex items-center justify-center pb-16'>
                <div className='lg:w-8/12 lg:pr-8 relative'>
                  <div className='text-gray-900'>
                    <span className='block md:text-xl lg:text-2xl'>{slogan}</span>
                    <HeadingText headingText={false} level={1} classList={`${headingFont.className} w-full text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-none font-bold mb-8 will-change-[opacity] uppercase`}>{`<span class='heading-text'>${text}</span>`}</HeadingText>
                    <ButtonComponent href={link} tagType={"a"}>Discover About Us</ButtonComponent>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          <motion.div style={{top:videoPos, width:videoRes}} className='mx-auto w-full h-screen absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[20]'>
            <div className='w-full h-full'>
              <YouTube 
                videoId="QXO2Pyq0TOA" 
                className='w-full h-full'
                iframeClassName='w-full h-full border-0 rounded-b-3xl'
                opts={opts} 
                onReady={onPlayerReady} 
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default TopScrollAnim;