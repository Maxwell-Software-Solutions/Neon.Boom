// AUTO-GENERATED. Run pnpm generate:graphql-types to regenerate.
// If fallback mode engaged, supply a full introspection query for richer typing.
/* eslint-disable */
// Fallback inferred from field names only
export interface Mutation {
  createUser: string;
  updateUser: string;
  deleteUser: string;
}

// Fallback inferred from field names only
export interface Query {
  users: string;
  user: string;
}

// Fallback inferred from field names only
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

