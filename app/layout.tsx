import { ReactNode } from 'react';
import 'material-icons/iconfont/material-icons.css';
import './globals.scss';
import SiteHeader from './layouts/header';
import SiteFooter from './layouts/footer';
import { bodyFont } from './fonts';
interface LayoutProps {
  children:ReactNode
}

async function getData() {
  const res = await fetch(`${process.env.APIURL}/company-data`)
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}
export default async function RootLayout({ children }:LayoutProps){
  const data = await getData()
  return (
    <html lang="en">
      <body className={`${bodyFont.className} font-[300] text-gray-900`}>
        {/* <Preloader/> */}
        {/* animations */}
        <SiteHeader data={data}/>
        <main className='bg-white'>
          {children}
        </main>
        <SiteFooter data={data}/>
      </body>
    </html>
  );
}