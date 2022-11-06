import { User } from 'src/users/models/user.model';
import { TokensService } from './../tokens/tokens.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { LoginUserDto } from './dto/login-user.dto';
export declare class UsersController {
    private usersService;
    private tokenService;
    constructor(usersService: UsersService, tokenService: TokensService);
    signup(dto: CreateUserDto, response: any): Promise<{
        token: any;
    }>;
    signin(dto: LoginUserDto, response: any): Promise<{
        token: any;
    }>;
    logout(response: any, request: any): Promise<void>;
    getAllUsers(): Promise<User[]>;
    getUser(id: number): Promise<User>;
}
