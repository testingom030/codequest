import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';

const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('interesting');
  const [activeFilter, setActiveFilter] = useState('newest');
  
  // This would normally come from an API
  const questions = [
    {
      id: '1',
      title: "How to use useEffect in React?",
      body: "I'm new to React hooks and I'm trying to understand how useEffect works. Can someone explain the basic concept and provide some examples of common use cases?",
      votes: 10,
      answers: 3,
      views: 125,
      author: "john_doe",
      createdAt: "2 hours ago",
      tags: ["react", "javascript", "hooks"]
    },
    {
      id: '2',
      title: "What's the difference between var, let, and const?",
      body: "I'm confused about when to use var, let, and const in JavaScript...",
      votes: 15,
      answers: 5,
      author: "jane_smith",
      createdAt: "1 day ago",
      tags: ["javascript", "es6"]
    }
  ];

  const tabs = [
    { id: 'interesting', label: 'Interesting' },
    { id: 'hot', label: 'Hot' },
    { id: 'week', label: 'Week' },
    { id: 'month', label: 'Month' }
  ];

  const filterOptions = [
    { id: 'newest', label: 'Newest' },
    { id: 'active', label: 'Active' },
    { id: 'score', label: 'Score' },
    { id: 'unanswered', label: 'Unanswered' },
  ];

  return (
    <div className="w-full max-w-[1100px] mx-auto py-6">
      <div className="px-6">
        <div className="flex justify-between items-center mb-[16px] pb-[8px] border-b border-stackoverflow-border">
          <div>
            <h1 className="text-[27px] leading-[1.3] text-[#232629] mb-[12px]">Top Questions</h1>
            <div className="flex gap-[4px] text-[12px]">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-[12px] py-[6px] rounded-[1000px] border ${
                    activeTab === tab.id
                      ? 'bg-[#E3E6E8] border-[#9FA6AD]'
                      : 'bg-white border-[#9FA6AD]/40 hover:bg-[#F8F9F9] hover:border-[#9FA6AD]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <Link 
            to="/questions/ask"
            className="inline-flex items-center justify-center px-[10.4px] h-[37.8px] text-[13px] rounded-[3px] bg-stackoverflow-btn hover:bg-stackoverflow-btn-hover text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4)] whitespace-nowrap"
          >
            Ask Question
          </Link>
        </div>

        <div className="mb-4 flex justify-between items-center">
          <div className="flex gap-[4px] text-[12px]">
            {filterOptions.map(option => (
              <button
                key={option.id}
                onClick={() => setActiveFilter(option.id)}
                className={`px-[12px] py-[6px] rounded-[3px] border ${
                  activeFilter === option.id
                    ? 'bg-[#E3E6E8] border-[#9FA6AD]'
                    : 'bg-white border-[#9FA6AD]/40 hover:bg-[#F8F9F9] hover:border-[#9FA6AD]'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <div className="text-[17px] text-[#232629]">
            {questions.length.toLocaleString()} questions
          </div>
        </div>

        <div className="border-t border-stackoverflow-border">
          {questions.map((question) => (
            <QuestionCard key={question.id} {...question} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
