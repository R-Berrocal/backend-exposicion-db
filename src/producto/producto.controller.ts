import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductoDto } from './dto/producto.dto';
import { ProductoService } from './producto.service';

@Controller('producto')
export class ProductoController {
    constructor(private readonly productService: ProductoService){}
    @Get()
    async getAll(){
        return this.productService.getAll();
    }
    @Get("/:id")
    async getOne(@Param("id",ParseIntPipe) id: number){
        return this.productService.findById(id);
    }

    @UsePipes(new ValidationPipe({whitelist:true}))
    @Post()
    async create(@Body() dto: ProductoDto){
        return this.productService.create(dto);
    }

    @UsePipes(new ValidationPipe())
    @Put(':id')
    async update(@Param("id",ParseIntPipe) id: number, @Body() dto: ProductoDto){
        return this.productService.update(id,dto);
    }
    @Delete(':id')
    async delete(@Param("id",ParseIntPipe) id: number){
        return this.productService.delete(id);
    }
}
