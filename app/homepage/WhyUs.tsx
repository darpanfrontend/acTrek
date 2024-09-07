import React, { FC } from 'react';
import HeadingText from '../components/ui/HeadingText';
import MotionComponent from '../components/ui/motionComponent';
import { Banner } from 'app/api_interfaces/ApiProps';
import get_image_from_path, { sectionBg } from 'app/components/actions/helpers';
import ImageComponent from 'app/components/js/ImageComponent';
interface WhyUsProps {
    banner:Banner,
    faded?:false
}
const WhyUs: FC<WhyUsProps> = ({banner, faded=true}) => {
    
    return (
        <section className={`${faded ? sectionBg : 'bg-white'} rounded-b-3xl py-40`}>
        <div className="xl:max-w-7xl lg:max-w-6xl md:max-w-3xl sm:max-w-xl px-8 mx-auto">
          <div className="flex lg:space-x-12">
            <div className="hidden w-2/12 relative lg:flex flex-row space-x-8">
              <div className='h-full w-full relative '>
                <ImageComponent
                  src={get_image_from_path(banner.images[0].source)}
                  alt={banner.images[0].alt}
                  className="object-cover"
                  fill={true}
                  priority
                />
              </div>
            </div>
            <div className="w-full lg:w-6/12 z-10">
              <MotionComponent>
                  <HeadingText level={2} classList='heading-text text-4xl sm:text-5xl md:text-6xl lg:text-6xl mb-8 font-bold uppercase'>
                    {banner.slogan}
                  </HeadingText>
                  <p className='mb-12 text-lg'>{banner.description}</p>
                  <div className='flex flex-wrap md:flex-nowrap md:space-x-8 mb-8 md:mb-0'>
                    <div className='w-full md:w-1/2 mb-8 md:mb-0'>
                      <h3 className='text-xl mb-4 font-bold'>Professional Guides</h3>
                      <p>What is a “smart” home, is its voice control with Alexa or Google Assistant, is it fully integrated audiovisual systems wit</p>
                    </div>
                    <div className='w-full md:w-1/2'>
                      <h3 className='text-xl mb-4 font-bold'>Curated Itineraries</h3>
                      <p>What is a “smart” home, is its voice control with Alexa or Google Assistant, is it fully integrated audiovisual systems wit</p>
                    </div>
                  </div>
              </MotionComponent>
            </div>
            <div className="hidden w-2/12 relative lg:flex flex-row">
              <div className='h-full w-full relative'>
                <ImageComponent
                  src={get_image_from_path(banner.images[1].source)}
                  alt={banner.images[1].alt}
                  className="object-cover"
                  fill={true}
                  priority
                />
              </div>
            </div>
            <div className="hidden w-2/12 relative lg:flex flex-row">
              <div className='h-full w-full relative'>
                <ImageComponent
                  src={get_image_from_path(banner.images[2].source)}
                  alt={banner.images[2].alt}
                  className="object-cover"
                  fill={true}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}

export default WhyUs;