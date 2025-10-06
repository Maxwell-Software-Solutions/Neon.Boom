import type { CodegenConfig } from '@graphql-codegen/cli';

// Prefer SDL (generated fallback) to avoid incomplete introspection issues.
const schema = 'src/app/service/graphQLschemas/schema.graphql';

const config: CodegenConfig = {
  overwrite: true,
  schema,
  documents: ['src/**/*.{ts,tsx,graphql,gql}'],
  generates: {
    'src/app/service/graphQLschemas/generated/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
    'src/app/service/graphQLschemas/generated/typed-documents.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
      config: {
        withHooks: true,
        withComponent: false,
        withHOC: false,
        avoidOptionals: true,
        defaultScalarType: 'unknown',
        scalars: { ID: 'string' },
      },
    },
  },
};

export default config;
