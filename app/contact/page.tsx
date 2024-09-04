import React from 'react';
import HeadingText from 'app/components/ui/HeadingText';
import MotionComponent from 'app/components/ui/motionComponent';
import ContactForm from './ContactForm';
import { fetchData, getMeta } from 'app/api_interfaces/apiFetch';
import { Metadata } from 'next';

async function getData(){
  return fetchData(`company-data`)
}

export async function generateMetadata(): Promise<Metadata> {
    return getMeta('contactpage');
}

export default async function Contact(): Promise<JSX.Element> {
  const data = await getData()
  return (
    <>
      <section className='relative'>
        <MotionComponent>
          <iframe src={data.site_info.gmap} className='w-full h-[500px] border-0 grayscale' loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </MotionComponent>
        <div className='w-full h-full absolute top-0 left-0 z-[1] bg-gradient-to-t from-transparent to-white' />
      </section>
      <section className='py-40 relative '>
        <div className="xl:max-w-7xl lg:max-w-6xl md:max-w-3xl sm:max-w-xl px-8 mx-auto w-full">
            <div className='flex flex-wrap w-full'>
              <MotionComponent className='w-full' variants={'moveUp'}>
                <div className='w-full'>
                  <div className="mb-12 w-6/12">
                    <HeadingText level={1} classList='text-6xl font-black mb-8'>{`<span>Send Us</span> A Message`}</HeadingText>
                    <p className='text-lg'>We can create unforgettable memories in your home. If you want luxury in the interior design, let us know and we will tailor it to what you need.</p>
                  </div>
                  <ContactForm url={`${process.env.APIURL}/send-email`}/>
                </div>
              </MotionComponent>
            </div>
        </div>
      </section>
      <section className='py-20 relative bg-green-900 border-t-2 border-b-2 border-gray-900'>
        <div className="xl:max-w-7xl lg:max-w-6xl md:max-w-3xl sm:max-w-xl px-8 mx-auto w-full">
          <div className='w-full flex flex-wrap'>
            <div className='w-full'>
              <div className={`grid sm:grid-cols-2 gap-8 lg:grid-cols-4 w-full `}>
                <div className='pr-16 last:pr-0 last:mb-0 relative pl-16'>
                  <div className='bg-gray-900 text-white absolute flex items-center justify-center rounded-full top-0 left-0 w-12 h-12'>
                    <span className='material-icons-outlined text-3xl'>email</span>
                  </div>
                  <p>Email Address</p>
                  <p className='font-bold'>{data.site_info.info_email}</p>
                </div>
                <div className='pr-16 last:pr-0 last:mb-0 relative pl-16'>
                  <div className='bg-gray-900 text-white absolute flex items-center justify-center rounded-full top-0 left-0 w-12 h-12'>
                    <span className='material-icons-outlined text-3xl'>location_on</span>
                  </div>
                  <p>Our Location</p>
                  <p className='font-bold'>{data.site_info.location}</p>
                </div>
                <div className='pr-16 last:pr-0 last:mb-0 relative pl-16'>
                  <div className='bg-gray-900 text-white absolute flex items-center justify-center rounded-full top-0 left-0 w-12 h-12'>
                    <span className='material-icons-outlined text-3xl'>call</span>
                  </div>
                  <p>Phone Number</p>
                  <p className='font-bold'>{data.site_info.phone1}</p>
                </div>
                <div className='pr-16 last:pr-0 last:mb-0 relative pl-16'>
                  <div className='bg-gray-900 text-white absolute flex items-center justify-center rounded-full top-0 left-0 w-12 h-12'>
                    <span className='material-icons-outlined text-3xl'>maps_ugc</span>
                  </div>
                  <p>Whatsapp Number</p>
                  <p className='font-bold'>{data.site_info.phone2}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}