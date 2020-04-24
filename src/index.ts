import {$log, ServerLoader} from "@tsed/common";
import dotenv from "dotenv";
import {Server} from "./server";

const config = dotenv.config();
// tslint:disable-next-line:no-console
console.log(config.parsed);

async function bootstrap() {
  try {
    $log.debug("Start server...");
    const server = await ServerLoader.bootstrap(Server, config.parsed);

    await server.listen();
    $log.debug("Server initialized");
  } catch (er) {
    $log.error(er);
  }
}

bootstrap();
