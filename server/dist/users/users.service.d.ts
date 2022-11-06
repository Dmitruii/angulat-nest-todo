import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/user.model';
import { ActivatesService } from './../activates/activates.service';
import { TokensService } from './../tokens/tokens.service';
import { LoginUserDto } from './dto/login-user.dto';
export declare class UsersService {
    private userRepository;
    private ActivatesService;
    private tokensService;
    constructor(userRepository: typeof User, ActivatesService: ActivatesService, tokensService: TokensService);
    createUser(dto: CreateUserDto): Promise<{
        refreshToken: any;
        accessToken: any;
    }>;
    login(user: LoginUserDto): Promise<{
        accessToken: any;
        refreshToken: any;
    }>;
    getOneUser(id: number): Promise<User>;
    getAllUsers(): Promise<User[]>;
}
