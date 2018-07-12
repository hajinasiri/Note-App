
export default `
  type User {
    id: Int!
    username: String!
    createdAt: String!
    updatedAt: String!
    password: String!
    email: String!
  }
  type Query {
    allUsers: [User!]!
    getUser(username: String!): User
  }
  type Mutation {
    register(username: String!): User!
    createUser(username: String!, password: String!, email: String!): User
    updateUser(username: String!, newUsername: String!): [Int!]!
    deleteUser(username: String!): Int!
  }
`;