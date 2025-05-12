import {Character, CharacterQueryResponse} from '@/lib/types';
import {Button, Card, Grid} from '@chakra-ui/react';
import {useSuspenseQuery} from '@apollo/client';
import {characterQuery} from '@/lib/data';
import Image from 'next/image';
import {useRef} from 'react';

interface ImageGridProps {
  page: number;
}

export const ImageGrid = ({page}: ImageGridProps) => {
  const currentPageRef = useRef(page);

  const {error, data, fetchMore} = useSuspenseQuery<CharacterQueryResponse>(
    characterQuery,
    {
      variables: {
        page: currentPageRef.current,
      },
    }
  );

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)',
          lg: 'repeat(6, 1fr)',
        }}
        gap="4"
      >
        {data.characters.results.map((character: Character, index: number) => (
          <Card.Root key={index}>
            <Card.Header>
              <Image
                src={character.image}
                width={300}
                height={300}
                alt={character.name}
              />
              <Button>{character.status}</Button>
              <Card.Title>{character.name}</Card.Title>
            </Card.Header>
            <Card.Body>
              <p>{character.species}</p>
              <p>Origin: {character.origin.name}</p>
              <p>Location: {character.location.name}</p>
            </Card.Body>
          </Card.Root>
        ))}
      </Grid>
      <Button
        onClick={() => {
          currentPageRef.current += 1;
          fetchMore({variables: {page: currentPageRef.current}});
        }}
      >
        Fetch more
      </Button>
    </>
  );
};
