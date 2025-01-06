import type { Story } from '@ladle/react';
import SkeletonLoader from './SkeletonLoader';

export const NewsletterCardSkeleton: Story = () => <SkeletonLoader variant="newsletter-card" />;

export const SearchResultsSkeleton: Story = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {[...Array(6)].map((_, index) => (
      <SkeletonLoader key={index} variant="newsletter-card" />
    ))}
  </div>
);

export const ProfileSkeleton: Story = () => (
  <div className="flex flex-col space-y-4">
    <SkeletonLoader variant="avatar" />
    <SkeletonLoader variant="text" />
    <SkeletonLoader variant="text" />
    <SkeletonLoader variant="text" />
  </div>
);

export const DetailedLoadingSkeleton: Story = () => (
  <div className="max-w-2xl mx-auto">
    <SkeletonLoader variant="banner" />
    <div className="mt-6 space-y-4">
      <SkeletonLoader variant="title" />
      <SkeletonLoader variant="text" />
      <SkeletonLoader variant="text" />
      <div className="grid grid-cols-2 gap-4">
        <SkeletonLoader variant="button" />
        <SkeletonLoader variant="button" />
      </div>
    </div>
  </div>
);

export const ResponsiveSkeleton: Story = () => (
  <div className="w-full">
    <SkeletonLoader variant="text" className="w-full md:w-1/2" />
    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      {[...Array(3)].map((_, index) => (
        <SkeletonLoader key={index} variant="card" />
      ))}
    </div>
  </div>
);
