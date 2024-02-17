import { RolesService } from "./../roles/roles.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./users.model";
export declare class UsersService {
    private userRepository;
    private rolesService;
    constructor(userRepository: typeof User, rolesService: RolesService);
    createUser(dto: CreateUserDto): Promise<User>;
    getAllUsers(): Promise<User[]>;
    getUserByEmain(email: string): Promise<User>;
}
