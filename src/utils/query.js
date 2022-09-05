import { gql } from "@apollo/client";

export const MAX_PER_PAGE = 3

export const CHARACTERS = ['Rick Sanchez', 'Summer Smith', 'Morty Smith', 'Beth Smith', 'Jerry Smith']
export const CHARACTERS_COUNT_QUERY = gql`
{
    characters {
    info {
        count
      }
    }
}`


export const CHARACTERS_BY_IDS_QUERY = gql`
query GetCharactersByIds($ids: [ID!]!) {
    charactersByIds(ids: $ids) {
      id
      name
      origin {
        name
        dimension
      }
      episode {
        id
      }
    }
  }
`;