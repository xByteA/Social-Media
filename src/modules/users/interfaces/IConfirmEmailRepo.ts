import * as UR from "../../../Infrastructure/DB/mongodb/repositories/User";

export interface IConfirmEmailRepo extends UR.IFindByemail, UR.IupdateOne {}