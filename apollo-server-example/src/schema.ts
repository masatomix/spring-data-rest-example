import { gql } from 'apollo-server-express';
import {
  AppUserEntityControllerApi,
  AppUserRequestBody,
  CompanyEntityControllerApi,
  EntityModelAppUser,
  EntityModelCompany
} from './generated'
import axios, { AxiosResponse, RawAxiosRequestConfig } from 'axios';
import DataLoader from 'dataloader';

import { readFileSync } from 'fs';
import { join } from 'path';

export const typeDefs = gql(readFileSync(join(__dirname, 'schema.gql'), 'utf8'));

type UserInput = {
  userId: string
  firstName?: string
  lastName?: string
  email?: string
  age?: number
  companyCode?: string
}


const dataLoader = new DataLoader(async (ids): Promise<EntityModelCompany[]> => {
  console.log('batch start')
  console.log(ids)

  const idsStr = ids.join(',')
  const data = (await axios.get('http://localhost:8080/companies/search/findAllByIdIn',
    {
      params: { ids: idsStr }
    })).data;
  return data._embedded?.company
})


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

    user: async (parent: {}, args: { id: string }) => {
      const p = new AppUserEntityControllerApi().getItemResourceAppuserGet(args.id)
      const data = (await p).data
      console.log(data)
      return data
    },

    company: async (parent: {}, args: { id: string }) => {
      const p = new CompanyEntityControllerApi().getItemResourceCompanyGet(args.id)
      const data = (await p).data
      console.log(data)
      return data
    }

  },

  User: {
    id: (parent: EntityModelAppUser) => `${parent.userId}`,
    // company: (parent: EntityModelAppUser) => parent._links!.company.href
    company: async (parent: EntityModelAppUser) => {
      const data = (await dataLoader.load(parent.companyCode))
      // const api = new CompanyEntityControllerApi()
      // const data = (await api.getItemResourceCompanyGet(parent.companyCode!)).data

      console.log(data)
      return data
    }
  },

  Company: {
    code: (parent: EntityModelCompany) => `${parent.companyCode}`,
    name: (parent: EntityModelCompany) => `${parent.companyName}`,
  },

  SuccessResponse: {
    __resolveType(obj: { result: any; }, context: any, info: any) {
      return obj.result ? 'Response1' : 'Response2'
    }
  },

  Response1: {
    success: (parent: Response) => {
      return parent.result ?
        parent.result.status >= 200 && parent.result.status < 300 :
        false
    },
  },

  Response2: {
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

    updateUser: async (parent: {}, args: { user: UserInput }): Promise<Response> => {
      try {
        const userPromise = new AppUserEntityControllerApi()
          .getItemResourceAppuserGet(args.user.userId)
        const instance = (await userPromise).data
        console.log(instance)

        const body: AppUserRequestBody = {
          userId: args.user.userId,
          firstName: args.user.firstName ?? instance.firstName!,
          lastName: args.user.lastName ?? instance.lastName!,
          age: args.user.age ?? instance.age!,
          companyCode: args.user.companyCode ?? instance.companyCode!,
          email: args.user.email ?? instance.email!,
        }

        try {
          const updatePromise = new AppUserEntityControllerApi()
            .postCollectionResourceAppuserPost(body)
          const result = await updatePromise
          return { result }
          // ここでは結果を返すだけ、次のリゾルバにまかせる
          // return {
          //   success: true
          // }
        } catch (error) {
          console.log(error)
          return { error }
          // ここでは結果を返すだけ、次のリゾルバにまかせる
          // return {
          //   success: false,
          //   error: JSON.stringify(error),
          //   message: (error as { message: string }).message
          // }
        }
      } catch (error) {
        console.log(error)
        return { error }
        // ここでは結果を返すだけ、次のリゾルバにまかせる
        // return {
        //   success: false,
        //   error: JSON.stringify(error),
        //   message: (error as { message: string }).message
        // }
      }
    }
  }
}

type Response = {
  result?: AxiosResponse<EntityModelAppUser, any>;
  error?: any;
}


// // try/catch True/Falseに変換する
// const getItemResourceAppuserGet =
//   (id: string, options?: RawAxiosRequestConfig): Promise<Response> => {
//     return new Promise((resolve, reject) => {
//       new AppUserEntityControllerApi()
//         .getItemResourceAppuserGet(id, options)
//         .then(result => resolve({ result }))
//         .catch(error => resolve({ error }))
//     })
//   }

// // try/catch True/Falseに変換する
// const postCollectionResourceAppuserPost =
//   (body: AppUserRequestBody, options?: RawAxiosRequestConfig): Promise<Response> => {
//     return new Promise((resolve, reject) => {
//       new AppUserEntityControllerApi()
//         .postCollectionResourceAppuserPost(body, options)
//         .then(result => resolve({ result }))
//         .catch(error => resolve({ error }))
//     })
//   }