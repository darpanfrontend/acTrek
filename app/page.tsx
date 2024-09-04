import React from 'react';
import ImageComponent from 'app/components/js/ImageComponent';
import HeadingText from 'app/components/ui/HeadingText';
import ButtonComponent from 'app/components/ui/ButtonComponent';
import CloudyComponent from 'app/homepage/CloudyComponent';
import get_image_from_path, { sectionBg, splitContent } from 'app/components/actions/helpers';
import { Banner, Blogs, Product, Region, Review } from 'app/api_interfaces/ApiProps';
import SwiperComponent from 'app/homepage/SwiperComponent';
import { fetchData, getMeta } from './api_interfaces/apiFetch';
import { Metadata } from 'next';
import TopScrollAnim from './homepage/TopScrollAnim';
import MultiImageEnlarge from './homepage/MultiImageEnlarge';
import WhyUs from './homepage/WhyUs';

async function getData(): Promise<{ home_banner: Banner, products: Product[], about_banner: Banner, regions: Region[], reviews: Review[], blogs:Blogs[], home_gallery: Banner }> {
  return fetchData(`home-data`)
}

export async function generateMetadata(): Promise<Metadata> {
    return await getMeta('homepage');
}


export default async function Home(): Promise<JSX.Element> {
  const { home_banner, products, about_banner, regions, reviews,blogs, home_gallery } = await getData();
  return (
    <>
      <TopScrollAnim
        text={home_banner.slogan}
        imageSrc={get_image_from_path(home_banner.images[0].source)}
        viewport='400vh'
        link={home_banner.link}
        slogan={home_banner.description}
        productList={true}
        product={products}
      />
      <SwiperComponent heading='Recommended' description='Nepal is full of unexplored trekking regions, explore all the unexplored region of nepal.' products={products}/>
      <section className={`w-full relative py-40 rounded-b-3xl bg-green-900 border-2 border-gray-900`}>
        <div className='xl:max-w-7xl lg:max-w-6xl md:max-w-3xl sm:max-w-xl px-8 mx-auto'>
            {regions.map((item, index) => (
              <div key={item.title} className='grid lg:grid-cols-2 gap-8 lg:gap-20 mb-40 last:mb-0'>
                <div className={`min-h-[400px] lg:min-h-[600px] w-full relative ${index % 2 == 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                  <ImageComponent
                    src={get_image_from_path(item.featured_image[0].source)}
                    alt={item.featured_image[0].alt}
                    className="object-cover"
                    fill={true}
                    priority
                  />
                </div>
                <div className={`w-full relative ${index % 2 == 0 ? 'lg:order-1 lg:pr-20' : 'lg:order-2 lg:pl-20'}`}>
                  <span className='text-xl'>{item.slogan}</span>
                  <HeadingText level={2} classList='heading-text text-4xl sm:text-5xl md:text-6xl lg:text-6xl uppercase mb-8 font-bold'>
                    {item.title}
                  </HeadingText>
                  <p className='hidden lg:block text-lg'>{item.description}</p>
                  <div className='w-full mt-8'>
                      <ButtonComponent whiteColored={true} tagType='a' href={`/${item.title}`}>Discover Packages</ButtonComponent>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
      <SwiperComponent heading='Exclusive' description='Explore all the exlusive packages based on the current time you should visit.' products={products}/>
      <WhyUs banner={about_banner} />
      <CloudyComponent reviews={reviews} />
      <SwiperComponent heading='Eastern Region' description='We are pioneers in trekking in eastern region mostly on Kanchenjunga Region' products={products}/>
      <MultiImageEnlarge images={home_gallery.images} link={home_gallery.link} description={home_gallery.description}/>
      <section className="relative z-[2] py-40 bg-green-900 border-b-2 border-gray-900">
        <div className="xl:max-w-7xl lg:max-w-6xl md:max-w-3xl sm:max-w-xl px-8 mx-auto">
          <div className='w-full mb-12'>
            <HeadingText level={2} classList={"text-5xl font-bold pt-4 pb-6"}>Our Stories</HeadingText>
            <p>In esse amet aute proident reprehenderit non duis qui deserunt qui do qui consequat labore.</p>
          </div>
          {
            blogs.map(item => (
              <div key={item.title} className='w-full'>
                <div className="flex flex-wrap lg:flex-nowrap lg:flex-row lg:space-x-12 border-t border-b border-gray-800 last:border-t-0 last:pb-0 border-opacity-20 pb-12">
                  <div className='w-full lg:w-2/12 h-[300px] lg:h-auto mb-8 lg:mb-0'>
                    <ImageComponent
                      src={get_image_from_path(item.images[0].source)}
                      alt={item.images[0].alt}
                      className="object-cover"
                      fill={true}
                      priority
                    />
                  </div>
                  <div className='w-full lg:w-4/12'>
                    <HeadingText level={3} classList={"text-4xl font-bold"}>{item.title}</HeadingText>
                    <div className='w-full flex space-x-8 mt-4 mb-4 lg:mb-0 text-gray-700 text-sm'>
                      <div className='w-full'>
                        <h4 className='font-bold text-base inline-block mr-4'>By Rebellion Basnet</h4>
                        <span className='border-l border-gray-700 pl-4'>Aug 23, 2024</span>
                      </div>
                    </div>
                  </div>
                  <div className='w-full lg:w-6/12'>
                    {splitContent(item.article,300)}
                  </div>
                </div>
              </div>

            ))
          }
          <div className='w-full mt-20 text-center'>
            <ButtonComponent tagType="a" whiteColored={true} href='/blogs' >View All Blogs</ButtonComponent>
          </div>
        </div>
      </section>
    </>
  )
}