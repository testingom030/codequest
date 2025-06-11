import React from 'react';

interface StatItemProps {
  count: number;
  label: string;
  variant?: 'default' | 'answered' | 'accepted' | 'bounty';
  className?: string;
}

const getVariantClasses = (variant: string) => {
  switch (variant) {
    case 'answered':
      return 'text-[#2F6F44] bg-[#2F6F44]/10';
    case 'accepted':
      return 'text-white bg-[#2F6F44]';
    case 'bounty':
      return 'text-[#0074CC] bg-[#0074CC]/10';
    default:
      return 'text-[#6A737C]';
  }
};

const StatItem: React.FC<StatItemProps> = ({
  count,
  label,
  variant = 'default',
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center text-center min-w-[58px] ${className}`}>
      <span className={`text-[17px] leading-[17px] py-[5px] px-[5px] rounded ${getVariantClasses(variant)}`}>
        {count}
      </span>
      <span className="text-[11px] text-[#6A737C] mt-[4px]">{label}</span>
    </div>
  );
};

interface StatsProps {
  votes: number;
  answers: number;
  views: number;
  isAnswered?: boolean;
  isAccepted?: boolean;
  hasBounty?: number;
  className?: string;
}

const Stats: React.FC<StatsProps> = ({
  votes,
  answers,
  views,
  isAnswered = false,
  isAccepted = false,
  hasBounty,
  className = '',
}) => {
  return (
    <div className={`flex gap-[12px] ${className}`}>
      <StatItem count={votes} label="votes" />
      <StatItem
        count={answers}
        label="answers"
        variant={isAccepted ? 'accepted' : isAnswered ? 'answered' : 'default'}
      />
      {hasBounty && (
        <StatItem
          count={hasBounty}
          label="bounty"
          variant="bounty"
        />
      )}
      <StatItem count={views} label="views" />
    </div>
  );
};

export { Stats, StatItem };
export default Stats;
