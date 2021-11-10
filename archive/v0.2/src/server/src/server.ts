import { ApolloServer } from 'apollo-server'
import { resolvers } from './schema'
import { createContext } from './context'
import { makeExecutableSchema } from 'graphql-tools'
import { query } from './typeDefs/query'
import { user } from './typeDefs/user'
import { collection } from './typeDefs/collection'
import { mutation } from './typeDefs/mutation'
const schema = makeExecutableSchema({
  typeDefs: [query, user, collection, mutation],
  resolvers,
})

new ApolloServer({ schema, context: createContext }).listen(
  { port: 4000 },
  () => console.log(`🚀 Server ready at: http://localhost:4000 ⭐️⭐️⭐️⭐️`),
)
