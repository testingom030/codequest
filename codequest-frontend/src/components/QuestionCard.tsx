import React from 'react';
import { Link } from 'react-router-dom';
import Stats from './Stats';
import Tag from './Tag';

interface QuestionCardProps {
  title: string;
  body: string;
  votes: number;
  answers: number;
  author: string;
  createdAt: string;
  tags: string[];
  id: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  title,
  body,
  votes,
  answers,
  author,
  createdAt,
  tags,
  id,
}) => {  return (
    <div className="border-b border-stackoverflow-border px-4 py-6 group hover:bg-[#F8F9F9]">
      <div className="flex">
        <div className="flex-shrink-0 mr-4 mb-4">
          <Stats
            votes={votes}
            answers={answers}
            views={0} // Add views count to props if available
            isAnswered={answers > 0}
          />
        </div>
        <div className="flex-grow min-width-0">
          <div className="flex flex-col gap-2">
            <h3 className="mb-[5px] pr-[24px] text-[#0074CC] hover:text-stackoverflow-btn-hover break-words">
              <Link to={`/questions/${id}`} className="text-current">
                {title}
              </Link>
            </h3>
            <div className="overflow-hidden text-[13px] text-[#3B4045] line-clamp-2 mb-2">
              {body}
            </div>
            <div className="flex items-center justify-between flex-wrap mt-auto">
              <div className="flex flex-wrap gap-[4px]">
                {tags.map((tag) => (
                  <Tag key={tag} name={tag} />
                ))}
              </div>
              <div className="flex items-center gap-2 ml-auto text-[12px] text-[#6A737C] mt-2">
                <div className="flex-shrink-0">
                  asked <span className="mr-[2px]">{createdAt}</span>
                </div>
                <Link 
                  to={`/users/${author}`}
                  className="flex items-center text-[#0074CC] hover:text-stackoverflow-btn-hover"
                >
                  <img
                    src="/default-avatar.svg"
                    alt={author}
                    className="w-4 h-4 rounded mr-1"
                  />
                  {author}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;