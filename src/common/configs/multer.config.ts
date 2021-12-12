import { extname } from 'path'
import { diskStorage } from 'multer'

export const diskStorageConfig = {
  storage: diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + extname(file.originalname))
    },
  }),
}
