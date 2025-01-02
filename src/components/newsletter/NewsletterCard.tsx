import React from 'react';
import { Newsletter } from '@/stores/newsletterStore';

interface NewsletterCardProps {
  newsletter: Newsletter;
  onClick?: () => void;
}

const NewsletterCard: React.FC<NewsletterCardProps> = ({ newsletter, onClick }) => {
  return (
    <div
      className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow duration-300"
      onClick={onClick}
    >
      <h3 className="text-lg font-semibold mb-2">{newsletter.title}</h3>
      <p className="text-gray-600 text-sm mb-2">{newsletter.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">{newsletter.category}</span>
        {newsletter.subscribers && (
          <span className="text-xs text-gray-500">{newsletter.subscribers} subscribers</span>
        )}
      </div>
    </div>
  );
};

export default NewsletterCard;
