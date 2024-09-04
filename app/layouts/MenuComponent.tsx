import React, { FC } from 'react';
import { domAnimation, LazyMotion, m } from "framer-motion";
import Link from 'next/link';
import { headingFont } from 'app/fonts';
const MenuComponent: FC<{ menu: boolean; openMenu: () => void }> = ({ menu, openMenu }) => {
    return (
        <LazyMotion features={domAnimation}>
            <m.div animate={menu ? "visible" : "hidden"}
                variants={{
                    visible: {opacity:1,pointerEvents:"initial", transition:{delay:0}},
                    hidden: {opacity:0,pointerEvents:"none", transition:{delay:0.5}}
                }}
                initial="hidden" transition={{duration:0.25}} className="h-screen overflow-hidden w-screen fixed top-0 left-0 flex justify-end z-[100] ease-out-quint text-gray-900">
                <m.div 
                animate={menu ? "visible" : "hidden"}
                variants={{
                    visible: {opacity:1, transition:{delay:0.25}},
                    hidden: {opacity:0, transition:{delay:0.4}}
                }} transition={{duration:0.25}} className='absolute top-12 right-12 z-[2]'>
                    <span className="material-icons-outlined text-5xl" onClick={openMenu}>close</span>
                </m.div>
                <div className='w-full md:lg-10/12 lg:w-9/12 xl:w-4/12 h-full bg-green-900 relative z-[1] flex items-first border-l-2 p-8 sm:p-20 border-gray-900'>
                    <ul className='h-full relative w-full'>
                        <li className='uppercase overflow-hidden py-4'>
                            <Link href={"/about"} onClick={openMenu} className={`${headingFont.className} w-full text-3xl font-bold block overflow-hidden`}>
                                <m.span 
                                    animate={menu ? "visible" : "hidden"} 
                                    variants={{
                                        visible: {bottom:0,transition:{delay:0.5}},
                                        hidden: {bottom:"-400px",transition:{delay:0.3}}
                                    }} 
                                    transition={{duration:0.25}} className='pointer-events-none relative'>
                                        About
                                    </m.span>
                            </Link>
                        </li>
                        <li className='uppercase overflow-hidden py-4'>
                            <Link href={"/contact"} onClick={openMenu} className={`${headingFont.className} w-full text-3xl font-bold block overflow-hidden`}>
                                <m.span 
                                    animate={menu ? "visible" : "hidden"} 
                                    variants={{
                                        visible: {bottom:0,transition:{delay:0.5}},
                                        hidden: {bottom:"-400px",transition:{delay:0.3}}
                                    }}
                                    transition={{duration:0.25}} className='pointer-events-none relative'>
                                        Contact
                                    </m.span>
                            </Link>
                        </li>
                        <li className='uppercase overflow-hidden py-4'>
                            <Link href={"/blogs"} onClick={openMenu} className={`${headingFont.className} w-full text-3xl font-bold block overflow-hidden`}>
                                <m.span 
                                    animate={menu ? "visible" : "hidden"} 
                                    variants={{
                                        visible: {bottom:0,transition:{delay:0.5}},
                                        hidden: {bottom:"-400px",transition:{delay:0.3}}
                                    }}
                                    transition={{duration:0.25}} className='pointer-events-none relative'>
                                        Our Blogs
                                    </m.span>
                            </Link>
                        </li>
                        <li className='uppercase overflow-hidden py-4 pb-12'>
                            <Link href={"/press-articles"} onClick={openMenu} className={`${headingFont.className} w-full text-3xl font-bold block overflow-hidden`}>
                                <m.span 
                                    animate={menu ? "visible" : "hidden"} 
                                    variants={{
                                        visible: {bottom:0,transition:{delay:0.5}},
                                        hidden: {bottom:"-400px",transition:{delay:0.3}}
                                    }}
                                    transition={{duration:0.25}} className='pointer-events-none relative'>
                                        Press Articles
                                    </m.span>
                            </Link>
                        </li>
                        <li className='pt-12 flex flex-wrap items-center overflow-hidden absolute bottom-0 w-full'>
                            <m.span 
                            animate={menu ? "visible" : "hidden"}
                            variants={{
                                visible: {left:"0px", transition:{delay:0.75}},
                                hidden: {left:"-1000px", transition:{delay:0.2}}
                            }} transition={{duration:0.25}} className='block relative'>
                                <a target='_blank' href='https://www.facebook.com/trek8586' className='inline-block mr-2 last:mr-0 leading-tight'>Facebook | </a>
                                <a target='_blank' href='https://www.instagram.com/trek8586' className='inline-block mr-2 last:mr-0 leading-tight'>Instagram | </a>
                                <a target='_blank' href='https://www.tiktok.com/@trek8586' className='inline-block mr-2 last:mr-0 leading-tight'>Tiktok</a>
                                <a target='_blank' href='https://www.youtube.com/channel/trek8586' className='inline-block mr-2 last:mr-0 leading-tight'>Youtube</a>
                            </m.span>
                        </li>
                    </ul>
                </div>
                <m.div 
                animate={menu ? "visible" : "hidden"}
                variants={{
                    visible: {height:"100%",transition:{delay:0}},
                    hidden: {height:"0%",transition:{delay:0.5}}
                }} transition={{duration:0.25}} className="absolute  w-full bg-white bg-opacity-90 top-0 left-0 z-0"/>
            </m.div>
        </LazyMotion>
    )
}

export default MenuComponent;