'use client';

import Image from 'next/image';
import {Character, CharacterQueryResponse} from '@/lib/types';
import {characterQuery} from '@/lib/data';
import {Button, Card} from '@chakra-ui/react';
import {useSuspenseQuery} from '@apollo/client';

import {Grid} from '@chakra-ui/react';

export default function Home() {
  const {data} = useSuspenseQuery<CharacterQueryResponse>(characterQuery);

  return (
    <div>
      <main>
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
            lg: 'repeat(6, 1fr)',
          }}
          gap="4"
        >
          {data.characters.results.map(
            (character: Character, index: number) => (
              <Card.Root key={index}>
                <Card.Header>
                  <Image
                    src={character.image}
                    width={300}
                    height={300}
                    alt={character.name}
                  />
                  <Button className="absolute right-2 top-2">
                    {character.status}
                  </Button>
                  <Card.Title>{character.name}</Card.Title>
                </Card.Header>
                <Card.Body>
                  <p>{character.species}</p>
                  <p>Origin: {character.origin.name}</p>
                  <p>Location: {character.location.name}</p>
                </Card.Body>
              </Card.Root>
            )
          )}
        </Grid>
      </main>
      <footer>
        <p>Challenge Brief (v3.5)</p>

        <a
          href="https://linkedin.com/in/alanjrogers"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/InBug-Black.png"
            alt="LinkedIn Logo"
            width={16}
            height={16}
          />
          Alan Rogers (LinkedIn) →
        </a>
      </footer>
    </div>
  );
}
