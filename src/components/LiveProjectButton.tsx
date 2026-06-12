import React from 'react';

interface Props {
  id?: string;
  label?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const LiveProjectButton: React.FC<Props> = ({ id, label = 'View', onClick }) => {
  return (
    <button
      id={id}
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) onClick(e);
      }}
      className="inline-flex items-center justify-center px-3 py-2 border border-[#D7E2EA]/20 text-[#D7E2EA] bg-transparent rounded-md text-xs font-medium hover:bg-[#D7E2EA]/6"
    >
      {label}
    </button>
  );
};

export default LiveProjectButton;
