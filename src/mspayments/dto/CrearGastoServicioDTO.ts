import { InputType, Field, Float } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsNumber, Min, IsDate } from 'class-validator';

@InputType() // ⬅️ FALTABA ESTE DECORADOR
export class CrearGastoServicioDTO {
  @Field()
  @IsNotEmpty({ message: 'El ID de la casa es obligatorio' })
  @IsString()
  casaId!: string;

  @Field()
  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  @IsString()
  descripcion!: string;

  @Field(() => Float) // Usar Float para representar Double de Java
  @IsNotEmpty({ message: 'El valor total es obligatorio' })
  @IsNumber()
  @Min(0, { message: 'El valor total debe ser mayor o igual a 0' })
  valorTotal!: number;

  @Field(() => Date)
  @IsNotEmpty({ message: 'La fecha de renovación es obligatoria' })
  @IsDate()
  @Type(() => Date)
  fechaRenovacion!: Date;
}
