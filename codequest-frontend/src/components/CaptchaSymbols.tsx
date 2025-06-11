import React, { useState, useCallback } from 'react';

interface CaptchaSymbolsProps {
  onSelectionChange?: (selected: number[]) => void;
}

const CaptchaSymbols: React.FC<CaptchaSymbolsProps> = ({ onSelectionChange }) => {
  const [selected, setSelected] = useState<number[]>([]);

  const handleClick = useCallback((index: number) => {
    setSelected((prev) => {
      const newSelected = prev.includes(index) 
        ? prev.filter((i) => i !== index) 
        : [...prev, index];
      onSelectionChange?.(newSelected);
      return newSelected;
    });
  }, [onSelectionChange]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(index);
    }
  }, [handleClick]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-sm text-gray-600">
        Select all matching symbols:
      </div>
      <div className="flex gap-4">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            role="checkbox"
            aria-checked={selected.includes(index)}
            tabIndex={0}
            className={`w-[48px] h-[48px] border-2 ${
              index === 0 ? 'border-[#379FEF]' : 
              index === 1 ? 'border-[#F48024]' : 
              'border-[#0A0D0F]'
            } rounded-md flex items-center justify-center cursor-pointer
            transition-colors duration-200 hover:bg-opacity-80 
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              selected.includes(index) 
                ? index === 0 ? 'bg-blue-100' 
                : index === 1 ? 'bg-orange-100' 
                : 'bg-gray-200'
                : ''
            }`}
            onClick={() => handleClick(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          >
            {index === 0 ? (
              <svg width="32" height="37" viewBox="0 0 32 37" fill="none">
                <path d="M26 33v-9h4v13H0V24h4v9h22Z" fill="#379FEF"/>
                <path d="M21.5 0h-11L0 11v4.48L10.5 4h3.03L4 15.84v4.49L13.5 8h3.03L7 20.16v4.49L16.5 12h3.03L10 24.51v4.49L19.5 16h3.03L13 28.84v4.49L23.5 20H27L16.5 32.33V37h-1V32.33L5 20h3.5L19 33.33V37h1V33.33L30.5 20h1.22L21.5 32v4.49L32 24.51v-4.49L21.5 28v-4.49L32 15.84v-4.49L21.5 20v-4.49L32 7.01V4L21.5 0Z" fill="#379FEF"/>
              </svg>
            ) : index === 1 ? (
              <svg width="32" height="38" viewBox="0 0 32 38" fill="none">
                <path d="M16 0 0 10v15.36L16 35l16-9.64V10L16 0Zm13 24.36-13 7.84-13-7.84V11.64l13-7.84 13 7.84v12.72Z" fill="#F48024"/>
                <path d="m16 15.1 8 4.8V25l-8-4.8-8 4.8v-5.1l8-4.8Zm0-3.3L7.1 16 16 20.2 24.9 16 16 11.8Z" fill="#F48024"/>
              </svg>
            ) : (
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                <path d="M21 4V0h2v4h3v2h-3v3h-2V6h-3V4h3ZM13.4 4.94l4.39 1.32 1.32 4.4-3.53 3.53-4.4-1.32-1.31-4.4 3.53-3.53ZM7.2 10h2v2h-2v-2Zm5.9 5.9h2v2h-2v-2Zm-5.9 6h2v2h-2v-2Z" fill="#0A0D0F"/>
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaptchaSymbols;