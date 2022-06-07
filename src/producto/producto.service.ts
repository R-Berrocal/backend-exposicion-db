import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ProductoEntity } from './producto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductoRepository } from './producto.respository';
import { ProductoDto } from './dto/producto.dto';
import { MessageDto } from 'src/common/message.dto';

@Injectable()
export class ProductoService {
    constructor(
        @InjectRepository(ProductoEntity) private productRepository: ProductoRepository){}
    
        async getAll():Promise<ProductoEntity[]>{
            const list = await this.productRepository.find();
            if(!list.length){
                throw new NotFoundException({msg: 'la list está vacia'})
            }
            return list;
        }

        async findById(id:number):Promise<ProductoEntity>{
            const producto = await this.productRepository.findOne(id);
            if(!producto){
                throw new NotFoundException({msg:"no existe"})
            }

            return producto;
        }

        async findByNombre(nombre:string):Promise<ProductoEntity>{
            const producto = await this.productRepository.findOne({nombre});
            // esto da el mismo resultado  
            //return producto?producto:null;
            return producto;
        }
        async create(dto:ProductoDto):Promise<any>{
            const exists = await this.findByNombre(dto.nombre);
            if(exists){
                throw new BadRequestException({message:`ya existe en la base de datos el nombre, ${dto.nombre}`})
            }
            const producto = this.productRepository.create(dto);
            await this.productRepository.save(producto);
            return new MessageDto("producto creado",producto);
        }
        async update(id:number,dto:ProductoDto):Promise<any>{
            const producto = await this.findById(id);
            if(!producto) throw new BadRequestException({message:`No existe el producto con id ${id}`});

            const exists = await this.findByNombre(dto.nombre);
            if(exists && exists.id !==id) throw new BadRequestException({message:"El nombre ya existe"})
            dto.nombre? producto.nombre=dto.nombre: producto.nombre = producto.nombre;
            dto.precio? producto.precio=dto.precio: producto.precio = producto.precio;
            await this.productRepository.save(producto);
            return new MessageDto("producto actualizado",producto);
        }
        async delete(id:number):Promise<any>{
            const producto = await this.findById(id);
            if(producto){
                await this.productRepository.delete(producto);
                return new MessageDto("producto eliminado",producto);
            }
        }


}
