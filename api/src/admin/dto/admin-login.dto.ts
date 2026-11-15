import { IsString, Length } from "class-validator";

export class AdminLoginDto {
  @IsString({ message: "Informe a senha." })
  @Length(1, 200, { message: "Informe a senha." })
  senha!: string;
}
