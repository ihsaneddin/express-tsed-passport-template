import {IgnoreProperty} from "@tsed/common";
import {Credentials} from "./Credentials";

export class User extends Credentials {
  public _id: string;

  @IgnoreProperty()
  public password: string;

  public name?: string;
  public avatar?: string;
  public token?: string;

  public verifyPassword(password: string) {
    return this.password === password;
  }
}
