"use client"
import React, { FC, useCallback, useRef } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import PackageComponent from '../components/js/PackageComponent';
import HeadingText from '../components/ui/HeadingText';
import ButtonComponent from '../components/ui/ButtonComponent';
import { SwiperRef } from 'swiper/react';
import { Product } from 'app/api_interfaces/ApiProps';
import get_image_from_path, { splitContent } from '../components/actions/helpers';

interface SwiperProps {
  classList?: string;
  heading:string;
  description:string;
  slogan?:string;
  link?:string;
  products:Product[]
}

const SwiperComponent: FC<SwiperProps> = ({ classList = "bg-white", heading, description, slogan, products }) => {
  const sliderRef = useRef<SwiperRef | null>(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  return (
    <>
      <section className={`py-40 ${classList}`}>
        <div className='xl:max-w-7xl lg:max-w-6xl md:max-w-3xl sm:max-w-xl px-8 mx-auto w-full relative pb-16 lg:pb-0 flex items-center justify-center'>
          <div className="flex w-full flex-wrap">
            <div className='w-full lg:w-1/2 xl:w-5/12'>
              <div className="w-full lg:relative h-full flex items-first lg:pr-20">
                <div className='absolute bottom-0 w-full'>
                  <div className="prev-arrow inline-block mr-4" onClick={handlePrev}>
                    Prev
                  </div>
                  <span className='inline-block w-1/2 h-0.5 relative -top-1 bg-gray-900' />
                  <div className="next-arrow inline-block ml-4" onClick={handleNext}>
                    Next
                  </div>
                </div>
                <div className='text-left'>
                  <span>{slogan}</span>
                  <HeadingText level={2} classList={"text-5xl font-bold pt-4 pb-6"}>
                    {`<span>${heading}</span> Packages`}
                  </HeadingText>
                  <p>{description}</p>
                </div>
              </div>
            </div>
            <div className='w-full lg:w-1/2 xl:w-7/12 '>
              <>
                <Swiper
                  slidesPerView={1}
                  spaceBetween={32}
                  rewind={true}
                  ref={sliderRef}
                  breakpoints={{
                    0: {
                      slidesPerView: 1
                    },
                    1280: {
                      slidesPerView: 2
                    }
                  }}
                  className="mt-12 lg:mt-0">
                    {
                      products.map(item => <SwiperSlide key={item.title}><PackageComponent title={item.title} description={splitContent(item.description,150)} duration={item.duration} imageSource={get_image_from_path(item.featured_image[0].source)} imageAlt={item.featured_image[0].alt} link={`/packages/${item.slug}`} /></SwiperSlide>)
                    }
                </Swiper>
              </>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SwiperComponent;
