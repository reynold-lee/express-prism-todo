/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./src/context"




declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenObjects {
  Acronym: { // root type
    acronym_form: string; // String!
    full_form: string; // String!
    id: number; // Int!
  }
  AuthPayload: { // root type
    token: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  Mutation: {};
  Query: {};
  Todo: { // root type
    content: string; // String!
    id: number; // Int!
    title: string; // String!
  }
  User: { // root type
    email: string; // String!
    id: number; // Int!
    name: string; // String!
    password: string; // String!
    role: string; // String!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  Acronym: { // field return type
    acronym_form: string; // String!
    full_form: string; // String!
    id: number; // Int!
  }
  AuthPayload: { // field return type
    token: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  Mutation: { // field return type
    delete: NexusGenRootTypes['Acronym']; // Acronym!
    login: NexusGenRootTypes['AuthPayload']; // AuthPayload!
    patch: NexusGenRootTypes['Acronym'] | null; // Acronym
    post: NexusGenRootTypes['Acronym']; // Acronym!
    signup: NexusGenRootTypes['AuthPayload']; // AuthPayload!
  }
  Query: { // field return type
    acronym: NexusGenRootTypes['Acronym'] | null; // Acronym
    acronyms: NexusGenRootTypes['Acronym'][]; // [Acronym!]!
    user: NexusGenRootTypes['User']; // User!
    users: NexusGenRootTypes['User'][]; // [User!]!
  }
  Todo: { // field return type
    content: string; // String!
    id: number; // Int!
    owner: NexusGenRootTypes['User'] | null; // User
    title: string; // String!
  }
  User: { // field return type
    email: string; // String!
    id: number; // Int!
    name: string; // String!
    password: string; // String!
    role: string; // String!
    todos: NexusGenRootTypes['Todo'][]; // [Todo!]!
  }
}

export interface NexusGenFieldTypeNames {
  Acronym: { // field return type name
    acronym_form: 'String'
    full_form: 'String'
    id: 'Int'
  }
  AuthPayload: { // field return type name
    token: 'String'
    user: 'User'
  }
  Mutation: { // field return type name
    delete: 'Acronym'
    login: 'AuthPayload'
    patch: 'Acronym'
    post: 'Acronym'
    signup: 'AuthPayload'
  }
  Query: { // field return type name
    acronym: 'Acronym'
    acronyms: 'Acronym'
    user: 'User'
    users: 'User'
  }
  Todo: { // field return type name
    content: 'String'
    id: 'Int'
    owner: 'User'
    title: 'String'
  }
  User: { // field return type name
    email: 'String'
    id: 'Int'
    name: 'String'
    password: 'String'
    role: 'String'
    todos: 'Todo'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    delete: { // args
      id: number; // Int!
    }
    login: { // args
      email: string; // String!
      password: string; // String!
    }
    patch: { // args
      acronym_form?: string | null; // String
      full_form?: string | null; // String
      id: number; // Int!
    }
    post: { // args
      acronym_form: string; // String!
      full_form: string; // String!
    }
    signup: { // args
      email: string; // String!
      name: string; // String!
      password: string; // String!
    }
  }
  Query: {
    acronym: { // args
      id?: number | null; // Int
    }
    acronyms: { // args
      search?: string | null; // String
      skip?: number | null; // Int
      take?: number | null; // Int
    }
    user: { // args
      id?: number | null; // Int
    }
    users: { // args
      search?: string | null; // String
      skip?: number | null; // Int
      take?: number | null; // Int
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}