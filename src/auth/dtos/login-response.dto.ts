import { UserResponseDto } from 'src/user/dtos/user-reponse.dto';

export class LoginResponseDto {
  accessToken: string;

  user: UserResponseDto;
}
