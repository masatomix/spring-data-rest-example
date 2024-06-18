import { ApolloError } from 'apollo-server-express';

export type ErrorObj = {
    message: string
    code: string
    extensions?: Record<string, any>,
}

export class CustomError extends ApolloError {
    ext: unknown
    constructor(obj: ErrorObj) {
        const { message, code, extensions, } = obj
        super(message, code, extensions);

        // エラーの名前を 'CustomError' に設定
        Object.defineProperty(this, 'name', { value: 'CustomError' });
    }
}