import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';

@Controller('ninjas')
export class NinjasController {
  constructor(private readonly ninjaService: NinjasService) {}

  // get all ninjas - GET /ninjas?type=fast&color=black
  @Get()
  getNinjas(@Query('weapon') weapon: 'stars' | 'nunchucks') {
    return this.ninjaService.getNinjas(weapon);
  }

  // get ninja by Id - GET /ninjas/:id
  @Get(':id')
  getNinja(@Param('id', ParseIntPipe) id: number) {
    try {
      this.ninjaService.getNinja(id);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  // add new ninja - POST /ninjas
  @Post()
  createNinja(@Body(new ValidationPipe()) createNinjaDTO: CreateNinjaDto) {
    return this.ninjaService.createNinja({
      name: createNinjaDTO.name,
      color: createNinjaDTO.color,
      weapon: createNinjaDTO.weapon,
    });
  }

  // update ninja - PUT /ninjas/:id
  @Put(':id')
  updateNinja(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNinjaDto: UpdateNinjaDto,
  ) {
    return this.ninjaService.updateNinja(id, {
      name: updateNinjaDto.name,
      color: updateNinjaDto.color,
      weapon: updateNinjaDto.weapon,
    });
  }

  // delete ninja - DELETE /ninjas/:id
  @Delete(':id')
  deleteNinja(@Param('id', ParseIntPipe) id: number) {
    return this.ninjaService.deleteNinja(+id);
  }
}
