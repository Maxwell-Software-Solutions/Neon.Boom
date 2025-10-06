#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { buildClientSchema, printSchema } from 'graphql';

// Path to introspection JSON
const schemaJsonPath = path.resolve('src', 'app', 'service', 'graphQLschemas', 'graphql-schema.json');
const outTypesPath = path.resolve('src', 'app', 'service', 'graphQLschemas', 'schema.graphql');
const outTsTypesPath = path.resolve('src', 'app', 'service', 'graphQLschemas', 'graphql-types.d.ts');

const raw = readFileSync(schemaJsonPath, 'utf-8');
const json = JSON.parse(raw);

if (!json.data || !json.data.__schema) {
  console.error('Provided JSON is not an introspection result. Expecting { data: { __schema: ... } }');
  process.exit(1);
}

let generatedWithFallback = false;
let tsOut = '// AUTO-GENERATED. Run pnpm generate:graphql-types to regenerate.\n';
tsOut += '// If fallback mode engaged, supply a full introspection query for richer typing.\n';
tsOut += '/* eslint-disable */\n';

try {
  const clientSchema = buildClientSchema(json.data);
  const sdl = printSchema(clientSchema);
  writeFileSync(outTypesPath, sdl, 'utf-8');
  const typeMap = clientSchema.getTypeMap();
  for (const typeName of Object.keys(typeMap).sort()) {
    if (typeName.startsWith('__')) continue; // skip introspection
    const t = typeMap[typeName];
    if (typeof t.getFields === 'function') {
      const fields = t.getFields();
      const fieldNames = Object.keys(fields);
      if (fieldNames.length) {
        tsOut += `export interface ${typeName} {\n`;
        for (const fieldName of fieldNames) {
          const field = fields[fieldName];
          let fieldType = field.type.toString();
          fieldType = fieldType.replace(/!/g, '');
          fieldType = fieldType
            .replace(/Int|Float/g, 'number')
            .replace(/ID/g, 'string')
            .replace(/String/g, 'string')
            .replace(/Boolean/g, 'boolean');
          tsOut += `  ${fieldName}: ${fieldType};\n`;
        }
        tsOut += '}\n\n';
      }
    }
  }
} catch (err) {
  generatedWithFallback = true;
  console.warn('[graphql-codegen] Fallback mode (partial introspection):', err.message);
  const types = json.data.__schema?.types || [];
  const objectTypes = types.filter((t) => t.kind === 'OBJECT' && !t.name.startsWith('__'));
  let sdl = '# Fallback SDL generated from partial introspection.\n';
  for (const obj of objectTypes) {
    if (!Array.isArray(obj.fields)) continue;
    const fieldLines = obj.fields.map((f) => {
      const n = f.name;
      let guess = 'String';
      if (n === 'id') guess = 'ID';
      else if (/At$/.test(n)) guess = 'String';
      else if (/^is[A-Z]/.test(n) || n.startsWith('has')) guess = 'Boolean';
      return `  ${n}: ${guess}`;
    });
    sdl += `type ${obj.name} {\n${fieldLines.join('\n')}\n}\n\n`;
    tsOut += `// Fallback inferred from field names only\nexport interface ${obj.name} {\n`;
    for (const f of obj.fields) {
      const n = f.name;
      let guessTs = 'string';
      if (n === 'id') guessTs = 'string';
      else if (/At$/.test(n)) guessTs = 'string';
      else if (/^is[A-Z]/.test(n) || n.startsWith('has')) guessTs = 'boolean';
      tsOut += `  ${n}: ${guessTs};\n`;
    }
    tsOut += '}\n\n';
  }
  writeFileSync(outTypesPath, sdl, 'utf-8');
}

writeFileSync(outTsTypesPath, tsOut, 'utf-8');
console.log('Generated:', outTypesPath, 'and', outTsTypesPath, generatedWithFallback ? '(fallback mode)' : '');
