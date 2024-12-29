import React, { useState } from 'react';
import {
  Box,
  Button,
  Heading,
  VStack,
  Text,
  useToast,
  Tag,
  Wrap,
  WrapItem,
  Container,
  Progress,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

// Mock categories - in a real app, these would come from an API
const CATEGORIES = [
  'Technology',
  'Business',
  'Science',
  'Health',
  'Politics',
  'Entertainment',
  'Sports',
  'Education',
  'Finance',
  'Art & Culture',
];

const FREQUENCIES = [
  'Daily',
  'Weekly',
  'Bi-weekly',
  'Monthly',
];

const InterestWizard: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedFrequency, setSelectedFrequency] = useState<string[]>([]);
  const navigate = useNavigate();
  const toast = useToast();

  const totalSteps = 2;
  const progress = (step / totalSteps) * 100;

  const handleCategorySelect = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleFrequencySelect = (frequency: string) => {
    setSelectedFrequency(prev =>
      prev.includes(frequency)
        ? prev.filter(f => f !== frequency)
        : [...prev, frequency]
    );
  };

  const handleNext = () => {
    if (step === 1 && selectedCategories.length === 0) {
      toast({
        title: 'Please select at least one category',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleFinish = () => {
    if (selectedFrequency.length === 0) {
      toast({
        title: 'Please select at least one frequency preference',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Save preferences
    const preferences = {
      categories: selectedCategories,
      frequencies: selectedFrequency,
    };
    localStorage.setItem('newsletter_preferences', JSON.stringify(preferences));

    toast({
      title: 'Preferences saved!',
      description: 'We\'ll use these to personalize your newsletter recommendations.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    // Navigate to newsletter search with preferences
    navigate('/search', { state: { preferences } });
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={6} align="stretch">
        <Progress value={progress} size="sm" colorScheme="blue" mb={4} />
        
        <Box textAlign="center" mb={6}>
          <Heading size="lg" mb={2}>
            {step === 1 ? 'What topics interest you?' : 'How often do you want updates?'}
          </Heading>
          <Text color="gray.600">
            {step === 1 
              ? 'Select categories that match your interests'
              : 'Choose your preferred newsletter frequency'
            }
          </Text>
        </Box>

        {step === 1 ? (
          <Wrap spacing={4}>
            {CATEGORIES.map(category => (
              <WrapItem key={category}>
                <Tag
                  size="lg"
                  variant={selectedCategories.includes(category) ? 'solid' : 'outline'}
                  colorScheme="blue"
                  cursor="pointer"
                  onClick={() => handleCategorySelect(category)}
                  _hover={{ opacity: 0.8 }}
                >
                  {category}
                </Tag>
              </WrapItem>
            ))}
          </Wrap>
        ) : (
          <Wrap spacing={4}>
            {FREQUENCIES.map(frequency => (
              <WrapItem key={frequency}>
                <Tag
                  size="lg"
                  variant={selectedFrequency.includes(frequency) ? 'solid' : 'outline'}
                  colorScheme="blue"
                  cursor="pointer"
                  onClick={() => handleFrequencySelect(frequency)}
                  _hover={{ opacity: 0.8 }}
                >
                  {frequency}
                </Tag>
              </WrapItem>
            ))}
          </Wrap>
        )}

        <Box display="flex" justifyContent="space-between" mt={8}>
          {step > 1 && (
            <Button onClick={handleBack} variant="ghost">
              Back
            </Button>
          )}
          <Button
            onClick={step === totalSteps ? handleFinish : handleNext}
            colorScheme="blue"
            ml="auto"
          >
            {step === totalSteps ? 'Finish' : 'Next'}
          </Button>
        </Box>
      </VStack>
    </Container>
  );
};

export default InterestWizard;
