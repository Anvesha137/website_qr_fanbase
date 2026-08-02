import React from 'react';

interface TextRollProps {
  children: React.ReactNode;
  className?: string;
}

export default function TextRoll({ children, className = '' }: TextRollProps) {
  return (
    <span className={`relative inline-flex overflow-hidden ${className}`}>
      <span className="inline-flex items-center gap-1.5 transition-transform duration-300 ease-out group-hover:-translate-y-[120%]">
        {children}
      </span>
      <span className="absolute inset-0 inline-flex items-center gap-1.5 translate-y-[120%] transition-transform duration-300 ease-out group-hover:translate-y-0">
        {children}
      </span>
    </span>
  );
}
