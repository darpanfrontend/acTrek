import { FC,ReactNode } from 'react';
import Link from 'next/link';
import { headingFont } from '../../fonts';

interface ButtonComponentProps {
  href?: string;
  small?: boolean;
  className?: string;
  tagType?: string;
  children: ReactNode;
  whiteColored?:boolean;
  [key: string]: any
}

const ButtonComponent: FC<ButtonComponentProps> = ({
  href = "#",
  small = false,
  className = "",
  tagType,
  whiteColored=false,
  children,
  ...rest
}) => {
  const smClasses = small ? 'py-3 px-6' : 'py-4 px-8';
  const bg = whiteColored ? 'bg-gray-900' : 'bg-green-900';
  const bgBack = whiteColored ? 'bg-white' : 'bg-gray-900';
  return (
    <div className={`${className} ${headingFont.className} inline-block font-bold relative group ${whiteColored ? 'text-white hover:text-gray-900 border-gray-900' : 'text-gray-900 hover:text-white border-gray-900'} transition-colors duration-300 ease-in-out-quart border-2 p-1 uppercase text-xl`}>
      {
        tagType === "a" ?
          <Link {...rest} href={href} className={`${smClasses} inline-block w-full h-full align-middle relative`}>
            <span className='relative z-[2] pointer-events-none w-full h-full'>
              {children}
            </span>
            <span className={`${bg} h-full w-full absolute top-0 left-0 z-[0] group-hover:h-[0%] transition-[height] duration-300 ease-in-out-quart`} />
            <span className={`${bgBack} h-[0%] w-full absolute top-0 left-0 z-[1] group-hover:h-full transition-[height] duration-300 ease-in-out-quart`} />
          </Link> :
          <button {...rest} className={`${smClasses} px-8 inline-block w-full h-full align-middle relative`}>
            <span className='relative z-[2] pointer-events-none w-full h-full'>
              {children}
            </span>
            <span className={`${bg} h-full w-full absolute top-0 left-0 z-[0] group-hover:h-[0%] transition-[height] duration-300 ease-in-out-quart`} />
            <span className={`${bgBack} h-[0%] w-full absolute top-0 left-0 z-[1] group-hover:h-full transition-[height] duration-300 ease-in-out-quart`} />
          </button>
      }
    </div>
  );
}

export default ButtonComponent;