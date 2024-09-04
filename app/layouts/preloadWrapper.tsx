import React, { FC } from 'react';
import Logo from '../components/ui/logo';

const Preloader: FC = () => {
  return (
    <div className='fixed h-screen w-full z-50 bg-white'>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <Logo/>
        </div>
        <div className='grid grid-cols-4'>
            <div className='h-screen bg-white grid-anim-1'></div>
            <div className='h-screen bg-white grid-anim-1'></div>
            <div className='h-screen bg-white grid-anim-1'></div>
            <div className='h-screen bg-white grid-anim-1'></div>
        </div>
    </div>
  );
}

export default Preloader;