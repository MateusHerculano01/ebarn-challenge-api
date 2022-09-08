import multer from 'multer';
import mime from 'mime-types';
import path from 'path';
import crypto from 'crypto';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: tmpFolder,

  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    }
  }),
  // fileFilter(request, file, callback) {

  //   const conditions = ["png", "jpg", "jpeg"];

  //   if (conditions.includes(file.mimetype)) {
  //     callback(null, true);
  //   }

  //   callback(null, false);
  // }
}
