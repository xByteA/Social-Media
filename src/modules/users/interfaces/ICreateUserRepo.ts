import * as UR from "../../../Infrastructure/DB/mongodb/repositories/User";

export interface ICreateUserRepo extends UR.IFindByemail, UR.ICreateRepository { }

