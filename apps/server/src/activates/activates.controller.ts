import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ActivatesService } from './activates.service';

@Controller()
export class ActivatesController {

    constructor (private activatesService: ActivatesService) {}

    @ApiTags('Mail activate')
    @Get('active/:id')
    async active(@Param('id') id: number) {
        return this.activatesService.active(id)
    }

}
