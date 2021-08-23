/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { createContext } from "./../context"
import type { core, connectionPluginCore } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
    /**
     * The `Upload` scalar type represents a file upload.
     */
    Upload<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "Upload";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
    /**
     * The `Upload` scalar type represents a file upload.
     */
    Upload<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Upload";
    /**
     * Adds a Relay-style connection to the type, with numerous options for configuration
     *
     * @see https://nexusjs.org/docs/plugins/connection
     */
    connectionField<FieldName extends string>(
      fieldName: FieldName,
      config: connectionPluginCore.ConnectionFieldConfig<TypeName, FieldName>
    ): void
  }
}
declare global {
  interface NexusGenCustomOutputProperties<TypeName extends string> {
    crud: NexusPrisma<TypeName, 'crud'>
    model: NexusPrisma<TypeName, 'model'>
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  FollowUserInput: { // input type
    id: number; // Int!
  }
  GetFollowUserInput: { // input type
    id: number; // Int!
    page: number; // Int!
  }
  GetFollowingUserInput: { // input type
    cursor?: number | null; // Int
    id: number; // Int!
  }
  SearchUsersInput: { // input type
    cursor?: number | null; // Int
    term: string; // String!
  }
  UpdateUsersProfile: { // input type
    avatar?: NexusGenScalars['Upload'] | null; // Upload
    bio?: string | null; // String
    email?: string | null; // String
    firstName?: string | null; // String
    lastName?: string | null; // String
    password?: string | null; // String
    username?: string | null; // String
  }
  UploadPhotoInput: { // input type
    caption?: string | null; // String
    photo: NexusGenScalars['Upload']; // Upload!
  }
  UserCreateInput: { // input type
    email: string; // String!
    firstName: string; // String!
    lastName?: string | null; // String
    password: string; // String!
    username: string; // String!
  }
  UserLogin: { // input type
    email?: string | null; // String
    password: string; // String!
    username?: string | null; // String
  }
  UserWhereUniqueInput: { // input type
    email?: string | null; // String
    id?: number | null; // Int
    username?: string | null; // String
  }
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
  Upload: any
}

export interface NexusGenObjects {
  AuthPayload: { // root type
    UAT?: string | null; // String
    user?: NexusGenRootTypes['User'] | null; // User
  }
  Comment: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    payload: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    user?: NexusGenRootTypes['User'] | null; // User
    userId: number; // Int!
  }
  File: { // root type
    encoding?: string | null; // String
    filename?: string | null; // String
    id?: string | null; // ID
    mimetype?: string | null; // String
    path?: string | null; // String
  }
  GetFollowersPayload: { // root type
    TotalPages?: number | null; // Int
    user?: Array<NexusGenRootTypes['User'] | null> | null; // [User]
  }
  GetFollowingPayload: { // root type
    cursor?: number | null; // Int
    user?: Array<NexusGenRootTypes['User'] | null> | null; // [User]
  }
  HashTag: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    hashtag: string; // String!
    id: number; // Int!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  Like: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  Mutation: {};
  Photo: { // root type
    Comment?: Array<NexusGenRootTypes['Comment'] | null> | null; // [Comment]
    caption?: string | null; // String
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    file?: string | null; // String
    hashtag?: Array<NexusGenRootTypes['HashTag'] | null> | null; // [HashTag]
    id: number; // Int!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    user: NexusGenRootTypes['User']; // User!
    userId: number; // Int!
  }
  Query: {};
  User: { // root type
    Comment?: Array<NexusGenRootTypes['Comment'] | null> | null; // [Comment]
    Hashtags?: Array<NexusGenRootTypes['HashTag'] | null> | null; // [HashTag]
    Photos?: Array<NexusGenRootTypes['Photo'] | null> | null; // [Photo]
    avatar?: string | null; // String
    bio?: string | null; // String
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    email: string; // String!
    firstName: string; // String!
    id: number; // Int!
    lastName?: string | null; // String
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    username: string; // String!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  AuthPayload: { // field return type
    UAT: string | null; // String
    user: NexusGenRootTypes['User'] | null; // User
  }
  Comment: { // field return type
    IsMine: boolean | null; // Boolean
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    payload: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    user: NexusGenRootTypes['User'] | null; // User
    userId: number; // Int!
  }
  File: { // field return type
    encoding: string | null; // String
    filename: string | null; // String
    id: string | null; // ID
    mimetype: string | null; // String
    path: string | null; // String
  }
  GetFollowersPayload: { // field return type
    TotalPages: number | null; // Int
    user: Array<NexusGenRootTypes['User'] | null> | null; // [User]
  }
  GetFollowingPayload: { // field return type
    cursor: number | null; // Int
    user: Array<NexusGenRootTypes['User'] | null> | null; // [User]
  }
  HashTag: { // field return type
    PhotoCount: number | null; // Int
    Photos: Array<NexusGenRootTypes['Photo'] | null> | null; // [Photo]
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    hashtag: string; // String!
    id: number; // Int!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  Like: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  Mutation: { // field return type
    CreateComment: NexusGenRootTypes['Comment'] | null; // Comment
    CreateUser: NexusGenRootTypes['User'] | null; // User
    DeleteComment: boolean | null; // Boolean
    DeletePhoto: boolean | null; // Boolean
    FollowUser: NexusGenRootTypes['User'] | null; // User
    TogglePhotoLike: NexusGenRootTypes['Like'] | null; // Like
    UnFollowUser: NexusGenRootTypes['User'] | null; // User
    UpdateComment: NexusGenRootTypes['Comment'] | null; // Comment
    UpdatePhoto: NexusGenRootTypes['Photo'] | null; // Photo
    UpdateUsersProfiles: NexusGenRootTypes['User'] | null; // User
    UploadPhoto: NexusGenRootTypes['Photo'] | null; // Photo
    UserLogin: NexusGenRootTypes['AuthPayload'] | null; // AuthPayload
  }
  Photo: { // field return type
    Comment: Array<NexusGenRootTypes['Comment'] | null> | null; // [Comment]
    CommentCount: number | null; // Int
    IsMine: boolean | null; // Boolean
    LikeCount: number | null; // Int
    LikedByMe: boolean | null; // Boolean
    caption: string | null; // String
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    file: string | null; // String
    hashtag: Array<NexusGenRootTypes['HashTag'] | null> | null; // [HashTag]
    id: number; // Int!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    user: NexusGenRootTypes['User']; // User!
    userId: number; // Int!
  }
  Query: { // field return type
    CurrentUser: NexusGenRootTypes['User'] | null; // User
    Feeds: Array<NexusGenRootTypes['Photo'] | null> | null; // [Photo]
    GetFollowersQuery: NexusGenRootTypes['GetFollowersPayload'] | null; // GetFollowersPayload
    GetFollowingQuery: NexusGenRootTypes['GetFollowingPayload'] | null; // GetFollowingPayload
    GetHashtag: NexusGenRootTypes['HashTag'] | null; // HashTag
    GetPhoto: NexusGenRootTypes['Photo'] | null; // Photo
    GetPhotoComments: Array<NexusGenRootTypes['Comment'] | null> | null; // [Comment]
    GetUserProfile: NexusGenRootTypes['User'] | null; // User
    GetUsersWhoLikedPhoto: Array<NexusGenRootTypes['User'] | null> | null; // [User]
    SearchPhoto: Array<NexusGenRootTypes['Photo'] | null> | null; // [Photo]
    SearchUser: Array<NexusGenRootTypes['User'] | null> | null; // [User]
    users: NexusGenRootTypes['User'][]; // [User!]!
  }
  User: { // field return type
    Comment: Array<NexusGenRootTypes['Comment'] | null> | null; // [Comment]
    FollowersCount: number | null; // Int
    FollowingCount: number | null; // Int
    Hashtags: Array<NexusGenRootTypes['HashTag'] | null> | null; // [HashTag]
    ISFollowing: boolean | null; // Boolean
    IsMe: boolean | null; // Boolean
    Photos: Array<NexusGenRootTypes['Photo'] | null> | null; // [Photo]
    avatar: string | null; // String
    bio: string | null; // String
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    email: string; // String!
    firstName: string; // String!
    id: number; // Int!
    lastName: string | null; // String
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    username: string; // String!
  }
}

