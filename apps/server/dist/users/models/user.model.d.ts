import { Model } from "sequelize-typescript";
interface UserCreationAttrs {
    email: string;
    password: string;
    name: string;
    activeId: number;
    tokenId: number;
}
export declare class User extends Model<User, UserCreationAttrs> {
    id: number;
    email: string;
    password: string;
    name: string;
}
export {};
