import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/models/user.model';
import { ActivateDto } from './dto/activate.dto';
import { Activate } from './models/activate.model';

@Injectable()
export class ActivatesService {

  constructor(@InjectModel(Activate) private activateRepository: typeof Activate) {}

  async createActivate(dto: ActivateDto) {
    const activate = await this.activateRepository.create(dto)

    return activate
  }

}
