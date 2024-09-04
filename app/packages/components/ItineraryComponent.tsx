"use client"
import React, { FC, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import HeadingText from '../../components/ui/HeadingText';
import ImageComponent from '../../components/js/ImageComponent';
import { ItinerariesProps } from 'app/api_interfaces/ApiProps';
import get_image_from_path from 'app/components/actions/helpers';

interface ItineraryComponentProps {
  left:boolean;
  data:ItinerariesProps;
  length:number;
  indexPos:number;
}

const ItineraryComponent: FC<ItineraryComponentProps> = ({ left=true,data,length,indexPos }) => {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end end"]
  });
  const height = useTransform(scrollYProgress, [0.5, 1], ["0%", "100%"]);
  const top = useTransform(scrollYProgress, [0.5, 1], ["0%", "100%"]);
  console.log(left)
  return (
    <div ref={scrollRef} className={`${left ? 'bg-green-900' : 'bg-white'} relative`}>
        <div className="xl:max-w-7xl lg:max-w-6xl md:max-w-3xl sm:max-w-xl px-8 mx-auto">
            <div className='w-full relative py-40'>

                {
                    (indexPos == length || indexPos == 0) &&
                    <div className={`${indexPos == length ? "-bottom-20" : "-top-20"} absolute left-1/2 -translate-x-1/2 transform z-[1] w-40 h-40 bg-green-100 rounded-full items-center justify-center flex`}>
                        <div className='relative h-[calc(100%-1rem)] w-[calc(100%-1rem)] flex items-center justify-center '>
                            <span className='h-full w-full block border border-gray-900 rounded-full border-dashed animate-spin-slow duration-1000 absolute z-[1]'/>
                            <span className='px-4 py-2 uppercase text-xl font-bold text-center'>{indexPos == length ? "Trip Ends" : "Trip Starts"}</span>
                        </div>
                    </div>
                }
                <motion.div style={{top}} className='absolute left-1/2 -translate-x-1/2 transform z-[0] w-3 h-3 bg-green-300 lg:flex items-center justify-center rounded-full hidden'/>
                {/* animate component */}
                <div className='left-1/2 transform -translate-x-1/2 border border-dashed border-gray-100 absolute top-0 h-full w-[1px] hidden lg:block'/>
                <motion.div style={{height}} className={`border-green-300 left-1/2 transform -translate-x-1/2 border absolute top-0 w-[1px] hidden lg:block`}/>

                <div className='grid grid-cols-1 gap-20'>
                    <div className={`relative grid lg:grid-cols-2 gap-8`}>
                        <div className={ `${left ? 'lg:order-1 lg:pr-20' : 'lg:order-2 lg:pl-20'} w-full`}>
                            <span className='italic text-xl'>Days 1-3</span>
                            <HeadingText level={2} classList={"text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold pb-6"}>{data.heading}</HeadingText>
                        </div>
                        <div className={`${left ? 'lg:order-2 lg:pl-20' : 'lg:order-1 lg:pr-20'} w-full`}>
                            <p className='text-xl'>{data.description}</p>
                            <ul className='flex mt-8 border-t border-gray-100 pt-8 border-dashed'>
                                <li className='w-1/2'>
                                    <span>Accomodation:</span> <span className='font-bold'>{data.accomodation}</span>
                                </li>
                                <li className='w-1/2'>
                                    <span>Transport:</span> <span className='font-bold'>{data.transportation}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={`text-xl`}>
                        <div className="w-full h-full min-h-[500px] relative mx-auto">
                            <Image
                            src={get_image_from_path(data.images[0].source)}
                            alt={data.images[0].alt}
                            style={{ objectFit: "cover" }}
                            fill={true}
                            priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default ItineraryComponent;