import React from 'react';

const NewsletterSearch: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Discover Newsletters</h1>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search newsletters..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="space-y-6">
              {/* Newsletter results will be displayed here */}
              <p className="text-gray-500 text-center">Start typing to search for newsletters</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSearch;
