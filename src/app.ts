import express, {
  Express,
  NextFunction,
  Request,
  Response,
  json,
  static as static_,
} from "express";
import cors from "cors";
import { SampleRouter } from "./routers/sample.router";
import { join } from "path";
import { AuthRouter } from "./routers/auth.router";

const PORT = 8000;

export default class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure() {
    this.app.use(cors());
    this.app.use(json());
    this.app.use("/", static_(join(__dirname, "../public")));
  }

  private routes() {
    const sampleRouter = new SampleRouter();
    const authRouter = new AuthRouter();

    this.app.use("/samples", sampleRouter.getRouter());
    this.app.use("/auth", authRouter.getRouter());
  }

  private handleError() {
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        res.status(400).send(err.message);
      }
    );
  }

  public start() {
    this.app.listen(PORT, () => {
      console.log(`Server running on port : ${PORT}`);
    });
  }
}
