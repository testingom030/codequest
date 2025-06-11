import React, { useState } from 'react';
import Tag from '../components/Tag';

interface TagData {
  name: string;
  count: number;
  description: string;
  isPopular?: boolean;
}

const TagsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // This would normally come from an API
  const tags: TagData[] = [
    {
      name: 'javascript',
      count: 2340789,
      description: 'For questions regarding programming in ECMAScript (JavaScript/JS) and its various dialects/implementations (excluding ActionScript). Please include all relevant tags on your question;',
      isPopular: true
    },
    {
      name: 'python',
      count: 1989234,
      description: 'Python is a multi-paradigm, dynamically typed, multipurpose programming language. It is designed to be quick to learn, understand, and use, and enforces a clean and uniform syntax.',
      isPopular: true
    },
    {
      name: 'java',
      count: 1765432,
      description: 'Java is a high-level object oriented programming language. Use this tag when you\'re having problems using or understanding the language itself.',
      isPopular: true
    },
    {
      name: 'c#',
      count: 1543678,
      description: 'C# (pronounced "see sharp") is a high level, statically typed, multi-paradigm programming language developed by Microsoft',
      isPopular: true
    },
    {
      name: 'php',
      count: 1432567,
      description: 'PHP is a widely used, open source, general-purpose, multi-paradigm, dynamically typed and interpreted scripting language originally designed for server-side web development',
      isPopular: true
    },
    {
      name: 'android',
      count: 1345678,
      description: 'Android is Google\'s mobile operating system, used for programming or developing digital devices (Smartphones, Tablets, Automobiles, TVs, Wear, Glass, IoT).',
      isPopular: true
    },
    {
      name: 'html',
      count: 1234567,
      description: 'HTML (HyperText Markup Language) is the markup language for creating web pages and other information to be displayed in a web browser.',
      isPopular: true
    },
    {
      name: 'css',
      count: 1123456,
      description: 'CSS is a representation style sheet language used for describing the look and formatting of HTML, XML documents and SVG elements including colors, layout, fonts, and animations',
      isPopular: true
    },
    // Add more tags as needed
  ];

  const filteredTags = tags.filter(tag => 
    tag.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="w-full max-w-[1100px] mx-auto px-6 py-[24px]">
      <div className="flex justify-between items-center mb-4 pb-4 border-b border-[#E3E6E8]">
        <div>
          <h1 className="text-[27px] leading-[1.3] text-[#232629] mb-[4px]">Tags</h1>
          <p className="text-[15px] leading-[19px] text-[#6A737C] max-w-[630px]">
            A tag is a keyword or label that categorizes your question with other similar questions.
            Using the right tags makes it easier for others to find and answer your question
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Filter by tag name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-[200px] h-[32.59px] bg-white border border-[#BABFC4] rounded-[3px] pl-[32px] pr-[9px] text-[13px] placeholder-[#838C95] focus:outline-none focus:border-[#6BBBF7] focus:ring-4 focus:ring-[#D9EAF7]"
            />
            <svg
              className="absolute left-[8px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#838C95]"
              fill="currentColor"
              viewBox="0 0 18 18"
            >
              <path d="m18 16.5-5.14-5.18h-.35a7 7 0 1 0-1.19 1.19v.35L16.5 18l1.5-1.5ZM12 7A5 5 0 1 1 2 7a5 5 0 0 1 10 0Z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-x-[30px] gap-y-[48px]">
        {filteredTags.map((tag) => (
          <div key={tag.name} className="flex flex-col">
            <div className="mb-[12px]">
              <Tag name={tag.name} count={tag.count} />
            </div>
            <p className="text-[13px] leading-[17px] text-[#3B4045] break-words">
              {tag.description}
            </p>
          </div>
        ))}
      </div>

      {filteredTags.length === 0 && (
        <div className="text-center py-12 text-[#6A737C]">
          No tags found matching '{searchQuery}'
        </div>
      )}
    </div>
  );
};

export default TagsPage;
