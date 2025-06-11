import React, { useState, FormEvent, KeyboardEvent } from 'react';
import Button from '../components/Button';

interface WritingGuide {
  title: string;
  items: string[];
}

const AskQuestionPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [step, setStep] = useState<'instructions' | 'form'>('instructions');
  const [errors, setErrors] = useState<{
    title?: string;
    body?: string;
    tags?: string;
  }>({});

  const writingGuides: WritingGuide[] = [
    {
      title: 'Writing a good title',
      items: [
        "Pretend you're talking to a busy colleague",
        'Spelling and grammar matter',
        'Be specific about your problem',
      ],
    },
    {
      title: 'Introduce the problem before you post any code',
      items: [
        "Explain what you're trying to accomplish",
        "Describe what you've tried",
        'Show what specific error you get',
      ],
    },
    {
      title: 'Help others reproduce the problem',
      items: [
        'Include your code as part of a technical story',
        'Include all relevant tags',
        'Proofread before posting',
      ],
    },
  ];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset errors
    setErrors({});

    // Validate
    const newErrors: typeof errors = {};

    if (title.length < 15) {
      newErrors.title = 'Title must be at least 15 characters long';
    } else if (title.length > 150) {
      newErrors.title = 'Title cannot be more than 150 characters long';
    }

    if (body.length < 30) {
      newErrors.body = 'Please provide more details in the body';
    }

    if (tags.length === 0) {
      newErrors.tags = 'Please add at least one tag';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // Placeholder for API call
      console.log({ title, body, tags });
      // Redirect to question page after submission
      // history.push(`/questions/${questionId}`);
    } catch (error) {
      console.error('Failed to post question:', error);
      setErrors({
        title: 'Failed to post question. Please try again.',
      });
    }
  };

  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === ',') {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (newTag && !tags.includes(newTag) && tags.length < 5) {
        setTags([...tags, newTag]);
        setTagInput('');
      }
    } else if (e.key === 'Backspace' && !tagInput && tags.length > 0) {
      setTags(tags.slice(0, -1));
    }
  };

  if (step === 'instructions') {
    return (
      <div className="max-w-[1100px] mx-auto py-6 px-4">
        <h1 className="text-[27px] text-stackoverflow-black mb-4">Draft your question</h1>
        <div className="bg-[#EBF4FB] border border-[#A6CEED] rounded-[3px] p-6 mb-6">
          <h2 className="text-[21px] text-stackoverflow-black mb-4">Writing a good question</h2>
          <p className="text-[15px] text-stackoverflow-black mb-4">
            You're ready to ask a programming-related question and this form will help guide you through the process.
          </p>
          <h3 className="text-[15px] font-semibold text-stackoverflow-black mb-2">Steps</h3>
          <ul className="list-disc list-inside text-[13px] text-stackoverflow-black mb-4 space-y-1">
            <li>Summarize your problem in a one-line title</li>
            <li>Describe your problem in more detail</li>
            <li>Add "tags" which help surface your question to members of the community</li>
            <li>Review your question and post it to the site</li>
          </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {writingGuides.map((guide, index) => (
            <div key={index} className="bg-white border border-[#E3E6E8] rounded-[3px] p-6">
              <h3 className="text-[15px] font-semibold text-stackoverflow-black mb-3">{guide.title}</h3>
              <ul className="list-disc list-inside text-[13px] text-stackoverflow-black space-y-2">
                {guide.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-6 text-right">
          <Button onClick={() => setStep('form')} className="px-8">
            Next
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1100px] mx-auto py-6 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[27px] text-stackoverflow-black">Ask a public question</h1>
        <button
          onClick={() => setStep('instructions')}
          className="text-[12px] text-stackoverflow-blue hover:text-[#0a95ff]"
        >
          Writing guide
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white border border-[#E3E6E8] rounded-[3px] p-6">
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <label htmlFor="title" className="text-[15px] font-semibold text-stackoverflow-black">
                Title
              </label>
              <span className="text-[12px] text-stackoverflow-gray">
                Be specific and imagine you're asking a question to another person
              </span>
            </div>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full border rounded-[3px] px-3 py-2 text-[13px] focus:outline-none focus:ring-2 ${
                errors.title
                  ? 'border-stackoverflow-red focus:border-stackoverflow-red focus:ring-stackoverflow-red/20'
                  : 'border-[#BABFC4] focus:border-stackoverflow-blue focus:ring-stackoverflow-blue/20'
              }`}
              placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
              required
              maxLength={300}
            />
            {errors.title && <p className="mt-2 text-[12px] text-stackoverflow-red">{errors.title}</p>}
          </div>

          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <label htmlFor="body" className="text-[15px] font-semibold text-stackoverflow-black">
                What are the details of your problem?
              </label>
              <span className="text-[12px] text-stackoverflow-gray">
                Include all the information someone would need to answer your question
              </span>
            </div>
            <div className="border border-[#BABFC4] rounded-[3px] overflow-hidden">
              <div className="bg-[#F8F9F9] border-b border-[#BABFC4] px-2 py-1">
                <button
                  type="button"
                  className="px-2 py-1 text-[13px] text-stackoverflow-black hover:bg-[#E3E6E8] rounded"
                >
                  B
                </button>
                <button
                  type="button"
                  className="px-2 py-1 text-[13px] text-stackoverflow-black hover:bg-[#E3E6E8] rounded"
                >
                  {'{ }'}
                </button>
              </div>
              <textarea
                id="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={15}
                className={`w-full px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-stackoverflow-blue/20 ${
                  errors.body ? 'bg-red-50' : ''
                }`}
                placeholder="Describe what you've tried and what you're trying to achieve..."
                required
              />
              {errors.body && <p className="mt-2 text-[12px] text-stackoverflow-red">{errors.body}</p>}
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <label htmlFor="tags" className="text-[15px] font-semibold text-stackoverflow-black">
                Tags
              </label>
              <span className="text-[12px] text-stackoverflow-gray">
                Add up to 5 tags to describe what your question is about
              </span>
            </div>
            <div className="flex flex-wrap gap-2 p-1 border border-[#BABFC4] rounded-[3px] focus-within:border-stackoverflow-blue focus-within:ring-2 focus-within:ring-stackoverflow-blue/20">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-[3px] text-[12px] bg-[#E1ECF4] text-stackoverflow-blue"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => setTags(tags.filter((_, i) => i !== index))}
                    className="ml-1 text-stackoverflow-blue hover:text-[#0a95ff]"
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                className="flex-1 min-w-[100px] p-1 text-[13px] focus:outline-none"
                placeholder={tags.length === 0 ? 'e.g. (typescript react nodejs)' : ''}
              />
            </div>
            {errors.tags && <p className="mt-2 text-[12px] text-stackoverflow-red">{errors.tags}</p>}
          </div>
        </div>

        <div className="flex gap-2">
          <Button type="submit">Post your question</Button>
          <Button
            type="button"
            variant="outlined"
            onClick={() => {
              setTitle('');
              setBody('');
              setTags([]);
              setTagInput('');
            }}
          >
            Discard draft
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AskQuestionPage;