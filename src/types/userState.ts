import { dataStatus } from "./redux";
import { IUser } from "./user";

interface userState {
    error: string | null;
    status: dataStatus;
    user: IUser | null;
}

export default userState