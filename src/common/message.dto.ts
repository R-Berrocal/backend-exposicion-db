import { ProductoDto } from "src/producto/dto/producto.dto";

export class MessageDto{
    message: string;
    producto:ProductoDto;
    constructor(message:string,producto:ProductoDto){
        this.message= message; 
        this.producto=producto;
    }
}