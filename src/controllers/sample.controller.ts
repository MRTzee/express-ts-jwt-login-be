import { NextFunction, Request, Response } from "express";
import prisma from "../prisma";
import { transporter } from "../lib/nodemailer";
import { join } from "path";
import fs from "fs/promises";
import Handlebars from "handlebars";

export class SampleController {
  async getSampleData(req: Request, res: Response, next: NextFunction) {
    try {
      const sampleData = await prisma.sample.findMany();
      return res.status(200).send(sampleData);
    } catch (error) {
      next(error);
    }
  }

  async createSampleData(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, code } = req.body;
      const newSampleData = await prisma.sample.create({
        data: { name, code },
      });
      return res.status(200).send(newSampleData);
    } catch (error) {
      next(error);
    }
  }

  async addNewImage(req: Request, res: Response, next: NextFunction) {
    try {
      const { file } = req;
      if (!file) {
        throw new Error("No file uploaded");
      }
      return res
        .status(200)
        .send(`File ${file.filename} successfully uploaded`);
    } catch (error) {
      next(error);
    }
  }

  async addNewImages(req: Request, res: Response, next: NextFunction) {
    try {
      const { files } = req;
      if (!files?.length) {
        throw new Error("No file uploaded");
      }
      return res.status(200).send(`File successfully uploaded`);
    } catch (error) {
      next(error);
    }
  }

  async sendEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const templatePath = join(__dirname, "../templates", "templates.hbs");
      const templateSource = await fs.readFile(templatePath, "utf-8");
      const compileTemplate = Handlebars.compile(templateSource);
      const html = compileTemplate({
        name: "Firza",
      });

      await transporter.sendMail({
        from: "Muksal Fei Hung",
        to: "firzaslearning@gmail.com",
        subject: "Muksal Fei Hung",
        html: html,
      });
      res.status(200).send("send email success");
    } catch (error) {
      next(error);
    }
  }
}
