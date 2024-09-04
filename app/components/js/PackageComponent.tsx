import { FC } from "react";
import HeadingText from "../ui/HeadingText";
import ImageComponent from "./ImageComponent";
import Link from "next/link";


interface PackageProps {
    className?:string;
    imageSource?:string;
    imageAlt?:string;
    duration?:number;
    title?:string;
    description?:string;
    link?:string;
    slug?:string;
}

const PackageComponent: FC<PackageProps> = ({ className="", imageSource='/images/8.jpg',imageAlt="image alt", duration="2",title="Everest Base Camp Trek",description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit amet itaque delectus animi",link="ok", slug="" }) => {
  return (
    <div className={`${className} relative transform group ease-out-quint overflow-hidden`}>
        <div className="h-[400px] group-hover:grayscale filter grayscale-0 transition-filter duration-300 ease-out-quint relative">
            <ImageComponent
                src={imageSource}
                alt={imageAlt}
                className="object-cover"
                fill={true}
                priority
            />
            <Link href={link} className="w-full h-full opacity-0 absolute top-0 left-0">{title}</Link>
        </div>
        <div className='w-full mt-8'>
            <div className='text-left'>
                <span>{duration}days</span>
                <HeadingText level={2} link={link} classList={"text-4xl font-bold"}>{title}</HeadingText>
                <p className='py-6'>{description}</p>
                <Link href={link} className="text-lg transition-[colors,padding] duration-300 ease-out-quint w-full group-hover:font-semibold relative pl-12 group-hover:pl-16 block">
                    Read more
                    <span className="bg-gray-900 bottom-0 w-8 transform top-1/2 -translate-y-1/2 h-[2px] left-0 absolute transition-[background-color,width] duration-300 group-hover:w-12 ease-out-quint"/>
                </Link>
            </div>
        </div>
    </div>
  );
}
export default PackageComponent;
