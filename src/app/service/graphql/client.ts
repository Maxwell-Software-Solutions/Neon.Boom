import axios from 'axios';

// Basic Axios instance for GraphQL
export const graphQLClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:4000/graphql',
  headers: { 'Content-Type': 'application/json' },
});

export interface GraphQLErrorItem {
  message: string;
  path?: string[];
  extensions?: Record<string, unknown>;
}
export interface GraphQLResponse<T> {
  data?: T;
  errors?: GraphQLErrorItem[];
}

export async function gqlRequest<TData = unknown, TVars extends Record<string, unknown> | undefined = undefined>(
  query: string,
  variables?: TVars,
  options?: { authToken?: string }
): Promise<TData> {
  const headers: Record<string, string> = {};
  if (options?.authToken) {
    headers['Authorization'] = `Bearer ${options.authToken}`;
  }
  const resp = await graphQLClient.post<GraphQLResponse<TData>>('', { query, variables }, { headers });
  if (resp.data.errors?.length) {
    const combined = resp.data.errors.map((e: GraphQLErrorItem) => e.message).join('; ');
    throw new Error(combined);
  }
  if (!resp.data.data) {
    throw new Error('No data returned from GraphQL');
  }
  return resp.data.data;
}
