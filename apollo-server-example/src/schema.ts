import { gql } from 'apollo-server-express';
import {
  AppUserEntityControllerApi,
  AppUserRequestBody,
  CompanyEntityControllerApi,
  EntityModelAppUser,
  EntityModelCompany
} from './generated'
import axios, { AxiosResponse } from 'axios';
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


type RestResponse = {
  result?: AxiosResponse<EntityModelAppUser, any>;
  error?: any;
}

const checkSuccess = (parent: RestResponse): boolean => {
  return parent.result ?
    parent.result.status >= 200 && parent.result.status < 300 :
    false
}

const dataLoader = new DataLoader<string, EntityModelCompany>(async (ids): Promise<EntityModelCompany[]> => {
  console.log('batch start')
  console.log(ids)

  const idsStr = ids.join(',')
  const data = (await axios.get('http://localhost:8080/companies/search/findAllByIdIn',
    {
      params: { ids: idsStr }
    })).data;
  const companies: EntityModelCompany[] = data._embedded?.company
  // 戻り値のデータは、引数のデータの順番通りとはかぎらない

  // 引数のidsの順番にあうように、結果を並べ替える処理
  // companyCodeとCompanyのMap
  type CompanyMap = { [key: string]: EntityModelCompany }
  const companyMap: CompanyMap = companies.reduce((map, company) => {
    map[company.companyCode!] = company
    return map
  }, {} as CompanyMap)

  // reduceより、下記の方がわかりやすいっ。。
  // const companyMap: CompanyMap = {}
  // for (const company of companies) {
  //   companyMap[company.companyCode!] = company
  // }

  return ids.map(id => companyMap[id])

  // const result = ids.map(id => companyMap[id])
  // console.log('--初期--')
  // console.log(companies)
  // console.log('--結果--')
  // console.log(result)
  // // 並べ替え処理完了
  // return result
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
      // DataLoaderを使う方法。ここではこのコードの登録(？)のみが行われ、
      // 実際は全部のcompanyがそろった時点で、DataLoader.BatchLoadFn 関数がコールされる
      const data = (await dataLoader.load(parent.companyCode!))

      // この方式だと、PK指定でN+1問題が発生しちゃう
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

  Response: {// GraphQLでのunion型は、どちらの型を返すかのロジックを定義しないといけない
    __resolveType(obj: { result: any; }, context: any, info: any) {
      return obj.result ? 'SuccessResponse' : 'FailResponse'
    }
  },

  SuccessResponse: {
    success: checkSuccess,
  },

  FailResponse: {
    success: checkSuccess,
    message: (parent: RestResponse) => {
      return parent.result ?
        parent.result.status :
        parent.error.message
    },
    error: (parent: RestResponse) => {
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

    updateUser: async (parent: {}, args: { user: UserInput }): Promise<RestResponse> => {
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
        } catch (error) {
          console.log(error)
          return { error } // 例外のときもがんばって正常終了させる
        }
      } catch (error) {
        console.log(error)
        return { error } // 例外のときもがんばって正常終了させる
      }
    }
  }
}


