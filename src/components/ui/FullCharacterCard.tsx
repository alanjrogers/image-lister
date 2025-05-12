'use client';

import {Card, Text, Box} from '@chakra-ui/react';
import type {Character} from '@/lib/types';
import Image from 'next/image';

interface FullCharacterCardProps {
  character: Character;
}

// FullCharacterCard component to display detailed information about a character
// It includes the character's name, image, status, species, origin, and location
// It is used in a dialog that opens when a character card is clicked
export function FullCharacterCard({character}: FullCharacterCardProps) {
  if (!character) {
    return null;
  }

  return (
    <Card.Root>
      <Card.Header>
        <Card.Title textAlign="center">{character.name}</Card.Title>

        <Box display="flex" justifyContent="center">
          <Image
            src={character.image}
            width={600}
            height={600}
            alt={character.name}
          />
        </Box>
      </Card.Header>
      <Card.Body>
        <Text
          fontSize="md"
          color={character.status === 'Dead' ? 'red.400' : 'gray.500'}
        >
          Status: {character.status}
        </Text>
        <Text fontSize="md" color="gray.500">
          Species: {character.species}
        </Text>
        <Text fontSize="md" color="gray.500">
          Origin: {character.origin?.name}
        </Text>
        <Text fontSize="md" color="gray.500">
          Location: {character.location?.name}
        </Text>
      </Card.Body>
    </Card.Root>
  );
}
