import React, { useEffect, useState } from 'react';
import { useNewsletterSearchStore } from '../../stores/newsletterSearchStore';
import { 
  Select, 
  Input, 
  VStack, 
  HStack, 
  Button, 
  Spinner, 
  Text, 
  Wrap, 
  WrapItem 
} from '@chakra-ui/react';

interface Newsletter {
  id: string;
  title: string;
  description: string;
  categories: string[];
  frequency: string;
  subscriberCount: number;
}

export const NewsletterSearch: React.FC = () => {
  const { 
    newsletters, 
    categories, 
    tags, 
    frequencies,
    isLoading,
    error,
    fetchNewsletters,
    setSearchParams,
    fetchFilterOptions,
    resetSearch
  } = useNewsletterSearchStore();

  const [localQuery, setLocalQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedFrequency, setSelectedFrequency] = useState('');

  useEffect(() => {
    // Fetch initial filter options and newsletters
    fetchFilterOptions();
    fetchNewsletters();
  }, []);

  const handleSearch = () => {
    setSearchParams({
      query: localQuery || undefined,
      categories: selectedCategory ? [selectedCategory] : undefined,
      tags: selectedTags.length ? selectedTags : undefined,
      frequency: selectedFrequency as 'daily' | 'weekly' | 'monthly' | undefined
    });
  };

  const handleReset = () => {
    setLocalQuery('');
    setSelectedCategory('');
    setSelectedTags([]);
    setSelectedFrequency('');
    resetSearch();
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  if (error) {
    return <Text color="red.500">Error: {error}</Text>;
  }

  return (
    <VStack spacing={4} align="stretch">
      <HStack>
        <Input 
          placeholder="Search newsletters..." 
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
        />
        <Select 
          placeholder="Select Category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
        <Select 
          placeholder="Frequency"
          value={selectedFrequency}
          onChange={(e) => setSelectedFrequency(e.target.value)}
        >
          {frequencies.map(freq => (
            <option key={freq} value={freq}>
              {freq}
            </option>
          ))}
        </Select>
        <Button onClick={handleSearch} colorScheme="blue">
          Search
        </Button>
        <Button onClick={handleReset} variant="outline">
          Reset
        </Button>
      </HStack>

      <Wrap spacing={2}>
        {tags.map(tag => (
          <WrapItem key={tag}>
            <Button 
              size="sm" 
              variant={selectedTags.includes(tag) ? 'solid' : 'outline'}
              colorScheme={selectedTags.includes(tag) ? 'blue' : 'gray'}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Button>
          </WrapItem>
        ))}
      </Wrap>

      {isLoading ? (
        <Spinner />
      ) : (
        <VStack align="stretch">
          {newsletters.map(newsletter => (
            <NewsletterCard key={newsletter.id} newsletter={newsletter} />
          ))}
        </VStack>
      )}
    </VStack>
  );
};

// Newsletter Card Component
const NewsletterCard: React.FC<{ newsletter: Newsletter }> = ({ newsletter }) => {
  return (
    <VStack 
      align="stretch" 
      p={4} 
      borderWidth={1} 
      borderRadius="md" 
      boxShadow="md"
    >
      <HStack justifyContent="space-between">
        <Text fontWeight="bold">{newsletter.title}</Text>
        <Text color="gray.500">{newsletter.frequency}</Text>
      </HStack>
      <Text>{newsletter.description}</Text>
      <HStack>
        {newsletter.categories.map(category => (
          <Text key={category} fontSize="sm" color="blue.500">
            {category}
          </Text>
        ))}
      </HStack>
      <Text fontSize="sm">
        Subscribers: {newsletter.subscriberCount}
      </Text>
    </VStack>
  );
};
