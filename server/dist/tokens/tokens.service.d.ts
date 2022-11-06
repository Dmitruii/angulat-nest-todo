import { UsersService } from 'src/users/users.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { Token } from './models/token.model';
export declare class TokensService {
    private tokenRepository;
    private usersService;
    constructor(tokenRepository: typeof Token, usersService: UsersService);
    generateTokens(user: CreateTokenDto): {
        accessToken: any;
        refreshToken: any;
    };
    saveRefreshToken(refreshToken: string, userId: number): Promise<Token>;
    deleteRefreshToken(token: string): Promise<number>;
    refreshTokens(token: string): Promise<{
        accessToken: any;
        refreshToken: any;
    }>;
}
