import React from 'react';

interface LoaderProps {
  exiting?: boolean;
}

export default function Loader({ exiting = false }: LoaderProps) {
  return (
    <div
      aria-hidden={false}
      className="fixed inset-0 z-[9999]"
      style={{
        backgroundImage: 'url(/32cdcee6-1171-11ee-a9d3-97c6c8303a4c.gif)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: exiting ? 0 : 1,
        transition: exiting ? 'opacity 0.7s ease' : 'none',
      }}
    />
  );
}
