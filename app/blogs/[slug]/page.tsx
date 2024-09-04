import HeadingText from 'app/components/ui/HeadingText'
import ImageComponent from 'app/components/js/ImageComponent'
import Image from 'next/image'
import { Blogs } from 'app/api_interfaces/ApiProps'
import get_image_from_path from 'app/components/actions/helpers'
import moment from 'moment'
import { fetchData, getMeta } from 'app/api_interfaces/apiFetch'
import { Metadata } from 'next'
interface PropsInterface {
  params: {
    slug: string;
  }
}

async function getData(slug: string): Promise<{ blog: Blogs }> {
  return fetchData(`get-blog/${slug}`)
}

export async function generateMetadata({params}:PropsInterface): Promise<Metadata> {
    return getMeta(params.slug);
}

export default async function Blog({ params }: PropsInterface) {
  const { blog } = await getData(params.slug)
  console.log(params)
  return (
    <>
      <section className='pt-32 min-h-screen'>
        <div className='flex flex-wrap w-full lg:h-[calc(100vh-128px)] relative'>
          <div className="w-full lg:w-7/12 lg:h-full">
            <div className="relative h-[400px] lg:h-full">
              <ImageComponent
                src={get_image_from_path(blog.images[0].source)}
                alt={get_image_from_path(blog.images[0].alt)}
                className="object-cover"
                fill={true}
                priority
              />
            </div>
          </div>
          <div className='xl:max-w-7xl lg:max-w-6xl md:max-w-3xl sm:max-w-xl px-8 left-1/2 transform -translate-x-1/2 w-full z-10 mt-16 lg:mt-0 lg:absolute lg:top-0 lg:h-full'>
            <div className='w-full lg:ml-auto lg:w-5/12 lg:flex lg:h-full relative'>
              <div className='lg:flex lg:lg:w-full lg:pl-28'>
                <span className='lg:hidden'>{moment(blog.created_at).format('MMMM Do YYYY')}</span>
                <HeadingText classList='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold' level={1}>{blog.title}</HeadingText>
                <div className='lg:absolute bottom-8 w-full right-0 lg:pl-28'>
                  <div className='lg:inline-flex w-full lg:w-1/2 relative pl-16'>
                    <div className='absolute top-1/2 transform -translate-y-1/2 left-0'>
                      <div className='relative h-12 w-12'>
                        <Image
                          src="/images/1.jpg"
                          alt="Slider Image"
                          className="object-cover rounded-full"
                          fill={true}
                          priority
                        />
                      </div>
                    </div>
                    <p className='mt-8'>
                      <span className='block'>Written By</span>
                      <span className='font-bold'>Rebellion Basnet</span>
                    </p>
                  </div>
                  <div className='w-full lg:w-1/2 lg:inline-flex mt-4 hidden'>
                    <p className='ml-auto'>
                      <span className='block'>Published On</span>
                      <span className='font-bold'>{moment(blog.created_at).format('MMMM Do YYYY')}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      <section className='pt-20 pb-40'>
        <div className='xl:max-w-5xl lg:max-w-6xl md:max-w-3xl sm:max-w-xl px-8 mx-auto w-full relative z-10 h-full flex items-center'>
          <div className='relative'>
            <div className='text-lg' dangerouslySetInnerHTML={{ __html: blog.article }} />
            <div className='flex content-between flex-wrap pt-12'>
              <div className='w-full bg-green-900 border-2 border-gray-900 p-8'>
                <HeadingText level={3} classList={"text-3xl pb-4 mb-8 border-b border-gray-900 font-bold"}>Share this article on</HeadingText>
                <div className="flex">
                  <a className='inline-block ml-4 first:ml-0 underline' href={`https://www.facebook.com/sharer/sharer.php?u=${`https://www.trek8586.com/blogs/${blog.slug}`}`} target="_blank" rel="noreferrer" title="Share on Facebook">Facebook</a>
                  <a className='inline-block ml-4 first:ml-0 underline' href={`https://twitter.com/intent/tweet?text=${`https://www.trek8586.com/blogs/${blog.slug}`}`} target="_blank" rel="noreferrer" title="Share on Twitter">Twitter</a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
