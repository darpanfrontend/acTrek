"use client"
import React, { FC } from 'react';
import YouTube,{YouTubeProps} from 'react-youtube';

interface YoutubeComponentProps {
  videoId?: string;
  className:string;
  iframeClassName:string;
}

const YoutubeComponent: FC<YoutubeComponentProps> = ({videoId,className,iframeClassName}) => {
  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  const opts: YouTubeProps['opts'] = {
    height: '100%',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      controls:0,
    },
  };

  return (
    <YouTube 
        videoId={videoId} 
        className={className}
        iframeClassName={iframeClassName}
        opts={opts} 
        onReady={onPlayerReady} 
    />
  );
}

export default YoutubeComponent;