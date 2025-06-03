import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, Length } from 'class-validator';

@InputType()
export class CrearProductoInputDto {
  @Field()
  @IsNotEmpty({ message: 'El nombre del producto es obligatorio' })
  @Length(2, 100, { message: 'El nombre del producto debe tener entre 2 y 100 caracteres' })
  nombre: string;

  @Field()
  @IsNotEmpty({ message: 'La categoría del producto es obligatoria' })
  categoria: string;

  @Field({ nullable: true })
  @Length(0, 255, { message: 'La descripción no puede exceder los 255 caracteres' })
  descripcion?: string;
}
