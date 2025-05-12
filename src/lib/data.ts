import {gql} from '@apollo/client';

// GraphQL query to fetch characters from the Rick and Morty API
export const characterQuery = gql`
  query Characters($page: Int) {
    characters(page: $page) {
      info {
        count
        pages
        next
        prev
      }
      results {
        name
        status
        species
        image
        origin {
          name
        }
        location {
          name
        }
      }
    }
  }
`;
