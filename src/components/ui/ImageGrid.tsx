import {Character, CharacterQueryResponse} from '@/lib/types';
import {Box, ButtonGroup, Grid, IconButton, Pagination} from '@chakra-ui/react';
import {useSuspenseQuery} from '@apollo/client';
import {characterQuery} from '@/lib/data';
import {HiChevronLeft, HiChevronRight} from 'react-icons/hi';
import {CharacterCard} from './CharacterCard';

interface ImageGridProps {
  page: number;
  onPageChange: (newPage: number) => void;
}

export const ImageGrid = ({page, onPageChange}: ImageGridProps) => {
  const {error, data, fetchMore} = useSuspenseQuery<CharacterQueryResponse>(
    characterQuery,
    {
      variables: {
        page,
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
          <CharacterCard index={index} character={character} key={index} />
        ))}
      </Grid>
      <Box display="flex" justifyContent="center" mt="4">
        <Pagination.Root
          count={data.characters.info.count}
          pageSize={20}
          defaultPage={1}
          page={page}
        >
          <ButtonGroup gap="4" size="sm" variant="ghost">
            <Pagination.PrevTrigger asChild>
              <IconButton
                onClick={() => {
                  fetchMore({variables: {page: data.characters.info.prev}});
                  onPageChange(data.characters.info.prev || 1);
                }}
              >
                <HiChevronLeft />
              </IconButton>
            </Pagination.PrevTrigger>
            <Pagination.PageText />
            <Pagination.NextTrigger asChild>
              <IconButton
                onClick={() => {
                  fetchMore({variables: {page: data.characters.info.next}});
                  onPageChange(data.characters.info.next || 1);
                }}
              >
                <HiChevronRight />
              </IconButton>
            </Pagination.NextTrigger>
          </ButtonGroup>
        </Pagination.Root>
      </Box>
    </>
  );
};
