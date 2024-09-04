import Image from 'next/image'
import HeadingText from 'app/components/ui/HeadingText'
import get_image_from_path, { sectionBg, splitContent } from 'app/components/actions/helpers'
import { Banner, Product } from 'app/api_interfaces/ApiProps'
import PackageComponent from 'app/components/js/PackageComponent'
import { notFound } from 'next/navigation'
import { fetchData, getMeta } from 'app/api_interfaces/apiFetch'
import { Metadata } from 'next'
interface PackageProps {
    params: {
        slug: string;
    };
}

async function getData(slug:string): Promise<{ banner: Banner, products: Product[] }> {
  return fetchData(`get-things-to-do/${slug}`)
}

export async function generateMetadata(): Promise<Metadata> {
    return getMeta('presspage');
}

export default async function ThingsPackage({ params }: PackageProps): Promise<JSX.Element> {
    const { banner, products } = await getData(params.slug);
    return (
        <>
            <section className={`text-center relative`}>
                <div className="h-[calc(100vh-200px)] w-full">
                    <div className="overflow-hidden h-full w-full relative">
                        <div className='w-full px-8 mx-auto h-full relative'>
                            <div className='absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-60 z-[1]' />
                            <div className={'w-full h-full absolute right-0 top-0 z-0'}>
                                <div className="w-full h-full relative mx-auto">
                                    <Image
                                        src={get_image_from_path(banner.images[0].source)}
                                        alt={banner.images[0].alt}
                                        style={{ objectFit: "cover" }}
                                        fill={true}
                                        priority
                                    />
                                </div>
                            </div>
                            <div className='xl:max-w-7xl lg:max-w-6xl md:max-w-3xl sm:max-w-xl mx-auto w-full h-full px-8 relative z-[2]'>
                                <div className='relative w-full h-full z-0 flex items-center justify-center pb-16'>
                                    <div className='text-center w-full lg:w-8/12 relative'>
                                        <div className='text-white'>
                                            <HeadingText level={1} classList={`w-full text-6xl lg:text-7xl xl:text-8xl leading-none font-bold will-change-[opacity] uppercase mb-8 heading-text`}>{`<span>Explore</span> ${params.slug}`}</HeadingText>
                                            <div className='block sm:text-2xl' dangerouslySetInnerHTML={{ __html: banner.slogan }} />
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
                    <HeadingText level={2} classList='capitalize heading-text text-6xl mb-8 font-bold'>
                        {`<span>${banner.title}</span> overview`}
                    </HeadingText>
                    <p className='text-xl'>{banner.description}</p>
                </div>
            </section>
            <section className={`relative py-40 ${sectionBg}`}>
                <div className='xl:max-w-7xl lg:max-w-6xl md:max-w-3xl sm:max-w-xl px-8 mx-auto w-full relative'>
                    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
                        {
                            products.map(item =>
                                <PackageComponent 
                                    key={item.title}
                                    imageSource={get_image_from_path(item.featured_image[0].source)} 
                                    imageAlt={item.featured_image[0].alt} 
                                    description={splitContent(item.description, 150)} 
                                    title={item.title} 
                                    duration={item.duration} 
                                    link={`/packages/${item.slug}`} 
                                />
                            )
                        }
                    </div>
                </div>
            </section>
        </>
    )
}
