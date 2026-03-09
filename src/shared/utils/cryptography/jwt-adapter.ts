import jwt, { JwtPayload, type SignOptions } from "jsonwebtoken";
import { IDecrypter } from "./IDecrypter";
import { IEncrypter } from "./IEncrypter";

export class jwtAdapter implements IDecrypter,IEncrypter {
    encrypt = async ({ payload, signature, options }: { payload: object, signature: string, options?: SignOptions }) :Promise<string>=> {
        return await jwt.sign(payload, signature, options)
    };
    decrypt = async ({ token, signature}:{token:string, signature: string}): Promise<string> => {
        return await jwt.verify(token,signature) as any
    };
}