import { HttpStatus, Param, Body } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { TokensService } from './../tokens/tokens.service';
import { JwtAuthGuard } from './../guards/jwt-auth-guard';
import { Controller, Post, Get, UseGuards, Req, Res, Delete } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller()
export class UsersController {

  constructor(private usersService: UsersService,
    private tokenService: TokensService) {}

  @ApiTags('Auth')
  @Post('signup')
  async signup(@Body() dto: CreateUserDto,
      @Res({ passthrough: true }) response) {
    const { refreshToken, accessToken } = await this.usersService.createUser(dto)
    response.cookie('refreshToken', refreshToken, { httpOnly: true,  maxAge: 60 * 60 * 24 * 30 })

    return { token: accessToken }
  }

  @ApiTags('Auth')
  @Post('signin')
  async signin(@Body() dto: LoginUserDto,
      @Res({ passthrough: true }) response) {
    const { refreshToken, accessToken } = await this.usersService.login(dto)
    response.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 60 * 60 * 24 * 30})
    return { token: accessToken }
  }

  @ApiTags('Auth')
  @Delete('logout')
  async logout(@Res({ passthrough: true }) response,
      @Req() request) {
    const refreshToken = request.cookies.refreshToken

    await this.tokenService.deleteRefreshToken(refreshToken)
    response.clearCookie('refreshToken', { path: '' })

    throw new HttpException('Logout successfully', HttpStatus.OK)
  }

  @ApiTags('Users')
  @Get('users')
  @UseGuards(JwtAuthGuard)
  async getAllUsers() {
    return await this.usersService.getAllUsers()
  }
  
  @ApiTags('Users')
  @Get('user/:id')
  async getUser(@Param('id') id: number) {
    return await this.usersService.getOneUser(id)
  }

}
