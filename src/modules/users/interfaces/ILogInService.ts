import { ILogInDtoReq } from "../dtos/request";
import { ILogInDtoRes } from "../dtos/response";

export interface ILognInService {
    logIn: (data:ILogInDtoReq)=> Promise<ILogInDtoRes>
}