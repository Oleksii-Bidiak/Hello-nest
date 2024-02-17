import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ example: "test@gmail.com", description: "Поштова адреса" })
  readonly email: string;

  @ApiProperty({ example: "123456789", description: "Пароль" })
  readonly password: string;
}
