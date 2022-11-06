import { JwtAuthGuard } from './../guards/jwt-auth-guard';
import { Injectable, HttpException, HttpStatus, UseGuards, Inject, forwardRef } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/user.model';
import { ActivatesService } from './../activates/activates.service'
import { TokensService } from './../tokens/tokens.service'
import { v4 as uuidv4 } from 'uuid';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateTokenDto } from 'src/tokens/dto/create-token.dto';
const bcrypt = require('bcrypt');

@Injectable()
export class UsersService {
  
  constructor(@InjectModel(User) private userRepository: typeof User,
      private ActivatesService: ActivatesService,
      @Inject(forwardRef(() => TokensService))
      private tokensService: TokensService) {}
  
  async createUser(dto: CreateUserDto) {
    const { password, email } = dto

    const hashPassword = await bcrypt.hashSync(password, +process.env.HASH_LEVEL)

    const findUser = await this.userRepository.findOne({ where: { email: email }})
    if (findUser) {
      throw new HttpException('User with this email already exist', HttpStatus.BAD_REQUEST)
    }

    const user = await this.userRepository.create({...dto, password: hashPassword})

    await this.ActivatesService.createActivate({isActive: false, activeLink: uuidv4(), userId: user.id}, user.email)

    const tokenPayload = new CreateTokenDto(user.getDataValue('id'), user.getDataValue('email'))
    const { refreshToken, accessToken } = await this.tokensService.generateTokens(tokenPayload)

    await this.tokensService.saveRefreshToken(refreshToken, user.id)

    return { refreshToken, accessToken }
  }

  async login(user: LoginUserDto) {
    const { email, password } = user

    let candidate = await this.userRepository.findOne({where: { email }})
    if (!candidate) {
      throw new HttpException(`User with this email address does not exist`, HttpStatus.BAD_REQUEST)
    }
    candidate = candidate.toJSON()

    const isRigthPassword = await bcrypt.compare(password, candidate.password)
    if (!isRigthPassword) {
      throw new HttpException(`Bad email or password`, HttpStatus.BAD_REQUEST)
    }
    
    const tokenPayload = new CreateTokenDto(candidate.id, candidate.email)
    const { accessToken, refreshToken } = this.tokensService.generateTokens(tokenPayload)

    await this.tokensService.saveRefreshToken(refreshToken, candidate.id)

    return { accessToken, refreshToken }

  }

  async getOneUser(id: number) {
    const user = await this.userRepository.findByPk(id)

    if (!user) {
      throw new HttpException(`User not found`, HttpStatus.BAD_REQUEST)
    }

    return await this.userRepository.findByPk(id)
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll()
    
    return users
  }

}
