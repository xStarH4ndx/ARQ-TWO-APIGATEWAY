import { Field, Float, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

@InputType()
export class ItemCompraInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  productoId: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  nombreProducto: string;

  @Field(() => Number)
  @IsNumber()
  @IsPositive()
  cantidad: number;

  @Field(() => Float)
  @IsNumber()
  precioUnitario: number;

  @Field()
  @IsBoolean()
  esCompartido: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  propietarioId?: string;
}
