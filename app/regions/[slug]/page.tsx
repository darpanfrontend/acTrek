import Image from 'next/image'
import HeadingText from 'app/components/ui/HeadingText'
import ImageComponent from 'app/components/js/ImageComponent'
import get_image_from_path, { splitContent } from 'app/components/actions/helpers'
import { fetchData, getMeta } from 'app/api_interfaces/apiFetch'
import { Metadata } from 'next'
import PackageComponent from 'app/components/js/PackageComponent'
import WhyUs from 'app/homepage/WhyUs'
import { Banner, Region } from 'app/api_interfaces/ApiProps'

interface RgProps {
  params: {
    slug: string;
  };
}

async function getData(slug: string): Promise<{  region: Region, about_banner: Banner }> {
  return fetchData(`get-all-regions/${slug}`)
}

export async function generateMetadata({params}:RgProps): Promise<Metadata> {
    return getMeta(params.slug);
}

export default async function RegionComponent({ params }: RgProps): Promise<JSX.Element> {
  const { region,about_banner } = await getData(params.slug);
  return (
    <>
      <section className={`text-center relative`}>
        <div className="overflow-hidden h-full w-full relative">
          <div className='w-full px-8 mx-auto h-full relative'>
            <div className='bg-gray-900 opacity-40 h-full w-full absolute left-0 top-0 transform will-change-transform z-[2]'></div>
            <div className={'w-full h-full absolute right-0 top-0 z-0'}>
              <div className="w-full h-full relative mx-auto">
                <Image
                  src={get_image_from_path(region.featured_image[0].source)}
                  alt={region.featured_image[0].alt}
                  style={{ objectFit: "cover" }}
                  fill={true}
                  priority
                />
              </div>
            </div>
            <div className='xl:max-w-7xl lg:max-w-6xl md:max-w-3xl sm:max-w-xl mx-auto w-full py-40 px-8 relative z-[2]'>
              <div className='relative w-full h-full z-0 flex items-center justify-center pb-16'>
                <div className='text-center w-9/12 pr-8 relative'>
                  <div className='text-white'>
                    <span className='block text-2xl'>{region.slogan}</span>
                    <HeadingText level={1} classList={`w-full bg-clip-text text-8xl leading-none font-bold mb-8 will-change-[opacity]`}>{`<span>Explore</span> ${region.title}`}</HeadingText>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={`relative bg-white pt-32 pb-40`}>
        <div className="xl:max-w-7xl lg:max-w-6xl md:max-w-3xl sm:max-w-xl px-8 mx-auto">
          <div className="flex flex-wrap">
            <div className='w-5/12 pr-24'>
              <HeadingText level={2} classList='text-5xl mb-8 font-bold'>{`<span>Overview of </span> ${region.slogan}`}</HeadingText>
              <p className='mb-12 text-lg'>{region.description}</p>
            </div>
            <div className="w-7/12 relative min-h-[700px] transform scale-100 shadow-blue-800 hover:scale-105 transition-all duration-300 ease-out-quint hover:shadow-sm">
              <ImageComponent
                src={get_image_from_path(region.images[0].source)}
                alt="Slider Image"
                className="object-cover"
                fill={true}
                priority
              />
            </div>
          </div>
          <div className="flex flex-wrap pt-28">
            <div className="w-7/12 relative min-h-[500px] transform scale-100 shadow-blue-800 hover:scale-105 transition-all duration-300 ease-out-quint hover:shadow-sm">
              <ImageComponent
                src={get_image_from_path(region.images[1].source)}
                alt={region.images[1].alt}
                className="object-cover"
                fill={true}
                priority
              />
            </div>
            <div className='w-5/12 pl-20 flex items-center'>
              <div>
                <HeadingText level={2} classList='text-5xl mb-8 font-bold'>{`<span>Best Time To Visit</span> ${region.title}`}</HeadingText>
                <p className='mb-12 text-lg'>{region.best_time_description}.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={`text-center relative text-gray-900 pb-40`}>
        <div className='xl:max-w-7xl lg:max-w-6xl md:max-w-3xl sm:max-w-xl px-4 mx-auto w-full relative flex items-center justify-center px-8'>

          <div className='w-full grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {region.products.map((item:any) => 
              <PackageComponent 
              key={item.title}
                imageSource={get_image_from_path(item.featured_image[0].source)} 
                imageAlt={item.featured_image[0].alt} 
                description={splitContent(item.description, 150)} 
                title={item.title} 
                duration={item.duration} 
                link={`/packages/${item.slug}`} 
              />
            )}
          </div>
        </div>
      </section>
      <WhyUs banner={about_banner} />
    </>
  )
}
