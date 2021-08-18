import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-kakao';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from '../../user/interface/user.interface';
import { UserService } from '../../user/user.service';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(private userService: UserService) {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: '',
      callbackURL: 'http://localhost:5000/auth/kakao/redirect',
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<any> {
    const { username, emails } = profile;
    const email: string = profile._json.kakao_account.email;
    // const email: string = emails[0].value;
    const createUserDto: CreateUserDto = { email, name: username };
    const user: User = this.userService.findOrCreate(createUserDto);
    const payload = {
      user,
      accessToken,
    };

    done(null, payload);
  }
}
