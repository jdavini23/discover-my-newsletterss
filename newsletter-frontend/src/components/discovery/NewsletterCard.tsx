import { React } from 'react';

interface NewsletterCardProps {
  newsletter: Newsletter;
  onClick?: () => void;
}

export const NewsletterCard: React.FC<NewsletterCardProps> = ({
  newsletter,
  onClick = () => {},
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl"
      onClick={onClick}
    >
      {newsletter.coverImage && (
        <img
          src={newsletter.coverImage}
          alt={newsletter.title}
          className="w-full h-48 object-cover"
          onError={e => {
            const imgElement = e.target as HTMLImageElement;
            imgElement.src = 'https://via.placeholder.com/400x300?text=Newsletter';
          }}
        />
      )}

      <div className="p-4">
        <h3 className="text-xl font-bold mb-2 text-gray-800">{newsletter.title}</h3>

        <p className="text-gray-600 mb-4 line-clamp-3">{newsletter.description}</p>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            {newsletter.topics &&
              newsletter.topics.slice(0, 3).map(topic => (
                <span
                  key={topic}
                  className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                >
                  {topic}
                </span>
              ))}
          </div>

          <div className="text-sm text-gray-500">{newsletter.frequency}</div>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-600">
              {newsletter.subscriberCount?.toLocaleString() || 'N/A'} subscribers
            </span>
          </div>

          <div className="flex items-center space-x-1">
            <span className="text-yellow-500">★</span>
            <span className="text-sm font-medium text-gray-600">
              {newsletter.rating?.toFixed(1) || 'N/A'}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
