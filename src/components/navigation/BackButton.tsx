import { Button, Icon } from '@chakra-ui/react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BackButton = () => {
  return (
    <Button
      as={Link}
      to="/"
      variant="ghost"
      leftIcon={<Icon as={ArrowLeft} />}
      color="teal.500"
    >
      Back to Home
    </Button>
  );
};