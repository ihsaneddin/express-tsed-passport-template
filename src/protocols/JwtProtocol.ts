import {Req, Inject} from "@tsed/common";
import {Arg, OnVerify, Protocol} from "@tsed/passport";
import {ExtractJwt, Strategy, StrategyOptions, jwtPayload} from "passport-jwt";
import {UsersService} from "../services/UsersService";
import dotenv from 'dotenv'

const config = dotenv.config()
const secret = process.env.secret

@Protocol<StrategyOptions>({
  name: "jwt",
  useStrategy: Strategy,
  settings: {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret,
    session: false
  }
})
export class JwtProtocol implements OnVerify {
  @Inject(UsersService)
  private usersService: UsersService;

  async $onVerify(@Req() req: Req, @Arg(0) jwtPayload: jwtPayload) {
    let id = <string> jwtPayload.sub;
    const user = await this.usersService.findById(id);
    return user ? user : false;
  }

}