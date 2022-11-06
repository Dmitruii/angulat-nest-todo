import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UsersService } from 'src/users/users.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { Token } from './models/token.model';
const jwt = require('jsonwebtoken');

@Injectable()
export class TokensService {

    constructor(@InjectModel(Token) private tokenRepository: typeof Token,
        @Inject(forwardRef(() => UsersService))
        private usersService: UsersService) {}

    generateTokens(user: CreateTokenDto) {
        const accessToken = jwt.sign({...user}, process.env.JWT_ACCESS_SECRET_TOKEN, {expiresIn: '30m'})
        const refreshToken = jwt.sign({...user}, process.env.JWT_REFRESH_SECRET_TOKEN, {expiresIn: '10d'})

        return { accessToken, refreshToken }
    }

    async saveRefreshToken(refreshToken: string, userId: number) {
        const candidate = await this.tokenRepository.findOne({where: {userId}})

        if (candidate) {
            return await candidate.update({tokenRefresh : refreshToken})
        }

        const createTokenData = {
            tokenRefresh: refreshToken,
            userId: userId
        }
        return await this.tokenRepository.create(createTokenData)
    }

    async deleteRefreshToken(token: string) {
        if (!token) {
            throw new HttpException('Unauthorized user', HttpStatus.UNAUTHORIZED)
          }    

        return await this.tokenRepository.destroy({ where: { tokenRefresh: token } })
    }

    async refreshTokens(token: string) {
        if (!token) {
            throw new HttpException('Unauthorized user', HttpStatus.UNAUTHORIZED)
        }

        const tokenData = jwt.verify(token, process.env.JWT_REFRESH_SECRET_TOKEN)
        const findToken = await this.tokenRepository.findOne({ where: { tokenRefresh: token } })

        if (!tokenData || !findToken) {
            throw new HttpException('Unauthorized user', HttpStatus.UNAUTHORIZED)
        } 

        const user = await this.usersService.getOneUser(tokenData.id)
        if (!user) {
            throw new HttpException('Unauthorized user', HttpStatus.UNAUTHORIZED)
        }

        const tokensPayload = new CreateTokenDto(user.id, user.email)
        return this.generateTokens(tokensPayload)
    }

}
