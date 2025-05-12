import {gql} from '@apollo/client';

export const characterQuery = gql`
  query Characters($page: Int) {
    characters(page: $page) {
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
