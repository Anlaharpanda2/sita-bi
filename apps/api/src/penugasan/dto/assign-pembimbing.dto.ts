import { IsInt, IsNotEmpty, IsOptional, Validate, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'isNotSameAs', async: false })
export class IsNotSameAsConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const relatedValue = (args.object as any)[args.constraints[0]];
    return value !== relatedValue;
  }

  defaultMessage() {
    return `Pembimbing 2 tidak boleh sama dengan Pembimbing 1.`;
  }
}

export class AssignPembimbingDto {
  @IsInt()
  @IsNotEmpty()
  pembimbing1Id: number;

  @IsOptional()
  @IsInt()
  @Validate(IsNotSameAsConstraint, ['pembimbing1Id'])
  pembimbing2Id?: number;
}
