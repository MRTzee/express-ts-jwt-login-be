import { Request } from "express";
import multer from "multer";
import { join } from "path";

type destinationCallback = (error: Error | null, destination: string) => void;
type FilenameCallback = (error: Error | null, filename: string) => void;

export const uploader = (filePrefix: string, folderName?: string) => {
  const defaultDir = join(__dirname, "../../public");

  const storage = multer.diskStorage({
    // untuk menentukan destination file kita (mau di taro folder mana)
    destination: (
      req: Request,
      file: Express.Multer.File,
      cb: destinationCallback
    ) => {
      const destination = folderName ? defaultDir + folderName : defaultDir;
      cb(null, destination);
    },

    // untuk mengubah nama default file kita menjadi ada prefix yang kita masukin
    filename: (
      req: Request,
      file: Express.Multer.File,
      cb: FilenameCallback
    ) => {
      const originalNameParts = file.originalname.split(".");
      const fileExtension = originalNameParts[originalNameParts.length - 1];
      const newFileName = filePrefix + Date.now() + "." + fileExtension;

      cb(null, newFileName);
    },
  });
  return multer({ storage });
};
