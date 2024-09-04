import HeadingText from 'app/components/ui/HeadingText'
import { Product } from 'app/api_interfaces/ApiProps'
import 'app/packages/components/scss/package.scss'
import { fetchData, getMeta } from 'app/api_interfaces/apiFetch'
import { Metadata } from 'next'
import BookForm from '../BookForm'
import { sectionBg } from 'app/components/actions/helpers'

interface PackageProps {
  params: {
    slug: string;
  };
}

async function getData(slug: string): Promise<{ product: Product }> {
  return fetchData(`get-product/${slug}`)
}

export async function generateMetadata({params}:PackageProps): Promise<Metadata> {
    return getMeta('bookingpage');
}

export default async function BookComponent({ params }: PackageProps): Promise<JSX.Element> {
  const { product } = await getData(params.slug);
  return (
    <>
      <section className={`${sectionBg}`}>
        <div className={`relative pt-40 pb-40`}>
          <div className="xl:max-w-7xl lg:max-w-6xl md:max-w-3xl sm:max-w-xl px-8 mx-auto">
            <div className="flex flex-wrap">
              <div className='w-full lg:w-9/12'>
                <div className='w-full '>
                  <HeadingText level={2} classList='text-4xl lg:text-5xl xl:text-6xl mb-8 font-bold'>{`Book Your <span class="block">${product.title}</span>`}</HeadingText>
                </div>
              </div>
              <BookForm product={`${product.title} - ${product.duration} days`} url={`${process.env.APIURL}/send-email/booking`} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
