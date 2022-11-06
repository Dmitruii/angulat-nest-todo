import { TokensService } from './tokens.service';
export declare class TokensController {
    private tokenService;
    constructor(tokenService: TokensService);
    refresh(request: any, response: any): Promise<{
        token: any;
    }>;
}
