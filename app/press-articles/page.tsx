import HeadingText from 'app/components/ui/HeadingText'
import ImageComponent from 'app/components/js/ImageComponent'
import { Press } from 'app/api_interfaces/ApiProps'
import get_image_from_path, { splitContent } from 'app/components/actions/helpers';
import ButtonComponent from 'app/components/ui/ButtonComponent';
import { fetchData, getMeta } from 'app/api_interfaces/apiFetch';
import { Metadata } from 'next';

async function getData(): Promise<{ press: Press[] }> {
  return fetchData(`get-all-press`)
}

export async function generateMetadata(): Promise<Metadata> {
    return getMeta('presspage');
}
export default async function PressPage(): Promise<JSX.Element> {
    const { press } = await getData();
    return (
        <>
            <section className={`relative pt-40 pb-8`}>
                <div className='xl:max-w-7xl lg:max-w-6xl md:max-w-3xl sm:max-w-xl px-8 mx-auto w-full relative'>
                    <div className='w-full'>
                        <div className="w-full relative flex pr-20">
                            <div className='text-left'>
                                <HeadingText level={1} classList={"text-5xl font-bold"}>Press Releases</HeadingText>
                                <p className='mt-4'>Check out the coverage of Trek 8586 in popular medias </p>
                            </div>
                        </div>
                    </div>
                    {
                        press.map(item =>
                            <div key={item.id} className='w-full'>
                                <div className="flex flex-wrap lg:flex-nowrap lg:flex-row lg:space-x-12 border-t border-b border-gray-200 last:border-t-0 border-opacity-20 pt-12 pb-20">
                                    <div className='w-full lg:w-1/2 xl:w-8/12 h-[400px] lg:h-auto'>
                                        <ImageComponent
                                            src={get_image_from_path(item.images[0].source)}
                                            alt={item.images[0].alt}
                                            className="object-cover"
                                            fill={true}
                                            priority
                                        />
                                    </div>
                                    <div className='w-full lg:w-1/2 xl:w-4/12'>
                                            <HeadingText level={2} classList={"text-4xl font-bold mb-8"}>
                                                {item.title}
                                            </HeadingText>
                                            <div className='mb-8' dangerouslySetInnerHTML={{__html:item.description}}/>
                                            <ButtonComponent tagType='a' target="_blank" href={item.url}>Read this Article</ButtonComponent>
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
