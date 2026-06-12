import React from 'react';

export default function Loader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85">
      <div className="rounded-3xl bg-[#0b0b0b]/95 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.55)] border border-white/10 flex items-center justify-center">
        <img
          src="/32cdcee6-1171-11ee-a9d3-97c6c8303a4c.gif"
          alt="Loading animation"
          className="w-40 h-auto"
          style={{ maxWidth: '100%', display: 'block' }}
        />
      </div>
    </div>
  );
}
