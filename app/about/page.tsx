import Image from 'next/image'
import HeadingText from 'app/components/ui/HeadingText'
import ParallaxText from 'app/components/js/ParallaxText'
import ImageComponent from 'app/components/js/ImageComponent'
import get_image_from_path, { sectionBg } from 'app/components/actions/helpers'
import { Banner,Teams } from 'app/api_interfaces/ApiProps'
import Link from 'next/link'
import { Metadata } from 'next'
import { fetchData, getMeta } from 'app/api_interfaces/apiFetch'
import WhyUs from 'app/homepage/WhyUs'

async function getData(): Promise<{ vision: Banner, mission: Banner, story: Banner, teams: Teams[], about_banner:Banner }> {
  return fetchData('about-data')
}

export async function generateMetadata(): Promise<Metadata> {
    return getMeta('aboutpage');
}

export default async function About(): Promise<JSX.Element>  {
    const { vision, mission, story, teams, about_banner } = await getData();
    return (
        <>
            <section className={`text-center relative`}>
                <div className="h-[calc(100vh-200px)] w-full">
                    <div className="overflow-hidden h-full w-full relative">
                        <div className='w-full px-8 mx-auto h-full relative'>
                            <div className='absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-60 z-[1]'/>
                            <div className={'w-full h-full absolute right-0 top-0 z-0'}>
                                <div className="w-full h-full relative mx-auto">
                                    <Image
                                        src={get_image_from_path(story.images[0].source)}
                                        alt={story.images[0].alt}
                                        style={{objectFit: "cover"}}
                                        fill={true}
                                        priority
                                    />
                                </div>
                            </div>
                            <div className='xl:max-w-7xl lg:max-w-6xl md:max-w-3xl sm:max-w-xl mx-auto w-full h-full px-8 relative z-[2]'>
                                <div className='relative w-full h-full z-0 flex items-center justify-center pb-16'>
                                    <div className='text-center w-full lg:w-8/12 relative'>
                                        <div className='text-white'>
                                            <HeadingText level={1} classList={`w-full text-6xl lg:text-7xl xl:text-8xl leading-none font-bold will-change-[opacity] uppercase mb-8 heading-text`}>{`<span>The story </span> of exploring the unexplored.`}</HeadingText>
                                            <span className='block sm:text-2xl'>Explore the unexplored story of TREK 8586</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={`relative py-40`}>
                <div className='xl:max-w-7xl lg:max-w-6xl md:max-w-3xl sm:max-w-xl px-8 mx-auto w-full relative'>
                  <HeadingText level={2} classList='heading-text text-6xl mb-8 font-bold'>
                    How it all started?
                  </HeadingText>
                    <p className='text-xl'>{story.description}</p>
                </div>
            </section>
            <section className={`${sectionBg} relative py-40`}>
                <div className='xl:max-w-7xl lg:max-w-6xl md:max-w-3xl sm:max-w-xl px-8 mx-auto w-full relative flex items-center justify-center'>
                    <div className='w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                        <div className='w-full col-span-2 md:col-span-3 lg:col-span-1'>
                            <div className="w-full relative lg:h-[400px]">
                                <div className='text-left'>
                                    <HeadingText level={2} classList={"text-5xl font-bold pt-4 pb-6"}>Our Team</HeadingText>
                                    <p>In esse amet aute proident reprehenderit non duis qui deserunt qui do qui consequat labore.</p>
                                </div>
                            </div>
                        </div>
                        {
                            teams.map(item => 
                                <div key={item.name} className="w-full col-span-2 md:col-span-1 relative h-[400px] transform scale-100 hover:scale-105 transition-all duration-300 ease-out-quint hover:shadow-sm border border-gray-900 p-2">
                                    <ImageComponent
                                        src={get_image_from_path(item.images[0].source)}
                                        alt={mission.images[0].alt}
                                        className="object-cover"
                                        fill={true}
                                        priority
                                    />
                                    <div className='left-0 absolute w-full bottom-0 p-8 h-full flex items-end bg-gray-900 bg-opacity-10 text-white'>
                                        <div className='text-left'>
                                            <span className='px-2 py-1 bg-green-900 text-gray-900 text-sm'>{item.post}</span>
                                            <HeadingText level={2} classList={"mt-2 text-4xl font-bold"}>{item.name}</HeadingText>
                                            <ul className='flex underline mt-4'>
                                                <li className='inline-flex mr-4'>
                                                    <Link href={`https://facebook.com/${item.fb}`}>Facebook</Link>
                                                </li>
                                                <li className='inline-flex'>
                                                    <Link href={`https://instagram.com/${item.instagram}`}>Instagram</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </section>
            <WhyUs faded={false} banner={about_banner} />
            <section className='relative bg-green-900 py-10 lg:py-20 border-t-2 border-b-2 border-gray-900'>
                <ParallaxText baseVelocity={2}>
                    Explore The Unexplored
                </ParallaxText>
            </section>
            <section className={`${sectionBg} relative py-40`}>
                <div className="xl:max-w-7xl lg:max-w-6xl md:max-w-3xl sm:max-w-xl px-8 mx-auto">
                    <div className="flex flex-wrap">
                        <div className='w-full lg:w-5/12 lg:pr-24 mb-8'>
                            <HeadingText level={2} classList='text-5xl mb-8 font-bold'>{vision.slogan}</HeadingText>
                            <p className='mb-8 text-lg'>{vision.description}</p>
                        </div>
                        <div className="w-full lg:w-7/12 relative min-h-[500px] transform scale-100 shadow-blue-800 hover:scale-105 transition-all duration-300 ease-out-quint hover:shadow-sm">
                        <ImageComponent
                            src={get_image_from_path(vision.images[0].source)}
                            alt={vision.images[0].alt}
                            className="object-cover"
                            fill={true}
                            priority
                        />
                        </div>
                    </div>
                    <div className="flex flex-wrap pt-28">
                        <div className="w-full lg:w-7/12 relative min-h-[500px] transform scale-100 shadow-blue-800 hover:scale-105 transition-all duration-300 ease-out-quint hover:shadow-sm">
                        <ImageComponent
                            src={get_image_from_path(mission.images[0].source)}
                            alt={mission.images[0].alt}
                            className="object-cover"
                            fill={true}
                            priority
                        />
                        </div>
                        <div className='w-full lg:w-5/12 lg:pl-20 flex items-center'>
                            <div className='pt-8 lg:pt-0'>
                                <HeadingText level={2} classList='text-5xl mb-8 font-bold'>{mission.slogan}</HeadingText>
                                <p className='mb-8 text-lg'>{mission.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
