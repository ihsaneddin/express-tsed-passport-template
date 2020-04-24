import {GlobalAcceptMimesMiddleware, ServerLoader, ServerSettings} from "@tsed/common";
import bodyParser from "body-parser";
import compress from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import methodOverride from "method-override";
import { SessionCtrl, UsersCtrl } from "./controllers"
import {User} from "./models/User";

const rootDir = __dirname;
const config = dotenv.config();

@ServerSettings({
  rootDir,
  acceptMimes: ["application/json"],
  logger: {
    debug: true,
    logRequest: true,
    requestFields: ["reqId", "method", "url", "headers", "query", "params", "duration"]
  },
  componentsScan: [
    `${rootDir}/services/*.ts`,
    `${rootDir}/protocols/*.ts`,
    `${rootDir}/middlewares/*.ts`,
  ],
  mount: {
    "/": [
      SessionCtrl,
      UsersCtrl
    ]
  },
  passport: {
    userInfoModel: User
  }
})
export class Server extends ServerLoader {

  public $beforeRoutesInit(): void | Promise<any> {
    this
      .use(GlobalAcceptMimesMiddleware)
      .use(cors())
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({
        extended: true
      }))
      // @ts-ignore
      // .use(session({
      //   secret: process.env.secret,
      //   resave: true,
      //   saveUninitialized: true,
      //   // maxAge: 36000,
      //   cookie: {
      //     path: "/",
      //     httpOnly: true,
      //     secure: false,
      //     maxAge: null
      //   }
      // }));

    return null;
  }

}
