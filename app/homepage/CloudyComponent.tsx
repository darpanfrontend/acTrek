"use client"
import React, { FC, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from "framer-motion";
import { Review } from 'app/api_interfaces/ApiProps';
import { Swiper, SwiperSlide } from 'swiper/react';
import ReviewComponent from './ReviewComponent';
interface CloudyComponentProps {
    reviews:Review[]
}
const CloudyComponent: FC<CloudyComponentProps> = ({reviews}) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: scrollRef,
        offset: ["start end", "end end"]
    });
    const left = useTransform(scrollYProgress, [0, 1], ["50%", "0%"]);
    return (
        <section ref={scrollRef}>
            <div className='flex flex-wrap justify-center items-center relative overflow-hidden'>
                <div className='h-[300px] bg-gradient-to-b from-transparent to-white absolute bottom-0 left-0 w-full' />
                <motion.div className='w-[4000px] h-[350px] absolute bottom-0 left-1/2 transform -translate-x-1/2' transition={{ stiffness: 0, type: "tween", damping: 20, ease: 'easeInOut', duration: 1.5 }} style={{ left }} >
                    <div className='relative w-full h-full'>
                        <Image
                            src="/images/cloud-part2.png"
                            alt="Slider Image"
                            className="w-full"
                            width="1376"
                            height="500"
                            priority
                        />
                    </div>
                </motion.div>
                <motion.div className='w-[4000px] h-[350px] absolute bottom-[400px] left-1/2 transform -rotate-180 -translate-x-1/2' transition={{ stiffness: 0, type: "tween", damping: 20, ease: 'easeInOut', duration: 1.5 }} style={{ left }} >
                    <div className='relative w-full h-full'>
                        <Image
                            src="/images/cloud-part2.png"
                            alt="Slider Image"
                            className="w-full"
                            width="1376"
                            height="500"
                            priority
                        />
                    </div>
                </motion.div>
                <Swiper
                    autoplay={true}
                    slidesPerView={1}
                    spaceBetween={32}
                    rewind={true}
                    className="w-full">
                    {
                      reviews.map(item => 
                        <SwiperSlide key={item.title}>
                            <ReviewComponent review={item}/>
                        </SwiperSlide>
                      )
                    }
                </Swiper>
                <div className='w-full'>
                    <Image
                        src="/images/bg.png"
                        alt="Slider Image"
                        className="w-full"
                        width="1376"
                        height="500"
                        priority
                    />
                </div>
            </div>
        </section>

    );
}

export default CloudyComponent;