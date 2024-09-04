import Image from 'next/image'
import HeadingText from 'app/components/ui/HeadingText'
import ButtonComponent from 'app/components/ui/ButtonComponent'
import ItineraryComponent from 'app/packages/components/ItineraryComponent'
import get_image_from_path from 'app/components/actions/helpers'
import PackageImageComponent from 'app/packages/components/PackageImageComponent'
import { headingFont } from 'app/fonts'
import YoutubeComponent from 'app/packages/components/YoutubeComponent'
import { Product } from 'app/api_interfaces/ApiProps'
import 'app/packages/components/scss/package.scss'
import { fetchData, getMeta } from 'app/api_interfaces/apiFetch'
import { Metadata } from 'next'

interface PackageProps {
  params: {
    slug: string;
  };
}

async function getData(slug: string): Promise<{ product: Product }> {
  return fetchData(`get-product/${slug}`)
}

export async function generateMetadata({params}:PackageProps): Promise<Metadata> {
    return getMeta(params.slug);
}

export default async function Region({ params }: PackageProps): Promise<JSX.Element> {
  const { product } = await getData(params.slug);
  return (
    <>
      <section>
        <div className={`relative bottom-0 sticky`}>
          <div className="h-screen w-full">
            <div className="overflow-hidden h-full w-full relative">
              <div className='w-full px-8 mx-auto h-full relative'>
                <div className='bg-gray-900 opacity-60 h-full w-full absolute left-0 top-0 transform will-change-transform z-[2]'></div>
                <div className={'w-full h-full absolute right-0 top-0 z-0'}>
                  {
                    
                    <div className="w-full h-full relative mx-auto">
                      <Image
                        src={get_image_from_path(product.featured_image[0].source)}
                        alt={product.featured_image[0].alt}
                        style={{ objectFit: "cover" }}
                        fill={true}
                        priority
                      />
                    </div>
                  }
                </div>
                <div className='absolute left-0 bottom-0 w-full z-[40] bg-white py-8 md:py-8'>
                  <div className='xl:max-w-7xl lg:max-w-6xl md:max-w-3xl sm:max-w-xl mx-auto w-full px-8'>
                    <div className='flex flex-wrap'>
                      <div className='w-full md:w-6/12'>
                        <span className='mt-1 inline-block'>From US ${product.price}</span>
                        <HeadingText level={2} classList={"text-3xl mt-1 font-bold"}>{product.title}</HeadingText>
                      </div>
                      <div className='w-full md:w-6/12 flex flex-wrap items-center justify-end md:space-x-8 border-t md:border-0 border-gray-900 pt-8 md:pt-0 mt-8 md:mt-0'>
                        <div className='w-full md:w-auto mb-4'>
                          <div className='text-center text-sm'>
                            <span className='font-medium block'>Contact our experts</span> <span className='block text-2xl font-bold'>+977 9840403009</span>
                          </div>
                        </div>
                        <ButtonComponent tagType={"a"} href={`/book/${product.slug}`} className='w-full md:w-auto text-center'>Book Your Trek</ButtonComponent>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='hidden lg:block xl:max-w-7xl lg:max-w-6xl md:max-w-3xl sm:max-w-xl mx-auto w-full h-screen px-8 relative z-[2]'>
                  <div className='relative w-full lg:w-8/12 mx-auto h-full z-0 flex items-center justify-center pb-16'>
                      <div className='text-white w-full lg:pr-8 relative text-center'>
                        <span className='block text-xl md:text-2xl'>{product.duration} days experience</span>
                        <h1 className={`${headingFont.className} w-full text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.25] font-bold will-change-[opacity] mb-2 uppercase`} dangerouslySetInnerHTML={{ __html: product.title }} />
                        <span className='block text-2xl'>From US ${product.price} <sub>pp</sub></span>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`relative bg-white pt-12`}>
          <div className="xl:max-w-7xl lg:max-w-6xl md:max-w-3xl sm:max-w-xl px-8 mx-auto">
            <div className="flex flex-wrap">
              <div className='w-full'>
                <div className='w-full lg:w-7/12'>
                  <span>{product.heading}</span>
                  <HeadingText level={2} classList='text-4xl lg:text-5xl mb-8 font-bold'>{`<span>Trek</span> Description`}</HeadingText>
                </div>
                <p className='text-lg' dangerouslySetInnerHTML={{ __html: product.description }} />
              </div>
            </div>
          </div>
        </div>
        <div className='w-full pb-20 relative pt-20'>
          <div className='bg-green-900 h-1/2 w-full absolute bottom-0' />
          <div className='xl:max-w-7xl lg:max-w-6xl md:max-w-3xl sm:max-w-xl px-8 mx-auto'>
            <div className="w-full relative">
              <YoutubeComponent className='w-full h-[600px]' iframeClassName='w-full h-full' videoId={product.video_id}/>
              {/* <iframe src={product.map_url} className='w-full h-[600px] border-0 grayscale' loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe> */}
            </div>
          </div>
        </div>
        <div className='w-full bg-green-900'>
          <div className='xl:max-w-7xl lg:max-w-6xl md:max-w-3xl sm:max-w-xl px-8 mx-auto'>
            <div className="w-full relative">
              <span>Facts to drive you</span>
              <HeadingText level={2} classList='text-5xl font-bold'>Trip Facts</HeadingText>
              <div className='flex flex-wrap pt-4 pb-12 relative w-full'>
                <div className='mt-8 flex flex-wrap w-full'>
                  <div className='w-full sm:w-1/2 lg:w-1/3 mb-8 last:mb-0 relative pl-16'>
                    <div className='w-12 h-12 bg-gray-900 text-white absolute flex items-center justify-center rounded-full top-0 left-0 text-3xl'>
                      <span className='material-icons-outlined'>calendar_month</span>
                    </div>
                    <p>Duration</p>
                    <p className='capitalize font-bold'>{product.duration} days</p>
                  </div>
                  <div className='w-full sm:w-1/2 lg:w-1/3 mb-8 last:mb-0 relative pl-16'>
                    <div className='w-12 h-12 bg-gray-900 text-white absolute flex items-center justify-center rounded-full top-0 left-0 text-3xl'>
                      <span className='material-icons-outlined'>trending_up</span>
                    </div>
                    <p>Altitude</p>
                    <p className='capitalize font-bold'>{product.altitude}</p>
                  </div>
                  <div className='w-full sm:w-1/2 lg:w-1/3 mb-8 last:mb-0 relative pl-16'>
                    <div className='w-12 h-12 bg-gray-900 text-white absolute flex items-center justify-center rounded-full top-0 left-0 text-3xl'>
                      <span className='material-icons-outlined'>group</span>
                    </div>
                    <p>Group Size</p>
                    <p className='capitalize font-bold'>Min. {product.group_size} pax</p>
                  </div>
                  <div className='w-full sm:w-1/2 lg:w-1/3 mb-8 last:mb-0 relative pl-16'>
                    <div className='w-12 h-12 bg-gray-900 text-white absolute flex items-center justify-center rounded-full top-0 left-0 text-3xl'>
                      <span className='material-icons-outlined'>grade</span>
                    </div>
                    <p>Difficulty</p>
                    <p className='capitalize font-bold'>{product.difficulty}</p>
                  </div>
                  <div className='w-full sm:w-1/2 lg:w-1/3 mb-8 last:mb-0 relative pl-16'>
                    <div className='w-12 h-12 bg-gray-900 text-white absolute flex items-center justify-center rounded-full top-0 left-0 text-3xl'>
                      <span className='material-icons-outlined'>hiking</span>
                    </div>
                    <p>Trek Type</p>
                    <p className='capitalize font-bold'>{product.package_type}</p>
                  </div>
                  <div className='w-full sm:w-1/2 lg:w-1/3 mb-8 last:mb-0 relative pl-16'>
                    <div className='w-12 h-12 bg-gray-900 text-white absolute flex items-center justify-center rounded-full top-0 left-0 text-3xl'>
                      <span className='material-icons-outlined'>timer</span>
                    </div>
                    <p>Best Time </p>
                    <p className='capitalize font-bold'>{product.best_time}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='relative bg-white mb-40'>
          <div className='bg-green-900 h-1/2 w-full absolute top-0' />
          <div className="xl:max-w-7xl lg:max-w-5xl md:max-w-3xl sm:max-w-xl px-8 mx-auto relative z-[1]">
            <div className="flex flex-wrap bg-white shadow-xl p-8 lg:p-20">
              <div className="w-full relative mb-20">
                <div className='w-full mb-12'>
                  <span>Inclusion</span>
                  <HeadingText level={2} classList={"text-4xl font-bold pb-6 border-b-2 border-gray-900"}>{`<span>What's</span> Included`}</HeadingText>
                </div>
                <div className='include text-lg'>
                <ul>
                  <li>All airport and hotel transportation by private vehicle in Kathmandu as per the itinerary suggested.</li>
                  <li>Deluxe twin-sharing accommodation in Kathmandu with breakfast</li>
                  <li>Welcome & farewell dinner in Kathmandu (Alcoholic beverages are excluded)</li>
                  <li>Kathmandu to Lukla to Kathmandu by flight</li>
                  <li>Full board meal (breakfast, lunch, dinner, tea & coffee) during the trek</li>
                  <li>Seasonal fruits during the trek are provided</li>
                  <li>Comfortable & clean accommodation on teahouse/lodge/tent during the trek</li>
                  <li>Government Registered Trek guide (English speaking, First Aid and eco trained), Sherpa porter (one porter for two trekkers)</li>
                  <li>All necessary paper works, Everest region entry fee, and permits & TIMS card</li>
                  <li>Four seasonal sleeping bags, Nepal Vision Treks duffel bag, and trekking map ( sleeping bag to be returned after trip completion)</li>
                  <li>First aid exclusive medical kit bag</li>
                  <li>All government and local taxes</li>
                  </ul>
                </div>
              </div>
              <div className="w-full relative">
                <div className='w-full mb-12'>
                  <span>Exclusion</span>
                  <HeadingText level={2} classList={"text-4xl font-bold pb-6 border-b-2 border-gray-900"}>{`<span>What's</span> Not Included`}</HeadingText>
                </div>
                <div className='exclude text-lg'>
                  <ul>
                    <li>Visa fees (You can obtain a visa easily upon your arrival at Tribhuwan International Airport in Kathmandu so (bring accurate USD cash and two passport photographs)) International airfare to and from Kathmandu</li>
                    <li>Lunch and dinner except for welcome & fare well dinner (and also in the case of early return from the mountain than the scheduled plan)</li>
                    <li>Any extra night accommodation in Kathmandu because of early arrival, late departure, and early return from the mountain (due to any reason) than the scheduled itinerary plan</li>
                    <li>Travel and rescue insurance</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`relative bg-white`}>
          <PackageImageComponent images={product.images}/>
        </div>
        {
          product.itineraries.map((item,index) => <ItineraryComponent key={index} left={index % 2 != 0} data={item} length={product.itineraries.length-1} indexPos={index} />)
        }
        <div className='left-0 bottom-0 w-full z-[40] bg-green-900 py-28 md:py-8'>
          <div className='xl:max-w-7xl lg:max-w-6xl md:max-w-3xl sm:max-w-xl mx-auto w-full px-8'>
            <div className='flex flex-wrap'>
              <div className='w-full md:w-6/12'>
                <span className='mt-1 inline-block'>From US ${product.price}</span>
                <HeadingText level={2} classList={"text-3xl mt-1 font-bold"}>{product.title}</HeadingText>
              </div>
              <div className='w-full md:w-6/12 flex flex-wrap items-center justify-end md:space-x-8 border-t md:border-0 border-gray-900 pt-8 md:pt-0 mt-8 md:mt-0'>
                <div className='w-full md:w-auto mb-4'>
                  <div className='text-center text-sm'>
                    <span className='font-medium block'>Contact our experts</span> 
                    <span className='block text-2xl font-bold'>+977 9840403009</span>
                  </div>
                </div>
                <ButtonComponent whiteColored={true} href={`/book/${product.slug}`} tagType={"a"} className='w-full md:w-auto text-center'>Book Your Trek</ButtonComponent>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
