import get_image_from_path from "app/components/actions/helpers"
import { notFound } from "next/navigation";

// generateMetadata.js
export async function getMeta(slug:string){
    // fetch data
    const meta = await fetch(`${process.env.APIURL}/meta-data/${slug}`).then((res) => res.json())
    return {
      title: meta.title,
      description: meta.description,
      openGraph: {
        images: [{
          url: get_image_from_path(meta.images[0].source),
          width: 800,
          height: 600,
          alt: meta.images[0].alt,
        }],
      }
    }
}
export async function fetchData(slug:string){
  const res = await fetch(`${process.env.APIURL}/${slug}`);
  console.log(`${process.env.APIURL}/${slug}`)
  if (!res.ok) {
    notFound();
  }
  return res.json();
}