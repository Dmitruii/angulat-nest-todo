import { Model } from "sequelize-typescript";
import { User } from "src/users/models/user.model";
interface TokenCreationAttr {
    tokenRefresh: string;
}
export declare class Token extends Model<Token, TokenCreationAttr> {
    id: number;
    tokenRefresh: string;
    userId: number;
    user: User;
}
export {};
