import { gql } from 'apollo-server'

export const collection = gql`
  scalar DateTime
  type Collection {
    id: ID!
    name: String
  }

  input CollectionWhereInput {
    search: String
    name: SearchObj
  }
  input SearchObj {
    contains: String
  }
  type CollectionsPagination {
    collections: [Collection!]!
    count: Float!
    take: Float!
  }
  input CollectionUpdateInput {
    name: String
    role: Role
  }

  input CollectionCreateInput {
    email: String!
    password: String!
    name: String
  }
`
