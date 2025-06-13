import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsString, ValidateNested, ArrayNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ItemCompraInput } from './itemCompraInput';

@InputType()
export class CompraCreacionInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  casaId: string;

  @Field(() => [ItemCompraInput])
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ItemCompraInput)
  items: ItemCompraInput[];
}
