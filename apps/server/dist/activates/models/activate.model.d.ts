import { Model } from "sequelize-typescript";
import { User } from "src/users/models/user.model";
interface ActivateCreationAttr {
    isActive: boolean;
    activeLink: string;
}
export declare class Activate extends Model<Activate, ActivateCreationAttr> {
    id: number;
    isActive: boolean;
    activeLink: string;
    userId: number;
    user: User;
}
export {};
