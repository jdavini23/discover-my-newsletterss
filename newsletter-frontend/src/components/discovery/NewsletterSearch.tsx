import { useEffect, useState } from 'react';
import {
  Box,
  Input,
  Button,
  VStack,
  HStack,
  Text,
  Select,
  Spinner,
  Alert,
  SimpleGrid,
  Card,
  CardBody,
  Heading,
  Badge,
} from '@chakra-ui/react';
import { useNewsletterSearchStore } from '../../stores/newsletterSearchStore';

interface Newsletter {
  id: string;
  title: string;
  description: string;
  categories: string[];
  frequency: string;
  subscriberCount: number;
  url: string;
}

export default function NewsletterSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const {
    newsletters,
    loading,
    error,
    categories,
    fetchNewsletters,
    fetchFilterOptions,
    setSearchParams,
    resetSearch,
  } = useNewsletterSearchStore();

  useEffect(() => {
    fetchNewsletters();
    fetchFilterOptions();
  }, []);

  const handleSearch = () => {
    setSearchParams({
      query: searchQuery,
      categories: selectedCategory ? [selectedCategory] : undefined,
      page: 1,
    });
    fetchNewsletters();
  };

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('');
    resetSearch();
    fetchNewsletters();
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minH="200px">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert status="error">
        <Alert.Icon />
        {error}
      </Alert>
    );
  }

  return (
    <Box>
      <VStack spacing="4" align="stretch">
        <HStack>
          <Input
            placeholder="Search newsletters..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Select
            placeholder="Select category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
          <Button colorScheme="blue" onClick={handleSearch}>
            Search
          </Button>
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
        </HStack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
          {newsletters.map((newsletter) => (
            <Card key={newsletter.id}>
              <CardBody>
                <VStack align="start" spacing={2}>
                  <Heading size="md">{newsletter.title}</Heading>
                  <Text>{newsletter.description}</Text>
                  <HStack wrap="wrap" spacing={2}>
                    {newsletter.categories.map((category) => (
                      <Badge key={category} colorScheme="blue">
                        {category}
                      </Badge>
                    ))}
                  </HStack>
                  <Text fontSize="sm">Frequency: {newsletter.frequency}</Text>
                  <Text fontSize="sm">
                    Subscribers: {newsletter.subscriberCount.toLocaleString()}
                  </Text>
                  <Button
                    as="a"
                    href={newsletter.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="sm"
                    colorScheme="blue"
                    variant="outline"
                  >
                    Visit Newsletter
                  </Button>
                </VStack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
};