export interface NexusGenFieldTypeNames {
  AuthPayload: { // field return type name
    UAT: 'String'
    user: 'User'
  }
  Comment: { // field return type name
    IsMine: 'Boolean'
    createdAt: 'DateTime'
    id: 'Int'
    payload: 'String'
    updatedAt: 'DateTime'
    user: 'User'
    userId: 'Int'
  }
  File: { // field return type name
    encoding: 'String'
    filename: 'String'
    id: 'ID'
    mimetype: 'String'
    path: 'String'
  }
  GetFollowersPayload: { // field return type name
    TotalPages: 'Int'
    user: 'User'
  }
  GetFollowingPayload: { // field return type name
    cursor: 'Int'
    user: 'User'
  }
  HashTag: { // field return type name
    PhotoCount: 'Int'
    Photos: 'Photo'
    createdAt: 'DateTime'
    hashtag: 'String'
    id: 'Int'
    updatedAt: 'DateTime'
  }
  Like: { // field return type name
    createdAt: 'DateTime'
    id: 'Int'
    updatedAt: 'DateTime'
  }
  Mutation: { // field return type name
    CreateComment: 'Comment'
    CreateUser: 'User'
    DeleteComment: 'Boolean'
    DeletePhoto: 'Boolean'
    FollowUser: 'User'
    TogglePhotoLike: 'Like'
    UnFollowUser: 'User'
    UpdateComment: 'Comment'
    UpdatePhoto: 'Photo'
    UpdateUsersProfiles: 'User'
    UploadPhoto: 'Photo'
    UserLogin: 'AuthPayload'
  }
  Photo: { // field return type name
    Comment: 'Comment'
    CommentCount: 'Int'
    IsMine: 'Boolean'
    LikeCount: 'Int'
    LikedByMe: 'Boolean'
    caption: 'String'
    createdAt: 'DateTime'
    file: 'String'
    hashtag: 'HashTag'
    id: 'Int'
    updatedAt: 'DateTime'
    user: 'User'
    userId: 'Int'
  }
  Query: { // field return type name
    CurrentUser: 'User'
    Feeds: 'Photo'
    GetFollowersQuery: 'GetFollowersPayload'
    GetFollowingQuery: 'GetFollowingPayload'
    GetHashtag: 'HashTag'
    GetPhoto: 'Photo'
    GetPhotoComments: 'Comment'
    GetUserProfile: 'User'
    GetUsersWhoLikedPhoto: 'User'
    SearchPhoto: 'Photo'
    SearchUser: 'User'
    users: 'User'
  }
  User: { // field return type name
    Comment: 'Comment'
    FollowersCount: 'Int'
    FollowingCount: 'Int'
    Hashtags: 'HashTag'
    ISFollowing: 'Boolean'
    IsMe: 'Boolean'
    Photos: 'Photo'
    avatar: 'String'
    bio: 'String'
    createdAt: 'DateTime'
    email: 'String'
    firstName: 'String'
    id: 'Int'
    lastName: 'String'
    updatedAt: 'DateTime'
    username: 'String'
  }
}

