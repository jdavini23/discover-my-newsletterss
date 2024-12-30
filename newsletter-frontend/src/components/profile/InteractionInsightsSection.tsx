import React from 'react';
import { UserProfile, UserActivity } from '../../types/profile';

const DEFAULT_AVATAR = '/src/assets/images/default-avatar.svg';

const ActivityTypeLabels = {
  'newsletter_view': 'Viewed Newsletter',
  'newsletter_subscribe': 'Subscribed to Newsletter',
  'newsletter_like': 'Liked Newsletter'
};

interface InteractionInsightsSectionProps {
  profile: UserProfile;
}

const InteractionInsightsSection: React.FC<InteractionInsightsSectionProps> = ({ profile }) => {
  const sortedActivities = [...(profile.activityLog || [])]
    .sort((a, b) => b.timestamp.seconds - a.timestamp.seconds)
    .slice(0, 10); // Show last 10 activities

  const activityCounts = profile.activityLog?.reduce((acc, activity) => {
    acc[activity.type] = (acc[activity.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex items-center mb-6">
        <img 
          src={profile.photoURL || DEFAULT_AVATAR} 
          alt="Profile" 
          className="w-16 h-16 rounded-full object-cover mr-4" 
        />
        <div>
          <h2 className="text-2xl font-bold">{profile.displayName || 'User'}</h2>
          <p className="text-gray-600">{profile.email}</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6">Interaction Insights</h2>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {Object.entries(activityCounts || {}).map(([type, count]) => (
          <div 
            key={type} 
            className="bg-gray-100 p-4 rounded-md text-center"
          >
            <p className="text-xl font-bold text-blue-600">{count}</p>
            <p className="text-sm text-gray-600">{ActivityTypeLabels[type as keyof typeof ActivityTypeLabels]}</p>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        {sortedActivities.length === 0 ? (
          <p className="text-gray-500">No recent activities</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {sortedActivities.map((activity, index) => (
              <li key={index} className="py-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {ActivityTypeLabels[activity.type as keyof typeof ActivityTypeLabels]}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(activity.timestamp.seconds * 1000).toLocaleString()}
                    </p>
                  </div>
                  {activity.details && (
                    <span className="text-sm text-gray-500">
                      {activity.details}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default InteractionInsightsSection;
