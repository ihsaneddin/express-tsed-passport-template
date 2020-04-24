import {BodyParams, Controller, Get, Post, Req, Status, Inject} from "@tsed/common";
import {Authenticate, Authorize} from "@tsed/passport";
import {UsersService} from '../services/UsersService'
import {User} from "../models/User"

@Controller("/users")
export default class UsersCtrl {

  @Inject()
  private usersService: UsersService;

  @Get("/")
  @Authenticate("jwt")
  async index(
  ): Promise<User[]> {
    return this.usersService.findAll();
  }

}
