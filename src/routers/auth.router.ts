import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { verifyToken } from "../middlewares/verifyToken";

export class AuthRouter {
  private authController: AuthController;
  private router: Router;

  constructor() {
    this.authController = new AuthController();
    this.router = Router();
    this.initializeRouters();
  }

  private initializeRouters() {
    this.router.get(
      "/keep-login",
      verifyToken,
      this.authController.KeepLoginController
    );
    this.router.post("/register", this.authController.registerController);
    this.router.post("/login", this.authController.loginController);
  }

  public getRouter() {
    return this.router;
  }
}
