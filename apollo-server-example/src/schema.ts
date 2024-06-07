import { gql } from 'apollo-server-express';
import {
  AppUserEntityControllerApi,
  AppUserRequestBody,
  CompanyEntityControllerApi,
  CompanyRequestBody,
  EntityModelAppUser,
  EntityModelCompany
} from './generated'
import { AxiosResponse, RawAxiosRequestConfig } from 'axios';
import { error } from 'console';
import { DefaultDeserializer } from 'v8';
// import { readFileSync } from 'fs';
// import { join } from 'path';

// export const typeDefs = gql(readFileSync(join(__dirname, 'schema.gql'), 'utf8')); 
export const typeDefs = gql`
  type Query {
    users: [User]
    companies: [Company]
    findUserById(id: ID!): User
    findCompanyById(id: ID!): Company
  }

  type Mutation {
    createUser(user: UserInput): User
    updateUser(user: UserInput): SuccessResponse
  }

  type SuccessResponse {
    success: Boolean!
    message: String
    error: String
  }

  type User{
    id: ID!
    firstName: String
    lastName: String
    email: String
    age: Int
    company: String
  }

  type Company{
    code: ID!
    name: String
  }
  
  input UserInput {
    userId: ID!
    firstName: String
    lastName: String
    email: String
    age: Int
    company: String
}
`;


type UserInput = {
  userId: string
  firstName?: string
  lastName?: string
  email?: string
  age?: number
  company?: string;
}

export const resolvers = {
  Query: {
    users: async () => {
      const api = new AppUserEntityControllerApi()
      const data = (await api.getCollectionResourceAppuserGet1()).data
      console.table(data._embedded?.user)
      return data._embedded?.user
    },

    companies: async () => {
      const api = new CompanyEntityControllerApi()
      const data = (await api.getCollectionResourceCompanyGet1()).data
      console.table(data._embedded?.company)
      return data._embedded?.company
    },

    findUserById: async (parent: {}, args: { id: string }) => {
      const p = new AppUserEntityControllerApi().getItemResourceAppuserGet(args.id)
      const data = (await p).data
      console.log(data)
      return data
    },

    findCompanyById: async (parent: {}, args: { id: string }) => {
      const p = new CompanyEntityControllerApi().getItemResourceCompanyGet(args.id)
      const data = (await p).data
      console.log(data)
      return data
    }

  },

  User: {
    id: (parent: EntityModelAppUser) => `${parent.userId}`,
    company: (parent: EntityModelAppUser) => parent._links!.company.href
  },

  Company: {
    code: (parent: EntityModelCompany) => `${parent.companyCode}`,
    name: (parent: EntityModelCompany) => `${parent.companyName}`,
  },

  SuccessResponse: {
    success: (parent: Response) => {
      return parent.result ?
        parent.result.status >= 200 && parent.result.status < 300 :
        false
    },
    message: (parent: Response) => {
      return parent.result ?
        parent.result.status :
        parent.error.message
    },
    error: (parent: Response) => {
      return parent.result ?
        parent.result.status :
        JSON.stringify(parent.error)
    },
  },

  Mutation: {
    createUser: async (parent: {}, args: { user: UserInput }) => {
      const api = new AppUserEntityControllerApi()
      return (await api.postCollectionResourceAppuserPost(args.user)).data
    },

    updateUser: async (parent: {}, args: { user: UserInput }) => {
      const findUserResult = await getItemResourceAppuserGet(args.user.userId)
      if (findUserResult.result) {
        const instance = findUserResult.result!.data
        console.log(instance)

        const body: AppUserRequestBody = {
          userId: args.user.userId,
          company: args.user.company ?? instance._links!.company.href!,
          firstName: args.user.firstName ?? instance.firstName!,
          lastName: args.user.lastName ?? instance.lastName!,
          age: args.user.age ?? instance.age!,
          email: args.user.email ?? instance.email!,
        }
        return await postCollectionResourceAppuserPost(body)
      }
      return findUserResult;
    }
  }
}

type Response = {
  result?: AxiosResponse<EntityModelAppUser, any>;
  error?: any;
}


// try/catch True/Falseに変換する
const getItemResourceAppuserGet =
  (id: string, options?: RawAxiosRequestConfig): Promise<Response> => {
    return new Promise((resolve, reject) => {
      new AppUserEntityControllerApi()
        .getItemResourceAppuserGet(id, options)
        .then(result => resolve({ result }))
        .catch(error => resolve({ error }))
    })
  }

// try/catch True/Falseに変換する
const postCollectionResourceAppuserPost =
  (body: AppUserRequestBody, options?: RawAxiosRequestConfig): Promise<Response> => {
    return new Promise((resolve, reject) => {
      new AppUserEntityControllerApi()
        .postCollectionResourceAppuserPost(body, options)
        .then(result => resolve({ result }))
        .catch(error => resolve({ error }))
    })
  }