import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ className = '' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative flex-1 max-w-[692px] ${className}`}>
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className="w-full h-[32.59px] bg-white border border-stackoverflow-border rounded-[3px] pl-[32px] pr-[32px] text-[13px] leading-[17px] placeholder-[#838C95] focus:outline-none focus:border-stackoverflow-btn focus:ring-[4px] focus:ring-stackoverflow-btn/10"
          aria-label="Search"
          data-controller="s-popover"
          data-action="focus->s-popover#show blur->s-popover#hide"
        />        <svg
          className="absolute left-[8px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#838C95] pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 18 18"
        >
          <path
            d="m18 16.5-5.14-5.18h-.35a7 7 0 1 0-1.19 1.19v.35L16.5 18l1.5-1.5ZM12 7A5 5 0 1 1 2 7a5 5 0 0 1 10 0Z"
            fill="currentColor"
          />
        </svg>
        <div className="hidden group-focus-within:block absolute right-[8px] top-1/2 -translate-y-1/2 text-[11px] text-[#838C95] pointer-events-none bg-[#F1F2F3] px-[4px] rounded">
          Press Enter to search
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
