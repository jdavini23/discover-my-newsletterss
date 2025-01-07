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
      setNewsletters(newsletters.filter(newsletter => newsletter.id !== id));
    } catch (err) {
      console.error('Error deleting newsletter:', err);
      setError('Failed to delete newsletter');
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
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
          className="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
          role="alert"
        >
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Newsletters</h1>

      {newsletters.length === 0 ? (
        <div className="rounded-lg bg-gray-100 p-6 text-center">
          <p className="text-gray-600">No newsletters found.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {newsletters.map(newsletter => (
            <div
              key={newsletter.id}
              className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
            >
              <h2 className="mb-2 text-xl font-semibold">{newsletter.title}</h2>
              <p className="mb-4 text-gray-600">{newsletter.description}</p>

              <div className="flex items-center justify-between">
                <a
                  href={newsletter.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Visit Website
                </a>

                <button
                  onClick={() => newsletter.id && handleDeleteNewsletter(newsletter.id)}
                  className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
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
