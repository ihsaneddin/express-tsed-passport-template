import {BodyParams, Controller, Get, Post, Req, Status} from "@tsed/common";
import {Authenticate, Authorize} from "@tsed/passport";
import {Credentials} from "../models/Credentials";

@Controller("/auth")
export default class SessionCtrl {

  @Post("/login")
  @Authenticate("login", {failWithError: true})
  public login(@Req() req: Req, @BodyParams() credentials: Credentials) {
    return req.user;
  }

  @Get("/userinfo")
  @Authenticate("jwt")
  public getUserInfo(@Req() req: Req): any {
    return req.user;
  }

  @Get("/logout")
  @Authenticate("jwt")
  public logout(@Req() req: Req) {
    req.logout();
  }

}
