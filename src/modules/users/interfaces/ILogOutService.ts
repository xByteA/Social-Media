import { ILogOutDtoReq } from "../dtos/request";

export interface ILogOutService {
    logOut: (data:ILogOutDtoReq)=> Promise<string>
}