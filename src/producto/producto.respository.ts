import { EntityRepository, Repository } from "typeorm";
import { ProductoEntity } from "./producto.entity";

@EntityRepository()
export class ProductoRepository extends Repository<ProductoEntity>{}