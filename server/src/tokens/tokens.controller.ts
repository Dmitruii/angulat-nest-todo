import { TokensService } from './tokens.service';
import { Controller, Post, Req, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller()
export class TokensController {

    constructor (private tokenService: TokensService) {}

    @ApiTags('Auth')
    @Post('refresh')
    async refresh(@Req() request,
            @Res({ passthrough: true }) response) {
        const cookiesRefreshToken = request.cookies.refreshToken 

        const { refreshToken, accessToken } = 
            await this.tokenService.refreshTokens(cookiesRefreshToken)
        response.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 60 * 60 * 24 * 30 })

        return { token: accessToken }
    }

}
