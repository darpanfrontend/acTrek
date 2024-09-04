import HeadingText from 'app/components/ui/HeadingText'
import ImageComponent from 'app/components/js/ImageComponent'
import { Blogs } from 'app/api_interfaces/ApiProps'
import get_image_from_path, { splitContent } from 'app/components/actions/helpers';
import moment from 'moment';
import { fetchData, getMeta } from 'app/api_interfaces/apiFetch';
import { Metadata } from 'next';
import Link from 'next/link';

async function getData(): Promise<{ blogs: Blogs[] }> {
  return fetchData(`get-all-blogs`)
}

export async function generateMetadata(): Promise<Metadata> {
    return getMeta('blogspage');
}
export default async function BlogPage(): Promise<JSX.Element> {
    const { blogs } = await getData();
    return (
        <>
            <section className={`relative pt-40 pb-8`}>
                <div className='xl:max-w-7xl lg:max-w-6xl md:max-w-3xl sm:max-w-xl px-8 mx-auto w-full relative'>
                    <div className='w-full'>
                        <div className="w-full relative flex pr-20">
                            <div className='text-left'>
                                <HeadingText level={1} classList={"text-5xl font-bold"}>Our Blogs</HeadingText>
                                <p className='mt-4'>Check out the all our news and blogs articles </p>
                            </div>
                        </div>
                    </div>
                    {
                        blogs.filter(item => item.featured === 1).map(item =>
                            <div key={item.id} className='w-full'>
                                <div className="flex flex-wrap lg:flex-nowrap lg:flex-row lg:space-x-12 border-t border-b border-gray-200 last:border-t-0 border-opacity-20 pt-12 pb-20">
                                    <div className='w-full lg:w-1/2 xl:w-8/12 h-[400px] lg:h-auto relative'>
                                        <ImageComponent
                                            src={get_image_from_path(item.images[0].source)}
                                            alt={item.images[0].alt}
                                            className="object-cover"
                                            fill={true}
                                            priority
                                        />
                                        <Link className='absolute top-0 left-0 w-full h-full opacity-0' href={`blogs/${item.slug}`}>
                                            {item.title}
                                        </Link>
                                    </div>
                                    <div className='w-full lg:w-1/2 xl:w-4/12 py-12'>
                                            <HeadingText level={2} classList={"text-4xl font-bold mb-8"} link={`blogs/${item.slug}`}>
                                                {item.title}
                                            </HeadingText>
                                            <div dangerouslySetInnerHTML={{__html:splitContent(item.article,400)}}/>
                                            <div className='w-full flex space-x-8 my-8 text-gray-700 text-sm'>
                                                <div className='w-full'>
                                                    <h4 className='font-bold text-base inline-block mr-4'>By Rebellion Basnet</h4>
                                                    <span className='border-l border-gray-700 pl-4'>{moment(item.created_at).format('MMMM Do YYYY')}</span>
                                                </div>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </section>
            <section className="relative z-[2] pb-40 bg-white">
                <div className="xl:max-w-7xl lg:max-w-6xl md:max-w-3xl sm:max-w-xl px-8 mx-auto">
                    {
                        blogs.filter(item => item.featured !== 1).map(item =>
                            <div key={item.id} className='w-full'>
                                <div className="flex flex-row space-x-12 border-t border-b border-gray-200 last:border-t-0 border-opacity-20 py-12">
                                    <div className='w-2/12 relative'>
                                        <ImageComponent
                                            src={get_image_from_path(item.images[0].source)}
                                            alt={item.images[0].alt}
                                            className="object-cover"
                                            fill={true}
                                            priority
                                        />
                                        <Link className='absolute top-0 left-0 w-full h-full opacity-0' href={`blogs/${item.slug}`}>
                                            {item.title}
                                        </Link>
                                    </div>
                                    <div className='w-5/12'>
                                        <HeadingText level={2} classList={"text-4xl font-bold"} link={`blogs/${item.slug}`}>{item.title}</HeadingText>
                                        <div className='w-full flex space-x-8 mt-4 text-gray-700 text-sm'>
                                            <div className='w-full'>
                                                <h4 className='font-bold text-base inline-block mr-4'>By Rebellion Basnet</h4>
                                                <span className='border-l border-gray-700 pl-4'>{moment(item.created_at, "YYYYMMDD").fromNow()}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-5/12'>
                                        <div dangerouslySetInnerHTML={{__html:splitContent(item.article,300)}}/>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </section>
        </>
    )
}
