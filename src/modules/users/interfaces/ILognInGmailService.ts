import { ILogInDtoRes } from "../dtos/response";

export interface ILognInGmailService {
    logInGmail: (idToken:string)=> Promise<ILogInDtoRes>
}