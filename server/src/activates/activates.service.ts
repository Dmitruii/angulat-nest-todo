import { HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ActivateDto } from './dto/activate.dto';
import { Activate } from './models/activate.model';
import { mailConfig } from './../configs/mail'
const nodemailer = require('nodemailer')

@Injectable()
export class ActivatesService {

  constructor(@InjectModel(Activate) private activateRepository: typeof Activate) {}

  async createActivate(dto: ActivateDto, to: string) {
    let activate = await this.activateRepository.create(dto)
    activate = activate.toJSON()

    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: +process.env.SMTP_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD
      },
    })

    let message = new mailConfig(activate.activeLink, to, 'Activate link', 'Todo rest api')
    
    try {
      await transporter.sendMail(message)
    } catch (e) {
      throw new HttpException(e, HttpStatus.NON_AUTHORITATIVE_INFORMATION)
    }

    return activate
  }

  async active(id: number) {
    let activate = await this.activateRepository.findOne({where: { activeLink: id }})

    if (activate) {      
      if (activate.isActive === true) {
        return `<h1>You have already actived your account</h1>`
      }

      activate.isActive = true
      await activate.save()
      return `<h1>Success</h1>`
    }

    throw new HttpException('Bad activate link', HttpStatus.BAD_REQUEST)
  }

}
