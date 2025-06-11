import React from 'react';

type BadgeVariant = 'gold' | 'silver' | 'bronze';
type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  count?: number;
  className?: string;
}

const variantColors = {
  gold: {
    dot: 'text-[#FFCC01]',
    text: 'text-[#6A737C]',
  },
  silver: {
    dot: 'text-[#B4B8BC]',
    text: 'text-[#6A737C]',
  },
  bronze: {
    dot: 'text-[#D1A684]',
    text: 'text-[#6A737C]',
  },
};

const sizeClasses = {
  sm: {
    wrapper: 'text-[11px] gap-[4px]',
    dot: 'w-[6px] h-[6px]',
  },
  md: {
    wrapper: 'text-[13px] gap-[5px]',
    dot: 'w-[8px] h-[8px]',
  },
};

const Badge: React.FC<BadgeProps> = ({
  variant = 'bronze',
  size = 'sm',
  count,
  className = '',
}) => {
  const colors = variantColors[variant];
  const sizes = sizeClasses[size];

  return (
    <div className={`inline-flex items-center ${sizes.wrapper} ${className}`}>
      <span className={`inline-block rounded-full ${colors.dot} ${sizes.dot}`} />
      {count !== undefined && (
        <span className={colors.text}>{count}</span>
      )}
    </div>
  );
};

export default Badge;
