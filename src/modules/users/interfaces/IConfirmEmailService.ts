import { IconfirmEmailDtoReq } from "../dtos/request/index";

export interface IConfirmEmailService {
    confirmEmail(data: IconfirmEmailDtoReq): Promise<string>;
}
