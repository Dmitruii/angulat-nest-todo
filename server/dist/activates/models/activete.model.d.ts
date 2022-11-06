import { Model } from "sequelize-typescript";
interface ActiveteCreationAttr {
    isActive: boolean;
    activeLink: boolean;
}
export declare class Activete extends Model<Activete, ActiveteCreationAttr> {
    id: number;
    isActive: boolean;
    activeLink: string;
}
export {};
