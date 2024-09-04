export interface Review {
    id: number;
    product_id: number;
    title: string;
    review: string;
    reviewer_name: string;
    review_platform: string;
    rating: number;
    review_date: string;
}
export interface Banner {
    title: string;
    slogan: string;
    images: {
        source: string;
        alt: string
    }[];
    description: string;
    link: string;
}
export interface Product {
    id:number,
    title: string;
    duration: number;
    featured_image: {
        source: string;
        alt: string
    }[];
    images: {
        source: string;
        alt: string
    }[];
    description: string;
    slug: string;
    status: number;
    exclusive: number;
    on_homepage: number;
    video_id:string;
    price:string;
    heading:string;
    map_url:string;
    altitude:string;
    group_size:string;
    difficulty:string;
    package_type:string;
    included:string;
    excluded:string;
    best_time:string;
    itineraries:ItinerariesProps[];
}
export interface Region {
    id:number,
    title: string;
    slogan: string;
    description: string;
    slug: string;
    featured_image: {
        source: string;
        alt: string
    }[];
    images: {
        source: string;
        alt: string
    }[];
    best_time_description:string;
    products:Product[]

}
export interface Teams {
    id:number,
    name: string;
    post: string;
    fb: string;
    instagram: string;
    images: {
        source: string;
        alt: string
    }[];
}
export interface Blogs {
    id:number,
    title: string;
    article: string;
    slug: string;
    images: {
        source: string;
        alt: string
    }[];
    featured:Number;
    status:Number;
    created_at:string;
}
export interface Press {
    id:number,
    title: string;
    description: string;
    url: string;
    images: {
        source: string;
        alt: string
    }[];
}
export interface ItinerariesProps {
    id:number;
    product_id:number;
    heading:string;
    description:string;
    accomodation:string;
    transportation:string;
    images:{
        source:string;
        alt:string;
    }[];
}
export interface FormProps {
  name: string;
  email: string;
  phone?: string; // Optional phone number
  message: string;
}
export interface BookingProps {
    product:string;
    name: string;
    email: string;
    phone?: string; // Optional phone number
    message: string;
    country:string;
    pax:string;
}
export interface SuggestProps {
  name: string;
  email: string;
}