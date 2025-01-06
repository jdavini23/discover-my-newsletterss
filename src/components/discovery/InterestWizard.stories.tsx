import React, { useState } from 'react';
import { InterestWizard } from './InterestWizard';

/**
 * InterestWizard component for selecting newsletter interests
 *
 * @component
 * @example
 * // Basic usage
 * <InterestWizard
 *   onInterestsSelected={(interests) => handleInterestSelection(interests)}
 * />
 */
export const DefaultInterestWizard = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const handleInterestsSelection = (interests: string[]) => {
    console.log('Selected interests:', interests);
    setSelectedInterests(interests);
  };

  return <InterestWizard onInterestsSelected={handleInterestsSelection} initialInterests={[]} />;
};

export const PreselectedInterestWizard = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Technology', 'Science']);

  const handleInterestsSelection = (interests: string[]) => {
    console.log('Selected interests:', interests);
    setSelectedInterests(interests);
  };

  return (
    <InterestWizard
      onInterestsSelected={handleInterestsSelection}
      initialInterests={['Technology', 'Science']}
    />
  );
};

export const LimitedInterestWizard = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const handleInterestsSelection = (interests: string[]) => {
    console.log('Selected interests:', interests);
    setSelectedInterests(interests);
  };

  return (
    <InterestWizard
      onInterestsSelected={handleInterestsSelection}
      initialInterests={[]}
      maxSelections={3}
    />
  );
};

DefaultInterestWizard.ladle = {
  name: 'Default Interest Wizard',
  description: 'Interest selection wizard with no initial selections',
};

PreselectedInterestWizard.ladle = {
  name: 'Preselected Interest Wizard',
  description: 'Interest selection wizard with initial selections',
};

LimitedInterestWizard.ladle = {
  name: 'Limited Interest Wizard',
  description: 'Interest selection wizard with maximum selection limit',
};
