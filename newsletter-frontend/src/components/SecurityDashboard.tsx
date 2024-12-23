import React, { useEffect, useState } from 'react';
import { securityService } from '../utils/security';

interface SecurityEvent {
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  details: Record<string, any>;
  timestamp: Date;
}

interface SecurityAlert extends SecurityEvent {
  message: string;
}

const SecurityDashboard: React.FC = () => {
  const [events, setEvents] = useState<SecurityEvent[]>([]);
  const [alerts, setAlerts] = useState<SecurityAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSecurityData = async () => {
    try {
      const [eventsData, alertsData] = await Promise.all([
        securityService.get<SecurityEvent[]>('/api/security/events'),
        securityService.get<SecurityAlert[]>('/api/security/alerts'),
      ]);

      setEvents(eventsData);
      setAlerts(alertsData);
      setError(null);
    } catch (err) {
      setError('Failed to fetch security data');
      console.error('Security data fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSecurityData();
    const interval = setInterval(fetchSecurityData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string): string => {
    switch (severity) {
      case 'critical':
        return 'rgb(220, 38, 38)';
      case 'high':
        return 'rgb(251, 146, 60)';
      case 'medium':
        return 'rgb(234, 179, 8)';
      case 'low':
        return 'rgb(34, 197, 94)';
      default:
        return 'rgb(107, 114, 128)';
    }
  };

  if (loading) {
    return <div className="flex h-64 items-center justify-center">Loading security data...</div>;
  }

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="mb-6 text-2xl font-bold">Security Dashboard</h1>

      {/* Active Alerts Section */}
      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">Active Alerts</h2>
        {alerts.length === 0 ? (
          <p className="text-gray-500">No active alerts</p>
        ) : (
          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className="rounded-r-md border-l-4 p-4"
                style={{ borderColor: getSeverityColor(alert.severity) }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{alert.type}</h3>
                    <p className="text-sm text-gray-600">{alert.message}</p>
                  </div>
                  <span
                    className="rounded-full px-2 py-1 text-xs"
                    style={{
                      backgroundColor: `${getSeverityColor(alert.severity)}20`,
                      color: getSeverityColor(alert.severity),
                    }}
                  >
                    {alert.severity.toUpperCase()}
                  </span>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  {new Date(alert.timestamp).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Events Section */}
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <h2 className="p-6 pb-4 text-xl font-semibold">Recent Security Events</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Severity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  IP Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {events.map((event, index) => (
                <tr key={index}>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className="text-sm font-medium text-gray-900">{event.type}</span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className="rounded-full px-2 py-1 text-xs"
                      style={{
                        backgroundColor: `${getSeverityColor(event.severity)}20`,
                        color: getSeverityColor(event.severity),
                      }}
                    >
                      {event.severity.toUpperCase()}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {event.details.ip || 'Unknown'}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {new Date(event.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SecurityDashboard;
