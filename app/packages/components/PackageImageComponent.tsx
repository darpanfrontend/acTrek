"use client"
import React,{FC} from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';
import get_image_from_path from 'app/components/actions/helpers';
import Image from 'next/image';

interface PackageImageComponentProps {
    images: {
        source: string;
        alt: string
    }[];
}

const PackageImageComponent: FC<PackageImageComponentProps> = ({ images }) => {
    return (
        <div className='px-8'>
            <Swiper
                navigation={true}
                modules={[Navigation]}
                slidesPerView={'auto'}
                spaceBetween={'32'}
                className="mySwiper w-full">
                {
                    images.map(item =>
                    <SwiperSlide key={item.source}>
                        <div className="relative h-[calc(100vh-64px)] transform scale-100 shadow-blue-800 hover:scale-105 transition-all duration-300 ease-out-quint hover:shadow-sm">
                            <Image
                                src={get_image_from_path(item.source)}
                                alt={item.alt}
                                className="object-cover"
                                fill={true}
                                priority
                            />
                        </div>
                    </SwiperSlide>
                )}
                </Swiper>
        </div>
    );
}
export default PackageImageComponent;
