"use client"
import React, { FC, useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { LazyMotion, domAnimation, m, useMotionValueEvent, useScroll } from "framer-motion";
import { headingFont } from '../fonts';
import get_image_from_path from '../components/actions/helpers';
import { Region } from 'app/api_interfaces/ApiProps';
import MenuComponent from './MenuComponent';

interface HeaderData {
    site_info: {
      images: {
        source: string;
        alt: string;
      }[];
    };
    regions: Region[];
    // ... other properties your data might have
  }

interface SiteHeaderProps {
    data: HeaderData;
}

const SiteHeader: FC<SiteHeaderProps> = ({ data }) => {
    const [hoveredImage, setHoveredImage] = useState<string>(get_image_from_path(data.regions[0].featured_image[0].source));
    const [hoveredAlt, setHoveredAlt] = useState<string>(data.regions[0].featured_image[0].alt);
    const [showDest, setDest] = useState<boolean>(false);

    const handleRegionHover = (regionImage: string, regionAlt: string) => {
        setHoveredImage(regionImage);
        setHoveredAlt(regionAlt);
    };
    const showDestination =() => {
        setDest(!showDest);
    }
    const [menu,setMenu] = useState(false);
    const { scrollY } = useScroll()
    function openMenu(){
        setMenu(!menu);
    }
    useEffect(() => {
        // Handle initial loading or data updates here
        // For example, fetch data if needed or set initial hovered region
    }, [data]);

    return (
        <LazyMotion features={domAnimation}>
            <m.header initial={{ top: -80 }} animate={{ top: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className="absolute z-50 top-0 w-full text-gray-900">
                <div className="xl:max-w-8xl lg:max-w-7xl md:max-w-4xl sm:max-w-2xl px-8 mx-auto z-[1] relative">
                    <div className="flex flex-wrap py-8">
                        <div className="w-1/2 relative z-10">
                            <Link href={"/"} className="h-[40px] w-full block">
                                <Image
                                    src={get_image_from_path(data.site_info.images[0].source)}
                                    alt={data.site_info.images[0].alt}
                                    width={140}
                                    height={30}
                                    priority
                                />
                            </Link>
                        </div>
                        <div className={`${headingFont.className } w-1/2 flex justify-end items-center`}>
                            <div className={`mr-4 last:mr-0 dropdown`}>
                                <div className='relative pr-6 z-10' onClick={showDestination}>
                                    Destinations
                                    <span className={`pointer-events-none material-icons-outlined absolute top-1/2 -translate-y-1/2 rotate-0 transition-transform duration-300 ease-in-out-quart ${showDest ? 'rotate-180' : 'rotate-0'}`}>keyboard_arrow_down</span>
                                </div>
                                <div className={`${showDest ? 'opacity-1 pointer-events-auto' : 'opacity-0 pointer-events-none'} absolute top-0 left-1/2 transform -translate-x-1/2 w-screen bg-white border-b pt-28 pb-12 transition-opacity duration-300 ease-out-quint shadow-2xl`}>
                                    <div className='xl:max-w-8xl lg:max-w-7xl md:max-w-4xl sm:max-w-2xl px-8 py-8 mx-auto'>
                                        <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                                            <ul className='w-full font-bold xl:col-span-2'>
                                                {
                                                    data.regions.map(item =>
                                                        <li onClick={showDestination} key={item.slug} className='pb-4 sm:pb-12 last:mb-0 last:border-0 last:pb-0 text-xl sm:text-2xl hover:text-green-900 transition-colors duration-300 ease-in-out-quart' 
                                                        onMouseEnter={() => handleRegionHover(get_image_from_path(item.featured_image[0].source),item.featured_image[0].alt)}
                                                        >
                                                            <Link href={`/regions/${item.slug}`}>{item.title}</Link>
                                                        </li>
                                                    )
                                                }
                                            </ul>
                                            <div className='w-full hidden lg:block border-2 border-green-900 p-2'>
                                                {<div className='h-[350px] relative'>
                                                    <Image
                                                        src={hoveredImage}
                                                        alt={hoveredAlt}
                                                        fill={true}
                                                        className='object-cover'
                                                    />
                                                </div>}
                                            </div>
                                            <div className='w-full pt-8 md:pt-0 md:pl-20'>
                                                <span className='text-xl sm:text-2xl font-bold mb-4 block pb-4 border-b'>Things To Do</span>
                                                <ul>
                                                    <li className='pb-4 last:pb-0 text-xl'>
                                                        <Link href={`/things-to-do/hiking`}>Trekking</Link>
                                                    </li>
                                                    <li className='pb-4 last:pb-0 text-xl'>
                                                        <Link href={`/things-to-do/hiking`}>Travel</Link>
                                                    </li>
                                                    <li className='pb-4 last:pb-0 text-xl'>
                                                        <Link href={`/things-to-do/hiking`}>Tours</Link>
                                                    </li>
                                                    <li className='pb-4 last:pb-0 text-xl'>
                                                        <Link href={`/things-to-do/hiking`}>Expeditions</Link>
                                                    </li>
                                                    <li className='pb-4 last:pb-0 text-xl'>
                                                        <Link href={`/things-to-do/hiking`}>Camping</Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`mr-8 last:mr-0 flex items-center px-2 border border-gray-900 z-10`} onClick={event => openMenu()}>
                                <span className='hidden sm:block mr-1'>Menu</span>
                                <div className="w-[30px] h-[30px] relative py-[5px] flex items-center justify-center flex-wrap">
                                    <div className="bg-gray-900 h-1 w-10/12 rounded-full"></div>
                                    <div className="bg-gray-900 h-1 w-10/12 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bg-gradient-to-t from-transparent to-white absolute top-0 left-0 w-full h-[150px] z-0'/>
                <MenuComponent menu={menu} openMenu={openMenu} />
            </m.header>
        </LazyMotion>
    );
};

export default SiteHeader;