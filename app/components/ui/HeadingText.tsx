import React, { FC, ReactNode } from 'react';
import { headingFont } from 'app/fonts';
import 'app/components/ui/scss/heading.scss';
import Link from 'next/link';

interface HeadingTextProps {
  level: number;
  classList: string;
  children: string; // Enforce string type for children
  link?:string;
  headingText?:boolean;
}

const HeadingText: FC<HeadingTextProps> = ({ level, headingText=true, classList, link="", children, ...rest }) => {
  const className = `${headingText ? 'heading-text' : ''} ${classList} ${headingFont.className} transition-colors duration-300 ease-out-quint tracking-tighter`;
  const headingLevels = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

  if (level < 1 || level > 6) {
    // Handle invalid level values
    return null;
  }

  const HeadingTag = headingLevels[level - 1] as keyof JSX.IntrinsicElements;

  return (
    <div className='relative w-full'>
      <HeadingTag
        {...rest}
        className={className}
        dangerouslySetInnerHTML={{ __html: children }}
      />
      {
        link != "" &&
        <Link href={link} className='opacity-0 absolute top-0 left-0 w-full h-full'>click here</Link>
      }
    </div>
  );
};

export default HeadingText;
