"use client"
import React, { FC } from 'react';
import Image from 'next/image';
import HeadingText from '../components/ui/HeadingText';
import MotionComponent from '../components/ui/motionComponent';
import { Review } from 'app/api_interfaces/ApiProps';
interface ReviewComponentProps {
    review:Review
}
const ReviewComponent: FC<ReviewComponentProps> = ({review}) => {
    const lists = [];
    for (let i = 1; i <= 5; i++) {
        lists.push(
            <li key={i} className='inline-flex'>
                <span className={`material-icons-outlined text-5xl ${i <= review.rating ? 'text-green-900' : 'text-green-300'}`}>
                    star
                </span>
            </li>
        );
    }
    return (
        <div className='w-full pt-40 z-[1]'>
            <div className='xl:max-w-7xl lg:max-w-6xl md:max-w-3xl sm:max-w-xl px-8 mx-auto'>
                <div className='w-full lg:w-7/12 mx-auto leading-normal text-center'>
                    <MotionComponent>
                        {/* put star review here */}
                        <ul className='flex justify-center'>
                            {lists}
                        </ul>
                        <HeadingText level={2} classList={"text-4xl font-semibold mt-4 mb-8"}>{review.title}</HeadingText>
                        <div className='font-regular text-gray-700 text-lg' dangerouslySetInnerHTML={{__html:review.review}}/>
                        {/* put platform here */} 
                        <div className='relative h-[50px] w-[200px] mx-auto mt-8 mb-2'>
                            <Image
                                src={"/images/review.png"}
                                alt="Slider Image"
                                className="object-cover"
                                fill={true}
                                priority
                            />
                        </div>
                        <div className='text-sm text-gray-700 font-semibold'>
                            {review.reviewer_name} on {review.review_date}
                        </div>
                    </MotionComponent>
                </div>
            </div>
        </div>
    );
}

export default ReviewComponent;