export interface NexusGenArgTypes {
  HashTag: {
    Photos: { // args
      cursor?: number | null; // Int
      take?: number | null; // Int
    }
  }
  Mutation: {
    CreateComment: { // args
      payload: string; // String!
      photoId: number; // Int!
    }
    CreateUser: { // args
      data: NexusGenInputs['UserCreateInput']; // UserCreateInput!
    }
    DeleteComment: { // args
      id: number; // Int!
    }
    DeletePhoto: { // args
      id: number; // Int!
    }
    FollowUser: { // args
      data: NexusGenInputs['FollowUserInput']; // FollowUserInput!
    }
    TogglePhotoLike: { // args
      photoId: number; // Int!
    }
    UnFollowUser: { // args
      data: NexusGenInputs['FollowUserInput']; // FollowUserInput!
    }
    UpdateComment: { // args
      commentId: number; // Int!
      payload: string; // String!
    }
    UpdatePhoto: { // args
      caption?: string | null; // String
      id: number; // Int!
    }
    UpdateUsersProfiles: { // args
      data: NexusGenInputs['UpdateUsersProfile']; // UpdateUsersProfile!
    }
    UploadPhoto: { // args
      data: NexusGenInputs['UploadPhotoInput']; // UploadPhotoInput!
    }
    UserLogin: { // args
      data: NexusGenInputs['UserLogin']; // UserLogin!
    }
  }
  Query: {
    Feeds: { // args
      cursor: number; // Int!
    }
    GetFollowersQuery: { // args
      data: NexusGenInputs['GetFollowUserInput']; // GetFollowUserInput!
    }
    GetFollowingQuery: { // args
      data: NexusGenInputs['GetFollowingUserInput']; // GetFollowingUserInput!
    }
    GetHashtag: { // args
      hashtag: string; // String!
      page?: number | null; // Int
    }
    GetPhoto: { // args
      id: number; // Int!
    }
    GetPhotoComments: { // args
      cursor?: number | null; // Int
      photoId: number; // Int!
    }
    GetUserProfile: { // args
      username: string; // String!
    }
    GetUsersWhoLikedPhoto: { // args
      photoId: number; // Int!
    }
    SearchPhoto: { // args
      data: NexusGenInputs['SearchUsersInput']; // SearchUsersInput!
    }
    SearchUser: { // args
      data: NexusGenInputs['SearchUsersInput']; // SearchUsersInput!
    }
    users: { // args
      after?: NexusGenInputs['UserWhereUniqueInput'] | null; // UserWhereUniqueInput
      before?: NexusGenInputs['UserWhereUniqueInput'] | null; // UserWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

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
  context: createContext;
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