import { ISignUpDtoReq } from "../dtos/request/index";
import { ISignUpDtoRes } from "../dtos/response/index";

export interface ISignUpService {
    createUser: (data: ISignUpDtoReq)=>Promise<ISignUpDtoRes>
}