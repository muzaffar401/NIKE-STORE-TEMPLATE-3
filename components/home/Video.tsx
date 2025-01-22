import React from 'react';

const Video = () => {
  return (
    <div
      style={{
        position: 'relative',
        maxWidth: '100%',
        paddingTop: '48.25%' 
      }}
    >
      {/* Video Embed */}
      <video
        src="/video.mp4"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover', // Ensures the video fits properly
        }}
        muted
        autoPlay
        loop
      ></video>

      {/* Overlay to block interactions */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'transparent',
          zIndex: 1,
        }}
        title="Video interactions are blocked"
      ></div>
    </div>
  );
};

export default Video;
