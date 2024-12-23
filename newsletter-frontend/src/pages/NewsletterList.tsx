import React, { useState, useEffect } from 'react';
import { newsletterService } from '../services/api';
import { Newsletter } from '../services/api'; // Assuming you have this type defined

const NewsletterList: React.FC = () => {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNewsletters = async () => {
      try {
        const data = await newsletterService.getNewsletters();
        setNewsletters(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching newsletters:', err);
        setError('Failed to fetch newsletters');
        setLoading(false);
      }
    };

    fetchNewsletters();
  }, []);

  const handleDeleteNewsletter = async (id: string) => {
    try {
      await newsletterService.deleteNewsletter(id);
      setNewsletters(newsletters.filter((newsletter) => newsletter.id !== id));
    } catch (err) {
      console.error('Error deleting newsletter:', err);
      setError('Failed to delete newsletter');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Newsletters</h1>

      {newsletters.length === 0 ? (
        <div className="bg-gray-100 p-6 rounded-lg text-center">
          <p className="text-gray-600">No newsletters found.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsletters.map((newsletter) => (
            <div
              key={newsletter.id}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2">{newsletter.name}</h2>
              <p className="text-gray-600 mb-4">{newsletter.description}</p>

              <div className="flex justify-between items-center">
                <a
                  href={newsletter.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Visit Website
                </a>

                <button
                  onClick={() => handleDeleteNewsletter(newsletter.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsletterList;
