import {BodyParams, Req} from "@tsed/common";
import {OnInstall, OnVerify, Protocol} from "@tsed/passport";
import dotenv from "dotenv";
import JWT from "jsonwebtoken";
import {IStrategyOptions, Strategy} from "passport-local";
import {UsersService} from "../services/UsersService";

const config = dotenv.config();
const secret = process.env.secret;

@Protocol<IStrategyOptions>({
  name: "login",
  useStrategy: Strategy,
  settings: {
    session: false,
    usernameField: 'email',
    passwordField: 'password'
  }
})
export class BasicProtocol implements OnVerify {
  constructor(private usersService: UsersService) {
  }

  public async $onVerify(@Req() request: Req, @BodyParams("email") email: string,
                         @BodyParams("password") password: string) {

    const user = await this.usersService.findOne({email: email});

    if (!user) {
      return false;
    }

    if (!user.verifyPassword(password)) {
      return false;
    }
    const token = JWT.sign({ id: user._id }, secret, { expiresIn: "24h" });
    delete user.password
    user.token = token;
    return user;
  }

}
