// GraphQL query & mutation strings and helper functions
import { gqlRequest } from './client';
import type {
  UsersQuery,
  UserQuery,
  CreateUserMutation,
  UpdateUserMutation,
  DeleteUserMutation,
  CreateUserInput,
  UpdateUserInput,
} from '@/app/service/graphQLschemas/generated/typed-documents';
// If generated types exist, they can be imported from ../graphQLschemas/graphql-types.d.ts via reference in tsconfig

export const QUERY_USERS = `#graphql
query Users {
  users {
    id
    name
    email
    createdAt
    updatedAt
    deletedAt
  }
}`;

export const QUERY_USER = `#graphql
query User($id: ID!) {
  user(id: $id) {
    id
    name
    email
    createdAt
    updatedAt
    deletedAt
  }
}`;

export const MUTATION_CREATE_USER = `#graphql
mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    name
    email
    createdAt
    updatedAt
    deletedAt
  }
}`;

export const MUTATION_UPDATE_USER = `#graphql
mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
  updateUser(id: $id, input: $input) {
    id
    name
    email
    createdAt
    updatedAt
    deletedAt
  }
}`;

export const MUTATION_DELETE_USER = `#graphql
mutation DeleteUser($id: ID!) {
  deleteUser(id: $id) {
    id
  }
}`;

// Lightweight runtime helpers (types assumed; refine once codegen improved)
export async function fetchUsers() {
  const data = await gqlRequest<UsersQuery>(QUERY_USERS);
  return data.users;
}

export async function fetchUser(id: string) {
  const data = await gqlRequest<UserQuery, { id: string }>(QUERY_USER, { id });
  return data.user;
}

export async function createUser(input: CreateUserInput) {
  const data = await gqlRequest<CreateUserMutation, { input: CreateUserInput }>(MUTATION_CREATE_USER, { input });
  return data.createUser;
}

export async function updateUser(id: string, input: UpdateUserInput) {
  const data = await gqlRequest<UpdateUserMutation, { id: string; input: UpdateUserInput }>(MUTATION_UPDATE_USER, {
    id,
    input,
  });
  return data.updateUser;
}

export async function deleteUser(id: string) {
  const data = await gqlRequest<DeleteUserMutation, { id: string }>(MUTATION_DELETE_USER, { id });
  return data.deleteUser;
}
