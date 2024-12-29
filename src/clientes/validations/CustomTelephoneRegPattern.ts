import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: "IsTelephone", async: false })
export class CustomTelephoneRegPattern implements ValidatorConstraintInterface {
    static readonly message = "El formato del teléfono no es válido";
    static readonly pattern = /^[0-9]{10}$/;

    validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean {
        return CustomTelephoneRegPattern.pattern.test(value);
    }

    defaultMessage?(validationArguments?: ValidationArguments): string {
        return CustomTelephoneRegPattern.message;
    }
}