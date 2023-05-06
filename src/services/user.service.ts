import responseObject from "../utils/Response";
import getConnect from "../utils/DatabaseConnection";

export default class UserService {
    public static create = async (data: any) => {
        await getConnect();
        return responseObject(201, data);
    }

    public static findById = async (userId: string) => {
        return responseObject(200, {message: "User Found!"});
    }

    public static update = async (data: any, userId: string) => {
        return responseObject(200, {message: "User updated!"});
    }

    public static delete = async (userId: string) => {
        return responseObject(200, {message: "User deleted!"});
    }
}
