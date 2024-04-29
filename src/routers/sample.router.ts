import { Router } from "express";
import { SampleController } from "../controllers/sample.controller";
import { validateSample } from "../middlewares/sample.validator";
import { uploader } from "../middlewares/uploader";

export class SampleRouter {
  private sampleController: SampleController;
  private router: Router;

  constructor() {
    this.sampleController = new SampleController();
    this.router = Router();
    this.initializeRouters();
  }

  private initializeRouters() {
    this.router.get("/", this.sampleController.getSampleData);
    this.router.post(
      "/",
      validateSample,
      this.sampleController.createSampleData
    );
    this.router.post(
      "/single-upload",
      uploader("IMG", "/images").single("file"),
      this.sampleController.addNewImage
    );
    this.router.post(
      "/multiple-upload",
      uploader("PIC", "/images").array("files", 2),
      this.sampleController.addNewImages
    );
    this.router.post("/send-email", this.sampleController.sendEmail);
  }

  public getRouter() {
    return this.router;
  }
}
