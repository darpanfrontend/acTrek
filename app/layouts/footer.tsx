"use client"
import React, { FC, useRef } from 'react';
import Image from 'next/image';
import HeadingText from '../components/ui/HeadingText';
import { useScroll, motion, useTransform } from 'framer-motion';
import Link from 'next/link';
import SuggestComponent from 'app/homepage/SuggestComponent';
import { Product, Region } from 'app/api_interfaces/ApiProps';

interface FooterData {
  site_info: {
    location:string;
    phone1:string;
    phone2:string;
    info_email:string;
  };
  regions: Region[];
  packages: Product[];
  // ... other properties your data might have
}
interface SiteFooterProps {
  data:FooterData;
}

const SiteFooter: FC<SiteFooterProps> = ({data}) => {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start end', 'end end'],
  });
  const width = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <>
      {<SuggestComponent url={`${process.env.APIURL}/send-email/suggest`}/>}
      <section className="bg-green-900 py-20 border-b-2 border-gray-900">
        <div className="xl:max-w-7xl lg:max-w-6xl md:max-w-3xl sm:max-w-xl px-8 mx-auto">
          <div className="flex flex-wrap">
            <div className="w-full xl:w-7/12 flex xl:space-x-16">
              <div className="hidden w-4/12 xl:flex items-center justify-center">
                <div className="w-[200px] h-[200px] relative p-2">
                  <div className="w-[200px] h-[200px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-1 border-2 border-gray-900 border-dotted" />
                  <div className="w-full h-full relative">
                    <Image
                      src="/images/manoj.jpg"
                      alt="Image of manoj basnet (ceo of trek8586)"
                      className="object-cover rounded-full w-full h-full"
                      fill={true}
                      priority
                    />
                  </div>
                </div>
              </div>
              <div className="w-full xl:w-8/12 xl:flex xl:items-center">
                <div className="relative">
                  <HeadingText level={2} classList={'font-bold text-5xl mb-4'}>
                    Talk to our expert travel researcher
                  </HeadingText>
                  <p className="text-xl font-regular">
                    We always aim to reply within 24 hours.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full xl:w-5/12 xl:flex xl:space-x-8 xl:justify-end mt-8 xl:mt-0">
              <div className="flex items-center justify-center">
                <div className="w-full xl:w-[200px] xl:h-[200px] relative p-2">
                  <div className="hidden animate-spin-slow w-[200px] h-[200px] absolute xl:inline-flex top-0 left-0 rounded-full p-1 border-2 border-gray-900 border-dotted duration-1000" />
                  <div className="w-full h-full bg-gray-900 text-white rounded-full shadow-sm relative flex items-center justify-center animate-zoom transform py-4 xl:py-0">
                    <a href={`tel:${data.site_info.phone1}`} className="text-lg text-center">
                      <span className="font-semibold block">Call us now</span>
                      <span>{data.site_info.phone1}</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-full xl:w-[200px] xl:h-[200px] relative p-2">
                  <div className="hidden w-[200px] h-[200px] absolute xl:inline-flex top-0 left-0 rounded-full p-1 border-2 border-white border-dotted shadow-md" />
                  <div className="w-full h-full bg-white text-blue rounded-full shadow-sm relative flex items-center justify-center py-4 xl:py-0">
                    <a href="#" className="text-lg text-center">
                      <span className="font-semibold block">Mail us now</span>
                      <span>{data.site_info.info_email}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="text-gray-900 pt-20 lg:py-20" ref={scrollRef}>
        <div className="xl:max-w-7xl lg:max-w-6xl md:max-w-3xl sm:max-w-xl px-8 mx-auto">
          <div className="flex flex-wrap justify-between">
            <div className="w-1/2 lg:w-2/12 py-8">
              <div className="pr-8">
                <HeadingText
                  level={2}
                  classList="pb-4 border-b border-gray-100 font-black uppercase text-2xl mb-4"
                >
                  Quick Links
                </HeadingText>
                <ul className="flex flex-wrap ">
                  <li className="mb-2 w-full">
                    <Link className="block" href="/about">
                      About
                    </Link>
                  </li>
                  <li className="mb-2 w-full">
                    <Link className="block" href="/contact">
                      Contact
                    </Link>
                  </li>
                  <li className="mb-2 w-full">
                    <a className="block" href="/press-articles">
                      Press
                    </a>
                  </li>
                  <li className="mb-2 w-full">
                    <a className="block" href="/blogs">
                      Blogs
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-1/2 lg:w-2/12 py-8">
              <div className="pr-8">
                <HeadingText
                  level={2}
                  classList="pb-4 border-b border-gray-100 font-black uppercase text-2xl mb-4"
                >
                  Activities
                </HeadingText>
                <ul className="flex flex-wrap ">
                  <li className='mb-2 w-full'>
                      <Link href={`/things-to-do/hiking`}>Trekking</Link>
                  </li>
                  <li className='mb-2 w-full'>
                      <Link href={`/things-to-do/hiking`}>Travel</Link>
                  </li>
                  <li className='mb-2 w-full'>
                      <Link href={`/things-to-do/hiking`}>Tours</Link>
                  </li>
                  <li className='mb-2 w-full'>
                      <Link href={`/things-to-do/hiking`}>Expeditions</Link>
                  </li>
                  <li className='mb-2 w-full'>
                      <Link href={`/things-to-do/hiking`}>Camping</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full lg:w-2/12 py-8">
              <div className="pr-8">
                <HeadingText
                  level={2}
                  classList="pb-4 border-b border-gray-100 font-black uppercase text-2xl mb-4"
                >
                  Destinations
                </HeadingText>
                <ul className="flex flex-wrap ">
                  {
                    data.regions.map(item => 
                      <li key={item.id} className="mb-2 w-full">
                        <Link className="block" href={`/regions/${item.slug}`}>
                          {item.title}
                        </Link>
                      </li>
                    )
                  }
                </ul>
              </div>
            </div>
            <div className="w-full lg:w-4/12 relative py-8">
              <div className="relative z-[1]">
                <HeadingText
                  level={2}
                  classList="pb-4 border-b border-gray-100 font-black uppercase text-2xl mb-4"
                >
                  Contact us
                </HeadingText>
                <address className="not-italic">
                  <span className="block mb-3 relative">
                    {data.site_info.location}
                  </span>
                  <span className="block mb-3 relative">{data.site_info.phone1} / {data.site_info.phone2}</span>
                  <span className="block relative">{data.site_info.info_email}</span>
                </address>
                <HeadingText
                  level={2}
                  classList="mt-16 lg:mt-8 pb-4 border-b border-gray-100 font-black uppercase text-2xl mb-4"
                >
                  Stay Connected
                </HeadingText>
                <div>
                  <a target='_blank' href="https://www.facebook.com/@trek8586" className="inline-block mr-8 mb-2 ">
                    Facebook
                  </a>
                  <a target='_blank' href="https://www.instagram.com/@trek8586" className="inline-block mr-8 mb-2 ">
                    Instagram
                  </a>
                  <a target='_blank' href="https://www.youtube.com/channel/@trek8586" className="inline-block mr-8 mb-2 ">
                    Youtube
                  </a>
                  <a target='_blank' href="https://www.tiktok.com/@trek8586" className="inline-block mr-8 mb-2 ">
                    Tiktok
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:mt-8 bg-green-900 md:bg-white">
          <div className="xl:max-w-7xl lg:max-w-6xl md:max-w-3xl sm:max-w-xl px-8 mx-auto py-8">
            <div className="grid md:grid-cols-2 gap-x-4 relative md:pt-8">
              <div className="hidden md:block w-full h-[1px] absolute top-0 left-0 bg-gray-100 border-t" />
              <p className="text-center md:text-left">
                2022 | All rights reserved | Trek 8586
              </p>
              <p className="text-center md:text-right">
                <a className="underline mr-8" href="https://fourgradient.com">
                  Privacy Policy
                </a>
                <a className="underline" href="https://fourgradient.com">
                  Terms & Conditions
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default SiteFooter;