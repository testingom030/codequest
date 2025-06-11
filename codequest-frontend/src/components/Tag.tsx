import React from 'react';
import { Link } from 'react-router-dom';

interface TagProps {
  name: string;
  count?: number;
  className?: string;
  size?: 'sm' | 'md';
  isLink?: boolean;
}

const Tag: React.FC<TagProps> = ({
  name,
  count,
  className = '',
  size = 'md',
  isLink = true,
}) => {
  const sizeClasses = {
    sm: 'px-[6px] py-[2px] text-[12px] leading-[12px]',
    md: 'px-[6px] py-[4.8px] text-[12px] leading-[12px]',
  };

  const baseClasses = `
    group inline-flex items-center gap-[2px] rounded-[3px]
    text-[#2C5877] bg-[#E1ECF4] hover:bg-[#D0E3F1]
    whitespace-nowrap border border-transparent
    ${sizeClasses[size]}
    ${className}
  `;

  const content = (
    <>
      {name}      {count !== undefined && (
        <span className="text-[#2C5877]/70 group-hover:text-[#2C5877]/80">
          {count.toLocaleString()}
        </span>
      )}
    </>
  );

  if (isLink) {
    return (
      <Link to={`/questions/tagged/${name}`} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return (
    <div className={baseClasses}>
      {content}
    </div>
  );
};

export default Tag;
