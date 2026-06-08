import React from 'react';

export default function Loader() {
  const count = 10;
  const delay = 140; // ms
  return (
    <div
      aria-hidden={false}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: '#241713' }}
    >
      <div className="loader-wrap" aria-hidden>
        <div className="dots-stage" id="dots">
          {Array.from({ length: count }).map((_, i) => (
            <div className="dot-wrap" key={i}>
              <div className="dot" style={{ animationDelay: `${i * delay}ms` }} />
              <div className="ripple" style={{ animationDelay: `${i * delay}ms` }} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .loader-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3rem 0;
        }
        .dots-stage {
          display: flex;
          align-items: flex-end;
          gap: 14px;
          height: 60px;
        }
        .dot-wrap {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          height: 60px;
        }
        .dot {
          width: 11px;
          height: 11px;
          border-radius: 50%;
          background: #FAF7F4;
          animation: bounce 1.6s cubic-bezier(0.33, 0, 0.66, 0) infinite;
        }
        .ripple {
          position: absolute;
          bottom: -1px;
          width: 11px;
          height: 5px;
          border-radius: 50%;
          border: 1.5px solid #8B807A;
          opacity: 0;
          animation: ripple 1.6s ease-out infinite;
        }
        @keyframes bounce {
          0%   { transform: translateY(0);     animation-timing-function: ease-in; }
          50%  { transform: translateY(-28px); animation-timing-function: ease-in; }
          100% { transform: translateY(0); }
        }
        @keyframes ripple {
          0%   { transform: scaleX(1); opacity: 0.7; }
          18%  { transform: scaleX(3); opacity: 0; }
          49%  { opacity: 0; }
          50%  { transform: scaleX(1); opacity: 0.7; }
          68%  { transform: scaleX(3); opacity: 0; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
