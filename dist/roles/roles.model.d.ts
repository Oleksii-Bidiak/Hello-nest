import { User } from "./../users/users.model";
import { Model } from "sequelize-typescript";
interface RoleCreateAttrs {
    value: string;
    description: string;
}
export declare class Role extends Model<Role, RoleCreateAttrs> {
    id: number;
    value: string;
    description: string;
    users: User[];
}
export {};
