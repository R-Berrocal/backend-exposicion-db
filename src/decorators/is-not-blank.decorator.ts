import { registerDecorator, ValidationOptions} from 'class-validator';

export function IsNotBlank( validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'IsNotBlank',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if( typeof value !== 'string') return false;
          //Expresion regular que me permite encontrar los espacios en blancos que hayan y reemplazarlos por comillas vacias
          const valueTrim = value.replace(/ /g,"");
          if(valueTrim==="") return false;
          return true;
        },
      },
    });
  };
}