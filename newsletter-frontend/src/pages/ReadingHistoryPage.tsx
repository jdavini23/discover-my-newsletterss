import React, { useState } from 'react';
import { useReadingHistoryStore } from '../src/stores/readingHistoryStore';
import { BackButton } from '../src/components/common/BackButton';

const ReadingHistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const readingHistoryStore = useReadingHistoryStore();
  const [activeTab, setActiveTab] = useState<'history' | 'insights'>('history');

  const readingTimeAnalytics = readingHistoryStore.getReadingTimeAnalytics();
  const mostReadNewsletters = readingHistoryStore.getMostReadNewsletters();
  const recommendedNewsletters = readingHistoryStore.getRecommendedNewsletters();

  const renderHistoryTab = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Reading History</h2>
      {readingHistoryStore.history.length === 0 ? (
        <div className="text-center text-gray-500">
          <BookOpenIcon className="mx-auto w-16 h-16 mb-4" />
          <p>You haven't read any newsletters yet.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {readingHistoryStore.history.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 flex items-center hover:bg-gray-50 transition"
              onClick={() => navigate(`/newsletters/${item.newsletter.id}`)}
            >
              <img
                src={item.newsletter.imageUrl}
                alt={item.newsletter.title}
                className="w-16 h-16 object-cover rounded-md mr-4"
              />
              <div>
                <h3 className="font-semibold">{item.newsletter.title}</h3>
                <p className="text-sm text-gray-500">
                  Read on {item.readAt.toLocaleDateString()}• {Math.round(item.readDuration / 60)}{' '}
                  mins
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderInsightsTab = () => (
    <div className="space-y-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <ChartBarIcon className="w-6 h-6 mr-2 text-primary-500" />
          Reading Analytics
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold flex items-center">
              <ClockIcon className="w-5 h-5 mr-2 text-primary-500" />
              Total Reading Time
            </h3>
            <p className="text-2xl font-bold">
              {Math.round(readingTimeAnalytics.totalReadTime / 60)} mins
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold flex items-center">
              <ClockIcon className="w-5 h-5 mr-2 text-primary-500" />
              Avg. Reading Time
            </h3>
            <p className="text-2xl font-bold">
              {Math.round(readingTimeAnalytics.averageReadTime / 60)} mins
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold flex items-center">
              <StarIcon className="w-5 h-5 mr-2 text-primary-500" />
              Top Category
            </h3>
            <p className="text-2xl font-bold">{readingTimeAnalytics.mostReadCategory}</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <StarIcon className="w-6 h-6 mr-2 text-primary-500" />
          Most Read Newsletters
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {mostReadNewsletters.map(newsletter => (
            <div
              key={newsletter.id}
              className="bg-gray-50 p-4 rounded-lg cursor-pointer hover:bg-gray-100 transition"
              onClick={() => navigate(`/newsletters/${newsletter.id}`)}
            >
              <img
                src={newsletter.imageUrl}
                alt={newsletter.title}
                className="w-full h-32 object-cover rounded-md mb-2"
              />
              <h3 className="font-semibold">{newsletter.title}</h3>
              <p className="text-sm text-gray-500">{newsletter.category}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <StarIcon className="w-6 h-6 mr-2 text-primary-500" />
          Recommended Newsletters
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {recommendedNewsletters.map(newsletter => (
            <div
              key={newsletter.id}
              className="bg-gray-50 p-4 rounded-lg cursor-pointer hover:bg-gray-100 transition"
              onClick={() => navigate(`/newsletters/${newsletter.id}`)}
            >
              <img
                src={newsletter.imageUrl}
                alt={newsletter.title}
                className="w-full h-32 object-cover rounded-md mb-2"
              />
              <h3 className="font-semibold">{newsletter.title}</h3>
              <p className="text-sm text-gray-500">{newsletter.category}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <BackButton className="mr-4" />
        <h1 className="text-3xl font-bold">Reading History</h1>
      </div>

      <div className="flex mb-6 border-b">
        <button
          className={`
            px-4 py-2 
            ${
              activeTab === 'history'
                ? 'border-b-2 border-primary-500 text-primary-500'
                : 'text-gray-500'
            }
          `}
          onClick={() => setActiveTab('history')}
        >
          History
        </button>
        <button
          className={`
            px-4 py-2 
            ${
              activeTab === 'insights'
                ? 'border-b-2 border-primary-500 text-primary-500'
                : 'text-gray-500'
            }
          `}
          onClick={() => setActiveTab('insights')}
        >
          Insights
        </button>
      </div>

      {activeTab === 'history' ? renderHistoryTab() : renderInsightsTab()}
    </div>
  );
};

export default ReadingHistoryPage;
